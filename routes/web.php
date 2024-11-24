<?php

use App\Http\Controllers\Dashboard\ClientController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\ScheduleController;
use App\Http\Controllers\Dashboard\ScheduleExclusionController;
use App\Http\Controllers\Dashboard\ServiceController;
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

    // Hours Schedules
    Route::get('hours-schedules', [ScheduleController::class, 'show'])->name('hours.schedules.show');
    Route::put('hours-schedules', [ScheduleController::class, 'update'])->name('hours.schedules.update');

    // Hours Schedules Exclusions
    Route::get('hours-schedules/exclusions', [ScheduleExclusionController::class, 'index'])->name('hours.schedules.exclusions.index');
    Route::get('hours-schedules/exclusions/create', [ScheduleExclusionController::class, 'create'])->name('hours.schedules.exclusions.create');
    Route::post('hours-schedules/exclusions', [ScheduleExclusionController::class, 'store'])->name('hours.schedules.exclusions.store');
    Route::delete('hours-schedules/exclusions/{scheduleExclusion}', [ScheduleExclusionController::class, 'destroy'])->name('hours.schedules.exclusions.destroy');
});

require __DIR__.'/auth.php';
