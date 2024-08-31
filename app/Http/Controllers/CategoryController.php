<?php
namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
        ]);

        Category::create($validatedData);

        return redirect()
            ->route("categories")
            ->with("success", "Category created successfully!");
    }

    public function update(Request $request, Category $category)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
        ]);

        $category->update($validatedData);

        return redirect()
            ->route("categories")
            ->with("success", "Category updated successfully!");
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()
            ->route("categories")
            ->with("success", "Category deleted successfully!");
    }

    public function index()
    {
        $categories = Category::all();

        return Inertia::render("Product/Categories", [
            "categories" => $categories,
        ]);
    }
}
