import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import libraryAbi from '../../abi/Library.json';
import { CONTRACT } from '../../utils/constants';
import { getBookDetails } from '../../utils/index';

export const BookListItem = ({ isbn }) => {

  const [bookData, setBookData] = useState({});

  const { data: book, isSuccess } = useContractRead({
    address: CONTRACT,
    abi: libraryAbi,
    functionName: 'getBook',
    args: [isbn],
    enabled: true,
    watch: true,
    onError(error) {
      console.log('Error', error);
    },
  });

  useEffect(() => {
    getBookDetails(book.isbn)
      .then(result => {
        setBookData(result);
      })
  }, [book.isbn])

  return (
    isSuccess &&
    <tr>
      <td>{book.isbn.toString()}</td>
      <td>{bookData?.title}</td>
      <td>{bookData?.authors}</td>
      <td>{bookData?.pageCount}</td>
      <td>{bookData?.publishedDate}</td>
      <td>{book.copies}</td>
      <td>{book.borrowed}</td>
      <td></td>
    </tr>
  );
};
