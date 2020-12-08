import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
//import './App.css';


class  ClockClass extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount(){
      this.setState({
        date: this.props.current ? this.props.current : new Date()
      })

      this.TimerId = setInterval(() => {
      this.tick()
    }, this.props.timer ? this.props.timer : 1000)
  }

  componentWillUnmount(){
    clearInterval(this.TimerId)
  }


  tick = () => {
    this.setState({
      date: new Date()
    })
  }

  render() {

    const {date} = this.state 
    return <div>

    <p>Hola Mundo {date.toLocaleTimeString()}</p>
    <button onClick={this.tick}>Incrementar</button>

    </div>

  }

}

function Clock(props){
  const [date, setDate] = useState(props.current ? props.current : new Date())

  useEffect(()=>{
      // Suscribe to event
      let TimerId = setInterval(function(){
        refrescarClock()
      }, props.timer ? props.timer : 1000)

      return () => {
        clearInterval(TimerId)
      }

  })

  function refrescarClock(){
    setDate(new Date())
  }

  return <div>

    El tiempo es {date.toLocaleTimeString()}

    <button onClick={refrescarClock}>Refrescar</button>

  </div>

}

function LkeBtn(props){

  const [value, setValue] = useState(0)
  const defaultVerb = props.verb ? props.verb : 'Like'
  const initialVerb = props.children ? props.children : defaultVerb
  const [verb, setVerb] = useState(initialVerb)

  //if(!props.children){
    //verbo = 'Like'
  //}

  function addOne(){
    console.log(props)
    setValue(value + 1)
    setVerb('Clicked')
  }
  return <button onClick={addOne}>{verb} {value}</button>
 

}

function App(props) {

  const nowDate  = new Date()
  const tickTime = 1000
  return <div> 

      <div>
        <ClockClass current={nowDate} timer={tickTime} />
        <Clock current={nowDate} timer={tickTime} />
      </div>

    <LkeBtn>
      Hijo
    </LkeBtn>

    <LkeBtn />
    <LkeBtn />
    <LkeBtn />

    </div>

}

export default App;
