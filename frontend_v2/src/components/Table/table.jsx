import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/sidebar'
import './table.scss'
import jsPDF from 'jspdf';


const Table = () => {


    const [table, setTable] = useState([])

    useEffect(() => {
        fetch('/api/v1/myorder', {
            method: 'GET'
        })
            .then((res) => (res.json()))
            .then((res) => {
                setTable(res.order)
                console.log(res.order.length)
            })
    }, []);

    const deleteOrder = (id) => {
        fetch(`/api/v1/cancel/${id}`, {
            method: 'DELETE'
        }).then(() => {
            let c = window.confirm('Are you sure you want to cancel order')
            if (c) {
                setTable(table.filter((find) => find._id !== id));
                alert('Order Cancelled')
            } else {
                alert('Order Cancelled Unsuccessful')
            }
        }).catch(err => console.log(err))
    }

    const generateInvoice = (row) => {
        const doc = new jsPDF();

        // doc.setTextColor(128, 0, 128); // Purple color
        // doc.setFontSize(20);

        // // Set text alignment for the header to "center"
        // doc.text('DelFe', 105, 15, { align: 'center' });
        // doc.text('---------------------------------------', 105, 15, { align: 'center' });
        // // Set text color and font size for the content
        // doc.setTextColor(0, 0, 0); // Black color
        // doc.setFontSize(14);

        const content = `
        Pickup Date & Time: ${row.dateTime}
        Receiver Name: ${row.receiverName}
        Pickup Address: ${row.pickupLocation}
        Drop Address: ${row.dropLocation}
        Package Weight: ${row.packageWeight}
        Payment Mode: ${row.paymentMode}
        Total Price: Rs ${row.totalPrice}
        `
        doc.setFontSize(14);
        doc.text(content, 10, 10);

        // Save or download the PDF
        doc.save('invoice.pdf');
    }

    return (
        <>
            <div className='md:container md:mx-auto grid grid-cols-5  gap-x-2 h-screen'>
                <Sidebar />
                <div className="card col-span-4">

                    <section className="dash">
                        <h4>Deliveries</h4>
                        <section className="tableSection">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Pickup Date & Time</th>
                                        <th>Package Weight</th>
                                        <th>Pickup Address</th>
                                        <th>Receiver Name</th>
                                        <th>Drop Address</th>
                                        <th>Payment Mode</th>
                                        <th>Total Bill</th>
                                        <th>Status</th>
                                        <th>Cancel Order</th>
                                        <th>Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.length > 0 ? (
                                        table.map((row, i) => (
                                            <tr key={i}>
                                                <td>{row.dateTime}</td>
                                                <td style={{ paddingLeft: '25px' }}>{row.packageWeight}</td>
                                                <td>{row.pickupLocation}</td>
                                                <td>{row.receiverName}</td>
                                                <td>{row.dropLocation}</td>
                                                <td style={{ paddingLeft: '40px' }}>{row.paymentMode}</td>
                                                <td>{row.totalPrice}</td>
                                                <td>{row.status}</td>
                                                <td style={{ paddingLeft: '40px' }}>

                                                    <img  //Cancel Order

                                                        src="https://cdn-icons-png.flaticon.com/512/9426/9426995.png"
                                                        alt="cancel delivery"
                                                        width="20"
                                                        height="20"
                                                        onClick={() => deleteOrder(row._id)}
                                                    />

                                                </td>
                                                <td style={{ paddingLeft: '20px' }}>
                                                    <img  //Download Order Invoice 
                                                        className='download'
                                                        src="https://cdn-icons-png.flaticon.com/512/4208/4208382.png"
                                                        alt="download invoice"
                                                        width="25"
                                                        height="25"
                                                        onClick={() => generateInvoice(row)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9}>Order History Empty...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </section>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Table