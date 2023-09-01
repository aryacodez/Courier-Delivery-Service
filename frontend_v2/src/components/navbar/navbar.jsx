import React from 'react'
import { Link,useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const logout = async () => {
        await fetch('/api/v1/logout', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className='flex flex-wrap place-items-start h-screen'>
                <section className='relative mx-auto'>
                    <nav className='flex justify-between text-black w-screen'>
                        <div className='px-5 xl:px-12 py-6 flex w-full items-center'>
                            <a className='text-3xl font-bold font-heading text-indigo-800' href='#'>
                                DelFe
                            </a>
                            <ul className='hidden md:flex px-4 mx-auto font-semibold font-heading text-lg space-x-12'>
                                <li>
                                    <a className='transistion ease-in duration-250 hover:underline underline-offset-8 decoration-2 hover:text-blue-700 '>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <Link to='/dashboard'>
                                        <a className='transistion ease-in duration-250 hover:underline underline-offset-8 decoration-2 hover:text-blue-700'>
                                            Dashboard
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <a className='transistion ease-in duration-250 hover:underline underline-offset-8 decoration-2 hover:text-blue-700'>
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                            <div className='hidden xl:flex items-center space-x-5'>
                                <button className='flex items-center mr-1 hover:text-blue-700 transistion ease-in duration-250' onClick={logout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                                    </svg>
                                </button>                                
                            </div>
                        </div>
                    </nav>
                </section>
            </div>
        </>
    )
}

export default Navbar