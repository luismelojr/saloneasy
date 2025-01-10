<?php

namespace App\Services;

use Carbon\Carbon;
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

    public function createAppointment(int $serviceId, int $clientId, string $date)
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();

            // Verificar se o serviço pertence ao usuário
            $service = $user->services()->where('services.id', $serviceId)->first();
            if ($service->doesntExist()) {
                throw new \Exception('Serviço não encontrado');
            }

            // Verificar se o cliente pertence ao usuário
            $client = $user->clients()->find($clientId);
            if (!$client) {
                $user->clients()->sync($clientId);
            }

            // Criar a data de inicio e a data de fim
            $startsAt = Carbon::parse($date);
            $endsAt = Carbon::parse($startsAt)->addMinutes($service->duration);

            // Verificar se essa data esta livre para agendamento onde



        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
}
