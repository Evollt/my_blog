<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function create(CategoryRequest $request): JsonResponse
    {
        $category = Category::create([
            'title' => $request->title,
            'description' => $request->description
        ]);

        return response()->json($category);
    }

    public function get($id): JsonResponse
    {
        $categories = [];
        switch ($id) {
            case 'all':
                $categories = Category::all();
                break;
            default:
                $categories = Category::find($id);
                break;
        }
        return response()->json($categories);
    }

    public function delete($id): JsonResponse
    {
        Category::find($id)->delete();

        return response()->json([
            'message' => 'Категория удалена'
        ]);
    }

}
