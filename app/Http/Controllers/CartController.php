<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    public function index()
    {
        $cart = Auth::user()->cart;
        $products = $cart
            ? $cart
                ->products()
                ->with(["category", "product_type"])
                ->get()
            : [];
        $total = 0;
        foreach ($products as $product) {
            $total += $product->price * $product->pivot->quantity;
        }

        return Inertia::render("Cart", [
            "products" => $products,
            "total" => $total,
        ]);
    }

    public function store(Request $request)
    {
        $product = Product::findOrFail($request->product_id);
        $cart = Auth::user()->cart()->first();

        if (!$cart) {
            $cart = Cart::create(["user_id" => Auth::id()]);
        }
        //if product already in cart add quantity to eisting quantity
        if (
            $cart
                ->products()
                ->where("product_id", $product->id)
               ->where("size", $request->size)
                ->exists()
        ) {
            $cart->products()->updateExistingPivot($product->id, [
                "quantity" =>
                    $cart
                        ->products()
                        ->where("product_id", $product->id)
                        ->first()->pivot->quantity + $request->quantity,
            ]);
            return redirect()
                ->route("products.view", $product->id)
                ->with("success", "Product added to cart!");
        }
        $cart->products()->attach($product->id, [
            "quantity" => $request->quantity,
            "size" => $request->size,
        ]);

        return redirect()
            ->route("products.view", $product->id)
            ->with("success", "Product added to cart!");
    }

    public function remove(Request $request)
    {
        $product = Product::findOrFail($request->product_id);
        $cart = Auth::user()->cart;

        if ($cart) {
            $cart->products()->detach($product->id);
        }

        return redirect()
            ->route("cart")
            ->with("success", "Product removed from cart!");
    }

    public function update(Request $request)
    {
        print_r($request->all());
        $cart = Auth::user()->cart;
        $product = Product::findOrFail($request->product_id);

        if ($request->quantity <= 0) {
            $cart->products()->detach($product->id);
        } elseif ($cart) {
            $cart->products()->updateExistingPivot($product->id, [
                "quantity" => $request->quantity,
            ]);
        }

        return redirect()
            ->route("cart")
            ->with("success", "Cart updated successfully!");
    }

    public function clear()
    {
        $cart = Auth::user()->cart;

        if ($cart) {
            $cart->products()->detach();
        }

        return redirect()->route("cart")->with("success", "Cart cleared!");
    }
    
    public function checkout(): Response{
        return Inertia::render('Checkout');
    }
}
