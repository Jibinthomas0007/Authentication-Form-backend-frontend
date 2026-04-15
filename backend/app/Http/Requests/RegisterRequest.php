<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use App\Models\User;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fullname' => 'required|string|max:100',
            'login' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {

                    $value = trim($value);

                    if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
                        if (User::where('email', $value)->exists()) {
                            $fail('This email is already registered.');
                        }
                        return;
                    }

                    if (preg_match('/^\+?[0-9]{10,15}$/', $value)) {
                        if (User::where('phone', $value)->exists()) {
                            $fail('This phone number is already registered.');
                        }
                        return;
                    }

                    $fail('Enter a valid email or phone number.');
                },
            ],
            'password' => [
                'required',
                'confirmed',
                Password::min(6)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ];
    }

    public function messages()
    {
        return [

            'fullname.required' => 'Full name is required',

            'login.required' => 'Email or phone is required',

            'password.required' => 'Password is required',
            'password' => 'Password must contain at least one uppercase letter, one number, and one special character (@, !, #)',
            'password.min' => 'Password must be at least 6 characters',
            'password.confirmed' => 'Passwords do not match',
        ];
    }
}
