<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dasbhoard\ScheduleExclusations\ScheduleExclusationRequest;
use App\Http\Resources\Dashboard\Clients\ClientResource;
use App\Http\Resources\Dashboard\ScheduleExclusion\ScheduleExclusionResource;
use App\Models\ScheduleExclusion;
use App\Services\ScheduleExclusionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleExclusionController extends Controller
{
    public function __construct(
        protected readonly ScheduleExclusionService $service
    )
    {
    }

    public function index(Request $request)
    {
        $sorting = $request->has('sorting') ? json_decode($request->input('sorting', []), true) : [];
        $query = $request->query();

        $clients = $this->service->getAll($sorting, $query);
        return Inertia::render('Dashboard/ScheduleExclusions/Screens/Index', [
            'exclusions' => ScheduleExclusionResource::collection($clients),
            'query' => [
                ...$query,
                'sorting' => $sorting
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/ScheduleExclusions/Screens/Create');
    }

    public function store(ScheduleExclusationRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('hours.schedules.exclusions.index')->toast('Exclusão de horário cadastrada com sucesso!');
    }

    public function destroy(ScheduleExclusion $scheduleExclusion)
    {
        $scheduleExclusion->delete();
        return redirect()->route('hours.schedules.exclusions.index')->toast('Exclusão de horário excluída com sucesso!');
    }
}
