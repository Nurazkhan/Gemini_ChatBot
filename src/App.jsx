import React from 'react'
import './App.css'
import Bot from './bot'
import Dialogue from './Dialogue'
function App() {
  return (
    <div className='bg-primary'>
      <Dialogue />
      <Bot />
    </div>
  )
}

export default App