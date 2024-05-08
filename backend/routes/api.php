<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
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
    Route::put('/update', 'update');
    Route::get('/logout', 'logout');
});

Route::get('category/get/{id}', [CategoryController::class, 'get']);
Route::prefix('category')->middleware(['auth:sanctum'])->controller(CategoryController::class)->group(function () {
    Route::post('/create', 'create');
    Route::delete('/delete/{id}', 'delete');
});

Route::get('post/get/{id}', [PostController::class, 'get']);
Route::prefix('post')->middleware(['auth:sanctum'])->controller(PostController::class)->group(function () {
    Route::post('/create', 'create');
    Route::put('/update/{id}', 'update');
    Route::get('/my', 'my');
    Route::delete('/delete/{id}', 'delete');
});
