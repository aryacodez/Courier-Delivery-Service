import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Form3 from '../../components/forms/form3'
import './order.css'

const Order = () => {
  return (
    <>
      <div className='bg-stone-200'>
        <Navbar/>
        <div className='main'>
          <Form3/>
        </div>
      </div>

    </>
  )
}

export default Order