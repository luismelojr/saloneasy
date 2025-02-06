<?php

namespace App\Exceptions\RegisterUser;

use Exception;
use Illuminate\Http\JsonResponse;

class RegistrationStepOneException extends Exception
{
    public function __construct(string $message = "Problema no cadastro na primeira etapa. Aguarde e tente novamente.")
    {
        parent::__construct($message);
    }

    public function render(): JsonResponse
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], 400);
    }
}
