<?php

namespace App\Http\Resources\Dashboard\Hours;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SlotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'employee' => $this->employee->id,
            'datetime' => $this->time->toDateTimeString(),
            'time' => $this->time->format('H:i'),
        ];
    }
}
