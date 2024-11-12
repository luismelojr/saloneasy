<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\LandingPage\CheckoutController;
use App\Http\Controllers\LandingPage\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');


Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
});

require __DIR__.'/auth.php';
