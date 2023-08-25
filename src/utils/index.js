
export function truncate(str, n) {
  return str.length > n
    ? str.substr(0, n - 1) + '...' + str.substr(str.length - 4, str.length - 1)
    : str;
}

export async function getBookDetails(isbn) {
  // Query the book database by ISBN code.
  isbn = isbn || '9781451648546'; // Steve Jobs book

  const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;

  const response = await fetch(url);

  const result = await response.json();

  let book = {}

  if (result?.totalItems) {
    // There'll be only 1 book per ISBN
    book = result.items[0];

    return {
      title: book['volumeInfo']['title'],
      authors: book['volumeInfo']['authors'],
      pageCount: book['volumeInfo']['pageCount'],
      publishedDate: book['volumeInfo']['publishedDate'],
    }
  }

  return book;
}
