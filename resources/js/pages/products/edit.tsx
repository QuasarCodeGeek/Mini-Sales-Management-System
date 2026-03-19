import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import nav from '@/routes/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { showAlert } from '@/components/ui/sweet-alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: nav.index(),
    },
    {
        title: 'Add Product',
        href: nav.create(),
    },
];

export default function EditProduct({product}: {product: any}) {

    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        sku: product.sku || '',
        price: product.price || '',
        stock: product.stock || '',
    });

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        put('/products/' + product.id, {
            onSuccess: () => {
                showAlert({
                    message: 'Product info updated successfully!',
                    type: 'success'
                })
            },
            onError: () => {
                showAlert({
                    message: 'Unable to update product info.',
                    type: 'info'
                })
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Product" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='flex items-center justify-end'>
                    <Button disabled={processing} onClick={handleSubmit} variant='default'>
                        {processing 
                            ? <div className='flex items-center gap-2'><Spinner /> Updating...</div>
                            : 'Update Product'
                        } 
                    </Button>
                </div>
                <div>
                    <form className='grid gap-4 md:grid-cols-2'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input value={data.name} id='name' name='name' placeholder='John Doe' onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='sku'>Stock Keeping Unit (SKU)</Label>
                            <Input value={data.sku} id='sku' name='sku' placeholder='ABC123' onChange={(e) => setData('sku', e.target.value)} />
                            <InputError message={errors.sku} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='price'>Price (Php)</Label>
                            <Input value={data.price} id='price' name='price' placeholder='12.50' onChange={(e) => setData('price', e.target.value)} />
                            <InputError message={errors.price} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='stock'>Stocks</Label>
                            <Input value={data.stock} id='stock' name='stock' placeholder='10' onChange={(e) => setData('stock', e.target.value)} />
                            <InputError message={errors.stock} />
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
