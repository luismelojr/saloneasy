<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    protected $fillable = [
        'starts_at',
        'ends_at',
        'monday_starts_at',
        'monday_ends_at',
        'tuesday_starts_at',
        'tuesday_ends_at',
        'wednesday_starts_at',
        'wednesday_ends_at',
        'thursday_starts_at',
        'thursday_ends_at',
        'friday_starts_at',
        'friday_ends_at',
        'saturday_starts_at',
        'saturday_ends_at',
        'sunday_starts_at',
        'sunday_ends_at',
    ];

    protected function casts()
    {
        return [
            'starts_at' => 'date',
            'ends_at' => 'date',
        ];
    }

    public function getWorkingHoursFromDate(Carbon $date)
    {
        $hours = array_filter([
            $this->{strtolower($date->format('l')).'_starts_at'},
            $this->{strtolower($date->format('l')).'_ends_at'},
        ]);

        return count($hours) == 2 ? $hours : null;
    }

    public function getMondayStartsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getMondayEndsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getTuesdayStartsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getTuesdayEndsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getWednesdayStartsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getWednesdayEndsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getThursdayStartsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getThursdayEndsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getFridayStartsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getFridayEndsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getSaturdayStartsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getSaturdayEndsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getSundayStartsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getSundayEndsAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }



    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
