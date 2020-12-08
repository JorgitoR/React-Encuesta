import React, {useEffect, useState} from 'react'

import {

  EncuestaSelectInput, 
  EncuestaRadioInput, 
  EncuestaTextInput,

}from './input'

import {
  VerificarTextInput

}from './verificar'


export const Encuesta = (props) =>{

  //const [inlineData, setInlineData] = useState({})
  const [page, setPage] = useState(1)
  const [isFinalPage, setIsFinalPage] = useState(false)
  const [encuestavalues, setEncuestaValues] = useState({})

  const [cargarInputs, setCargarInputs] = useState([])

  const {encuestaId} = props

  useEffect(()=>{
    if(encuestaId){
      // check it's a file
      const inputDataFile = import(`../data/encuesta_${encuestaId}.json`)
      //http request

      inputDataFile.then(response=>{
        //creamos una promesa
        console.log(response)
        setCargarInputs(response.default)
      })   

    }
  })

  const triggerBackendUpdate = () => {

    console.log(encuestavalues)

    setPage(1)
    setEncuestaValues({})

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.persist()
    console.log(event.target.elements)


    //let formData = new FormData()
    for(let formInput of event.target.elements){
        
        //if(formInput.name !== 'save_btn'){
          //  console.log(formInput.name, formInput.value)
            //formData.append(formInput.name, formInput.type, formInput.checked, formInput.value)
        //}

        console.log(formInput.type, formInput.value)
        const verificarType = VerificarTextInput(formInput.type)
        if (verificarType){
            //console.log(formInput.name, formInput.value)
            //formData.append(formInput.name, formInput.value)
            encuestavalues[formInput.name] = formInput.value
        }

        if(formInput.type === 'select-one' ){
          //console.log(formInput.name, formInput.value)
          //formData.append(formInput.name, formInput.value)
          encuestavalues[formInput.name] = formInput.value

        }

         if(formInput.type === 'select-multiple'){
          //console.log(formInput.options)
          const selecionar = [].filter.call(formInput.options, option => option.selected)
          //console.log(selecionar)
          const values = selecionar.map(option => option.value)
          console.log(values)
          //console.log(formInput.name, values)
          //formData.append(formInput.name, values)
          encuestavalues[formInput.name] = formInput.value

        }

        if(formInput.checked){
          console.log(formInput.name, formInput.value)
          encuestavalues[formInput.name] = formInput.value
          //formData.append(formInput.name, formInput.value)
        }

    }

    setEncuestaValues(encuestavalues)

    const nextPage = page + 1
    //const inputs = props.inputs ? props.inputs.filter(inputOption => inputOption.page === nextPage) : []
    const inputs = cargarInputs ? cargarInputs.filter(inputOption => inputOption.page === nextPage) : []
    
    if (isFinalPage){

      triggerBackendUpdate()
    }else{
      if(inputs.length === 0){
        //console.log("encuestavalues", encuestavalues)
        setIsFinalPage(true)
      }else{
        //console.log("encuestavalues", encuestavalues)
        setPage(nextPage)
      }

    }

  }

  //const callback = (data) => {
    //console.log(data)
  //}

  //const callback = (name, value) => {
    //console.log('callback', name, value)
    //inlineData[name] = value 
    //setInlineData(inlineData)
    //console.log(inlineData)
  //}

  //const onClickNextPage = (event) => {
   // event.preventDefault()
    //const nextPage = page + 1
    //const inputs = props.inputs ? props.inputs.filter(inputOption => inputOption.page === nextPage) : []
    //if(inputs.length === 0){
      //setIsFinalPage(true)
    //}else{
     // setPage(nextPage)
    //}
  //}
  const inputs = cargarInputs ? cargarInputs.filter(inputOption => inputOption.page === page) : []
  
  return <form onSubmit={handleSubmit}>
        {isFinalPage !== true && inputs.map((obj, index)=>{

          const keyy = `input-${index}-${page}`
          return (obj.type === 'radio' || obj.type === 'checkbox') ?
              <EncuestaRadioInput 
                  object={obj}  
                  key ={keyy}
                  {...obj} />
              :

              (obj.type === 'select') ?
              <EncuestaSelectInput 
                            className = 'form-control mb-3'
                            object={obj}  
                            key ={keyy}
                            {...obj} />


              :

              <EncuestaTextInput 
              className='mb-3 form-control'
              type={obj.type}
              //triggerCallback={callback}
              placeholder ={obj.placeholder}
              defaultValue = {obj.defaultValue}
              name = {obj.name} 
              key ={keyy}
              {...obj}/>

        })

        }


        <button name='save_btn' 
            type='submit' 
            className='btn btn-primary my-5'>Guardar</button> 

     
        
        </form>

}