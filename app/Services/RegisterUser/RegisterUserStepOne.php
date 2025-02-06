<?php

namespace App\Services\RegisterUser;

use App\Enums\PlanEnum;
use App\Enums\RegistrationStepEnum;
use App\Exceptions\RegisterUser\RegistrationStepOneException;
use App\Models\Plan;
use App\Services\ConfigService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RegisterUserStepOne implements RegisterUserInterface
{
    public function __construct(
        private readonly ConfigService $configService
    ){}

    public function execute(array $data): void
    {
        try {
            DB::transaction(function () use ($data) {
                $planFree = Plan::where('name', PlanEnum::FREE)->firstOrFail();
                $user = $planFree->users()->create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'birth_date' => $data['birth_date'],
                    'phone' => preg_replace('/[^0-9]/', '', $data['phone']),
                    'password' => Hash::make($data['password']),
                    'registration_step' => RegistrationStepEnum::STEP_ONE,
                ]);

                $this->configService->configBase($user);

                Auth::login($user);
            });
        } catch (\Throwable $e) {
            dd($e);
            throw new RegistrationStepOneException();
        }
    }
}
