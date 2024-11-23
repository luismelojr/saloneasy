<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\SortableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;
    use FilterTrait;
    use SortableTrait;

    protected $fillable = [
        'name',
        'phone',
        'birth_date',
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
