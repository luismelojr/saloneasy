<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Support\Facades\Auth;

class AuthClientService
{

    public function findById(int $id): Client
    {
        return Client::findOrFail($id);
    }

    public function login(string $phone): Client
    {
        $client = Client::where('phone', $phone)->first();

        if (!$client) {
            throw new \Exception('Cliente não encontrado.');
        }

        // Gerar um codigo de 6 numeros
        $code = mt_rand(100000, 999999);


        $client->update([
            'code' => $code
        ]);

        return $client;
    }

    public function verifyCode(string $phone, string $code)
    {
        $client = Client::where('phone', $phone)->where('code', $code)->first();

        if (!$client) {
            throw new \Exception('Codigo invalido');
        }

        $client->update([
            'code' => null
        ]);

        Auth::guard('client')->login($client);
    }
}
