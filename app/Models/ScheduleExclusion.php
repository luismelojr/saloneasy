<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\SortableTrait;
use Illuminate\Database\Eloquent\Model;

class ScheduleExclusion extends Model
{
    use FilterTrait;
    use SortableTrait;
    protected $fillable = [
        'date',
        'starts_at',
        'ends_at',
        'reason',
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
