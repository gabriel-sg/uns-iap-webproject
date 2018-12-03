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

Route::get('publications/photos/{id}','PublicationController@getPhotos');

Route::get('publications/libros','PublicationController@getLibros');

Route::get('publications/apuntes','PublicationController@getApuntes');

Route::get('publications/materiales','PublicationController@getMateriales');

Route::resource('departments', 'DepartmentController');

Route::resource('users', 'UsersController');

Route::get('searchRequests/{search}','SearchController@searchRequests');

Route::get('searchPublications/{search}','SearchController@searchPublications');

Route::get('users/getRequests/{id}','UsersController@getRequests');

Route::get('users/getPublications/{id}','UsersController@getPublications');

Route::post('users/login','UsersController@login');

Route::put('users/logout/{id}','UsersController@logout');

Route::post('test','TestController@image');

Route::post('photos/upload','PhotoController@image');

Route::delete('photos/{id}','PhotoController@removePhoto');
