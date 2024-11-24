<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ScheduleExclusionService
{
    public function getAll(array $sorting, array $query)
    {
        $user = auth()->user();
        if (isset($query['date'])) {
            $query['date'] = Carbon::createFromFormat('d/m/Y', $query['date'])->format('Y-m-d');
        }
        return $user->schedulesExclusions()->sorting($sorting)->filter($query)->paginate(10);
    }

    public function create(array $data): void
    {
        // Converter starts_at para Time
        $data['starts_at'] = date('H:i:s', strtotime($data['starts_at']));
        $data['ends_at'] = date('H:i:s', strtotime($data['ends_at']));
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $user->schedulesExclusions()->create($data);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
}
