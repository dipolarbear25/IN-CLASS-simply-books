import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});

  // TODO: Call Router Hook
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getADetails = () => {
    getAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  useEffect(() => {
    getADetails();
  }, []);

  console.warn(authorDetails);
  return (
    <div>{authorDetails.books?.map((book) => (
      <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getADetails} />
    ))}
    </div>
  );
}
