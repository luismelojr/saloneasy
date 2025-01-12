<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Support\Facades\DB;

class ClientService
{
    public function __construct(protected readonly Client $model){}

    public function getAll(array $sorting, array $query)
    {
        $user = auth()->user();
        return $user->clients()->sorting($sorting)->filter($query)->paginate(10);
    }

    public function create(array $data)
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $clientExists = $this->model->where('phone', $data['phone'])->first();

            if ($clientExists) {
                $user->clients()->attach($clientExists->id);
                DB::commit();
                return $clientExists;
            }

            $client = $this->model->create($data);
            $user->clients()->attach($client->id);
            DB::commit();
            return $client;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }

    public function update(Client $client, array $data)
    {
        try {
            DB::beginTransaction();
            $client->update($data);
            DB::commit();
            return $client;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }

    public function findByPhone(string $phone)
    {
        return $this->model->where('phone', $phone)->first();
    }
}
