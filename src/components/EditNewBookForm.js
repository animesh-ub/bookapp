import { Formik, Form, Field } from 'formik';
import React, { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate , useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { fetchBooks, EditBook } from '../features/bookSlice';
// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    author: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    publication_year: Yup.number()
      .required('Required'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .max(300, 'Too Long!')
      .required('Required'),
    cover_image: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
    isbn: Yup.number().required('Required'),
  });


const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

const EditNewBookForm = () => 
{
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { books } = useSelector((state) => {
        return state.app;
      });
    const editbook= books.find(book =>book.id == id);
  const years = Array.from({ length: 2024 - 1900 + 1 }, (_, i) => 1900 + i);


  useEffect(() => {
    dispatch(fetchBooks());
    // eslint-disable-next-line
  }, []);



  if(editbook!=null){
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        id="main"
      >
        <div className="" id="formdiv">
          <h1 className="text-center" id="addbookheading">
            Edit Book
          </h1>
          <Formik
            initialValues={{
              title: editbook.title,
              author: editbook.author,
              publication_year: editbook.publication_year,
              description: editbook.description,
              isbn: editbook.isbn,
              cover_image: editbook.cover_image,
            }}
            validationSchema={BookSchema}
            onSubmit={(values) => {
              console.log(values);

              dispatch(EditBook({ data: values, id: id }));
              // showToastMessage();
              
              navigate("/showbooks");
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group m-2">
                  <label>
                    <h6>Title</h6>
                  </label>
                  <Field
                    type="text"
                    className="form-control inputs"
                    name="title"
                    id="titleInput"
                    placeholder="Enter title"
                  />
                  {errors.title && touched.title ? (
                              <div className='text-danger'>{errors.title}</div>
                          ) : null}
                </div>
                <div className="form-group m-2">
                  <label>
                    <h6>Author</h6>
                  </label>
                  <Field
                    type="text"
                    className="form-control inputs"
                    name="author"
                    id="authorInput"
                    placeholder="Enter author"
                  />
                  {errors.author && touched.author ? (
                              <div className='text-danger'>{errors.author}</div>
                          ) : null}
                </div>
                <div className="form-group m-2">
                  <label>
                    <h6>Publication Date</h6>
                  </label>
                  <Field as="input"
                    id="select-year"
                    type="date"
                    className="form-select border-secondary-subtle inputs "
                    name="publication_year"
                  >
                      {/* <option  value="">
                         Select Date
                      </option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))} */}
                  </Field>
                  {errors.publication_year && touched.publication_year ? (
                              <div className='text-danger'>{errors.publication_year}</div>
                          ) : null}
                </div>
                <div className="form-group m-2">
                  <label>
                    <h6>Description</h6>
                  </label>
                      <Field as="textarea"
                          className="form-control inputs "
                          id="descriptionInput"
                          placeholder="Enter Description"
                          name="description"
                      ></Field>
                  
                  {errors.description && touched.description ? (
                              <div className='text-danger'>{errors.description}</div>
                          ) : null}
                </div>
                {/* <div className="form-group m-2">
                  <label>
                    <h6>ISBN</h6>
                  </label>
                  <Field
                    type="number"
                    className=" form-control inputs "
                    id="isbnInput"
                    placeholder="Enter ISBN "
                    name="isbn"
                  />
                  {errors.isbn && touched.isbn ? (
                              <div className='text-danger'>{errors.isbn}</div>
                          ) : null}
                </div> */}
                <div className="form-group m-2">
                  <label>
                    <h6>Cover Image</h6>
                  </label>
                  <Field
                    type="text"
                    className="form-control inputs"
                    id="coverImageInput"
                    placeholder="Enter cover image link "
                    name="cover_image"
                  />
                  {errors.cover_image && touched.cover_image ? (
                              <div className='text-danger'>{errors.cover_image}</div>
                          ) : null}
                </div>
                <div className="d-flex justify-content-center m-4">
                  <button  type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <ToastContainer />
      </div>
    );
  }else{
    console.log(books);
    return(
    <h1>Loading</h1>);
    
  }
  
};

export default EditNewBookForm;