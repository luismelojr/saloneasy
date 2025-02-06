<?php

return [
    'plans' => [
        'free' => [
            'name' => 'Grátis',
            'price' => 0,
            'stripe_id' => env('STRIPE_FREE_ID'),
        ],
        'essential' => [
            'name' => 'Essencial',
            'price' => 49.90,
            'stripe_id' => env('STRIPE_ESSENTIAL_ID'),
        ],
        'pro' => [
            'name' => 'Pro',
            'price' => 99.90,
            'stripe_id' => env('STRIPE_PRO_ID'),
        ]
    ]
];
