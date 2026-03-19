<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SaleController;

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('products', ProductController::class);
    Route::resource('customers', CustomerController::class);
    Route::resource('sales', SaleController::class);

    // Route::get('products', [ProductController::class, 'index'])->name('products.index');
    // Route::post('products', [ProductController::class, 'store'])->name('products.store');
    // Route::get('customers', [CustomerController::class, 'index'])->name('customers.index');
    // Route::post('customers', [CustomerController::class, 'store'])->name('customers.store');
    // Route::get('sales', [SaleController::class, 'index'])->name('sales.index');
    // Route::post('sales', [SaleController::class, 'store'])->name('sales.store');
});
