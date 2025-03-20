
import styled from "styled-components"
import userImage from "../assets/user.png"
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged ,signOut} from "firebase/auth";
import { Link,  useNavigate } from "react-router-dom";
import userLogin from "../assets/userLogin.jpeg"

function Navbar() {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  const handlelogout=async()=>{
      try {
          await signOut(auth);
          setUser(null);
          navigate("/")
        } catch (error) {
          console.error("Error signing out:", error);
        }
  }

  return (
    <NavbarContainer>
      <NavMain>
        <Text>
            <p>OwnTask</p>
        </Text>
        <Rightbox>
           <Link to="/"><HomeButton>Home</HomeButton></Link>
           <Link to="/login"><LoginButton>signUp</LoginButton></Link>
           <Logout onClick={handlelogout}>Logout</Logout>
            
        </Rightbox>
        <UserBox>{user ?(<UserImage src={userLogin} alt="userImage" />):(<UserImage src={userImage} alt="userImage"/>)}</UserBox>
        
      </NavMain>
    </NavbarContainer>
  )
}

export default Navbar
const Logout=styled.button`
  cursor:pointer;
  background-color: #80be6d;
  border:.1px solid black;
  padding:2px 4px;
  font-weight:600;
  border-radius:2px;
  &:hover{
    border:1px solid black;
    background-color: #f33838ac;
    color:#000;
  }
`
const HomeButton=styled.button`
  cursor:pointer;
  background-color: #80be6d;
  border:.1px solid black;
  padding:2px 4px;
  font-weight:600;
  border-radius:2px;
  &:hover{
    border:1px solid black;
    background-color: #f5cd1dac;
    color:#000;
  }
      
`
const LoginButton=styled.button`
  
  cursor:pointer;
  background-color: #80be6d;
  border:1px solid black;
  padding:2px 4px;
  font-weight:600;
  border-radius:2px;
  &:hover{
    border:1px solid black;
    background-color: #ee05db;
    color:white;
  }

`
const UserImage=styled.img`
   width:30px;
   height:30px;
   border-radius:50%;
   @media screen and (min-width:600px) {
      width:50px;
      height:50px;
   }
 
   

`
const UserBox=styled.div`
      grid-column:11/-1;
      grid-row:1/-1;
      display:flex;
      align-items:center;
      justify-content:center;
`



const Rightbox=styled.div`
    grid-column:1/11;
    grid-row:2/-1;
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    margin-left:10px;
    gap:10px;
    margin-right:10px;

`
const Text=styled.div`
    grid-column:1/11;
    grid-row:1/2;
    display:flex;
    align-items:center;
    justify-content:center;
    p{
        font-size:30px;
        color: #2e54ff;
        font-weight:700;
        text-shadow:2px 2px 2px black;
        
    }
`
const NavMain=styled.div`
 width:100%;
 height:100%;
 display: grid;
  grid-template-columns:repeat(12,1fr);
  grid-template-rows:40px 30px;
  align-items:center;
`
const NavbarContainer=styled.div`
  width: 100%;
  height: 70px;
  background-color: #f74b08;
  box-sizing: border-box;
  position: fixed; 
  top: 0;
  left: 0;
  right:0;
  z-index: 100;
  
    
`
