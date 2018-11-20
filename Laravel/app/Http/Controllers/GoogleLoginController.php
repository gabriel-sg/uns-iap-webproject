<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class GoogleLoginController extends Controller
{
    //
    public function login(Request $request)
    {
        $validateData = $request->validate([
            'id_token' => 'required',
        ]);

        $id_token = $request->input('id_token');
        $client = new Google_Client(['client_id' => '1098324426333-gog6d9e0qcnog9i5lbicu1sokj6b5ah2.apps.googleusercontent.com']);
        $payload = $client->verifyIdToken($id_token);
        if ($payload) 
        {
            $userid = $payload['sub'];
            $existing_user=User::find($userid);
            if(!$existing_user)
            {
                $user = new User();
                $user->id=$userid;
                $user->name=$payload['name'];
                $user->mail=$payload['email'];
                $user->department='-';
                $user->password='-';

                $user->save();
                echo json_encode($user);
            }
            else
            {
                echo json_encode($existing_user);
            }

        }
        else
        {
            /* Error de token, no se que habria que poner en este caso */
        }
    }
}
