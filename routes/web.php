<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Request routes
Route::resource('request', 'RequestController');

<<<<<<< HEAD
Route::get('/hola', function () {
    return "<h1> hola que tal </h1>";
});
=======
Hola que tal!

asdasdasd
asdasdasddas
>>>>>>> 36af6c7b0416d5a396ec1169a4c60b33a9fa360c
