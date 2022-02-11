import axios from 'axios'
import React from 'react'
import styled from 'styled-components'

function App () {
  const [info, setInfo] = React.useState([])
  React.useEffect(() => {
    async function apiCall () {
      let people = await axios.get('localhost:3001/api/people')
      console.log(people)
      setInfo(people)
    }
    apiCall()
  }, [])
  return (
    <Wrapper>
      <div>Hello</div>
      <div>How's everyone doing??</div>
      <div>{info}</div>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
