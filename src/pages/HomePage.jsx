import React from 'react';
import { Link } from 'react-router-dom';
import { BookListTable } from '../components/BookListTable/BookListTable';
import { useContractRead } from 'wagmi';
import libraryAbi from '../abi/Library.json';
import { CONTRACT } from '../utils/constants';

export const HomePage = () => {
  const { data: isbnList, isSuccess } = useContractRead({
    address: CONTRACT,
    abi: libraryAbi,
    functionName: 'getAvailableBooks',
    watch: true,
    onError(error) {
      console.log('Error', error);
    },
  });

  return (
    <div className='container my-5'>
      <h1>Book Library</h1>
      <div className='mt-5'>
        {isSuccess && <BookListTable isbnList={isbnList} />}

        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <Link to='/add' className='btn btn-primary me-md-2'>Add Book</Link>
          <Link to='/rent' className='btn btn-success me-md-2'>Rent Book</Link>
          <Link to='/return' className='btn btn-warning'>Return Book</Link>
        </div>
      </div>
    </div>
  );
};
