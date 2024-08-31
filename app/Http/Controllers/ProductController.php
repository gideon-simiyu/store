<?php
namespace App\Http\Controllers;

use App\Models\Product;
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

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("store");
        $out->writeln($request->all());
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
            "price" => "required|numeric",
            "category_id" => "required|exists:categories,id",
            "product_type_id" => "required|exists:product_types,id",
            "image" => "nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048",
        ]);

        $out->writeln($validatedData);

        if ($request->hasFile("image")) {
            $imagePath = $request->file("image")->store("products", "public");
            $validatedData["image"] = $imagePath;
        }

        Product::create($validatedData);

        return redirect()
            ->route("products")
            ->with("success", "Product created successfully!");
    }

    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
            "price" => "required|numeric",
            "category_id" => "required|exists:categories,id",
            "product_type_id" => "required|exists:product_types,id",
            "image" => "nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048",
        ]);

        if ($request->hasFile("image")) {
            $imagePath = $request->file("image")->store("products", "public");
            $validatedData["image"] = $imagePath;
        }

        $product->update($validatedData);

        return redirect()
            ->route("products")
            ->with("success", "Product updated successfully!");
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()
            ->route("products")
            ->with("success", "Product deleted successfully!");
    }

    public function list()
    {
        $products = Product::with(["category", "product_type"])->get();
        $categories = Category::all();
        $productTypes = ProductType::all();

        return Inertia::render("Product/List", [
            "products" => $products,
            "categories" => $categories,
            "productTypes" => $productTypes,
        ]);
    }

    public function view($id)
    {
        $product = Product::find($id);
        return Inertia::render("Product/View", [
            "product" => $product,
        ]);
    }
}
