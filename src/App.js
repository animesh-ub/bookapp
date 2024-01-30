import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import ShowBooks from './components/ShowBooks';
import AddNewBookForm from './components/AddNewBookForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewBook from './components/ViewBook';
import EditNewBookForm from './components/EditNewBookForm';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
            <Route exact path="/" element={<ShowBooks/>} />
            <Route path="/addbook" element={<AddNewBookForm/>} />
            <Route path ="/viewbook/:id" element = {<ViewBook/>} />
            <Route path="/showbooks" element={<ShowBooks/>} />
            <Route path="/editbook/:id" element={<EditNewBookForm/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
