import React from 'react'
import Create from './Create'
import styled from "styled-components"

function SingleCreate({user}) {
  return (
    <SingleContainer>
        <Create user={user}/>
    </SingleContainer>
  )
}

export default SingleCreate
const SingleContainer=styled.div`
    background-color: #2d545e;
    width:100%;
    height:auto;
    overflow:hidden;
    margin-top:80px;
`