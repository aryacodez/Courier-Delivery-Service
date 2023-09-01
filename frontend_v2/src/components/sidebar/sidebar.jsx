import React from 'react'
import { Link,useNavigate } from 'react-router-dom';

const Sidebar = () => {
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
        <><div className='mt-2 mb-2 grid grid-cols-1'>
            <div className='bg-zinc-50 ms-8 me-8 h-11/12 rounded-2xl'>
                <div className='text-center mt-8 font-semibold text-xl'>
                    Dashboard
                </div>
                <div className='text-center ms-16 mt-20 space-y-20'>
                    <Link to='/order'>
                        <p className='flex hover:text-indigo-800 transition ease-out duration-300 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <span className='text-lg font-medium ps-2 tracking-wide'>Home</span>
                        </p>
                    </Link>
                    <Link to='/history'>
                        <p className='flex mt-20 hover:text-blue-800 transition ease-out duration-300 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <span className='text-lg font-medium ps-2 tracking-wide'>Orders</span>
                        </p>
                    </Link>
                    <p className='flex hover:text-blue-800 transition ease-out duration-300 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                        </svg>
                        <span className='text-lg font-medium ps-2 tracking-wide'>Profile</span>
                    </p>
                    {/* <p className=''>Home</p> */}
                </div>
                <div className='bg-indigo-500 mt-72 pb-3 pt-2 rounded-b-2xl'>
                    <p className='flex ms-16 hover:text-white transition ease-out duration-300 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span className='text-lg font-medium ps-2 tracking-wide' onClick={logout}>Logout</span>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar