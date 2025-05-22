import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateEmployee />} />
        <Route path='/employee-list' element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
