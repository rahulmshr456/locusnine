import React from 'react'
import './App.css'
import { Container } from 'reactstrap'
import { Header, List } from './Components'
import { ToastContainer } from 'react-toastify'

function App () {
  return (
    <Container fluid className="p-0 bg-dark fullHeight">
      <Header />
      <List />
      <ToastContainer />
    </Container>
  )
}

export default App
