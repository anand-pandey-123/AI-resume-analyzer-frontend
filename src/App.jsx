import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ResumeAnalyzer from './component/ResumeAnalyzer'
import Contact from './pages/Contact'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ResumeAnalyzer></ResumeAnalyzer>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          {/* <Route path='/' element={<ResumeAnalyzer></ResumeAnalyzer>}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
