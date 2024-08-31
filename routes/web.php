<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;

Route::get("/", function () {
    $products = Product::all();
    return Inertia::render("Home", [
        "canLogin" => Route::has("login"),
        "canRegister" => Route::has("register"),
        "products" => $products,
    ]);
})->name("home");

Route::get("/dashboard", function () {
    return Inertia::render("Dashboard");
})
    ->middleware(["auth", "verified"])
    ->name("dashboard");

Route::middleware("auth")->group(function () {
    Route::get("/profile", [ProfileController::class, "edit"])->name(
        "profile.edit"
    );
    Route::patch("/profile", [ProfileController::class, "update"])->name(
        "profile.update"
    );
    Route::delete("/profile", [ProfileController::class, "destroy"])->name(
        "profile.destroy"
    );
});

Route::middleware("auth")->group(function () {
    Route::get("/products", [ProductController::class, "list"])->name(
        "products"
    );
    Route::post("/product/create", [ProductController::class, "store"])->name(
        "products.create"
    );
    Route::patch("/product/{id}/update", [
        ProductController::class,
        "update",
    ])->name("products.update");
    Route::get("/product/{id}/view", [
        ProductController::class,
        "view",
    ])->name("products.view");
    Route::delete("/product/{id}/delete", [
        ProductController::class,
        "destroy",
    ])->name("products.delete");
});

Route::middleware("auth")->group(function () {
    Route::get("/categories", [CategoryController::class, "index"])->name(
        "categories"
    );
    Route::post("/category/create", [CategoryController::class, "store"])->name(
        "categories.create"
    );
    Route::patch("/category/{id}/update", [
        CategoryController::class,
        "categories.update",
    ])->name("categories.view");
    Route::delete("/category/{id}/delete", [
        CategoryController::class,
        "destroy",
    ])->name("categories.delete");
});

Route::middleware("auth")->group(function () {
    Route::get("/product-types", [ProductTypeController::class, "index"])->name(
        "product_types"
    );
    Route::post("/product-type/create", [
        ProductTypeController::class,
        "store",
    ])->name("product_types.create");
    Route::patch("/product-type/{id}/update", [
        ProductTypeController::class,
        "product_types.update",
    ])->name("product-types.view");
    Route::delete("/product-type/{id}/delete", [
        ProductTypeController::class,
        "destroy",
    ])->name("product_types..delete");
});

require __DIR__ . "/auth.php";
