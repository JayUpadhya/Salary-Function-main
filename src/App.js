import { useNavigate } from 'react-router-dom'; //Hook
import './App.css';


function App() {

  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
       
        <button className='salary-button' onClick={() => navigate('/salarys')}>Salary</button>
        <button className='salary-button' onClick={() => navigate('/orderform')}>order form</button>

      </header>
    </div>
  );
}

export default App;
