<?php

namespace App\Http\Requests\Dasbhoard\Schedules;

use Illuminate\Foundation\Http\FormRequest;

class ScheduleRequest extends FormRequest
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
        $this['monday_starts_at'] = $this['monday_starts_at'] ? $this['monday_starts_at'] .= ':00' : null;
        $this['monday_ends_at'] = $this['monday_ends_at'] ? $this['monday_ends_at'] .= ':00' : null;
        $this['tuesday_starts_at'] = $this['tuesday_starts_at'] ? $this['tuesday_starts_at'] .= ':00' : null;
        $this['tuesday_ends_at'] = $this['tuesday_ends_at'] ? $this['tuesday_ends_at'] .= ':00' : null;
        $this['wednesday_starts_at'] = $this['wednesday_starts_at'] ? $this['wednesday_starts_at'] .= ':00' : null;
        $this['wednesday_ends_at'] = $this['wednesday_ends_at'] ? $this['wednesday_ends_at'] .= ':00' : null;
        $this['thursday_starts_at'] = $this['thursday_starts_at'] ? $this['thursday_starts_at'] .= ':00' : null;
        $this['thursday_ends_at'] = $this['thursday_ends_at'] ? $this['thursday_ends_at'] .= ':00' : null;
        $this['friday_starts_at'] = $this['friday_starts_at'] ? $this['friday_starts_at'] .= ':00' : null;
        $this['friday_ends_at'] = $this['friday_ends_at'] ? $this['friday_ends_at'] .= ':00' : null;
        $this['saturday_starts_at'] = $this['saturday_starts_at'] ? $this['saturday_starts_at'] .= ':00' : null;
        $this['saturday_ends_at'] = $this['saturday_ends_at'] ? $this['saturday_ends_at'] .= ':00' : null;
        $this['sunday_starts_at'] = $this['sunday_starts_at'] ? $this['sunday_starts_at'] .= ':00' : null;
        $this['sunday_ends_at'] = $this['sunday_ends_at'] ? $this['sunday_ends_at'] .= ':00' : null;

        // Verificar se apenas o starts de cada dia foi preenchido e o end nao foi preenchido se isso acontecer deixar ele como nulo
        if ($this['monday_starts_at'] && !$this['monday_ends_at']) {
            $this['monday_starts_at'] = null;
        }

        if ($this['tuesday_starts_at'] && !$this['tuesday_ends_at']) {
            $this['tuesday_starts_at'] = null;
        }

        if ($this['wednesday_starts_at'] && !$this['wednesday_ends_at']) {
            $this['wednesday_starts_at'] = null;
        }

        if ($this['thursday_starts_at'] && !$this['thursday_ends_at']) {
            $this['thursday_starts_at'] = null;
        }

        if ($this['friday_starts_at'] && !$this['friday_ends_at']) {
            $this['friday_starts_at'] = null;
        }

        if ($this['saturday_starts_at'] && !$this['saturday_ends_at']) {
            $this['saturday_starts_at'] = null;
        }

        if ($this['sunday_starts_at'] && !$this['sunday_ends_at']) {
            $this['sunday_starts_at'] = null;
        }


        return [
            'monday_starts_at' => ['nullable', 'date_format:H:i:s'],
            'monday_ends_at' => ['nullable', 'date_format:H:i:s', 'after:monday_starts_at'],
            'tuesday_starts_at' => ['nullable', 'date_format:H:i:s'],
            'tuesday_ends_at' => ['nullable', 'date_format:H:i:s', 'after:tuesday_starts_at'],
            'wednesday_starts_at' => ['nullable', 'date_format:H:i:s'],
            'wednesday_ends_at' => ['nullable', 'date_format:H:i:s', 'after:wednesday_starts_at'],
            'thursday_starts_at' => ['nullable', 'date_format:H:i:s'],
            'thursday_ends_at' => ['nullable', 'date_format:H:i:s', 'after:thursday_starts_at'],
            'friday_starts_at' => ['nullable', 'date_format:H:i:s'],
            'friday_ends_at' => ['nullable', 'date_format:H:i:s', 'after:friday_starts_at'],
            'saturday_starts_at' => ['nullable', 'date_format:H:i:s'],
            'saturday_ends_at' => ['nullable', 'date_format:H:i:s', 'after:saturday_starts_at'],
            'sunday_starts_at' => ['nullable', 'date_format:H:i:s'],
            'sunday_ends_at' => ['nullable', 'date_format:H:i:s', 'after:sunday_starts_at'],
        ];
    }
}
