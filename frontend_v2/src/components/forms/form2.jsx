import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Form2 = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/v1/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            .then((res) => res.json())
            .then(data => {
                if (data.success) {
                    alert('Registration Successful')
                    navigate('/')
                }
                else {
                    alert('Password must be atleast 5 characters and also check entered email address')
                    navigate('/signup')
                }
            })
            .catch(err => console.error(err))

    }

    return (
        <>
            <div className='bg-no-repeat bg-cover bg-center relative h-screen bg-sky-600'>
                <div className='min-h-screen sm:flex sm:flex-row mx-0 justify-center'>
                    <div className="flex-col flex  self-center p-12 sm:max-w-5xl xl:max-w-2xl  z-10">
                        <div className="self-start hidden lg:flex flex-col  text-white">
                            <h1 className="mb-3 font-bold text-5xl">No Account!<br /> Create an Account</h1>
                            <p className="pr-3">Lorem ipsum is placeholder text commonly used in the graphic, print,
                                and publishing industries for previewing layouts and visual mockups</p>
                        </div>
                    </div>
                    <div className='flex justify-center self-center z-10 shadow-md'>
                        <div className='p-10 bg-white rounded mx-auto w-100'>
                            <div className='mb-5'>
                                <h3 className='font-semibold text-2xl text-zinc-700'>Sign Up</h3>
                                <p className='text-stone-400'>Please setup up your account</p>
                            </div>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div className='space-y-2'>
                                    <label className='text-md font-medium leading-6 text-zinc-600 tracking-wide'>Full name</label>
                                    <input
                                        className='w-full text-base px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lime-500 focus:border-2'
                                        id='text'
                                        type='text'
                                        name='text'
                                        placeholder='John Champion'
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-md font-medium leading-6 text-zinc-600 tracking-wide'>Email</label>
                                    <input
                                        className='w-full text-base px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lime-500 focus:border-2'
                                        id='email'
                                        type='email'
                                        autoComplete='email'
                                        name='email'
                                        placeholder='john@gmail.com'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-md font-medium leading-6 text-zinc-600 tracking-wide'>Password</label>
                                    <input
                                        className='w-full text-base px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lime-500 focus:border-2'
                                        id='password'
                                        type='password'
                                        autoComplete='password'
                                        name='password'
                                        placeholder='Enter your password'
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-row'>
                                    <label className='ml-2 text-sm text-slate-700 tracking-wide'>Already have an account
                                        <Link to='/'>
                                            <span className='inline'>
                                                <a href="#" className='text-sm text-slate-700 tracking-wide no-underline hover:text-blue-700'> Sign in</a>
                                            </span>
                                        </Link>
                                    </label>
                                </div>
                                <div>
                                    <button type='submit' className='w-full flex justify-center rounded-full bg-cyan-300 hover:bg-cyan-400 hover:text-white p-3 text-stone-600 font-semibold tracking-wide shadow-lg transistion ease-in-out duration-300'>
                                        Create account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form2