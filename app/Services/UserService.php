<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function __construct(
        private readonly User $model
    ){}

    public function create(array $data): User
    {
        try {
            DB::beginTransaction();
            $user = $this->model->create($data);

            DB::commit();
            return $user;
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
