<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Profile\ProfileRequest;
use App\Http\Resources\Dashboard\Profile\ProfileResource;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function __construct(
        private readonly ProfileService $service
    ){}

    public function index()
    {
        $user = auth()->user();
        return Inertia::render('Dashboard/Profile/Screens/Index', [
            'user' => new ProfileResource($user)
        ]);
    }

    public function update(ProfileRequest $request)
    {
        $data = $request->validated();

        $this->service->update($data);

        return redirect()->route('profile.index')->toast('Perfil atualizado com sucesso!');
    }

    public function updatePassword(Request $request)
    {
        $data = $request->validate([
            'old_password' => 'required|current_password',
            'password' => 'required|confirmed|min:8',
        ]);


        $this->service->updatePassword($data);

        return redirect()->route('profile.index')->toast('Senha atualizada com sucesso!');
    }

    public function destroy()
    {
        $user = auth()->user();
        $user->delete();
        auth()->logout();

        return redirect()->route('home')->toast('Conta deletada com sucesso!');
    }
}
