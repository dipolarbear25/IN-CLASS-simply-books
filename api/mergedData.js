import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObj) => {
    getSingleAuthor(bookObj.author_id).then((authorObject) => {
      resolve({ ...bookObj, authorObject });
    });
  }).catch(reject);
});

const getAuthorDetails = async (firebaseKey) => {
  const author = await getSingleAuthor(firebaseKey);
  const books = await getAuthorBooks(author.firebaseKey);

  return { ...author, books };
};

const deleteAuthorBookRelationships = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromise = authorBooksArray.map((book) => deleteBook(book.firebaseKey));
    Promise.all(deleteBookPromise).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getBookDetails, getAuthorDetails, deleteAuthorBookRelationships };
