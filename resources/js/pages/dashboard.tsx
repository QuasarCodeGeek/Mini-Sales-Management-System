import { Head } from '@inertiajs/react';
import { ShoppingCart, Users, Package, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface RecentSale {
    id: number;
    customer_name: string;
    total_amount: number;
    created_at: string;
}

interface DashboardProps {
    totalProducts: number;
    totalCustomers: number;
    totalSales: number;
    totalRevenue: number;
    recentSales?: RecentSale[];
}

const stats = (data: DashboardProps) => [
    {
        label: 'Total Products',
        value: data.totalProducts,
        icon: Package,
        color: 'text-blue-500',
        bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
        label: 'Total Customers',
        value: data.totalCustomers,
        icon: Users,
        color: 'text-green-500',
        bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
        label: 'Total Sales',
        value: data.totalSales,
        icon: ShoppingCart,
        color: 'text-orange-500',
        bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
        label: 'Total Revenue',
        value: `₱${Number(data.totalRevenue).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
        icon: TrendingUp,
        color: 'text-purple-500',
        bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
];

export default function Dashboard({ totalProducts, totalCustomers, totalSales, totalRevenue, recentSales= [] }: DashboardProps) {
    console.log()

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    {stats({ totalProducts, totalCustomers, totalSales, totalRevenue }).map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-neutral-900 p-4"
                        >
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">{stat.label}</p>
                                <p className="text-xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Transactions */}
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-neutral-900 p-4">
                    <h2 className="text-base font-semibold mb-4">Recent Transactions</h2>
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-neutral-100 dark:bg-neutral-800">
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Customer</th>
                                <th className="px-4 py-2 text-left font-semibold">Amount</th>
                                <th className="px-4 py-2 text-left font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSales.length ? (
                                recentSales.map((sale) => (
                                    <tr key={sale.id} className="border-t border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                                        <td className="px-4 py-2 text-neutral-500">#{sale.id}</td>
                                        <td className="px-4 py-2">{sale.customer_name}</td>
                                        <td className="px-4 py-2">₱{Number(sale.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                                        <td className="px-4 py-2 text-neutral-500">
                                            {new Date(sale.created_at).toLocaleDateString('en-PH', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-neutral-500">
                                        No transactions yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </AppLayout>
    );
}
