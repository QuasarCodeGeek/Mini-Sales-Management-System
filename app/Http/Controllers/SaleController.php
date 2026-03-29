<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with(['customer'])->latest()->get();
        return Inertia::render('sales/index', ['sales' => $sales]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all()->map(function ($p) {
            return [
                'id' => $p->id,
                'price' => $p->price,
                'name' => $p->name,
                'stock' => $p->stock,
                'sku' => $p->sku,
                'isDisabled' => $p->stock <= 0,
            ];
        });

        $customers = Customer::select('id', 'name')->get();
        
        return Inertia::render('sales/create', [
            'products' => $products,
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'total_amount' => 'required|numeric',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
        ]);

        $products = Product::whereIn('id', collect($request->items)->pluck('product_id'))->get()->keyBy('id');

        $total = 0;
        foreach ($request->items as $item) {
            $product = $products[$item['product_id']];
            $total += $product->price * $item['quantity'];
        };

        $sale = Sale::create([
            'customer_id' => $request->customer_id,
            'total_amount' => $request->total_amount
        ]);

        $saleItems = [];
        foreach ($request->items as $item) {
            $product = $products[$item['product_id']];
            $saleItems[] = [
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ];
        };

        $sale->items()->createMany($saleItems);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
