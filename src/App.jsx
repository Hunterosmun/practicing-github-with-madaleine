import React from 'react'
import styled from 'styled-components'

import logo from './logo.svg'
import './App.css'

function App () {
  return (
    <Wrapper>
      <img src={logo} className='App-logo' alt='logo' />
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
