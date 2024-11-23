<?php

namespace App\Services;

class ScheduleExclusionService
{
    public function getAll(array $sorting, array $query)
    {
        $user = auth()->user();
        return $user->schedulesExclusions()->sorting($sorting)->filter($query)->paginate(10);
    }
}
