<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait FilterTrait
{
    public function scopeFilter(Builder $query, array $filters)
    {
        $fillable = $this->getFillable();
        $relations = array_keys($this->getRelations());

        // Remover a chave 'preserveState' do array de filtros, se existir
        if (isset($filters['preserveState'])) {
            unset($filters['preserveState']);
        }

        // Verificar se dentro do filters existe a chave status e converter ativo e inativo para boolean
        if (isset($filters['status'])) {
            $filters['is_active'] = $filters['status'] === 'Ativo' ? 1 : 0;
        }

        // Iterar sobre os filtros
        foreach ($filters as $key => $value) {
            // Verificar se o filtro é um campo do modelo
            if (in_array($key, $fillable)) {
                $query->where($key, $value);
            }

            // Verificar se o filtro é uma relação e o valor é um array (para aplicar a lógica de AND nas relações)
            if (in_array($key, $relations) && is_array($value)) {
                $query->whereHas($key, function ($q) use ($value) {
                    foreach ($value as $relationKey => $relationValue) {
                        $q->where($relationKey, $relationValue);
                    }
                });
            }

            // Caso o filtro seja uma pesquisa
            if ($key === 'search') {
                $query->where(function ($q) use ($value, $fillable) {
                    foreach ($fillable as $column) {
                        $q->orWhere($column, 'LIKE', '%' . $value . '%');
                    }
                });
            }
        }
    }
}
