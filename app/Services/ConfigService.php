<?php

namespace App\Services;

use App\Models\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ConfigService
{
    public function create(array $data)
    {
        try {
            DB::beginTransaction();

            $user = auth()->user();
            $config = $user->config;

            // Processar upload de avatar
            if (isset($data['avatar']) && $data['avatar'] instanceof \Illuminate\Http\UploadedFile) {
                if ($config && $config->avatar) {
                    Storage::disk('public')->delete($config->avatar); // Apagar avatar antigo
                }
                $data['avatar'] = $data['avatar']->store('avatars', 'public');
            }

            // Processar upload de banner_image
            if (isset($data['banner_image']) && $data['banner_image'] instanceof \Illuminate\Http\UploadedFile) {
                if ($config && $config->banner_image) {
                    Storage::disk('public')->delete($config->banner_image); // Apagar banner antigo
                }
                $data['banner_image'] = $data['banner_image']->store('banners', 'public');
            }

            // Criar ou atualizar configuração
            $config ? $config->update($data) : $user->config()->create($data);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            report($e);
            throw new \Exception('An error occurred while saving the configuration.');
        }
    }
}
