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
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string"
        ]);

        ProductType::create($validatedData);

        return redirect()
            ->route("product_types")
            ->with("success", "Product type created successfully!");
    }

    public function update(Request $request, ProductType $productType)
    {
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
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

    public function destroy(Request $request, ProductType $productType)
    {
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        $productType->delete();

        return redirect()
            ->route("product_types")
            ->with("success", "Product type deleted successfully!");
    }

    public function index(Request $request)
    {
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        $productTypes = ProductType::all();

        
        return Inertia::render("Admin/Type/List", [
            "product_types" => $productTypes,
        ]);
    }
}
