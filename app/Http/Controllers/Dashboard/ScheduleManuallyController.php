<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Services\ServiceResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class ScheduleManuallyController extends Controller
{
    public function index(Request $request)
    {
        $query = auth()->user()->services();

        // Verifica se há um termo de busca
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $services = $query->get();

        return Inertia::render('Dashboard/ScheduleManually/Screens/Index', [
            'services' => ServiceResource::collection($services),
            'search' => $request->search,
        ]);
    }
}
