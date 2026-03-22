import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import nav from '@/routes/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { showAlert } from '@/components/ui/sweet-alert';
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import Select from 'react-select'
import { ProductSelect } from '@/components/product-select';
import { GenericSelect } from '@/components/react-select';

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

export default function AddTransaction({customers, products}: {customers: any, products: any}) {
    const {data, setData, post, processing} = useForm({
        customer_id: null,
        total_amount: 0,
        items: {},
    });

    const [customer, setCustomer] = useState<any>(null)
    const [items, setItems] = useState<any[]>([])
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [qty, setQty] = useState(0)
    const [total, setTotal] = useState(0)
    const [subtotal, setSubTotal] = useState(0)
    const [vat, setVat] = useState(0)
    const [payment, setPayment] = useState(0)
    const [change, setChange] = useState(0)
    // const [discount, setDicount] = useState(0)

    const handleSelectedProduct = () => {
        if (!selectedProduct) return

        const quantity = qty > 0 ? qty : 1

        const newItem = {
            product_id: selectedProduct.id,
            name: selectedProduct.name,
            quantity: quantity,
            cost: selectedProduct.price,
            price: selectedProduct.price * quantity,
        };

        // protected $fillable = ['sale_id', 'product_id', 'quantity', 'price'];

        const existing = items.find(
            (i) => i.product_id === selectedProduct.id
        )

        if (existing) {
            setItems(
            items.map((i) =>
                i.product_id === selectedProduct.id
                ? { ...i,
                    quantity: i.quantity + quantity,
                    price: i.price + (selectedProduct.price * quantity) }
                : i
            )
            )
        } else {
            setItems([
            ...items,
            {
                product_id: selectedProduct.id,
                name: selectedProduct.name,
                cost: selectedProduct.price,
                price: selectedProduct.price * quantity,
                quantity: quantity,
            },
            ])
        }

        computeTotal(newItem.price)

        // // optional reset
        setQty(0)
        setSelectedProduct(null)
        console.log(newItem)
    }

    function computeTotal(price: number){
        const newTotal = total + price;
        const newVat = newTotal * 0.12;
        const newSubTotal = newTotal - newVat;

        setTotal(newTotal);
        setVat(newVat);
        setSubTotal(newSubTotal);
    }

    function computeChange(value: number){
        const newPayment = value;
        const newChange = value-total;
        setPayment(newPayment);
        setChange(newChange);
    }

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();



        setData({
            customer_id: customer.id,
            total_amount: total,
            items: items
        });

        post('/sales', {
            onSuccess: () => {
                showAlert({
                    message: 'New transaction saved successfully!',
                    type: 'success'
                })
                
            },
            onError: (err) => {
                console.log(err)
                showAlert({
                    message: 'Unable to save transaction info.',
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

                <div className='flex items-center gap-2'>
                    <Label htmlFor='name'>Name</Label>
                    <div className='w-full'>
                        <GenericSelect 
                            options={customers}
                            value={customer}
                            onChange={(option) => {
                                console.log(option)
                                setCustomer(option);
                            }}
                            placeholder='Select Customer'
                        />
                    </div>
                </div>

                <div className='my-4 bg-neutral-100 dark:bg-neutral-900 p-4 border rounded-xl'>
                    <Label htmlFor='search'>Search Items (Serial Number/Item Name)</Label>
                    <div className='mt-4 flex items-center gap-2 w-full'>
                        <div className='w-full'>
                            <ProductSelect 
                                options={products}
                                value={selectedProduct}
                                onChange={(option) => setSelectedProduct(option)}
                                placeholder="Select/Search Product"
                            />
                        </div>
                        <div>
                            <Input
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            type='number' placeholder='Qty' className='bg-white dark:bg-neutral-800' />
                        </div>
                        <div>
                            <Button
                            disabled={!selectedProduct}
                            type='button'
                            onClick={handleSelectedProduct}>
                                Add
                            </Button>
                        </div>    
                    </div>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='col-span-1 md:col-span-2 '>
                        <table className="w-full border-collapse border border-gray-300 dark:border-neutral-700 text-sm col">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-neutral-800">
                                    <th className="border border-gray-300 dark:border-neutral-700 px-4 py-2 text-left">Item Name</th>
                                    <th className="border border-gray-300 dark:border-neutral-700 px-4 py-2 text-left">Qty</th>
                                    <th className="border border-gray-300 dark:border-neutral-700 px-4 py-2 text-left">Cost</th>
                                    <th className="border border-gray-300 dark:border-neutral-700 px-4 py-2 text-left">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.product_id}>
                                        <td className="border border-gray-300 dark:border-neutral-700 px-4 py-2">{item.name}</td>
                                        <td className="border border-gray-300 dark:border-neutral-700 px-4 py-2">{item.quantity}</td>
                                        <td className="border border-gray-300 dark:border-neutral-700 px-4 py-2">{item.cost}</td>
                                        <td className="border border-gray-300 dark:border-neutral-700 px-4 py-2">{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='col-span-1'>
                        <div className='p-2 bg-neutral-100 border text-sm rounded-lg'>
                            <div className='flex text-lg font-bold items-center justify-between'>
                                <div>Total:</div>
                                <div>{total.toFixed(2)}</div>
                            </div>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <div>Subtotal:</div>
                                    <div>{subtotal.toFixed(2)}</div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div>Vat (12%):</div>
                                    <div>{vat.toFixed(2)}</div>
                                </div>
                                {/* <div className='flex items-center justify-between'>
                                    <div>Discount:</div>
                                    <div>{discount.toFixed(2)}</div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div>Discount Type:</div>
                                    <div>--</div>
                                </div> */}
                            </div>
                            
                        </div>
                        <div className='mt-2 p-2 text-sm space-y-4 bg-neutral-100 border rounded-lg'>
                            <div className='flex text-lg font-bold items-center justify-between'>
                                <div>Payment:</div>
                                <div>
                                    <Input
                                        type='number' placeholder='Payment' className='bg-white dark:bg-neutral-800'
                                        onChange={(e) => computeChange(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <div>Change:</div>
                                    <div>{change.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='mt-2 p-2 text-sm gap-2'>
                            <button className='bg-neutral-100 p-2' type="button">PWD 12%</button>
                            <button className='bg-neutral-100 p-2' type="button">Senior Citizen 20%</button>
                        </div> */}
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}
