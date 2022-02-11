import React from 'react'
import styled from 'styled-components'

function App () {
  return (
    <Wrapper>
      <div>Hello</div>
      <div>How's everyone doing??</div>
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
