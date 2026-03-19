import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import nav from '@/routes/products';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { columns } from "./columns";

export default function Products({products}: {products: any[]}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: nav.index(),
        },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                <div className='flex items-center justify-end'>
                    <Button onClick={(e) => router.get(nav.create())} variant='default'>Add Product</Button>
                </div>

                <DataTable
                    columns={columns}
                    data={products}
                />
               
            </div>
        </AppLayout>
    );
}
