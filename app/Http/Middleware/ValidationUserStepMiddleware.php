<?php

namespace App\Http\Middleware;

use App\Enums\RegistrationStepEnum;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidationUserStepMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->user()->registration_step == null) {
            return $next($request);
        }

        if (auth()->user()->registration_step->value == RegistrationStepEnum::STEP_ONE) {
            return redirect()->route('register.step.two');
        }

        if (auth()->user()->registration_step->value == RegistrationStepEnum::STEP_TWO) {
            return redirect()->route('register.step.three');
        }

        return $next($request);

    }
}
