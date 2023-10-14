/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  return (
    <div className="text-center my-4">
      <h1>
        Hello {user.displayName}!!
      </h1>
      {/* <div className="d-flex flex-wrap">
        {books.slice(0, 4).map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} />
        ))}
      </div> */}
      <Link href="/books" passHref>
        <Button>See All Books</Button>
      </Link>
      <br />
      <br />
      {/* <div className="d-flex flex-wrap">
        {authors.slice(0, 4).map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} />
        ))}
      </div> */}
      <Link href="/authors" passHref>
        <Button>See All Authors</Button>
      </Link>
    </div>
  );
}

export default Home;
