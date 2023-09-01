import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import Chart from "react-apexcharts";
import './dashy.css'
const Dashy = () => {

  const [current, setCurrent] = useState('')
  const [cancel, setCancel] = useState('')
  const [table, setTable] = useState([])
  
  useEffect(() => {
    const fetchCountDelivery = async () => {
      try {
        const response = await fetch('/api/v1/countDelivery', {
          method: 'GET'
        });
        const data = await response.json();
        setCurrent(data.count);
      } catch (error) {
        console.error('Error fetching countDelivery:', error);
      }
    };

    const fetchGetCount = async () => {
      try {
        const response = await fetch('/api/v1/get-count', {
          method: 'GET'
        });
        const data = await response.json();
        if (data.getSave && data.getSave[0]) {
          setCancel(data.getSave[0].cancelCounter);
        }
      } catch (error) {
        console.error('Error fetching get-count:', error);
      }
    };

    const fetchMyOrder = async () => {
      try {
        const response = await fetch('/api/v1/myorder', {
          method: 'GET'
        });
        const data = await response.json();
        setTable(data.order);
        console.log(data.order.length);
      } catch (error) {
        console.error('Error fetching myorder:', error);
      }
    };

    fetchCountDelivery();
    fetchGetCount();
    fetchMyOrder();
  }, []);

  const totalPriceTable = table.reduce((acc, curr) => acc + curr.totalPrice, 0)

  const [name, setName] = useState('')

  useEffect(() => {
    fetch('/api/v1/userProfile')
      .then(res => res.json())
      .then(data => setName(data.user.name))
      .catch(err => console.error(err))
  }, []);

  const [stream, setStream] = useState("");
  useEffect(() => {
    const curryear = new Date().getFullYear();

    fetch(`/api/v1/getMonthWise/${curryear}/month-wise`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        if (res && res.length > 0) {
          setStream(res);
        }
      })
      .catch(e => console.log(e));
  }, []);

  //console.log(stream);
  //console.log(Object.keys(stream).map((key) => stream[key].count))
  const series = [
    {
      name: "Monthly Orders",
      data: Object.keys(stream).map((key) => stream[key].count) || null
    }
  ]
  const option = {
    chart: {
      height: 250,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        }
      }
    },
    //colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '25%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: Object.keys(stream).map(
        (key) => stream[key].month || null
      ),
      labels: {
        style: {
          //colors: colors,
          fontSize: '16px'
        }
      }
    }
  };

  const total = current + cancel
  return (
    <>
      <div className='md:container md:mx-auto grid grid-cols-5 gap-x-2 h-screen'>
        <Sidebar />
        <div className='col-span-4 pe-9 pt-10 '>
          <div className='font-semibold text-xl'>
            Welcome, {name}
          </div>
          <div className='grid grid-cols-3 gap-6 mt-12 h-44 drop-shadow-lg'>
            <div className='bg-gradient-to-r from-cyan-500 to-slate-100 rounded-lg'>
              <p className='text-2xl font-medium ps-6 mt-5'>Total Orders</p>
              <div className='container mt-3 ps-12'>
                <div className='flex flex-row space-x-36'>
                  <p className='font-light text-7xl'>{total || ''}</p>
                  <img className="" src="https://cdn-icons-png.flaticon.com/512/9486/9486069.png" alt='' width="90" height="100" />
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-r from-indigo-400 to-teal-100 rounded-lg'>
              <p className='text-2xl font-medium ps-6 mt-5'>Current Orders</p>
              <div className='container mt-3 ps-12'>
                <div className='flex flex-row space-x-36'>
                  <p className='font-light text-7xl'>{current || ''}</p>
                  <img className="" src="https://cdn-icons-png.flaticon.com/512/3091/3091609.png" alt='' width="90" height="100" />
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-r from-rose-300 to-fuchsia-50 rounded-lg'>
              <p className='text-2xl font-medium ps-6 mt-5'>Cancelled Orders</p>
              <div className='container mt-3 ps-12'>
                <div className='flex flex-row space-x-36'>
                  <p className='font-light text-7xl'>{cancel || ''}</p>
                  <img className="" src="https://cdn-icons-png.flaticon.com/512/5161/5161449.png" alt='' width="90" height="100" />
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-6 mt-12 h-80 drop-shadow-lg'>
            <div className='bg-gradient-to-bl from-lime-100 to-emerald-600  rounded-lg '>
              <p className='text-2xl font-medium ps-6 mt-5'>Total Spent</p>
              <p className='font-bold text-8xl text-center mt-12'>&#8377;{totalPriceTable}</p>
            </div>
            <div className='bg-gradient-to-tl from-cyan-600 to-sky-100 col-span-2 rounded-lg'>
              <p className='text-2xl font-medium ps-6 mt-5'>Monthly Orders</p>
              <Chart
                options={option}
                series={series}
                type="bar"
                height={260}
                width={770}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashy