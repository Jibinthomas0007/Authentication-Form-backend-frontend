<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class ApiExceptionHandler
{
    public static function handle(Throwable $e, Request $request)
    {
        if (!$request->is('api/*')) {
            return null; // let Laravel handle normal web routes
        }

        // 🔴 DB ERROR
        if ($e instanceof QueryException) {
            return response()->json([
                'status' => 'error',
                'message' => 'Database error. Please try again later.',
            ], 500);
        }

        // 🔴 AUTH ERROR
        if ($e instanceof AuthenticationException) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not logged in.',
            ], 401);
        }

        // 🔴 JWT ERRORS
        if ($e instanceof TokenExpiredException) {
            return response()->json([
                'status' => 'error',
                'message' => 'Session expired. Please login again.',
            ], 401);
        }

        if ($e instanceof TokenInvalidException) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid session.',
            ], 401);
        }

        if ($e instanceof JWTException) {
            return response()->json([
                'status' => 'error',
                'message' => 'Authentication failed.',
            ], 401);
        }

        // 🔴 VALIDATION ERROR
        if ($e instanceof ValidationException) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        // 🔴 DEFAULT
        return response()->json([
            'status' => 'error',
            'message' => app()->isLocal()
                ? $e->getMessage()
                : 'Something went wrong. Please try again later.',
        ], 500);
    }
}