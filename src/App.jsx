import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./layouts/Footer";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { storeContext } from "./context/storeContext";
import Hero from "./pages/Hero";
import Signout from "./pages/Signout";
import Book from "./pages/Book";

function App() {
  const { isAuth } = useContext(storeContext);

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={isAuth ? <Dashboard /> : <Hero />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard/> : <Login/>}  />
        <Route path="/signout" element={isAuth ?  <Signout /> : <Login/> } />   
        <Route path="/book/:bookId" element={isAuth ? <Book /> : <Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
