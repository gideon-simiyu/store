<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\Category;

Route::get("/", function () {
    $categories = Category::all();
    $products = Product::all()->sortByDesc("rating")->take(4);
    foreach ($categories as $category) {
        $category->products = $category->products->take(3);
    }
    return Inertia::render("Home", [
        "canLogin" => Route::has("login"),
        "canRegister" => Route::has("register"),
        "categories" => $categories,
        "products" => $products,
    ]);
})->name("home");

Route::get("/shop", function () {
    $categories = Category::all();
    $product_types = ProductType::all();
    $products = Product::all();

    return Inertia::render("Shop", [
        "canLogin" => Route::has("login"),
        "canRegister" => Route::has("register"),
        "products" => $products,
        "categories" => $categories,
        "product_types" => $product_types,
    ]);
})->name("shop");

Route::post("/shop", [ProductController::class, "filter"])->name(
    "products.filter"
);

Route::get("/dashboard", function () {
    return Inertia::render("Admin/Dashboard");
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
    Route::get("/product/{id}/view", [ProductController::class, "view"])->name(
        "products.view"
    );
    Route::delete("/product/{id}/delete", [
        ProductController::class,
        "destroy",
    ])->name("products.delete");
});

Route::middleware("auth")->group(function () {
    Route::get("/categories", [CategoryController::class, "index"])->name(
        "categories"
    );
    Route::get("/category/{id}/view", [
        CategoryController::class,
        "view",
    ])->name("categories.view");
    Route::post("/category/create", [CategoryController::class, "store"])->name(
        "categories.create"
    );
    Route::patch("/category/update", [
        CategoryController::class,
        "update",
    ])->name("categories.update");
    Route::delete("/category/delete", [
        CategoryController::class,
        "destroy",
    ])->name("categories.destroy");
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

Route::middleware("auth")->group(function () {
    Route::get("/cart", [CartController::class, "index"])->name("cart");
    Route::post("/cart/add", [CartController::class, "store"])->name(
        "cart.add"
    );
    Route::post("/cart/update", [CartController::class, "update"])->name(
        "cart.update"
    );
    Route::delete("/cart/delete", [CartController::class, "remove"])->name(
        "cart.remove"
    );
    Route::delete("/cart/clear", [CartController::class, "clear"])->name(
        "cart.clear"
    );
    Route::get("/cart/checkout", [CartController::class, "checkout"])->name(
        "cart.checkout"
    );
});

require __DIR__ . "/auth.php";
