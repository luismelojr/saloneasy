<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dasbhoard\Schedules\CreateScheduleRequest;
use App\Http\Resources\Dashboard\Clients\ClientResource;
use App\Http\Resources\Dashboard\Hours\AvailabilityResource;
use App\Http\Resources\Dashboard\Services\ServiceResource;
use App\Services\GetServiceSlotService;
use App\Services\ScheduleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class ScheduleManuallyController extends Controller
{
    public function __construct(
        private readonly GetServiceSlotService $getServiceSlotService,
        private readonly ScheduleService $service
    ){}

    public function index(Request $request)
    {
        $query = auth()->user()->services();

        // Verifica se há um termo de busca
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $services = $query->get();

        $clients = auth()->user()->clients()->get()->map(function ($client) {
            return [
                'value' => $client->id,
                'label' => $client->name,
            ];
        })->toArray();

        return Inertia::render('Dashboard/ScheduleManually/Screens/Index', [
            'services' => ServiceResource::collection($services),
            'search' => $request->search,
            'clients' => $clients,
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        if (!$request->has('service') || !$request->has('client')) {
            return redirect()->route('schedule.manually.index.service')->toast('Serviço não encontrado', 'error');
        }

        if ($user->services()->where('services.id', $request->service)->doesntExist()) {
            return redirect()->route('schedule.manually.index.service')->toast('Serviço não encontrado', 'error');
        }
        $client = $user->clients()->find($request->client);
        $results = $this->getServiceSlotService->execute($user, $request->service, $request);
        return Inertia::render('Dashboard/ScheduleManually/Screens/Appointment', [
            'service' => new ServiceResource($results['service']),
            'availability' => AvailabilityResource::collection($results['availability']),
            'date' => $results['date'],
            'calendar' => $request->calendar,
            'client' => new ClientResource($client)
        ]);
    }

    public function storeAppointment(CreateScheduleRequest $request)
    {
        $this->service->createAppointment($request->service_id, $request->client_id, $request->datetime);
    }
}
