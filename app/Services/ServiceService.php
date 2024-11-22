<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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

    public function create(array $data)
    {
        try {
         DB::beginTransaction();
            if (isset($data['image'])) {
                $data['image_url'] = $data['image']->store('services', 'public');
            }
            $user = auth()->user();
            $service = $user->services()->create($data);

            DB::commit();
            return $service;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function update(Service $service, array $data)
    {
        try {
            DB::beginTransaction();
            if (isset($data['image'])) {
                $data['image_url'] = $data['image']->store('services', 'public');
            }
            $service->update($data);

            DB::commit();
            return $service;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function delete(Service $service)
    {
        try {
            DB::beginTransaction();
            if ($service->image_url) {
                Storage::disk('public')->delete($service->image_url);
            }
            $service->delete();
            DB::commit();
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
