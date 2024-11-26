<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Services\ServiceResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class ScheduleManuallyController extends Controller
{
    public function index()
    {
        $services = auth()->user()->services()->get()->map(function ($services) {
            return [
                'value' => $services->id,
                'label' => $services->name,
            ];
        });

        $crypt = Crypt::encrypt(auth()->user()->id);
        return Inertia::render('Dashboard/ScheduleManually/Screens/Index', [
            'services' => $services,
            'user' => $crypt
        ]);
    }
}
