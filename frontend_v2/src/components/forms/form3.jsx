import React, { useState, useEffect } from 'react'


const Form3 = () => {
    const [name, setName] = useState('')

    useEffect(() => {
        fetch('/api/v1/userProfile')
            .then(res => res.json())
            .then(data => setName(data.user.name))
            .catch(err => console.error(err))
    }, []);

    const [pickupAddress, setPickupAddress] = useState('')
    const [pickupPincode, setPickupPincode] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [dname, setDname] = useState('')
    const [dropAddress, setDropAddress] = useState('')
    const [dropPincode, setDropPincode] = useState('')
    const [demail, setDEmail] = useState('')
    const [dmobile, setDMobile] = useState('')
    const [deliveryType, setDeliveryType] = useState('')
    const [weight, setWeight] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [payment, setPayment] = useState('')
    const [shipping, setShipping] = useState(0)
    //const [gst, setGst] = useState('')
    const [insurance, setInsurance] = useState('')
    //const [total, setTotal] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/v1/createDelivery', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                deliveryMode: deliveryType,
                packageWeight: weight,
                pickupLocation: pickupAddress + " Pincode: " + pickupPincode,
                dropLocation: dropAddress + " Pincode: " + dropPincode,
                totalPrice: total,
                deliveryPrice: shipping,
                gst: gst,
                insurance: insurance,
                paymentMode: payment,
                pickupMob: mobile,
                dateTime: date + " " + time,
                receiverName: dname,
                receiverMob: dmobile
            })
        })
            .then(() => {
                setDEmail("");
                setDMobile("");
                setDate("");
                setDeliveryType("")
                setDname("")
                setDropAddress("")
                setDropPincode("")
                setEmail("")
                setMobile("")
                //setName("")
                setPickupAddress("")
                setPickupPincode("")
                setTime("")
                setWeight("")
                //setGst("")
                setInsurance("")
                //setTotal("")
            }).then(res => res.json())
            .then((data) => console.log(data))
            .catch(err => console.error(err))
    }

    // const fetchGeoData = async () => {
    //     try {
    //         const response = await fetch(`https://place-autocomplete1.p.rapidapi.com/autocomplete/json?input=${pickupAddress}&radius=200`, {
    //             method: 'GET',
    //             headers: {
    //                 'X-RapidAPI-Key': 'ca2c4e5d2emshfa30dae8ab6e530p134430jsn422ccf017300',
    //                 'X-RapidAPI-Host': 'place-autocomplete1.p.rapidapi.com'
    //             }
    //         })
    //         const result = await response.text();
    //         console.log(result);
    //     }
    //     catch(e){
    //         console.error(e)
    //     }
    // };

    const shippingCost = () => {
        if (deliveryType === 'Within City') {            
            if (weight === 'Upto 1Kg') {
                setShipping(70);
            } else if (weight === 'Upto 5Kg') {
                setShipping(130);
            } else if (weight === 'Upto 10kg') {
                setShipping(210);
            } else if (weight === 'Upto 15Kg') {
                setShipping(280);
            } else if (weight === 'Upto 20Kg') {
                setShipping(380);
            } else {
                setShipping(500);
            }
        }
        else if (deliveryType === 'Intercity') {            
            if (weight === 'Upto 1Kg') {
                setShipping(100);
            } else if (weight === 'Upto 5Kg') {
                setShipping(180);
            } else if (weight === 'Upto 10kg') {
                setShipping(270);
            } else if (weight === 'Upto 15Kg') {
                setShipping(350);
            } else if (weight === 'Upto 20Kg') {
                setShipping(500);
            } else {
                setShipping(700);
            }
        }
    }

    useEffect(()=>{
        shippingCost();        
    },[weight])
    let gst = (shipping*0.18); 
    let total = shipping+gst+15;
    
    return (
        <>
            <div className='min-h-screen p-6 flex items-center justify-center'>
                <div className='container max-w-screen-lg mx-auto'>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='bg-white rounded shadow-xl p-4 px-4 md:p-8 mb-6'>
                                <div className='grid gap-4 gap-y-2 text-md grid-cols-1 lg:grid-cols-3'>
                                    <div className='text-stone-700 space-y-2 mt-1'>
                                        <p className='font-medium text-lg'>Pickup Details</p>
                                        <p></p>
                                    </div>
                                    <div className='lg:col-span-2 '>
                                        <div className='grid gap-4 gap-y-2 text-md grid-cols-1 md:grid-cols-5 space-y-2'>
                                            <div className='md:col-span-5 text-zinc-600'>
                                                <label>Full Name</label>
                                                <input
                                                    id='full_name'
                                                    type='text'
                                                    name='full_name'
                                                    value={name}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                    readOnly
                                                />
                                            </div>
                                            <div className='md:col-span-3 text-zinc-600'>
                                                <label>Pickup Address</label>
                                                <input
                                                    id='address'
                                                    type='text'
                                                    name='address'
                                                    value={pickupAddress}
                                                    onChange={(e) => setPickupAddress(e.target.value)}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                />
                                            </div>
                                            <div className='md:col-span-2 text-zinc-600'>
                                                <label>Pickup Pincode</label>
                                                <input
                                                    id='pincode'
                                                    type='text'
                                                    name='pincode'
                                                    value={pickupPincode}
                                                    onChange={(e) => setPickupPincode(e.target.value)}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                    placeholder='741201'
                                                />
                                            </div>
                                            <div className='md:col-span-3 text-zinc-600'>
                                                <label>Email Address</label>
                                                <input
                                                    id='email'
                                                    type='email'
                                                    name='email'
                                                    //value=""
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                    placeholder='john@gmail.com'
                                                />
                                            </div>
                                            <div className='md:col-span-2 text-zinc-600'>
                                                <label>Mobile Number</label>
                                                <input
                                                    id='mobile'
                                                    type='tel'
                                                    name='mobile'
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                    placeholder=''
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-stone-700 space-y-2 mt-8'>
                                        <p className='font-semibold text-lg'>Delivery Details</p>
                                        <p></p>
                                    </div>
                                    <div className='lg:col-span-2 mt-7'>
                                        <div className='grid gap-4 gap-y-2 text-md grid-cols-1 md:grid-cols-5 space-y-2'>
                                            <div className='md:col-span-5 text-zinc-600'>
                                                <label>Full Name</label>
                                                <input
                                                    id='full_name'
                                                    type='text'
                                                    name='full_name'
                                                    value={dname}
                                                    onChange={(e) => setDname(e.target.value)}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'

                                                />
                                            </div>
                                            <div className='md:col-span-3 text-zinc-600'>
                                                <label>Drop Address</label>
                                                <input
                                                    id='address'
                                                    type='text'
                                                    name='address'
                                                    value={dropAddress}
                                                    onChange={(e) => setDropAddress(e.target.value)}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                />
                                            </div>
                                            <div className='md:col-span-2 text-zinc-600'>
                                                <label>Drop Pincode</label>
                                                <input
                                                    id='pincode'
                                                    type='text'
                                                    name='pincode'
                                                    value={dropPincode}
                                                    onChange={(e) => setDropPincode(e.target.value)}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                    placeholder='741201'
                                                />
                                            </div>
                                            <div className='md:col-span-3 text-zinc-600'>
                                                <label>Email Address</label>
                                                <input
                                                    id='email'
                                                    type='email'
                                                    name='email'
                                                    // value=""
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                    placeholder='john@gmail.com'
                                                />
                                            </div>
                                            <div className='md:col-span-2 text-zinc-600'>
                                                <label>Mobile Number</label>
                                                <input
                                                    id='mobile'
                                                    type='tel'
                                                    name='mobile'
                                                    value={dmobile}
                                                    onChange={(e) => setDMobile(e.target.value)}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                    placeholder=''
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-stone-700 space-y-2 mt-8'>
                                        <p className='font-semibold text-lg'>Order Details</p>
                                        <p></p>
                                    </div>
                                    <div className='lg:col-span-2 mt-7'>
                                        <div className='grid gap-4 gap-y-2 text-md grid-cols-1 md:grid-cols-5 space-y-2'>
                                            <div className='md:col-span-3 text-zinc-600'>
                                                <label>Choose Delivery Type</label>
                                                {/* <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg> */}
                                                <select className="h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none" onChange={(e) => setDeliveryType(e.target.value)}>
                                                    <option value=""></option>
                                                    <option value="Within City">Within City</option>
                                                    <option value="Intercity">Intercity</option>
                                                </select>
                                            </div>
                                            <div className='md:col-span-2 text-zinc-600'>
                                                <label>Choose Weight</label>
                                                {/* <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg> */}
                                                <select className="h-9 px-2 text-stone-600 font-medium border border-slate-300 rounded w-full bg-stone-200 focus:outline-none appearance-none" onChange={(e) => setWeight(e.target.value)}>
                                                    <option value=""></option>
                                                    <option value="Upto 1Kg">1kg</option>
                                                    <option value="Upto 5Kg">5kg</option>
                                                    <option value="Upto 10kg">10kg</option>
                                                    <option value="Upto 15Kg">15kg</option>
                                                    <option value="Upto 20Kg">20kg</option>
                                                    <option value="More than 20Kg">More than 20kg</option>
                                                </select>
                                            </div>
                                            <div className='md:col-span-3 text-zinc-600'>
                                                <label>Schedule Date</label>
                                                <input
                                                    id='date'
                                                    type='date'
                                                    name='date'
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                />
                                            </div>
                                            <div className='md:col-span-2 text-zinc-600'>
                                                <label>Schedule Time</label>
                                                <input
                                                    id='time'
                                                    type='time'
                                                    name='time'
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                    className='h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6'>
                                <div className='grid gap-4 gap-y-2 text-md grid-cols-1 lg:grid-cols-3'>
                                    <div className='text-stone-700 space-y-2 mt-1'>
                                        <p className='font-medium text-lg'>Payment Details</p>
                                        <p></p>
                                    </div>
                                    <div className='lg:col-span-2 '>
                                        <div className='grid gap-4 gap-y-2 text-md grid-cols-1 md:grid-cols-5 space-y-2'>
                                            <div className='md:col-span-5 text-zinc-600'>
                                                <label>Payment Mode</label>
                                                {/* <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg> */}
                                                <select className="h-9 px-2 text-stone-600 font-medium border border-slate-300 mt-2 rounded w-full bg-stone-200 focus:outline-none appearance-none" onChange={(e) => setPayment(e.target.value)}>
                                                    <option value=""></option>
                                                    <option value="UPI">UPI</option>
                                                    <option value="COD">Cash on Delivery</option>
                                                    <option value="Debit/Credit Card">Bank Card</option>
                                                    <option value="COP">Cash on Pickup</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-3 space-x-5 flex flex-col justify-end text-zinc-600">
                                                <label className="text-right">Shipping Cost</label><br />
                                                <label className="text-right">GST<span className='font-medium'> @18%</span></label><br />
                                                <label className="text-right " htmlFor="insurance">Add <span className='font-medium'>&#8377;15</span> Insurance</label><br />
                                                <label className="text-right" htmlFor="total">Total</label>
                                            </div>
                                            <div className='md:col-span-1 space-x-5 flex flex-col justify-end text-stone-600 font-medium'>
                                                <label className="text-end">{shipping}</label><br />
                                                <label className="text-end">{(gst).toFixed(2)}</label><br />
                                                <label className="text-end " htmlFor="insurance">15.00</label><br />
                                                <label className="text-end font-extrabold text-lg" htmlFor="total">&#8377;{total}</label>
                                            </div>
                                            <div className='md:col-span-5'>
                                                <button type='submit' className='w-full flex justify-center rounded-full bg-indigo-500 hover:bg-indigo-700 hover:text-white p-3 text-stone-300 font-semibold text-xl tracking-wide shadow-lg transistion ease-in-out duration-300'>
                                                    Pay Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form3