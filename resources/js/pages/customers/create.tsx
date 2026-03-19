import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import nav from '@/routes/customers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { showAlert } from '@/components/ui/sweet-alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: nav.index(),
    },
    {
        title: 'Add Customer',
        href: nav.create(),
    },
];

export default function AddCustomer() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        contact: '',
        address: '',
    });

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        // console.log(data);
        post('/customers', {
            onSuccess: () => {
                showAlert({
                    message: 'New customer added successfully!',
                    type: 'success'
                })
                
            },
            onError: () => {
                showAlert({
                    message: 'Unable to add customer info.',
                    type: 'info'
                })
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Customer" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='flex items-center justify-end'>
                    <Button disabled={processing} onClick={handleSubmit} variant='default'>
                        {processing 
                            ? <div className='flex items-center gap-2'><Spinner /> Adding...</div>
                            : 'Add Customer'
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
                            <Label htmlFor='contact'>Contact</Label>
                            <Input value={data.contact} id='contact' name='contact' placeholder='123-456-7890' onChange={(e) => setData('contact', e.target.value)} />
                            <InputError message={errors.contact} />
                        </div>
                        <div>
                            <Label htmlFor='address'>Address</Label>
                            <Input value={data.address} id='address' name='address' placeholder='123 Main St, City, Country' onChange={(e) => setData('address', e.target.value)} />
                            <InputError message={errors.address} />
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
