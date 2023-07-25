 import { render, screen, fireEvent  } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import {configureStore} from "@reduxjs/toolkit";
 import rootReducer from "./redux/reducers";
 import {Provider} from "react-redux";
 import App from "./App";
 import React from "react";
 const store = configureStore({reducer: rootReducer});

// global.fetch = jest.fn(() =>
//      Promise.resolve({
//        ok: true,
//        json: () => Promise.resolve({
 //     "itemName": "sssss",
 //     "description": "saddfsdagasdgasd",
 //     "price": 2423,
 //     "imageURL": "https://m.media-amazon.com/images/I/61XGRcPbr4L._UF1000,1000_QL80_.jpg",
 //     "artist": {
 //         "_id": "64a6492a3f5da6cf0e59b9d5",
 //         "artistName": "Coldplay"
 //     },
 //     "_id": "64be2f60d61851a2d3929b44",
 //     "__v": 0
 // }),
//      })
// );

describe('add new item Integration Test', () => {
    render( <Provider store={store}>
        <App />
    </Provider>);
    const buttons = screen.getAllByRole('button');

    afterEach(async () => {
        const confirmDeletionButton = Array.from(buttons).find((button) => button.textContent === 'Confirm Deletion');
        fireEvent.click(confirmDeletionButton);
    });

  test('should add a new card after submitting the form', async () => {
     const nameInputEle = screen.getByTestId('From-name');
     const descriptionInputEle = screen.getByTestId('From-description');
     const priceInputEle = screen.getByTestId('From-price');
     const imgInputEle = screen.getByTestId('From-image');
     const addItemButton = Array.from(buttons).find((button) => button.textContent === 'Add Item');

     expect(nameInputEle.value).toBe("");
     expect(descriptionInputEle.value).toBe("");
     expect(priceInputEle.value).toBe("");
     expect(imgInputEle.value).toBe("");

     fireEvent.change(nameInputEle, {target: {value: 'Test Item 1'}});
     fireEvent.change(descriptionInputEle, {target: {value: 'This is Test Item 1 created by react-test-library'}});
     fireEvent.change(priceInputEle, {target: {value: 100}});
     fireEvent.change(imgInputEle, {target: {value: "https://m.media-amazon.com/images/I/61XGRcPbr4L._UF1000,1000_QL80_.jpg"}});

      expect(nameInputEle.value).toBe("Test Item 1");
      expect(descriptionInputEle.value).toBe("This is Test Item 1 created by react-test-library");
      expect(priceInputEle.value).toBe("100");
      expect(imgInputEle.value).toBe("https://m.media-amazon.com/images/I/61XGRcPbr4L._UF1000,1000_QL80_.jpg");

     fireEvent.click(addItemButton);

      expect(nameInputEle.value).toBe("");
      expect(descriptionInputEle.value).toBe("");
      expect(priceInputEle.value).toBe("");
      expect(imgInputEle.value).toBe("");

      const card = await screen.findByTestId('Card');
      expect(card).toBeInTheDocument();
      const name = await screen.findByText('Test Item 1');
      expect(name).toBeInTheDocument();
      // const description = await screen.findByText('This is Test Item 1 created by react-test-library');
      // expect(description).toBeInTheDocument();
      const deleteButton = await screen.findByText("Delete");
      expect(deleteButton).toBeInTheDocument();

      fireEvent.click(deleteButton);
  })
});
