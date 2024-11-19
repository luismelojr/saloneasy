<?php

namespace App\Services;

use App\Models\Service;

class ServiceService
{
    public function __construct(
        private readonly Service $model
    ){}

    public function getAll(array $sorting)
    {
        $user = auth()->user();
        return $user->services()->sorting($sorting)->paginate(10);
    }
}
