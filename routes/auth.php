<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Users\Register\StepOneRegisterController;
use App\Http\Controllers\Users\Register\StepThreeRegisterController;
use App\Http\Controllers\Users\Register\StepTwoRegisterController;
use App\Http\Middleware\ValidationUserStepMiddleware;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('register', [StepOneRegisterController::class, 'create'])->name('register.step.one');
    Route::post('register', [StepOneRegisterController::class, 'store'])->name('register.store.step.one');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::get('register/step-two', [StepTwoRegisterController::class, 'create'])
        ->middleware([ValidationUserStepMiddleware::class])
        ->name('register.step.two');
    Route::post('register/step-two', [StepTwoRegisterController::class, 'store'])
        ->name('register.store.step.two');

    Route::get('register/step-three', [StepThreeRegisterController::class, 'create'])
        ->middleware([ValidationUserStepMiddleware::class])
        ->name('register.step.three');
    Route::post('register/step-three', [StepThreeRegisterController::class, 'store'])
        ->name('register.store.step.three');
});
