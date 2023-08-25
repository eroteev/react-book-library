import React, { useState } from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import { useAccount, useContractWrite } from 'wagmi';
import libraryAbi from '../abi/Library.json';
import { CONTRACT } from '../utils/constants';

export const AddBookPage = () => {
  const { isConnected } = useAccount();

  const initialFormData = {
    isbn: '',
    copies: 0,
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
    functionName: 'addBook',
    args: [
      formData.isbn,
      formData.copies,
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
        <Breadcrumbs currentPage='Add Book'></Breadcrumbs>

        <div className='container my-5 my-lg-10'>
          <div className='row'>
            <div className='col-6 offset-3'>
              <h2 className='heading-medium text-center mb-5'>Add Book</h2>
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

                        <div className='mt-4'>
                          <p className='text-small text-bold'>Copies:</p>
                          <input
                            type='text'
                            className='form-control'
                            name='copies'
                            value={formData.copies}
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
