<?php

namespace App\Bookings;

use App\Models\User;
use Carbon\Carbon;

class Slot
{

    public User $employee;
    public function __construct(
        public Carbon $time
    )
    {
    }

    public function addEmployee(User $employee)
    {
        $this->employee = $employee;
    }

    public function hasEmployees()
    {
        return isset($this->employee);
    }
}
