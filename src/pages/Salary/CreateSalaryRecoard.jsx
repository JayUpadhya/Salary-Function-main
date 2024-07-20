import React, { useState } from 'react';
import BackButton from '../../components/Salary/BackButton';
import Spinner from '../../components/Salary/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../images/Salary/17.jpg'

const CreateSalaryRecoard = () => {
  const [nic, setNic] = useState('');
  const [name, setName] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [attendance, setAttendance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveSalary = () => {
    // Name validation
    if (!/^[A-Za-z\s]+$/.test(name)) {
      enqueueSnackbar('Please enter letters only for Name', { variant: 'error' });
      return;
    }

    // Basic Salary validation
    if (!/^\d+$/.test(basicSalary)) {
      enqueueSnackbar('Please enter a valid number for Basic Salary', { variant: 'error' });
      return;
    }

    // Attendance validation
    if (!/^\d+$/.test(attendance) || parseInt(attendance) < 1 || parseInt(attendance) > 31) {
      enqueueSnackbar('Please enter a number between 1 and 31 for Attendance', { variant: 'error' });
      return;
    }

    const data = {
      nic,
      name,
      basicSalary,
      attendance,
    };

    setLoading(true);
    axios
      .post('http://localhost:3001/api/salary', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Salary Created successfully', { variant: 'success' });
        navigate('/salarys');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleNicChange = (e) => {
    const inputNic = e.target.value.replace(/[^0-9vVxX]/g, '');
    if (/^[0-9]{9}[vVxX]?$/i.test(inputNic) || /^[0-9]{0,12}$/.test(inputNic)) {
      setNic(inputNic);
    }
    axios
    .get('http://localhost:3001/api/memployee/filter?nic=' + inputNic)
    .then((res) => {
      if(res.data){
        console.log(res.data);
        setName(res.data.firstname);
      }
   
    })
    .catch((error) => {
      console.log(error);
    });
    
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
    <div className='-200 min-h-screen'>
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4 text-center font-bold text-black'>Create Salary</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-black rounded-xl w-[600px] p-4 mx-auto '>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>NIC</label>
            <input
              type='text'
              value={nic}
              onChange={handleNicChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              placeholder='123456789V or 200012345678'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Name</label>
            <input
              type='text'
              value={name}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Basic Salary(Rs.)</label>
            <input
              type='text'
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value.replace(/[^0-9]/g, ''))}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Attendance</label>
            <input
              type='text'
              value={attendance}
              onChange={(e) => setAttendance(e.target.value.replace(/[^0-9]/g, ''))}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <button className='p-2 bg-sky-300 m-8 font-bold text-black' onClick={handleSaveSalary}>
            Save
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateSalaryRecoard;
