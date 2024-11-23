<?php

namespace App\Providers;

use App\Models\Client;
use App\Models\Schedule;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Gate::define('show-services', function (User $user, Service $service) {
            return $user->id === $service->user_id;
        });

        Gate::define('show-clients', function (User $user, Client $client) {
            // Verificar se o client esta vinculado ao usuario relacao N:N
            return $user->clients->contains($client);
        });

        Gate::define('management-schedule', function (User $user, Schedule $schedule) {
            return $user->id === $schedule->user_id;
        });

        JsonResource::withoutWrapping();
    }
}
