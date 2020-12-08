import React from 'react'


import {
  
  Encuesta

}from './encuesta'


const App = props => {

  return <div className='col-10 mx-auto'>

      <h1>Hola mundo</h1>
      <Encuesta encuestaId={1} />

      <Encuesta encuestaId={2} />

  </div>

}

export default App;