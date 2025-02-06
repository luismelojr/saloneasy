<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    protected $fillable = ['name', 'price', 'stripe_id'];

    // Relationship with User
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    // Relationship with PlanFeature
    public function features(): HasMany
    {
        return $this->hasMany(PlanFeature::class);
    }
}
