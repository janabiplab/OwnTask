import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase"; 
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import userImage from "../assets/userLogin.jpeg"
import { Link,useNavigate} from "react-router-dom";

function Authentication() {
  const [user, setUser] = useState(null);
  const navigate=useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
   
    return () => unsubscribe();
  }, []);

  // Google Sign-In Function
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/create")
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  

  return (
    <LoginContainer>
      <Clogin>
      {user ? (
        <>
          <Profile>
            <img src={userImage} alt="User" />

            <h3>{user.displayName}</h3>
            <p>{user.email}</p>
            <p>Go to <Link to="/"><span>Home</span></Link> page and create your work</p>
            <Button onClick={handleLogout}>Logout</Button>
          </Profile>
          
        </>
      ) : (
        <Button onClick={handleLogin}>Sign in with Google</Button>
      )}
      </Clogin>
    </LoginContainer>
  );
}

export default Authentication;
const Clogin=styled.div`
  width:auto;
  height:auto;
  background-color:#f74b08;
  padding:10px;
`

// Styled Components
const LoginContainer = styled.div`
  width:100%;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  height:auto;
  /* height: calc(100vh - 70px);  */
  top:70px;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
 
  box-sizing:border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #4285f4;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color:white;
  span{
    font-weight:650;
    color:black;
    text-decoration:none;
  }
  p{
    font-weight:550;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
`;
