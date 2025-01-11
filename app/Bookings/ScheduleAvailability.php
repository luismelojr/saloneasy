<?php

namespace App\Bookings;

use App\Models\ScheduleExclusion;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Spatie\Period\Boundaries;
use Spatie\Period\Period;
use Spatie\Period\PeriodCollection;
use Spatie\Period\Precision;

class ScheduleAvailability
{
    protected PeriodCollection $periods;

    public function __construct(
        protected User $employee,
        protected Service $service
    )
    {
        $this->periods = new PeriodCollection();
    }

    public function forPeriod(Carbon $startAts, Carbon $endsAt)
    {
        collect(CarbonPeriod::create($startAts, $endsAt)->days())->each(function (Carbon $date) {
            $this->addAvailabilityFromSchedule($date);

            $this->employee->schedulesExclusions()
                ->where('date', $date->format('Y-m-d'))
                ->each(function (ScheduleExclusion $exclusion) use ($date) {
                $this->subtractScheduleExclusion($date, $exclusion);
            });

            $this->excludeTimePassedToday();
        });

        return $this->periods;
    }

    protected function addAvailabilityFromSchedule(Carbon $date)
    {
        if($date->lte(now()->subDay())) return;

        if(!$schedule = $this->employee->schedules
            ->where('starts_at', '<=', $date)
            ->where('ends_at', '>=', $date)->first()) return;

        if (![$startsAt, $endsAt] = $schedule->getWorkingHoursFromDate($date)) {
            return;
        }

        $serviceMinutes = $this->service->duration + $this->service->time_extra;

        $this->periods = $this->periods->add(
            Period::make(
                $date->copy()->setTimeFromTimeString($startsAt),
                $date->copy()->setTimeFromTimeString($endsAt)->subMinutes($serviceMinutes),
                Precision::MINUTE()
            )
        );
    }

    protected function subtractScheduleExclusion(Carbon $date, ScheduleExclusion $exclusion)
    {
        $this->periods = $this->periods->subtract(
            Period::make(
                $date->copy()->setTimeFromTimeString($exclusion->starts_at),
                $date->copy()->setTimeFromTimeString($exclusion->ends_at),
                Precision::MINUTE()
            )
        );
    }

    protected function excludeTimePassedToday(): void
    {
        $this->periods = $this->periods->subtract(
            Period::make(
                now()->startOfDay(),
                now()->endOfHour(),
                Precision::MINUTE(),
                Boundaries::EXCLUDE_START()
            )
        );
    }
}
