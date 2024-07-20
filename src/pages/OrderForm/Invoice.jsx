import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../components/Salary/Spinner';
import BackButton from '../../components/Salary/BackButton';
import backgroundImage from '../../images/Salary/17.jpg';
import InvoicePdf from '../../components/Salary/InvoicePdf';
import { PDFDownloadLink } from "@react-pdf/renderer";

const Invoice = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/api/order/${_id}`)
      .then((response) => {
        setOrder(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [_id]);

  return (
    <div
      className='p-4'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className=''>
        <div className='p-4 '>
          <h1 className='text-3xl my-4 text-center font-bold text-black'>Invoice</h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className='flex flex-col border-2 border-black rounded-xl w-[600px] p-4 mx-auto bg-gray-200'> {/* Add background color to this container */}
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500 font-bold text-blue-500 '>Order ID</span>
                <span className='font-bold text-black'>{order.o_id}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500 font-bold text-blue-500'>Select Package</span>
                <span className='font-bold text-black'>{order.packagename}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500 font-bold text-blue-500'>Customer name</span>
                <span className='font-bold text-black'>{order.customername}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500 font-bold text-blue-500'>Phone Number</span>
                <span className='font-bold text-black'>{order.phone}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500 font-bold text-blue-500'>Email</span>
                <span className='font-bold text-black'>{order.email}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500 font-bold text-blue-500'>Billing Address</span>
                <span className='font-bold text-black'>{order.billingaddress}</span>
              </div>
            </div>
          )}
          <div className='flex justify-center items-center gap-x-4 font-bold text-blue-500'>
            <PDFDownloadLink document={<InvoicePdf order={order}/>} fileName="FORM">
              {({ loading }) =>
                loading ? <button>loading...</button> : <button>Download</button>
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
