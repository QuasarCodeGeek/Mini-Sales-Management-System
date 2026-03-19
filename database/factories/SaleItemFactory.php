<?php

namespace Database\Factories;

use App\Models\SaleItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SaleItem>
 */
class SaleItemFactory extends Factory
{
    protected $model = SaleItem::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'quantity' => $this->faker->numberBetween(1,5),
            'price' => function(array $attributes) {
                $product = Product::find($attributes['product_id']);
                return $product->price ?? 0;
            }
        ];
    }
}
