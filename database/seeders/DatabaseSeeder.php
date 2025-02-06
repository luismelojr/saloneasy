<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Plan;
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
        $planFree = Plan::create([
            'name' => 'Free',
            'price' => 0.00,
            'stripe_id' => 'price_1J4JZvKb6b0J9zjzZzsaZzZzZz',
        ]);

        $planEssential = Plan::create([
            'name' => 'Essential',
            'price' => 9.99,
            'stripe_id' => 'price_1J4JZvKb6b0J9zjzZzZszZzZz',
        ]);

        $planPro = Plan::create([
            'name' => 'Pro',
            'price' => 19.99,
            'stripe_id' => 'price_1J4JZvKb6b0J9zjzZzZzZzZz',
        ]);

        // Plan Feature Free
        $planFree->features()->create([
            'name' => '1 Cliente',
        ]);

        $planFree->features()->create([
            'name' => '1 Serviço',
        ]);

        $user = $planFree->users()->create([
            'name' => 'Luis Henrique',
            'email' => 'junimhs10@gmail.com',
            'birth_date' => '1996-10-30',
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
