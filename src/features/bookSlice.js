import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { bookApi } from "./Api";

const initialState = {
    books: [],
    status: 'idle',
    error: null,
    book: null,
};

export const fetchBooks = createAsyncThunk(
    'fetchBooks',
    async () => {
      const response = await axios.get(bookApi);
      console.log(response.data);
      return response.data;
    }
);

export const DeleteBook = createAsyncThunk(
  'DeleteBook',
  async ({book}) => {
    console.log(book);
    
    const response = await axios.delete(bookApi +book.id);
    console.log(response);
    return book;
  }
);



export const AddBook = createAsyncThunk(
  'AddBook',
  async (data,) => { 
    axios.post(bookApi, data)
    .then(function (response) {
      
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
);


export const EditBook = createAsyncThunk(
  'EditBook',
  async ({data,id}) => { 
    console.log(id);
    axios.put(`${bookApi}${id}`, data).then((res) => {
      console.log(res);
      console.log(res.data);
      return res.data;
    });
  }
);


export const FetchBook = createAsyncThunk(
  'FetchBook',
  async (id) => {
    const response = await axios.get(bookApi+id);
    console.log(response.data);
    return response.data;
  }
);


const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBooks.pending, (state) => {
          state.status = 'loading';
          console.log("loading books");
        })
        .addCase(fetchBooks.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.books = action.payload;
        })
        .addCase(fetchBooks.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          console.log(" Failed loading books");
        })
        .addCase(AddBook.pending, (state) => {
          state.status = 'loading';
          console.log("Adding book");
        })
        .addCase(AddBook.fulfilled, (state, action) => {
          state.status = 'succeeded';
          console.log("Added book");
          //state.books.push(action.payload);
        })
        .addCase(AddBook.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          console.log(" Failed loading books");
        })
        .addCase(FetchBook.pending, (state) => {
          state.status = 'loading';
          console.log("Fetching book");
        })
        .addCase(FetchBook.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.book = action.payload;
          
        })
        .addCase(FetchBook.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          console.log(" Failed loading book");
        })
        .addCase(DeleteBook.pending, (state) => {
          state.status = 'loading';
          console.log("Deleting book");

        })
        .addCase(DeleteBook.fulfilled, (state, action) => {
          state.status = 'succeeded';
          console.log(state.books.filter(book => book.id === action.payload.id)) 
          state.books = state.books.filter(book => book.id !== action.payload.id);
        })
        .addCase(DeleteBook.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          console.log(" Failed loading book");
        })
        .addCase(EditBook.pending, (state) => {
          state.status = 'loading';
          console.log("Editing book");

        })
        .addCase(EditBook.fulfilled, (state, action) => {
          state.status = 'succeeded';
        })
        .addCase(EditBook.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          console.log(" Failed editing book");
        });
    },
  });

  export const getBooksStatus = (state) => state.app.status;
  export default booksSlice.reducer;