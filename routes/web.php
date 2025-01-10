<?php

use App\Http\Controllers\Api\GetSlotServiceController;
use App\Http\Controllers\Api\GetUserSearchController;
use App\Http\Controllers\Dashboard\ClientController;
use App\Http\Controllers\Dashboard\ConfigController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\ScheduleController;
use App\Http\Controllers\Dashboard\ScheduleExclusionController;
use App\Http\Controllers\Dashboard\ScheduleManuallyController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\LandingPage\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('/teste', function () {
    return Inertia::render('Teste');
});


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

    // Config
    Route::get('config', [ConfigController::class, 'show'])->name('config.show');
    Route::post('config', [ConfigController::class, 'store'])->name('config.store');

    // Profile
    Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('profile-password', [ProfileController::class, 'updatePassword'])->name('profile.update.password');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Schedule Manually
    Route::get('schedule-manually/service', [ScheduleManuallyController::class, 'index'])->name('schedule.manually.index.service');
    Route::get('schedule-manually/appointment', [ScheduleManuallyController::class, 'store'])->name('schedule.manually.index.appointment');
    Route::post('schedule-manually/appointment', [ScheduleManuallyController::class, 'storeAppointment'])->name('schedule.manually.store.appointment');

    // Get Users
    Route::get('users-search', GetUserSearchController::class)->name('users.search');

    // Get Slot Service
    Route::get('slot-service', GetSlotServiceController::class)->name('slot.service');
});

require __DIR__.'/auth.php';
