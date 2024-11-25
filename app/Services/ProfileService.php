<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class ProfileService
{
    public function update(array $data)
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $user->update($data);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }

    public function updatePassword(array $data)
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $user->update([
                'password' => bcrypt($data['password'])
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
}
