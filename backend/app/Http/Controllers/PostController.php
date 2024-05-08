<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function create(PostRequest $request)
    {
        $post = Post::create([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => Auth::user()->id
        ]);

        return new PostResource($post);
    }

    public function get($id)
    {
        switch ($id) {
            case 'all':
                $posts = Post::all()->reverse();
                return PostResource::collection($posts);
            default:
                $post = Post::find($id);
                return new PostResource($post);
        }
    }

    public function my()
    {
        $user = Auth::user();

        return PostResource::collection($user->posts);
    }


    public function update(PostRequest $request, $id)
    {
        $post = Post::find($id);

        $post->title = $request->title;
        $post->description = $request->description;
        $post->category_id = $request->category_id;

        $post->save();

        return new PostResource($post);
    }

    public function delete($id): JsonResponse
    {
        Post::find($id)->delete();

        return response()->json([
            'message' => 'Пост удален'
        ]);
    }
}
