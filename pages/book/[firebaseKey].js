/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getBookDetails } from '../../api/mergedData';

export default function ViewBook() {
  // TODO: Set a state for book
  const [bookDetails, setBookDetails] = useState({});

  // TODO: Call Router Hook
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getBookDetails(firebaseKey).then(setBookDetails);
  }, []);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={bookDetails.image} alt={bookDetails.title} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {bookDetails.title} by {bookDetails.authorObject?.first_name} {bookDetails.authorObject?.last_name}
            {bookDetails.authorObject?.favorite ? '🤍' : ''}
          </h5>
          Author Email: <a href={`mailto:${bookDetails.authorObject?.email}`}>{bookDetails.authorObject?.email}</a>
          <p>{bookDetails.description || ''}</p>
          <br />
        </div>
        <br />
        <p>
          {bookDetails.sale ? `🏷️ Sale $${bookDetails.price}` : `$${bookDetails.price}` }
        </p>
      </div>
    </>
  );
}
