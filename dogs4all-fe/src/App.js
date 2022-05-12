import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//page elements
import NavBar from './components/general/NavBar';
import Footer from './components/general/Footer';

//authentication pages
import Login from './components/authentication/Login/Login';
import Signup from './components/authentication/Signup/Signup';

//page views
import Home from './components/homepage/Home';
import DogWalkers from './components/dogWalkers/DogWalkers';
import PageNotFound from './components/general/PageNotFound';

//Dashboard views
import Dashboard from './components/dashboard/Dashboard';
import Verify from './components/dashboard/Verify/Verify';
import Logout from './components/dashboard/Logout/Logout';
import Me from './components/dashboard/Me/Me';
import DogWalkerCreateProfile from './components/dashboard/DogWalkerProfile/DogWalkerCreateProfile';
import DogWalkerEditProfile from './components/dashboard/DogWalkerProfile/DogWalkerEditProfile';
import DogWalkerDeleteProfile from './components/dashboard/DogWalkerProfile/DogWalkerDeleteProfile';

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
          <Route path='/verify' element={<Verify />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/me' element={<Me />} />
          <Route path='/dogWalkerCreateProfile' element={<DogWalkerCreateProfile />} />
          <Route path='/dogWalkerEditProfile' element={<DogWalkerEditProfile />} />
          <Route path='/dogWalkerDeleteProfile' element={<DogWalkerDeleteProfile />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;