<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;

class AuthController extends Controller
{
    use ApiResponse;

    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $data = $this->authService->register($request->validated());

        return $this->success($data, 'User registered successfully', 201);
    }

    public function login(LoginRequest $request)
    {
        try {
            $data = $this->authService->login($request->validated());

            if (!$data) {
                return $this->error('Invalid credentials', 401);
            }

            return $this->success($data, 'Login successful');

        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 500);
        }
    }

    public function me()
    {
        return $this->success($this->authService->me());
    }

    public function logout()
    {
        $this->authService->logout();

        return $this->success(null, 'Logged out successfully');
    }

    public function refresh()
    {
        return $this->success($this->authService->refresh(), 'Token refreshed');
    }
}