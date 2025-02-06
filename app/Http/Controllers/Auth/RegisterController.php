<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function __construct(
        private readonly UserService $service
    ){}

    public function createStepOne(Request $request)
    {
        return Inertia::render('Auth/Register', [
            'plan' => $request->plan ?? 'basic'
        ]);
    }

    public function store(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = $this->service->create($data);

        auth()->login($user);

        return redirect()->route('dashboard');
    }
}
