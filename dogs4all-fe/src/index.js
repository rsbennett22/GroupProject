import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import page elements
import Navigation from './components/general/NavBar';
import Footer from './components/general/Footer';
import Home from './components/homepage/Home';
import AllDogWalkers from './components/dogWalkers/DogWalkers';
import DogTrainningScreen from './components/dogTrainning';

ReactDOM.render(
  <Router>
    <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogWalkers" element={<AllDogWalkers />} />
        <Route path="/dogTraining" element={<DogTrainningScreen />} />
      </Routes>
      <Footer />
  </Router>,
  document.getElementById('root')
  );

