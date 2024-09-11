<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\ProductType;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
            "price" => "required|numeric",
            "discount" => "numeric",
            "category_id" => "required|exists:categories,id",
            "product_type_id" => "required|exists:product_types,id",
            "image" => "nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048",
        ]);

        if ($request->hasFile("image")) {
            $imagePath = $request->file("image")->store("products", "public");
            $validatedData["image"] = $imagePath;
        }

        Product::create($validatedData);

        return redirect()
            ->route("products")
            ->with("success", "Product created successfully!");
    }

    public function update(Request $request)
    {
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        
        $product = Product::find($request->product_id);
        
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
            "price" => "required|numeric",
            "discount" => "numeric",
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
            ->route("products.view", ["id" => $product->id])
            ->with("success", "Product updated successfully!");
    }

    public function destroy(Request $request, Product $product)
    {
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        $product->delete();

        return redirect()
            ->route("products")
            ->with("success", "Product deleted successfully!");
    }

    public function list(Request $request)
    {
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
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
        $product = Product::with(["category", "product_type"])->find($id);
        return Inertia::render("Product/View", [
            "product" => $product,
        ]);
    }

    public function filter(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        // $out->writeln("store");
        // $out->writeln($request->all());

        // Retrieve the selected category and product type IDs from the request
        $categoryIds = $request->input("category", []); // Defaults to an empty array if not provided
        $productTypeIds = $request->input("product_type", []); // Defaults to an empty array if not provided

        // Check if both arrays are empty, and return an empty products array if true
        if (empty($categoryIds) && empty($productTypeIds)) {
            $products = [];
        } else {
            // Filter products based on the given category and product type IDs
            $products = Product::with(["category", "product_type"])
                ->when(!empty($categoryIds), function ($query) use (
                    $categoryIds
                ) {
                    return $query->whereIn("category_id", $categoryIds);
                })
                ->when(!empty($productTypeIds), function ($query) use (
                    $productTypeIds
                ) {
                    return $query->whereIn("product_type_id", $productTypeIds);
                })
                ->get();
        }

        // Return an Inertia response with the filtered products
        return Inertia::render("Home", [
            "products" => $products,
            "categories" => Category::all(),
            "product_types" => ProductType::all(),
        ]);
    }
}
