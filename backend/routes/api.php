<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Register
Route::post('/register', [UserController::class, 'register']);
// Login
Route::post('/login', [UserController::class, 'login']);

Route::prefix('user')->middleware(['auth:sanctum'])->controller(UserController::class)->group(function () {
    Route::get('/get', 'get');
    Route::get('/logout', 'logout');
});

Route::prefix('category')->middleware(['auth:sanctum'])->controller(CategoryController::class)->group(function () {
    Route::post('/create', 'create');
    Route::get('/get/{id}', 'get');
    Route::delete('/delete/{id}', 'delete');
});
