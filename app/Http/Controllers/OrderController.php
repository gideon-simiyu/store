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
use App\Models\Order;


class OrderController extends Controller{
    public function index(): Response{
        $cart = Cart::where('user_id', Auth::id())->get();
        $total = 0;
        foreach ($cart as $item){
            $total += $item->product->price * $item->quantity;
        }
        return Inertia::render('Order', [
            'cart' => $cart,
            'total' => $total
        ]);
    }

    public function store(Request $request): RedirectResponse{
        $cart = Cart::where('user_id', Auth::id())->get();
        foreach ($cart as $item){
            $product = Product::find($item->product_id);
            $product->stock -= $item->quantity;
            $product->save();
            $item->delete();
        }
        return Redirect::route('order.index');
    }
    
    public function checkout(): Response{
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

        return Inertia::render("Checkout", [
            "products" => $products,
            "total" => $total,
        ]);
    }

    public function list(Request $request){
        if ($request->user()->is_staff != 1) {
            return Redirect::route("home");
        }
        $orders = Order::with(["user", "product"])->get();
        return Inertia::render('Admin/Order/List',
        [
            "orders" => $orders
        ]
    );
    }
}
