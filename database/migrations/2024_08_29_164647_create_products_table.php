<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("products", function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("category_id");
            $table->unsignedBigInteger("product_type_id");
            $table->string("name");
            $table->text("description")->nullable();
            $table->decimal("price", 8, 2);
            $table->decimal('discount', 5, 2)->default(0);
            $table->string("image")->nullable(); // Image field
            $table->integer("rating")->default(0);
            $table->timestamps();

            // Foreign keys
            $table
                ->foreign("category_id")
                ->references("id")
                ->on("categories")
                ->onDelete("cascade");
            $table
                ->foreign("product_type_id")
                ->references("id")
                ->on("product_types")
                ->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("products");
    }
};
