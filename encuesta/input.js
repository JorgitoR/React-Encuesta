import React from 'react'

import {
  VerificarTextInput

}from './verificar'

import {
  useInputChange
}from './hooks'


export const EncuestaSelectInput = props => {

    const {object} = props

    return <select name={object.name} className={props.className} multiple={object.multiple}>  

      <option hidden value>----</option>
      {object.options.map((data, index) => {

      return <option 
                value={data.value} 
                id={`${object.name}-${index}`}
                className='form-check'
                key ={`${object.type}-${index}`} >
              {data.label}
          
      </option>
    })
  }
  </select>


}

export const EncuestaRadioInput = props => {

  const {object} = props

  return <div>  
    {object.options.map((data, index) => {

      return <div className='form-check' key={`${object.name}-${index}`}>

          <input 
            className ='form-check-input'
            type={object.type}
            value = {data.value}
            required = {props.required}
            name ={object.name}
            id={`${object.name}-${index}`}
            />
            <label 
              className ='form-check-label'
              htmlFor = {`${object.name}-${index}`}>
              {data.label}
            </label>

      </div>

    })
  }
  </div>

}

export const EncuestaTextInput  = props => {

  //const [name, setName]  = useState('')
  //const handleChange = event => {
  //  setName(event.target.value)
  //}

  const {value, handleChange} = useInputChange(props.defaultValue, 
  props.triggerCallback)

  //const inputType = props.type ? props.type : 'text'
  const inputType = VerificarTextInput(props.type) ? props.type : 'text'

  const inputProps = {
    className : props.className ? props.className : 'form-control',
    onChange : handleChange,
    required : props.required,
    value : value,
    type: inputType,
    //placeholder: 'Tu Nombre',
    //name : 'full_name'
    placeholder: props.placeholder ? props.placeholder : 'Your Text...',
    name : props.name ? props.name : `${inputType}_${props.key}`  

  }

  return inputType === 'textarea' ? 

        <textarea
          {...inputProps}
         /> :

        <input 
          {...inputProps}
          //className='form-control'
          //onChange={handleChange}
          //value={name}
          //type={inputType}
          //placeholder='Tu Nombre'
          //name='full_name' 
          />

}