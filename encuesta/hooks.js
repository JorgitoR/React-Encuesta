import  {useState} from 'react'

export const useInputChange = (customValue, callback) => {
  const [value, setValue]  = useState(customValue ? customValue : '')
  const handleChange = event => {
    setValue(event.target.value)

    const evento = event.target.value
    if(callback){
      callback(evento)
    }
  }
  return {
    value : value,
    handleChange: handleChange
  }
}
