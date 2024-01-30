import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchBook } from "../features/bookSlice";


const ViewBook = () => {
    const dispatch = useDispatch();
    const book = useSelector((state) => state.app.book);
    const { id } = useParams();
    useEffect(() => {
        dispatch(FetchBook(id));
        console.log("Use Effect called");
        // eslint-disable-next-line
      },[]);
    

  if(book!=null){
    return (
        <div className="row ">
          <div className="col-12  col-md-4">
            <img id="titleimg" className="m-2  ms-5" src={book.cover_image} alt="book cover" /> 
          </div>
          <div className="col-12  col-md-8 viewDis" >
            <h1 className="m-3">Title : {book.title}</h1>
            <h2 className="m-3">Author : {book.author}</h2>
            <h3 className="m-3">Publication Year : {book.publication_year} </h3>
            <h4 className="m-3">ISBN : {book.isbn} </h4>
            <h5 className="m-3">Description : {book.description}</h5>
            <div>
          </div>
          </div>
        </div>
      );
  }
  else{
    return (
        <h1>Loading</h1>
    );
  }
};

export default ViewBook;
