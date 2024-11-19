<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\ServiceService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function __construct(
        private readonly ServiceService $service
    ){}

    public function index(Request $request)
    {
        return Inertia::render('Dashboard/Services/Screens/Index');
    }
}
