import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import nav from '@/routes/customers';
import { DataTable } from "@/components/data-table";
import { Button } from '@/components/ui/button';
import { columns } from "./columns";

export default function Customers({customers}: {customers: any}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Customers',
            href: nav.index(),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                <div className='flex items-center justify-end'>
                    <Button onClick={(e) => router.get(nav.create())} variant='default'>Add Customer</Button>
                </div>

                <DataTable
                    columns={columns}
                    data={customers}
                />

            </div>
        </AppLayout>
    );
}
