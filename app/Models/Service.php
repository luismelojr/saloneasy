<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\SortableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    use SortableTrait;
    use FilterTrait;

    protected $fillable = [
        'name',
        'user_id',
        'image_url',
        'price',
        'duration',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Getters and Setters
    public function setPriceAttribute($value)
    {
        $this->attributes['price'] = $value * 100;
    }

    public function getPriceAttribute($value)
    {
        return $value / 100;
    }
}
