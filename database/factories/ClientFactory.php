<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::find(1);

        return [
            'user_id' => $user->id,
            'name' => $this->faker->name,
            'phone' => $this->faker->phoneNumber,
            'birth_date' => $this->faker->date(),
        ];
    }
}
