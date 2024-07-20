import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Salary/Home'
import CreateSalaryRecoard from './pages/Salary/CreateSalaryRecoard';
import ShowSalaryRecoards from './pages/Salary/ShowSalaryRecoards';
import EditSalaryRecoard from './pages/Salary/EditSalaryRecoard';
import DeleteSalaryRecoard from './pages/Salary/DeleteSalaryRecoard';
import ShowSalary from './pages/Salary/ShowSalary';
import CreateOrderForm from './pages/OrderForm/CreateOrderForm';
import Invoice from './pages/OrderForm/Invoice';  
import { SnackbarProvider } from 'notistack';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <SnackbarProvider>
      <Routes>
   
       
        <Route path='/' element={<App />} />
        <Route path='/salarys' element={<Home />} />
      <Route path='/salary/create' element={<CreateSalaryRecoard />} />
      <Route path='/salary/details/:_id' element={<ShowSalaryRecoards />} />
      <Route path='/salary/edit/:_id' element={<EditSalaryRecoard />} />
      <Route path='/salary/delete/:_id' element={<DeleteSalaryRecoard />} />
      <Route path='/salary/details1/:_id' element={<ShowSalary />} />
      <Route path='/orderform' element={<CreateOrderForm />} />
      <Route path='/invoice/:_id' element={<Invoice />} />
 

      </Routes>
      </SnackbarProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
