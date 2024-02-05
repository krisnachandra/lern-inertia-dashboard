<?php

use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UnitController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profiles', [ProfileController::class, 'index'])->name('profiles.index');
    Route::get('/profile/create', [ProfileController::class, 'create'])->name('profile.create');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/positions', [PositionController::class, 'index'])->middleware(['auth'])->name('positions.index');
Route::get('/positions/create', [PositionController::class, 'create'])->name('positions.create');
Route::post('/positions', [PositionController::class, 'store'])->name('positions.store');
Route::get('/positions/edit/{id}', [PositionController::class, 'edit'])->name('positions.edit');
Route::post('/positions/update/{id}', [PositionController::class, 'update'])->name('positions.update');
Route::delete('/positions/delete/{id}', [PositionController::class, 'destroy'])->name('positions.destroy');


Route::get('/units', [UnitController::class, 'index'])->middleware(['auth'])->name('units.index');
Route::get('/units/create', [UnitController::class, 'create'])->name('units.create');
Route::post('/units', [UnitController::class, 'store'])->name('units.store');
Route::get('/units/edit/{id}', [UnitController::class, 'edit'])->name('units.edit');
Route::post('/units/update/{id}', [UnitController::class, 'update'])->name('units.update');
Route::delete('/units/delete/{id}', [UnitController::class, 'destroy'])->name('units.destroy');

require __DIR__ . '/auth.php';
