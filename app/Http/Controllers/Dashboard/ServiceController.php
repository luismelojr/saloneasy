<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Services\ServiceRequest;
use App\Http\Resources\Dashboard\Services\ServiceResource;
use App\Models\Service;
use App\Services\ServiceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function __construct(
        private readonly ServiceService $service
    ){}

    public function index(Request $request)
    {
        $sorting = $request->has('sorting') ? json_decode($request->input('sorting', []), true) : [];
        $query = $request->query();
        $services = $this->service->getAll($sorting, $query);
        return Inertia::render('Dashboard/Services/Screens/Index', [
            'services' => $services,
            'query' => [
                ...$query,
                'sorting' => $sorting
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Services/Screens/Create');
    }

    public function store(ServiceRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('services.index')->toast('Serviço criado com sucesso!');
    }

    public function show(Service $service)
    {
        if (!Gate::allows('show-services', $service)) {
            return redirect()->route('services.index')->toast('Você não tem permissão para acessar este serviço.', 'error');
        }

        return Inertia::render('Dashboard/Services/Screens/Show', [
            'service' => new ServiceResource($service)
        ]);
    }

    public function edit(Service $service)
    {
        if (!Gate::allows('show-services', $service)) {
            return redirect()->route('services.index')->toast('Você não tem permissão para acessar este serviço.', 'error');
        }

        return Inertia::render('Dashboard/Services/Screens/Edit', [
            'service' => new ServiceResource($service)
        ]);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        if (!Gate::allows('show-services', $service)) {
            return redirect()->route('services.index')->toast('Você não tem permissão para acessar este serviço.', 'error');
        }

        $this->service->update($service, $request->validated());

        return redirect()->route('services.index')->toast('Serviço atualizado com sucesso!');
    }

    public function destroy(Service $service)
    {
        if (!Gate::allows('show-services', $service)) {
            return redirect()->route('services.index')->toast('Você não tem permissão para acessar este serviço.', 'error');
        }

        $this->service->delete($service);

        return redirect()->route('services.index')->toast('Serviço deletado com sucesso!');
    }

    public function updateStatus(Service $service)
    {
        if (!Gate::allows('show-services', $service)) {
            return redirect()->route('services.index')->toast('Você não tem permissão para acessar este serviço.', 'error');
        }

        $this->service->updateStatus($service);

        return redirect()->route('services.index')->toast('Status do serviço atualizado com sucesso!');
    }
}
