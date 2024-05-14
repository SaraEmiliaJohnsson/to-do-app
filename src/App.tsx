
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import SignInComponent from './components/SignInComponent'
import TodoComponent from './components/TodoComponents'
import RegisterComponent from './components/RegisterComponent'

function App() {

  return (

    <Router>
      <Routes>
        <Route path='/' element={<SignInComponent />} />
        <Route path='/register' element={<RegisterComponent />} />
        <Route path='/addtodo' element={<TodoComponent />} />
      </Routes>
    </Router>

  )
}

export default App
