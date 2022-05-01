import "./diner.css";
import "bootstrap/dist/css/bootstrap.min.css"
import {BsPerson} from "react-icons/bs";
import {FaUtensilSpoon} from "react-icons/fa";
export default function Diner(props){
    let d = props.state === 2 ? null : "none";
    let color = props.state === 0 ? "white" : props.state === 1 ? "yellow" : "green";
    const spoo = props.state === 2 ? (<div className="spoon-space" >
    <FaUtensilSpoon className="spoon left"/>
    <FaUtensilSpoon className="spoon right"/>
    </div>) : (<div className="space-nospoon"></div>);
    return (
          <div className = 'diner-card card' style = {{...props.style, backgroundColor:color}}>
              {spoo}
              <center>
              <BsPerson  className="person"/>
              </center>
              
            
        </div>
    );
}