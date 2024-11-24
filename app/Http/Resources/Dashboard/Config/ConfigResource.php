<?php

namespace App\Http\Resources\Dashboard\Config;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConfigResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'avatar' => $this->avatar ? asset('storage/' . $this->avatar) : null,
            'bio' => $this->bio ?? null,
            'banner_image' => $this->banner_image ? asset('storage/' . $this->banner_image) : null,
            'color_primary' => $this->color_primary ?? null,
            'color_secondary' => $this->color_secondary ?? null,
        ];
    }
}
