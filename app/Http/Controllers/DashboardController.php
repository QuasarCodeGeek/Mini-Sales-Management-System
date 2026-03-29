<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Sale;
use App\Models\Customer;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'totalProducts'  => Product::count(),
            'totalCustomers' => Customer::count(),
            'totalSales'     => Sale::count(),
            'totalRevenue'   => Sale::sum('total_amount'),
            'recentSales'    => Sale::with('customer')  // ✅ idagdag ito
                                    ->latest()
                                    ->take(10)
                                    ->get()
                                    ->map(fn($sale) => [
                                        'id'            => $sale->id,
                                        'customer_name' => $sale->customer->name ?? 'N/A',
                                        'total_amount'  => $sale->total_amount,
                                        'created_at'    => $sale->created_at,
                                    ]),
        ]);
    }
}
