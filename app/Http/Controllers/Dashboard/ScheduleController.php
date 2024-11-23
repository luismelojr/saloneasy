<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dasbhoard\Schedules\ScheduleRequest;
use App\Models\Schedule;
use App\Services\ScheduleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ScheduleController extends Controller
{
    public function __construct(
        protected readonly ScheduleService $service
    ){}

    public function show()
    {
        $user = auth()->user();

        return inertia('Dashboard/Schedules/Screens/Index', [
            'schedule' => $user->schedules()->first()
        ]);
    }

    public function update(ScheduleRequest $request)
    {
        $data = $request->validated();
        $this->service->update($data);

        return redirect()->route('hours.schedules.show')->toast('Horários atualizados com sucesso!');
    }
}
