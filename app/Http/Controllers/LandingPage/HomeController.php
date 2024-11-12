<?php

namespace App\Http\Controllers\LandingPage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        $plans = collect(config('subscriptions.plans'));
        return Inertia::render('LandingPage/Home', [
            'essential' => [
                'name' => $plans->get('essential')['name'],
                'price' => $plans->get('essential')['price'],
            ],
            'pro' => [
                'name' => $plans->get('pro')['name'],
                'price' => $plans->get('pro')['price'],
            ],
        ]);
    }
}
