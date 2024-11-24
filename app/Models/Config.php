<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    protected $fillable = [
        'avatar',
        'bio',
        'banner_image',
        'color_primary',
        'color_secondary',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
