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
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import SearchProduct from 'react-select'

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

export default function AddTransaction({products}: {products: any}) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        date: '',
        payment_amount: '',
        total_amount: '',
        items: {
            product_id: '',
            qty: '',
            price: '',
        },
        change: '',

    });

    const [items, setItems] = useState<any[]>([])
    const [selected, setSelected] = useState('')
    const [qty, setQty] = useState(0)

    const handleAddProduct = () => {
        const existing = items.find(i => i.product_id === selected)

        if (existing) {
            setItems(items.map(i =>
            i.product_id === product.value
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ))
        } else {
            setItems([
            ...items,
            {
                product_id: product.value,
                name: product.name,
                price: product.price,
                quantity: 1,
            }
            ])
        }
    }

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        post('/sales', {
            onSuccess: () => {
                showAlert({
                    message: 'New transaction saved successfully!',
                    type: 'success'
                })
                
            },
            onError: () => {
                showAlert({
                    message: 'Unable to savee transaction info.',
                    type: 'info'
                })
            }
        });
    };

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            setCurrentDate(now.toLocaleString());
        };

        updateDate();
        const interval = setInterval(updateDate, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Transaction" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='flex items-center justify-end'>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-900 rounded-lg'>
                            <Clock /> Date Time: {currentDate}
                        </div>
                        <div className='flex item-center justify-end'>
                            <Button disabled={processing} onClick={handleSubmit} variant='default'>
                                {processing 
                                    ? <div className='flex items-center gap-2'><Spinner /> Saving...</div>
                                    : 'Save Transaction'
                                } 
                            </Button>
                        </div>
                        
                    </div>
                    
                </div>
                <form>
                    <div className='flex items-center gap-2'>
                        <Label htmlFor='name'>Name</Label>
                        <div>
                            <Input value={data.name} id='name' name='name' placeholder='John Doe' onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='search'>Search Items (Serial Number/Item Name)</Label>
                        <SearchProduct
                        options={products}
                        onChange={(e) => setSelected(e.target.value)}
                        isOptionDisabled={(options) => options.isDisabled}
                        unstyled
                        formatOptionLabel={(option: any) => (
                            <div className="flex items-center justify-between w-full">
                            
                            {/* LEFT: ID + Name */}
                            <div className="flex gap-2">
                                <span className="text-xs text-gray-400">
                                [{option.id_label}]
                                </span>
                                <span className="text-sm">
                                {option.name}
                                </span>
                            </div>

                            {/* RIGHT: Stock Status */}
                            {option.stock <= 0 && (
                                <span className="text-xs text-red-500">
                                Out of Stock
                                </span>
                            )}
                            </div>
                        )}
                        classNames={{
                            control: () =>
                            "border rounded-md px-2 py-1 bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700",

                            menu: () =>
                            "mt-1 rounded-md border bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 shadow-lg",

                            option: ({ isFocused, isSelected }) =>
                            `px-2 py-1 cursor-pointer ${
                                isSelected
                                ? "bg-blue-500 text-white"
                                : isFocused
                                ? "bg-gray-100 dark:bg-neutral-800"
                                : "text-black dark:text-white"
                            }`,

                            input: () => "text-black dark:text-white",

                            singleValue: () => "text-black dark:text-white",

                            placeholder: () => "text-gray-400",

                            dropdownIndicator: () =>
                            "text-gray-500 dark:text-gray-400",

                            clearIndicator: () =>
                            "text-gray-500 dark:text-gray-400",
                        }}
                        />
                        <Input onChange={(e) => setQty(Number(e.target.value))} type='number' placeholder='Qty' />
                        <Button onClick={handleAddProduct}>Add</Button>
                    </div>
                    <div className='p-4'>
                        <table className="w-full border-collapse border border-gray-300 dark:border-neutral-700">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-neutral-800">
                                    <th className="border border-gray-300 dark:border-neutral-700 px-4 py-2 text-left">Item Name</th>
                                    <th className="border border-gray-300 dark:border-neutral-700 px-4 py-2 text-left">Qty</th>
                                    <th className="border border-gray-300 dark:border-neutral-700 px-4 py-2 text-left">Cost</th>
                                    <th className="border border-gray-300 dark:border-neutral-700 px-4 py-2 text-left">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 dark:border-neutral-700 px-4 py-2">{item.name}</td>
                                        <td className="border border-gray-300 dark:border-neutral-700 px-4 py-2">{item.qty}</td>
                                        <td className="border border-gray-300 dark:border-neutral-700 px-4 py-2">{item.cost}</td>
                                        <td className="border border-gray-300 dark:border-neutral-700 px-4 py-2">{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
