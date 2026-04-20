<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    protected $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function register(array $data)
    {
        $loginInput = trim($data['login']);

        $isEmail = filter_var($loginInput, FILTER_VALIDATE_EMAIL);

        $user = $this->userRepo->create([
            'name' => $data['fullname'],
            'email' => $isEmail ? $loginInput : null,
            'phone' => !$isEmail ? $loginInput : null,
            'password' => Hash::make($data['password']),
            'role' => 'customer',
        ]);

        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

public function login(array $data)
{
    try {
        $loginInput = trim($data['login']);

        $field = filter_var($loginInput, FILTER_VALIDATE_EMAIL)
            ? 'email'
            : 'phone';

        $credentials = [
            $field => $loginInput,
            'password' => $data['password'],
        ];

        if (!$token = auth('api')->attempt($credentials)) {
            return null;
        }

        return [
            'token' => $token,
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user(),
        ];

    } catch (\Exception $e) {
        throw new \Exception('Server error. Please try again later.');
    }
}
    public function logout()
    {
        auth('api')->logout();
    }

    public function me()
    {
        return auth('api')->user();
    }

public function refresh()
{
    return [
        'token' => auth('api')->refresh(),
        'user' => auth('api')->user()
    ];
}
}