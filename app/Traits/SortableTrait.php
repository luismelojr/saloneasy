<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait SortableTrait
{
    public function scopeSorting(Builder $query, array $sorting)
    {
        foreach ($sorting as $sort) {
            if ($this->isSortable($sort['id']) || $sort['id'] === 'id') {
                $query->orderBy($sort['id'], $sort['desc'] ? 'desc' : 'asc');
            }
        }
    }

    protected function isSortable(string $field): bool
    {
        return in_array($field, $this->getFillable());
    }
}
