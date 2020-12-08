
export function VerificarTextInput (inputType){
  //let type = 'text'
  switch (inputType){

    case 'text':
      return true

    case 'email':
      return true

    case 'number':
      return true

    case 'textarea':
      return true

    default:
      return false
  }

}