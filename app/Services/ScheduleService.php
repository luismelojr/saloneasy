<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class ScheduleService
{
    public function update(array $data)
    {
        try {
            DB::beginTransaction();
            $schedule = auth()->user()->schedules()->first();

            if ($schedule) {
                // verificar se falta 1 mes para o termino do ends_at
                if ($schedule->ends_at->diffInMonths(now()) <= 1) {
                    $data['starts_at'] = now();
                    $data['ends_at'] = now()->addYear();
                }
                $schedule->update($data);
            } else {
                $data['starts_at'] = now();
                $data['ends_at'] = now()->addYear();
                auth()->user()->schedules()->create($data);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
}
