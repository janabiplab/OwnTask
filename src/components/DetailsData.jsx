import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc, serverTimestamp ,onSnapshot} from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";


function Datadetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [work, setWork] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        if (!id) return;
      
        const docRef = doc(db, "daily_work", id);
      
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const docData = docSnap.data();
            setData(docData);
            setTitle(docData.title || "");
            setWork(docData.work || "");
            setTime(docData.time || "");
          } else {
            console.log("No such document!");
            navigate("/");
          }
          setLoading(false);
        });
      
        return () => unsubscribe(); // Cleanup listener on unmount
      }, [id, navigate]);
      

    // ✅ Update function
    const handleUpdate = async () => {
        if (!title || !work || !time) {
            alert("Please fill all fields!");
            return;
        }

        try {
            const docRef = doc(db, "daily_work", id);
            await updateDoc(docRef, {
                title,
                work,
                time: parseFloat(time),
                updateAt: serverTimestamp()
            });

            alert("Data updated successfully!");
            setEditing(false);
            setData({ ...data, title, work, time, updateAt: new Date().toLocaleString() });
            navigate(`/Details/${id}`);
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    // ✅ Delete function
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this work?");
        if (!confirmDelete) return;

        try {
            const docRef = doc(db, "daily_work", id);
            await deleteDoc(docRef);
            alert("Work deleted successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };
    const BackHome=()=>{
        navigate("/")
    }

    if (loading) return <p>Loading...</p>;

    return (
        <DetailsContainer>
            {data ? (
                <>
                    {editing ? (
                        <EditContainer>
                            <label>Title:</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label>Work Description:</label>
                            <textarea value={work} onChange={(e) => setWork(e.target.value)} />
                            <label>Time (in hours):</label>
                            <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditing(false)}>Cancel</button>
                        </EditContainer>
                    ) : (
                        <>
                        <AllDetails>
                            <h2>{data.title}</h2>
                            <p><strong>Work Description:</strong> {data.work}</p>
                            <p><strong>Time Spent:</strong> {data.time} hours</p>
                            <p><strong>Created At:</strong> {data.createAt ? new Date(data.createAt.toDate()).toLocaleString() : "N/A"}</p>
                            <p><strong>Last Updated:</strong> {data.updateAt ? new Date(data.updateAt.toDate()).toLocaleString() : "Never Updated"}</p>
                            <h3>After Update Please Refresh The Page</h3>
                            <button onClick={() => setEditing(true)}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                            <button onClick={BackHome}>Back</button>
                        '</AllDetails>    
                        </>
                    )}
                </>
            ) : (
                <p>Data not found</p>
            )}
        </DetailsContainer>
    );
}

export default Datadetails;
const AllDetails=styled.div`
max-width:800px;
    padding:8px;
    box-sizing:border-box;
    background-color:#131212;
    width:100%;
    height:auto;
    border-radius:5px;
    text-align: justify;
    h3{
        background-color:red;
        padding:3px;
        color:white;
        text-align:center;
        font-weight:400;
        border-radius:5px;
    }
    button{
        margin-right:10px;
        cursor:pointer;
        &:hover{
            border:1px solid white;
            background-color:black;
            color:white;
           
            border-radius:2px;
        }
    }
    
    p{
        color: #ebdcd6;;
        
    }
    strong{
        color: #f74b08;
        font-weight:bold;
        text-shadow:2px 2px 2px black;
    }
    h2{
        color:#1a95e7;
        text-shadow:2px 2px 2px black;

    }
    p{

    }
`

const DetailsContainer = styled.div`
    padding: 10px;
   
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    display:flex;
    align-items:center;
    justify-content:center;
    height:auto;
    margin-top:80px;
   
    width:100%;
    
    box-sizing:border-box;
    
`;

const EditContainer = styled.div`
    background-color:#585555;
    display:flex;
    border-radius:5px;
    flex-direction:column;
    gap: 10px;
    padding:5px;
    width: 100%; 
    box-sizing: border-box;
    max-width:800px;
    border: 1px solid #ccc;

   
    input, textarea {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width:100%;
        padding-right:8px !important;
        box-sizing:border-box;
        
    }
    button {
        padding: 8px 12px;
        margin-right: 10px;
        cursor: pointer;
        width:100%;
    }
`;
