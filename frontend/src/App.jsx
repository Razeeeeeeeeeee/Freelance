import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Employer_manual from './pages/employer_manual'
import Employer_offline from './pages/employer_offline'
import Admin_panel from './pages/admin_panel'

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Employer_manual />} />
          <Route path = '/employer_form' element = {<Employer_manual/>}/>
          <Route path = '/employer_offline' element = {<Employer_offline/>}/>
          <Route path = '/admin_panel' element = {<Admin_panel/>}/>
        </Routes>
     </BrowserRouter>

    </>
  )
}

export default App

