import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { AddBookPage } from '../../pages/AddBookPage';
import { useAccount } from 'wagmi';
import { RentBookPage } from '../../pages/RentBookPage';
import { ReturnBookPage } from '../../pages/ReturnBookPage';

export const Main = () => {
  const { isConnected } = useAccount();

  return (
    <div className='main'>
      <div className='container my-5'>
        {isConnected ? (
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/add' element={<AddBookPage />} />
            <Route path='/rent' element={<RentBookPage />} />
            <Route path='/return' element={<ReturnBookPage />} />
          </Routes>
        ) : (
          <div className='alert alert-warning' role='alert'>
            You need to connect using Metamask see the available books!
          </div>
        )}
      </div>
    </div>
  );
};
