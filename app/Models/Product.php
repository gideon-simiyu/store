<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "category_id",
        "product_type_id",
        "name",
        "description",
        "price",
        "image",
        "discount"
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function product_type()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function sizes()
    {
        return $this->hasMany(ProductSize::class);
    }

    public function carts(): BelongsToMany
    {
        return $this->belongsToMany(Cart::class)
            ->withPivot("quantity")
            ->withTimestamps();
    }
    
    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class)
            ->withPivot("quantity")
            ->withTimestamps();
    }
}
