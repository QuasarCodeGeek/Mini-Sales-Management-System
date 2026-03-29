import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { showAlert } from '@/components/ui/sweet-alert';
import AppLayout from '@/layouts/app-layout';
import nav from '@/routes/customers';
import type { BreadcrumbItem } from '@/types';

export default function EditCustomer({customer}: {customer: any}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Customers',
            href: nav.index(),
        },
        {
            title: 'Edit Customer',
            href: nav.edit(customer.id),
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: customer.name || '',
        contact: customer.contact || '',
        address: customer.address || '',
    });

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        // console.log(data);
        put('/customers/' + customer.id, {
            onSuccess: () => {
                showAlert({
                    message: 'Customer info updated successfully!',
                    type: 'success'
                })
            },
            onError: () => {
                showAlert({
                    message: 'Unable to update customer info.',
                    type: 'info'
                })
            }
        });
    };
 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Customer" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='flex items-center justify-end'>
                    <Button disabled={processing} onClick={handleSubmit} variant='default'>
                        {processing 
                            ? <div className='flex items-center gap-2'><Spinner /> Updating...</div>
                            : 'Update Customer'
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
