import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import { Link ,useNavigate} from "react-router-dom";


function Fetchdata({user}) {
  const navigate=useNavigate()
  const [data, setData] = useState([]);
  const [currentPage,setCurrentPage]=useState(1)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData,setFilteredData]=useState([])
  const itemsPerPage=8

  useEffect(() => {
    const q = query(collection(db, "daily_work"), orderBy("createAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          title: docData.title || "No Title",
          work: docData.work || "No Work Description",
          createAt: docData.createAt ? getRelativeTime(docData.createAt) : "N/A",
        };
      });
      setData(items);
      setFilteredData(items)
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

//  Search Function
const handleSearch = () => {
  if (!searchQuery.trim()) {
    setFilteredData(data);
    setCurrentPage(1) // If empty, reset to show all data
    return;
  }
  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredData(filtered);
  setCurrentPage(1)
};
//to reset my all data

const handleReset=()=>{
  setSearchQuery("")
  setFilteredData(data)
  setCurrentPage(1)
}
const CreateData=()=>{
  navigate("/create")
}


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <FetchContainer>
      {user ? (
        <>
       <SearchDiv>
        <Search>
          <SDiv>
        <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        </SDiv>
        <CData>
        <button onClick={CreateData}>Create</button>
        <button onClick={handleReset}>Reset</button>
        
        </CData>
        
        </Search>
        
        </SearchDiv>

        {currentItems.length > 0 ? (
        currentItems.map((item) => (
          
          <DContainer key={item.id}>
            <h2>{item.title}</h2>
            <p>Created At:<span>{item.createAt}</span></p>
            <Linkd to={`/details/${item.id}`}>
              <h3>Details</h3>
            </Linkd>
            
          </DContainer>
        
        ))
      
      ) : (
        <Nodata>
          <p>No data available.</p>
        </Nodata>
      )}
       
      <NextPre>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={indexOfLastItem >= filteredData.length}>Next</button>
      </NextPre>  
      </>
      ):(
        <Datacreate>
          <Pdatabox>
          <p>Please signin and create your first data</p>
          </Pdatabox>
        </Datacreate>
      )}  

    </FetchContainer>
  );
}

export default Fetchdata;
const CData=styled.div`
   display:flex;
   justify-content:space-evenly;
   gap:10px;
   >button{
    cursor:pointer;
    &:hover{
      color:#f5ebeb;
      background-color:#151613;
    }
  }
`

const Linkd=styled(Link)`
   text-decoration:none;
`

const DContainer=styled.div`
  width:100%;
  height:auto;
  background-color:#35341c;
  box-sizing:border-box;
  margin-top:12px;
  padding:7px;
  border-radius:5px;
  color:white;
  text-align:center;
  h3{
    background-color:white;
    border-radius:2px;
  }
  h2{
    color:#778ce9;
    text-shadow:2px 2px 2px black;
  }
  p{
    font-size:18px;
    color: #94ca16;
    text-shadow:2px 2px 2px black;
    span{
      font-size:14px;
      color:#746f6f;
    }

  }
  
  
  
`
const NextPre=styled.div`
   display:flex;
   justify-content:flex-start;
   gap:10px;
   margin-top:10px;
   margin-bottom:12px;

   span{
    color:white;
   }
   button{
    cursor:pointer;
    &:hover{
      background-color:red;
      color:white;
    }
   }
`

const Nodata=styled.div`
   background-color:#120c445a;
   padding:5px;
   width:100%;
   display:flex;
   align-items:center;
   justify-content:center;
   box-sizing:border-box;
   margin-top:100px;
   p{
    text-shadow:2px 2px 2px black;
    color:white;
    font-weight:600;
    font-size:20px;
   }
   border-radius:5px;
`
const SDiv=styled.div`
  display:flex;
  justify-content:space-evenly;
  flex-wrap:wrap;
  gap:10px;
  >input{
    outline:none;
  }
  >button{
    cursor:pointer;
    &:hover{
      color:#e70404;
    }
  }
  
`
const Search=styled.div`
 margin-top:-10px;
 display:flex;
 align-items:center;
 padding:5px;
 justify-content:space-evenly;
 flex-wrap:wrap;
 gap:10px;

 
  
`

const Pdatabox=styled.div`
  width:95%;
  height:70px;
  padding:5px;
  background-color: #dd2626;
  border-radius:5px;
  p{
    color:white;
    text-shadow:2px 2px 2px black;
    font-weight:bold;
    font-size:20px;
    text-align:center;
  }
`
const Datacreate=styled.div`
   width:100%;
   display:flex;
   align-items:center;
   justify-content:center;
   margin-top:200px;
  

   @media screen and (min-width:600px){
    display:flex;
    align-items:center;
    justify-content:center;
   }
`
const SearchDiv=styled.div`
  width:100%;
  height:auto;
  background-color:#000;
  position:sticky;
  top:-10px;
 
  

  
  
   
`

const FetchContainer = styled.div`
  padding: 10px;
  box-sizing: border-box;
  overflow-y:auto;
  width:100%;
  height:100%;
`;

const getRelativeTime = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return "N/A"; // Handle missing timestamps
  const date = timestamp.toDate();
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInDays === 0) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `Today at ${formattedHours}:${minutes} ${ampm}`;
  }
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return "1 week ago";
  if (diffInDays < 21) return "2 weeks ago";
  if (diffInDays < 28) return "3 weeks ago";
  if (diffInDays < 60) return "1 month ago";
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};


  