<?php

namespace App\Http\Requests\Dasbhoard\Config;

use Illuminate\Foundation\Http\FormRequest;

class ConfigRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'avatar' => ['nullable', 'image', 'max:2048'],
            'banner_image' => ['nullable', 'image', 'max:2048'],
            'bio' => ['nullable', 'string', 'max:255'],
            'color_primary' => ['nullable', 'string', 'max:255'],
            'color_secondary' => ['nullable', 'string', 'max:255'],
        ];

        if (is_string($this->banner_image)) {
            $rules['banner_image'] = ['nullable', 'string', 'max:255'];
        }

        if (is_string($this->avatar)) {
            $rules['avatar'] = ['nullable', 'string', 'max:2048'];
        }

        return $rules;
    }
}
