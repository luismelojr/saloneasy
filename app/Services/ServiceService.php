<?php

namespace App\Services;

use App\Models\Service;

class ServiceService
{
    public function __construct(
        private readonly Service $model
    ){}

    public function getAll(array $sorting, array $query)
    {
        $user = auth()->user();
        return $user->services()->sorting($sorting)->filter($query)->paginate(10);
    }
}
