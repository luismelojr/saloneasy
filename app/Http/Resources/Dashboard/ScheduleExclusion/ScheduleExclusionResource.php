<?php

namespace App\Http\Resources\Dashboard\ScheduleExclusion;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleExclusionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => Carbon::parse($this->date)->format('d/m/Y'),
            'starts_at' => Carbon::parse($this->starts_at)->format('H:i'),
            'ends_at' => Carbon::parse($this->ends_at)->format('H:i')
        ];
    }
}
