<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dasbhoard\Clients\ClientRequest;
use App\Http\Resources\Dashboard\Clients\ClientResource;
use App\Models\Client;
use App\Services\ClientService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function __construct(
        private readonly ClientService $service
    ){}

    public function index(Request $request)
    {
        $sorting = $request->has('sorting') ? json_decode($request->input('sorting', []), true) : [];
        $query = $request->query();

        $clients = $this->service->getAll($sorting, $query);
        return Inertia::render('Dashboard/Clients/Screens/Index', [
            'clients' => ClientResource::collection($clients),
            'query' => [
                ...$query,
                'sorting' => $sorting
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Clients/Screens/Create');
    }

    public function store(ClientRequest $request)
    {
        $data = $request->validated();
        if (!$this->service->create($data)) {
            return redirect()->route('clients.create')->toast('Cliente já cadastrado.', 'error');
        }

        return redirect()->route('clients.index')->toast('Cliente criado com sucesso!');
    }

    public function createSchedule(ClientRequest $request)
    {
        $data = $request->validated();
        if (!$this->service->create($data)) {
            return redirect()->route('clients.create')->toast('Cliente já cadastrado.', 'error');
        }

        return redirect()->back()->toast('Cliente criado com sucesso!');
    }

    public function show(Client $client)
    {
        if (!Gate::allows('show-clients', $client)) {
            return redirect()->route('clients.index')->toast('Você não tem permissão para acessar este cliente.', 'error');
        }

        return Inertia::render('Dashboard/Clients/Screens/Show', [
            'client' => new ClientResource($client)
        ]);
    }

    public function edit(Client $client)
    {
        if (!Gate::allows('show-clients', $client)) {
            return redirect()->route('clients.index')->toast('Você não tem permissão para acessar este cliente.', 'error');
        }

        return Inertia::render('Dashboard/Clients/Screens/Edit', [
            'client' => new ClientResource($client)
        ]);
    }

    public function update(ClientRequest $request, Client $client)
    {
        if (!Gate::allows('show-clients', $client)) {
            return redirect()->route('clients.index')->toast('Você não tem permissão para acessar este cliente.', 'error');
        }

        $data = $request->validated();
        $this->service->update($client, $data);

        return redirect()->route('clients.index')->toast('Cliente atualizado com sucesso!');
    }

    public function destroy(Client $client)
    {
        if (!Gate::allows('show-clients', $client)) {
            return redirect()->route('clients.index')->toast('Você não tem permissão para acessar este cliente.', 'error');
        }

        $client->delete();

        return redirect()->route('clients.index')->toast('Cliente deletado com sucesso!');
    }

    public function existPhone(Request $request)
    {
        $request->validate([
            'phone' => 'required|string'
        ]);

        $client = $this->service->findByPhone($request->phone);

        return response()->json([
            'exists' => !!$client,
        ]);
    }
}
