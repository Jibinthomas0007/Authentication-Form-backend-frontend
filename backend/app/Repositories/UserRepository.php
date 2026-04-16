<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function create(array $data)
    {
        return User::create($data);
    }

    public function findByLogin($login)
    {
        return User::where('email', $login)
            ->orWhere('phone', $login)
            ->first();
    }
}