import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link,Routes } from 'react-router-dom';
import Menu from './Menu/Menu';
import HomePage from './HomePage/HomePage';
import Hero from './Hero/Hero';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <div classname='maincontainer'>
        <switch>
          <Routes>
            <Route path='/about' element={<AboutPage />}/>
            <Route path='/login' element={<LoginPage />}/>
          </Routes>
        </switch>
      </div>
      <HomePage />
      <Footer />
    </Router>
  );
}

export default App;
