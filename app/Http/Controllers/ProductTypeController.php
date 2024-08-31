<?php
namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Models\ProductType;

class ProductTypeController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
            "category_id" => "required|exists:categories,id",
        ]);

        ProductType::create($validatedData);

        return redirect()
            ->route("product_types")
            ->with("success", "Product type created successfully!");
    }

    public function update(Request $request, ProductType $productType)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
            "category_id" => "required|exists:categories,id",
        ]);

        $productType->update($validatedData);

        return redirect()
            ->route("product_types")
            ->with("success", "Product type updated successfully!");
    }

    public function destroy(ProductType $productType)
    {
        $productType->delete();

        return redirect()
            ->route("product_types")
            ->with("success", "Product type deleted successfully!");
    }

    public function index()
    {
        $categories = Category::all();
        $productTypes = ProductType::with("category")->get();

        return Inertia::render("Product/Types", [
            "productTypes" => $productTypes,
            "categories" => $categories,
        ]);
    }
}
