<?php

namespace App\Services;

use App\Bookings\ServiceSlotAvailability;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetServiceSlotService
{
    public function execute(User $user, int $serviceId, Request $request)
    {
        $service = $user->services()->find($serviceId);

        $availability = (new ServiceSlotAvailability($user, $service))->forPeriod(
            Carbon::createFromDate($request->calendar)->startOfDay(),
            Carbon::createFromDate($request->calendar)->endOfMonth()
        );

        $availabilityDates = $availability->hasSlots();

        return [
            'availability' => $availabilityDates,
            'date' => $availability->firstAvailableDate()?->date->toDateString()
        ];
    }
}
