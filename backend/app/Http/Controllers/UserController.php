<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // валидация
        $validateUser = Validator::make($request->all(), [
            'name' => 'required|min:2',
            'email' => 'email|required|unique:users,email',
            'password' => 'min:8|required'
        ]);

        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Ошибка валидации',
                'errors' => $validateUser->errors()
            ], 401);
        }

        // создание пользователя
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Пользователь успешно создан',
            'token' => $user->createToken('API TOKEN')->plainTextToken
        ], 200);
    }

    public function login(Request $request)
    {
        // валидация
        $validateUser = Validator::make($request->all(), [
            'email' => 'email|required',
            'password' => 'min:8|required'
        ]);

        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Ошибка валидации',
                'errors' => $validateUser->errors()
            ], 401);
        }
        // return $request;

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'status' => false,
                'message' => 'Пользователь с такой почтой или паролем не был найден',
            ], 401);
        }

        $user = User::where('email', $request->email)->first();

        return response()->json([
            'status' => true,
            'message' => 'Пользователь успешно вошел в систему',
            'token' => $user->createToken('API TOKEN')->plainTextToken
        ], 200);
    }

    public function get()
    {
        $user = Auth::user();

        return response()->json([
            'status' => true,
            'message' => 'Информация о пользователе',
            'data' => $user
        ], 200);
    }

    public function update(UserRequest $request)
    {
        $user = Auth::user();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->description = $request->description;

        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Данные о пользователе обновлены',
            'data' => $user
        ], 200);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Пользователь вышел из системы',
            'data' => []
        ], 200);
    }
}
