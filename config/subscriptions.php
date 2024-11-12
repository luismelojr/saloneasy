<?php

return [
    'plans' => [
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
