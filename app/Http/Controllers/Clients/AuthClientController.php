<?php

namespace App\Http\Controllers\Clients;

use App\Http\Controllers\Controller;
use App\Services\AuthClientService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthClientController extends Controller
{
    public function __construct(
        private readonly AuthClientService $service
    ){}

    public function index()
    {
        return Inertia::render('Clients/Auth/Login');
    }

    public function code(Request $request)
    {
        try {
            $request->validate([
                'phone' => 'required|string|exists:clients,phone',
            ]);

            $client = $this->service->login($request->phone);

            return redirect()->route('login.client.code.show', ['client' => $client->id]);
        } catch (\Exception $e) {
            return redirect()->back()->toast('Cliente não encontrado.', 'error');
        }
    }

    public function createCode(Request $request)
    {
        try {
            $client = $this->service->findById($request->client);

            return Inertia::render('Clients/Auth/Code', [
                'client' => $client
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->toast('Cliente não encontrado.', 'error');
        }
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|exists:clients,phone',
            'code' => 'required|string|exists:clients,code'
        ]);

        $this->service->verifyCode($request->phone, $request->code);

        return redirect()->intended(route('dashboard-client', absolute: false));
    }
}
