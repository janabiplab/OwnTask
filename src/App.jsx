import React,{useState,useEffect} from 'react'
import {auth} from "./firebase"
import { onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import Home from './Files/Home'
import Navbar from './components/Navbar'
import styled ,{ createGlobalStyle } from "styled-components"
import Authentication from './components/Authentication'
import DetailsData from './components/DetailsData'
import SingleCreate from './components/SingleCreate'


function App() {
   const [user, setUser] = useState(auth.currentUser);
    
        useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe(); // Cleanup on unmount
    }, []);
  return (
   <AppContainer>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Authentication/>} />
      <Route path="/Details/:id" element={<DetailsData />} />
      <Route path="/create" element={<SingleCreate user={user}/>} />
    </Routes>
   </Router>
   </AppContainer>
   
    
  )
}

export default App
const AppContainer=styled.div`
 
`
const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevents vertical scrollbar */
    background-color: #2d545e;
  }
`;