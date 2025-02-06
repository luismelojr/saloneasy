<?php

namespace App\Http\Controllers\Users\Register;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUser\RegisterStepOneRequest;
use App\Services\RegisterUser\RegisterUserStepOne;
use Inertia\Inertia;

class StepOneRegisterController extends Controller
{
    public function __construct(
        private readonly RegisterUserStepOne $service
    ){}

    public function create()
    {
        return Inertia::render('Users/Register/StepOneRegister');
    }

    public function store(RegisterStepOneRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->execute($data);
            return redirect()->route('register.step.two');
        } catch (\Exception $e) {
            return redirect()->back()->toast($e->getMessage(), 'error');
        }
    }
}
