<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Luis Henrique',
            'email' => 'junimhs10@gmail.com',
            'password' => bcrypt('junior'),
            'phone' => '62982296415',
        ]);

        // Create Config
        $user->config()->create([
            'avatar' => 'avatar.jpg',
            'bio' => 'Desenvolvedor Full Stack',
            'banner_image' => 'banner.jpg',
            'color_primary' => '#000000',
            'color_secondary' => '#ffffff',
        ]);

        // Pegar todos os clientes e vincular ao usuario com o id 1 relacionamento N:N
         $clients = Client::all();
        $user->clients()->attach($clients);
    }
}
