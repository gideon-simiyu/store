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
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
        ]);

        Category::create($validatedData);

        return redirect()
            ->route("categories")
            ->with("success", "Category created successfully!");
    }

    public function update(Request $request)
    {
        $category = Category::find($request->id);
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string",
        ]);

        $category->update($validatedData);

        return redirect()
            ->route("categories.view", $category->id)
            ->with("success", "Category updated successfully!");
    }

    public function destroy(Request $request)
    {
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        $category = Category::find($request->id);
        $category->delete();

        return redirect()
            ->route("categories")
            ->with("success", "Category deleted successfully!");
    }

    public function index(Request $request)
    {
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }

        $categories = Category::all();

        return Inertia::render("Admin/Category/List", [
            "categories" => $categories,
        ]);
    }

    public function view($id)
    {
        $category = Category::find($id);
        return Inertia::render("Admin/Category/View", [
            "category" => $category,
        ]);
    }
}
