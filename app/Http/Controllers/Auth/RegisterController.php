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

    public function create(Request $request)
    {
        return Inertia::render('Auth/Register', [
            'plan' => $request->plan ?? 'basic'
        ]);
    }

    public function store(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = $this->service->create($data);

        if ($data['plan'] != 'basic') {
            abort_unless(
                $plan = collect(config('subscriptions.plans'))->get($data['plan']), 404
            );
            return Inertia::location($user->newSubscription('default', $plan['stripe_id'])->checkout([
                'success_url' => route('home'),
                'cancel_url' => route('register', ['plan' => $data['plan']]),
            ])->redirect());
        }

        auth()->login($user);

        return redirect()->route('dashboard');
    }
}
