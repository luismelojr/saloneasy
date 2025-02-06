<?php

namespace App\Services\RegisterUser;

interface RegisterUserInterface
{
    public function execute(array $data): void;
}
