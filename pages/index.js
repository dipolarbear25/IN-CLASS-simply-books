/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getBooks } from '../api/bookData';
import BookCard from '../components/BookCard';

function Home() {
  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks(user.uid).then(setBooks);
  }, []);

  return (
    <div className="text-center my-4">
      <h1>
        Hello {user.displayName}!!
      </h1>
      <div className="d-flex flex-wrap">
        {books.slice(0, 3).map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} />
        ))}
      </div>
      <Link href="/books" passHref>
        <Button>See All Books</Button>
      </Link>
    </div>
  );
}

export default Home;
