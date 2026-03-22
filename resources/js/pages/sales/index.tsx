import { Head, router } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import nav from '@/routes/sales';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: nav.index(),
    },
];

export default function Sales({sales}: {sales: any[]}) {
    console.log(sales)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className='flex items-center justify-end'>
                    <Button onClick={(e) => router.get(nav.create())} variant='default'>Add Transaction</Button>
                </div>

                <DataTable
                    columns={columns}
                    data={sales}
                />        

            </div>
        </AppLayout>
    );
}
