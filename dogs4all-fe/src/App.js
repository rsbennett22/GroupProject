import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//page elements
import NavBar from './components/general/NavBar';
import Footer from './components/general/Footer';

//authentication pages
import Login from './components/authentication/Login/Login';
import Signup from './components/authentication/Signup/Signup';
import Logout from './components/authentication/Logout/Logout';

//page views
import Home from './components/homepage/Home';
import Dashboard from './components/dashboard/Dashboard';
import DogWalkers from './components/dogWalkers/DogWalkers';


const App = () => {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dogWalkers' element={<DogWalkers />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;