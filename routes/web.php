<?php

use App\Http\Controllers\API\ProfileController;
use Illuminate\Support\Facades\Route;

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
// Route::get('/', function () {
//     return view('customer');
// });


Route::get('/', function () {
    return view('welcome');
})->middleware(['verify.shopify'])->name('home');

// Route :: get('get-customer/{id}',[ProfileController::class, 'index']);