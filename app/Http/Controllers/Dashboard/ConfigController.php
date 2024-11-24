<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dasbhoard\Config\ConfigRequest;
use App\Http\Resources\Dashboard\Config\ConfigResource;
use App\Services\ConfigService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConfigController extends Controller
{
    public function __construct(
        protected readonly ConfigService $service
    ){}

    public function show()
    {
        $user = auth()->user();
        $config = $user->config;

        return Inertia::render('Dashboard/Config/Screens/Index', [
            'config' => new ConfigResource($config)
        ]);
    }

    public function store(ConfigRequest $request)
    {
        $data = $request->validated();
        $this->service->create($data);

        return redirect()->route('config.show')->toast('Configurações atualizadas com sucesso!');
    }
}
