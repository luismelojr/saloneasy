<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\SortableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Client extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;
    use FilterTrait;
    use SortableTrait;

    protected $fillable = [
        'name',
        'phone',
        'birth_date',
        'code'
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
        ];
    }

    // Relationships
    public function users()
    {
        return $this->belongsToMany(User::class, 'client_user');
    }
}
