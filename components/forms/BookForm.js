import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createBook, updateBook } from '../../api/bookData';
import { useAuth } from '../../utils/context/authContext';
import { getAuthors } from '../../api/authorData';

const intialState = {
  title: '',
  description: '',
  image: '',
  price: '',
  sale: false,
};

function BookForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [authors, setAuthors] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getAuthors(user.uid).then(setAuthors);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateBook(formInput).then(() => router.push('/books'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createBook(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateBook(patchPayload).then(() => {
          router.push('/books');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Description"
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter Book Image"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Price"
            name="price"
            value={formInput.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Select
          name="author_id"
          onChange={handleChange}
          value={formInput.author_id}
          required
        >
          <option value="">Select An Author</option>

          {
          authors.map((author) => (
            <option
              key={author.firebaseKey}
              value={author.firebaseKey}
            >
              {author.first_name} {author.last_name}
            </option>
          ))
        }

        </Form.Select>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="switch"
            label="On Sale?"
            name="sale"
            checked={formInput.sale}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                sale: e.target.checked,
              }));
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Book' : 'Submit Book'}
        </Button>
      </Form>
    </>
  );
}

BookForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    sale: PropTypes.bool,
    title: PropTypes.string,
    author_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BookForm.defaultProps = {
  obj: intialState,
};

export default BookForm;
