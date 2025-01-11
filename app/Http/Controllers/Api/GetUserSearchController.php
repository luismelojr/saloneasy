<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetUserSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if ($request->search) {
            return response()->json(['clients' => \App\Models\Client::where('name', 'like', "%{$request->search}%")->get()]);
        }

        return response()->json(['clients' => \App\Models\Client::limit(10)->get()]);
    }
}
