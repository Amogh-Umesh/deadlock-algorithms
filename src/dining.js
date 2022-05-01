import "bootstrap/dist/css/bootstrap.min.css"
import "./dining.css";
import Dt from './dt.js';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
export default function Dining() {
  const [philNumber, setPhilNumber] = useState(5);
  const [speed, setSpeed] = useState(1);
  const [resetState, setResetState] = useState(false);
  const least_speed = 0.5;
  const max_speed = 1.5;
  const max_phils = 7;
  const least_phils = 3;

  function reset(){
    setResetState(true);
    setTimeout(() => {
      setResetState(false);
    }, 1000);
  }

  function decrement(type){
    if(type === 1){
      if(philNumber > least_phils){
        setPhilNumber(philNumber => philNumber - 1);
      }
    }else if (type === 2){
      if(speed < max_speed){
        setSpeed(speed => speed + 0.25);
      }
    }
    }

    function increment(type){
      if(type === 1){
        if(philNumber < max_phils){
          setPhilNumber(philNumber => philNumber + 1);
        }
      }else if (type === 2){
        if(speed > least_speed){
          setSpeed(speed => speed - 0.25);
        }
      }
      }

  return (
    <div>
      <div className='navbar topbar'>
        <h2 className='title center'>Dining Philosopher's Algorithm</h2>
      </div>


      <div className='container'>
        <div className='flex'>
          <div>
          <button type="button" className="btn btn-lg btn-primary" onClick={reset}>Reset</button>
          </div>
          <div >
            <span className="h4">
              Philosophers:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <div style={{display:"inline-block"}} onClick={() => {decrement(1)}}>
            <AiOutlineArrowLeft className="arrows" />
            </div>
            
            <button type="button" className="btn btn-lg btn-primary" disabled>{philNumber}</button>
            <div style={{display:"inline-block"}} onClick={() => {increment(1)}}>
            <AiOutlineArrowRight className="arrows" />
            </div>
            
          </div>
          <br></br>
          <div>
            <span className="h4">
              Simulation Speed:&nbsp;
            </span>
            <div style={{display:"inline-block"}} onClick={() => {decrement(2)}}>
            <AiOutlineArrowLeft className="arrows" />
            </div>
            <button type="button" className="btn btn-lg btn-primary" disabled>{max_speed + least_speed - speed}x</button>
            <div style={{display:"inline-block"}} onClick={() => {increment(2)}}>
            <AiOutlineArrowRight className="arrows" />
            </div>
            
          </div>

        </div>
        <Dt philosophers={philNumber} speed={speed} reset = {resetState}/>
      </div>
    </div>
  );

}