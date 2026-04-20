<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\User;

class LoginRule implements ValidationRule
{
    protected $checkUnique;

    public function __construct($checkUnique = false)
    {
        $this->checkUnique = $checkUnique;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = trim($value);

        $isEmail = filter_var($value, FILTER_VALIDATE_EMAIL);
        $isPhone = preg_match('/^\+?[0-9]{10,15}$/', $value);

        if (!$isEmail && !$isPhone) {
            $fail('Enter a valid email or phone number.');
            return;
        }

        if ($this->checkUnique) {
            if ($isEmail && User::where('email', $value)->exists()) {
                $fail('This email is already registered.');
            }

            if ($isPhone && User::where('phone', $value)->exists()) {
                $fail('This phone number is already registered.');
            }
        }
    }
}