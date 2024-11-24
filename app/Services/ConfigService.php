<?php

namespace App\Services;

use App\Models\Config;
use Illuminate\Support\Facades\DB;

class ConfigService
{
    public function create(array $data)
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $config = $user->config;
            if (isset($data['avatar'])) {
                $data['avatar'] = $data['avatar']->store('avatars', 'public');
            }

            if (isset($data['banner_image'])) {
                $data['banner_image'] = $data['banner_image']->store('banners', 'public');
            }

            if ($config) {
                $config->update($data);
            } else {
                $user->config()->create($data);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }


    }
}
