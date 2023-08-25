import React, { useState } from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import { useAccount, useContractWrite } from 'wagmi';
import libraryAbi from '../abi/Library.json';
import { CONTRACT } from '../utils/constants';

export const RentBookPage = () => {
  const { isConnected } = useAccount();

  const initialFormData = {
    isbn: '',
  };

  // Form states
  const [formData, setFormData] = useState(initialFormData);
  const [formSubmitError, setFormSubmitError] = useState('');

  // Handlers
  const handleFormInputChange = e => {
    const { value, name } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const { isLoading: isLoadingAddBook, write: addBook } = useContractWrite({
    address: CONTRACT,
    abi: libraryAbi,
    functionName: 'borrowBook',
    args: [
      formData.isbn,
    ],
    onSuccess() {
      setFormData(initialFormData);
    },
    onError(error) {
      console.log('Error', error);
      setFormSubmitError(error.message);
    },
  });

  return (
    <>
      <div className='container my-5'>
        <h1>Book Library</h1>
        <Breadcrumbs currentPage='Rent Book'></Breadcrumbs>

        <div className='container my-5 my-lg-10'>
          <div className='row'>
            <div className='col-6 offset-3'>
              <h2 className='heading-medium text-center mb-5'>Rent Book</h2>
              {isConnected &&
                <>
                  {' '}
                  <div className='card mt-5'>
                    <div className='card-body'>
                      <div className=''>
                        {formSubmitError ? (
                          <div className='alert alert-danger mb-4'>{formSubmitError}</div>
                        ) : null}

                        <div>
                          <p className='text-small text-bold'>ISBN:</p>
                          <input
                            type='text'
                            className='form-control'
                            name='isbn'
                            value={formData.isbn}
                            onChange={handleFormInputChange}
                          />
                        </div>

                        <div className='mt-4 d-flex justify-content-center'>
                          <Button
                            onClick={addBook}
                            loading={isLoadingAddBook}
                            type='primary'
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
