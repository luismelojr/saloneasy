<?php

namespace App\Http\Requests\Dasbhoard\Clients;

use App\Rules\PhoneExists;
use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $this->merge([
            'birth_date' => date('Y-m-d', strtotime(str_replace('/', '-', $this->birth_date))),
        ]);

        if ($this->isMethod('post')) {
            return [
                'name' => ['required', 'string', 'max:255'],
                'phone' => ['required', 'string', 'max:255', new PhoneExists],
                'birth_date' => ['required', 'date'],
            ];
        }

        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255', function ($attribute, $value, $fail) {
                if ($this->route('client')->phone !== $value) {
                    $user = auth()->user();
                    $clientExists = $user->clients()->where('phone', $value)->exists();

                    if ($clientExists) {
                        $fail('The :attribute is already in use.');
                    }
                }
            }],
            'birth_date' => ['required', 'date'],
        ];
    }
}
