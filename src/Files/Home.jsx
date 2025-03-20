
import styled from "styled-components"
import Create from '../components/Create'
import Fetchdata from '../components/Fetchdata'
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
function Home() {
  const [user, setUser] = useState(auth.currentUser);
  
      useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  
      return () => unsubscribe(); // Cleanup on unmount
  }, []);
  return (
    <HomeContainer>
        <LeftContainer>
          <Create user={user}/>
        </LeftContainer>
        <RightContainer>
          <Fetchdata user={user}/>
        </RightContainer>

    </HomeContainer>
  )
}

export default Home
const RightContainer=styled.div`
    flex:7;
   
    width:100%;
    height:100%;
    @media screen and (max-width:600px){
   
      height:50%
 }
  
    
    
    
`
const LeftContainer=styled.div`
    flex:6;
   
    width:100%;
  
   height:100%;
   @media screen and (max-width:600px){
   
    height:50%;
    display:none;
 }
   
  
   
 
`
const HomeContainer=styled.div`
  display:flex;
  width: 100%;
  height: calc(100vh - 70px); 
  top:70px;
  left:0;
  right:0;
  position:absolute;
  background-color: #2d545e;
  
  box-sizing: border-box;
  overflow:hidden;
  @media screen and (max-width:600px){
   
    flex-direction:column;
  }
    
`