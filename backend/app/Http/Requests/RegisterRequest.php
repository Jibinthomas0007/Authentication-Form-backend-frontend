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
        'fullname' => [
            'required',
            'string',
            'min:3',
            'max:100',
            'regex:/^[a-zA-Z\s]+$/'
        ],

        'login' => ['required', new LoginRule(true)], // ✅ reuse rule

        'password' => [
            'required',
            'confirmed',
            Password::min(8)
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
        'fullname.regex' => 'Only letters are allowed',

        'password.required' => 'Password is required',
        'password.confirmed' => 'Passwords do not match',
    ];
}
}
