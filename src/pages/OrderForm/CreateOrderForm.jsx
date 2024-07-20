import React, { useState } from 'react';
import Spinner from '../../components/Salary/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../images/Salary/7.jpg'
 
const CreateOrderForm = () => {
  const [customername, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [billingaddress, setBillingAddress] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [cardholdername, setCardHolderName] = useState('');
  const [cardnumber, setCardNumber] = useState('');
  const [expirydate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState(''); // State for selected package
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    return `${year}-${month}`;
  };

  const countries = [
    { name: 'Select Country', code: '' },
    { name: 'Afghanistan', code: '+93' },
    { name: 'Albania', code: '+355' },
    { name: 'Algeria', code: '+213' },
    { name: 'Andorra', code: '+376' },
    { name: 'Angola', code: '+244' },
    { name: 'Antigua and Barbuda', code: '+1-268' },
    { name: 'Argentina', code: '+54' },
    { name: 'Armenia', code: '+374' },
    { name: 'Australia', code: '+61' },
    { name: 'Austria', code: '+43' },
    { name: 'Azerbaijan', code: '+994' },
    { name: 'Bahamas', code: '+1-242' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Barbados', code: '+1-246' },
    { name: 'Belarus', code: '+375' },
    { name: 'Belgium', code: '+32' },
    { name: 'Belize', code: '+501' },
    { name: 'Benin', code: '+229' },
    // Add more countries as needed
  ];

  const packages = [
    { name: 'Select Package', id: '' },
    { name: 'Package Rs.30,000', id: 'package_a' },
    { name: 'Package Rs.40,000', id: 'package_b' },
    { name: 'Package Rs.45,000', id: 'package_c' },
    { name: 'Package Rs.50,000', id: 'package_c' },
    { name: 'Package Rs.20,000', id: 'package_c' },

    // Add more packages as needed
  ];

  const handleSaveOrderForm = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Email validation
    if (!emailRegex.test(email)) {
      return;
    }

    const data = {
      customername,
      phone,
      email,
      billingaddress,
      packagename: selectedPackage,
      cardholdername,
      cardnumber,
      expirydate,
      cvv, // Include selected package in the data
    };
    setLoading(true);
    axios
      .post('http://localhost:3001/api/order', data)
      .then((response) => {
        setLoading(false);
        enqueueSnackbar('OrderForm Created successfully', { variant: 'success' });
        navigate(`/invoice/${response.data._id}`); // Redirect to '/paymentdetails' page
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    // Regex pattern for alphabetic characters and spaces only
    const nameRegex = /^[a-zA-Z\s]*$/;
    // Check if the input matches the regex pattern
    if (nameRegex.test(value) || value === '') {
      setCustomerName(value);
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Regex pattern for numerical characters only
    const phoneRegex = /^\d*$/;
    // Check if the input matches the regex pattern and if it's within 10 characters
    if (phoneRegex.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };
  const handleCardNameChange = (e) => {
    const { value } = e.target;
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (nameRegex.test(value) || value === '') {
      setCardHolderName(value);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ');
    value = value.trim();
    value = value.slice(0, 19);
    setCardNumber(value);
  };

  const handleCVVChange = (e) => {
    const { value } = e.target;
    const cvvRegex = /^\d{0,3}$/;
    if (cvvRegex.test(value)) {
      setCVV(value);
    }
  };

  const handleExpiryDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate && !isNaN(selectedDate)) {
      const year = selectedDate.getFullYear();
      let month = selectedDate.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      const formattedExpiryDate = `${year}-${month}`;
      setExpiryDate(formattedExpiryDate);
    } else {
      setExpiryDate('');
    }
  };

  return (

    <div
    className='p-4'
    style={{
      backgroundImage: `url(${backgroundImage})`, // Set background image
      backgroundSize: 'cover', // Adjust background image size
      backgroundPosition: 'center', // Adjust background image position
      minHeight: '100vh', // Ensure the background covers the entire screen
    }}
  >


    <div className="min-h-screen mt-36 mb-10">
      <div className="flex justify-center items-center gap-2">
        <div className="hidden lg:block">
         
        </div>

        <div className="flex p-3 max-w-6xl mx-auto flex-col md:flex-row md:items-start gap-10">
          <div className="flex-1">
            <h1 className="text-3xl text-gray-800 font-serif ">Fill the Order Form</h1>
            {loading ? <Spinner /> : ''}
            <form className="flex flex-col gap-6" onSubmit={handleSaveOrderForm}>
              <div>
                <h3 className="font-semibold text-black-400 ml-1">Select Package</h3>
                <select
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                >
                  {packages.map((pkg, index) => (
                    <option key={index} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h3 className="font-semibold text-black-400 ml-1">Customer name</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Name"
                  value={customername}
                  onChange={handleNameChange} // Use the custom handler for name input
                />
              </div>
              <div>
                <h3 className="font-semibold text-black-400 ml-1">Phone</h3>
                <div className="flex items-center">
                  <select
                    className="bg-slate-100 p-3 rounded-lg w-[160px] h-11 mr-2"
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setPhone(''); // Clear phone number when country changes
                    }}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {/* Display the selected country code */}
                  <span className="mr-2">{selectedCountry}</span>
                  <input
                    className="bg-slate-100 p-3 rounded-lg w-[240px] h-11"
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-black-400 ml-1">Email</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <h3 className="font-semibold text-black-400 ml-1">Billing Address</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Billing Address"
                  value={billingaddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
              </div>
              
            </form >
          </div>
          <div className="flex p-3 max-w-8xl mx-auto flex-col md:flex-row md:items-start gap-10">
          <div className="flex-1">
          <h1 className="text-3xl text-gray-800 font-serif ">Add Payment Details </h1>
         

            
            <div style={{ marginBottom: '20px' }}>
              <h3 className="font-semibold text-black-400 ml-1">Cardholder name</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Name"
                value={cardholdername}
                onChange={handleCardNameChange}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h3 className="font-semibold text-black-400 ml-1">Card number</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Card number"
                value={cardnumber}
                onChange={handleCardNumberChange}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h3 className="font-semibold text-black-400 ml-1">Expiry date</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="month"
                placeholder="expirydate"
                value={expirydate}
                onChange={handleExpiryDateChange}
                min={getCurrentDate()}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h3 className="font-semibold text-black-400 ml-1">CVV</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={handleCVVChange}
              />
            </div>
            <br></br>
            <button
              className="bg-red-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
              onClick={handleSaveOrderForm}
            >
              Pay
            </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderForm;
