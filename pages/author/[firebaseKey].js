/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthorDetails } from '../../api/mergedData';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;
  const getADetails = () => {
    getAuthorDetails(firebaseKey).then(setAuthorDetails);
  }

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getADetails
  }, [firebaseKey]);

  return (
    <div>{authorDetails.books?.map((book) => (
        <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getADetails}/>
    ))}
    </div>
  );
}
