<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('requests', 'RequestController');

Route::resource('publications', 'PublicationController');

Route::resource('departments', 'DepartmentController');

Route::resource('users', 'UsersController');

Route::get('searchRequests/{search}','SearchController@index');

Route::get('users/getRequests/{id}','UsersController@getRequests');

Route::get('users/getPublications/{id}','UsersController@getPublications');

Route::post('login','GoogleLoginController@login');