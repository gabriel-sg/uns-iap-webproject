<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\RequestModel;
use App\Publication;
use Socialite;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::get();
        echo json_encode($users);
    }

    public function show($id)
    {
        $user = User::where('id',$id)->get();
        echo json_encode($user);
    }

    public function login(Request $request)
    {
        $validateData = $request->validate([
            'id' => 'required',
            //'id_token' => 'required',
        ]);

        //$id_token = $request->input('id_token');
        $id=$request->input('id');
        // $client = new \Google_Client(['client_id' => '1098324426333-gog6d9e0qcnog9i5lbicu1sokj6b5ah2.apps.googleusercontent.com']);
        // $payload = $client->verifyIdToken($id_token);
        //$payload = Socialite::driver('google')->userFromToken($id_token);
        $user=User::find($id);
        if(!$user)
        {
            $newuser = new User();
            $newuser->id=$id;
            $newuser->fullname=$request->input('name');
            $newuser->email=$request->input('email');
            $newuser->urlImage=$request->input('image');

            $newuser->save();
            //echo json_encode($user);
            return $newuser;
        }
        else
        {
            //echo json_encode($user);
            return $user;
        }
        /*if ($user)
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
            //Error de token, no se que habria que poner en este caso
        }*/
    }

    public function update(Request $request, $id)
    {
        //Dejo la validacion momentaneamente porque no se si se valida tanto en el
        // front como en el back end
        $validateData = $request->validate([
            'fullname' => 'required|max:140',
            'phone' => 'required',
            'career' => 'required',
            'department' => 'required'
        ]);

        $user = User::find($id);

        $user->fullname = $request->input('fullname');
        $user->phone = $request->input('phone');
        //$department = Department::where('name',$request->input('department'))->first();
        //$user->department_id = $department->id;
        $user->department = $request->input('department');
        $user->career = $request->input('career');

        $user->save();
        echo json_encode($user);
    }

    public function getPublications($id)
    {
        $publications = Publication::where('user_id',$id)->get();
        echo json_encode($publications);
    }

    public function getRequests($id)
    {
        $requests = RequestModel::where('user_id',$id)->get();
        echo json_encode($requests);
    }
}
