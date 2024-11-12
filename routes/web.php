<?php

use App\Http\Controllers\LandingPage\CheckoutController;
use App\Http\Controllers\LandingPage\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');



Route::get('/dashboard', function () {
    dd(auth()->user());
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
