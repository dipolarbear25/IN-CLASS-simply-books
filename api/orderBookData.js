import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrderBooks = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderBooks.json?orderBy="orderId"&equalTo="${orderId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createOrderBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderBooks.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrderBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderBooks/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET A SINGLE BOOK ORDER, SO THAT I CAN REMOVE THE BOOK FROM THE ORDER
// REFERENCED IN DOMEVENTS.JS LINE 47
const getSingleBookOrder = async (bookId, orderId) => {
  const allOrderBooks = await getOrderBooks(orderId);
  const singleOrderBook = await allOrderBooks.find((b) => b.bookId === bookId);

  return singleOrderBook;
};

// DELETE BASED ON FIREBASEKEY OF THE ORDER BOOK RELATIONSHIP
const deleteBookOrder = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderBooks/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getSingleBookOrder, getOrderBooks, updateOrderBook, deleteBookOrder, createOrderBook,
};
