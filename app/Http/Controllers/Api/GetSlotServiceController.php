<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Hours\AvailabilityResource;
use App\Services\GetServiceSlotService;
use Illuminate\Http\Request;

class GetSlotServiceController extends Controller
{
    public function __construct(
        private readonly GetServiceSlotService $getServiceSlotService
    ){}

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if (!$request->has('service')) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $user = auth()->user();
        if ($user->services()->where('services.id', $request->service)->doesntExist()) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $results = $this->getServiceSlotService->execute($user, $request->service, $request);

        return response()->json([
            'availability' => AvailabilityResource::collection($results['availability']),
            'date' => $results['date'],
            'calendar' => $request->calendar
        ]);
    }
}
