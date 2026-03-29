import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { showAlert } from '@/components/ui/sweet-alert';
import AppLayout from '@/layouts/app-layout';
import nav from '@/routes/products';
import type { BreadcrumbItem } from '@/types';

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

export default function AddProduct() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        sku: '',
        price: '',
        stock: '',
    });

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        // console.log(data);
        post('/products', {
            onSuccess: () => {
                showAlert({
                    message: 'New product added successfully!',
                    type: 'success'
                })
                
            },
            onError: () => {
                showAlert({
                    message: 'Unable to add product info.',
                    type: 'info'
                })
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Product" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='flex items-center justify-end'>
                    <Button disabled={processing} onClick={handleSubmit} variant='default'>
                        {processing 
                            ? <div className='flex items-center gap-2'><Spinner /> Adding...</div>
                            : 'Add Product'
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
                            <Label htmlFor='price'>Price (₱)</Label>
                            <Input type='number' value={data.price} id='price' name='price' placeholder='12.50' onChange={(e) => setData('price', e.target.value)} />
                            <InputError message={errors.price} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='stock'>Stocks</Label>
                            <Input type='number' value={data.stock} id='stock' name='stock' placeholder='10' onChange={(e) => setData('stock', e.target.value)} />
                            <InputError message={errors.stock} />
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
