import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollTop from './hooks/ScrollTop';
import AppLayout from './layout/AppLayout';
import Contact from './pages/contact';
import Details from './pages/details';
import Shop from './pages/shop';
import Success from './pages/success';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <ScrollTop>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Shop />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/search" element={<Shop />} />
              <Route path="checkout-success" element={<Success />} />
              <Route path="product/details/:slug" element={<Details />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </ScrollTop>
      </Router>
    </>
  );
};

export default App;
