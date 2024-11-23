<?php

use App\Http\Controllers\Dashboard\ClientController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\LandingPage\CheckoutController;
use App\Http\Controllers\LandingPage\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');


Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // Services
    Route::resource('services', ServiceController::class)->except(['update']);
    Route::post('services/{service}/update', [ServiceController::class, 'update'])->name('services.update');
    Route::patch('services/{service}/status', [ServiceController::class, 'updateStatus'])->name('services.update.status');

    // Clients
    Route::resource('clients', ClientController::class);
});

require __DIR__.'/auth.php';
