import React from 'react';
import { BookListItem } from './BookListItem';

export const BookListTable = ({ isbnList }) => {

  if (!isbnList) {
    return;
  }

  return (
    <table className='table table-hover'>
      <thead>
      <tr>
        <th scope='col'>ISBN</th>
        <th scope='col'>Title</th>
        <th scope='col'>Authors</th>
        <th scope='col'>Page Count</th>
        <th scope='col'>Published Date</th>
        <th scope='col'>Copies</th>
        <th scope='col'>Rented</th>
      </tr>
      </thead>
      <tbody>
      {isbnList.map((isbn) => <BookListItem key={isbn} isbn={isbn} />)}
      </tbody>
    </table>
  );
};
