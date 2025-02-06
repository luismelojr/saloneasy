<?php

namespace App\Http\Controllers\Users\Register;

use App\Enums\RegistrationStepEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Services\ServiceRequest;
use App\Models\Service;
use App\Services\ServiceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class StepTwoRegisterController extends Controller
{
    public function __construct(
        private readonly ServiceService $service
    ){}

    public function create()
    {
        if (!Gate::denies('create', Service::class)) {
            return redirect()->back()->toast('Plano Free permite apenas um serviço.', 'error');
        }
        return Inertia::render('Users/Register/StepTwoRegister', [
            'user' => auth()->user()
        ]);
    }

    public function store(ServiceRequest $request)
    {

        $this->service->create($request->validated());
        auth()->user()->update(['registration_step' => RegistrationStepEnum::STEP_TWO]);
        return redirect()->route('register.step.three')->toast('Serviço criado com sucesso!');
    }
}
