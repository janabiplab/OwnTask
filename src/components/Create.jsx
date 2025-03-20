import React ,{useState} from 'react'
import { collection, addDoc ,serverTimestamp} from "firebase/firestore";
import {db} from "../firebase"
import styled from "styled-components"
import { Link ,useNavigate} from "react-router-dom";

function Create({user}) {
    const [title,setTitle]=useState("")
    const [time,setTime]=useState("")
    const [work ,setWork]=useState("")
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log({title,time,work})

        if (!title || !work || !time) {
            alert("Please enter all fields (title, work description, time)");
            return;
        }
        try{
            await addDoc(collection(db,"daily_work"),{
                title,
                time:parseFloat(time),
                work,
                createAt:serverTimestamp()

            })

            alert("Work saved successfully!");
            setTitle("");
            setTime("");
            setWork("");
            navigate("/")
            
        }
        catch(error){
               console.error("Error adding document: ", error);
        }

    }
  return (
     <CreateContainer>
        <CreateMain>
        <Heading>
         <p>Create Daily Work</p>
        </Heading>
        {user?(
        <form onSubmit={handleSubmit}>
            <Label>Work Title</Label><br/>
            <Input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter work title"  required /><br/><br/>
            <Label>Time Of Work</Label><br/>
            <Input type="number" value={time} onChange={(e)=>setTime(e.target.value)} placeholder="Time in hours" min="0" required/><br/><br/>
            <Label>Work Description</Label><br/>
            <Textarea value={work} onChange={(e)=>setWork(e.target.value)} placeholder="Describe Your Work" required>

            </Textarea><br/><br/>
            <Button type="submit">Create</Button>
            
        </form>
        ):(<UserLogin>
            <Login>
            <p>You are not signed in. Please log in.</p>
            <Link to="/login">
              <LoginButton>Go to Login</LoginButton>
            </Link>
            </Login>
            </UserLogin>)}
        </CreateMain>     

     </CreateContainer>
  )
}

export default Create
const CreateMain=styled.div`
box-sizing:border-box;
padding-right:10px;
 
`
const Login=styled.div`
p{
    font-size:20px;
    font-weight:bold;
    color:#f74b08;
    text-shadow:2px 2px 2px black;
}
@media screen and (max-width:600px){
    p{
        font-size:15px;
    }
}

`
const UserLogin=styled.div`
 width:100%;
 height:100%;
 
  
`
const LoginButton=styled.button`
padding:3px 6px ;
font-weight:bold;
cursor:pointer;
border:none;
border:2px;

&:hover{
   background-color:green;
   color:white;
}

`
const Button=styled.button`
padding:2px 5px;
border:none;
font-weight:700;
border-radius:4px;
color:greenyellow;
font-size:15px;
background-color:#160101;
cursor:pointer;
&:hover{
    padding:5px 7px;
    background-color:green;
    color:white;
}
    
`


const Textarea=styled.textarea`
    border:none;
    border-radius:2px;
    padding:5px;
    min-width:200px;
    min-height:80px;
    outline:none;
    
`
const Input=styled.input`
    border:none;
    border-radius:2px;
    padding:5px;
    min-width:200px;
    outline:none;
`
const Label=styled.label`
     font-size:20px;
     font-weight:600;
     color: #51e2f5;
     text-shadow:2px 2px 2px black
`
const Heading=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    p{
        font-size:30px;
        color:white;
        font-weight:600;
    }
   
    @media screen and (max-width:900px){
        p{
        font-size:25px;
        color:white;
        font-weight:600;
        }
    }
    @media screen and (max-width:600px){
        p{
        font-size:20px;
        color:white;
        font-weight:600;
        }
    }
    @media screen and (max-width:500px){
        p{
        font-size:15px;
        color:white;
        font-weight:600;
        }
    }
    
`

const CreateContainer=styled.div`
    width:100%;
    height:100%;
    padding:10px;
    display:flex;
    align-items:center;
    justify-content:center;
`