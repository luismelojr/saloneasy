<?php

namespace App\Http\Requests\RegisterUser;

use Illuminate\Foundation\Http\FormRequest;

class RegisterStepOneRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $this->merge([
            'birth_date' => date('Y-m-d', strtotime(str_replace('/', '-', $this->birth_date))),
            'phone' => preg_replace('/[^0-9]/', '', $this->phone),
        ]);

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'birth_date' => ['required', 'date'],
            'phone' => ['required', 'string', 'max:255', 'unique:users,phone'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
