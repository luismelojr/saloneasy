<?php

namespace App\Http\Controllers\Users\Register;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dasbhoard\Schedules\ScheduleRequest;
use App\Services\ScheduleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StepThreeRegisterController extends Controller
{
    public function __construct(
        protected readonly ScheduleService $service
    ){}

    public function create()
    {
        return Inertia::render('Users/Register/StepThreeRegister', [
            'user' => auth()->user()
        ]);
    }

    public function store(ScheduleRequest $request)
    {
        $this->service->update($request->validated());
        auth()->user()->update(['registration_step' => null]);
        return redirect()->route('dashboard')->toast('Bem-vindo ao saloneasy! Sua conta foi criada com sucesso!');
    }
}
