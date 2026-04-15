<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    /**
     * Register User
     */
    public function register(array $data): array
    {
        $loginInput = trim($data['login']);

        // Detect email or phone
        $isEmail = filter_var($loginInput, FILTER_VALIDATE_EMAIL);

        $user = User::create([
            'name' => $data['fullname'],
            'email' => $isEmail ? $loginInput : null,
            'phone' => !$isEmail ? $loginInput : null,
            'password' => Hash::make($data['password']),
            'role' => 'customer', // default role
        ]);

        // Generate JWT Token
        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    /**
     * Login User
     */
    public function login(array $data): ?array
    {
        $loginInput = trim($data['login']);

        // Detect login field
        $field = filter_var($loginInput, FILTER_VALIDATE_EMAIL)
            ? 'email'
            : 'phone';

        $credentials = [
            $field => $loginInput,
            'password' => $data['password'],
        ];

        // Attempt login (JWT)
        if (!$token = auth('api')->attempt($credentials)) {
            return null;
        }

        return [
            'user' => auth('api')->user(),
            'token' => $token,
        ];
    }

    /**
     * Logout User
     */
    public function logout(): void
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    /**
     * Get Authenticated User
     */
    public function me()
    {
        return auth('api')->user();
    }

    public function refresh()
    {
        $newToken = JWTAuth::parseToken()->refresh();

        return [
            'token' => $newToken,
            'user' => auth('api')->user()
        ];
    }
}