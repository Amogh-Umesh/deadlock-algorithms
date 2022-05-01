import DiningTable from './diningtable.png';
import "bootstrap/dist/css/bootstrap.min.css"
import "./dining.css";
import "./dt.css";
import Plate from "./plate.png";
import { FaUtensilSpoon } from "react-icons/fa";
import Diner from './diner.js';
import { useRef, useState, useEffect } from 'react';
export default function Dt(props) {
    const arr1 = new Array(props.philosophers).fill(0);
    const arr2 = new Array(props.philosophers).fill(-1);
    const [philosophers, setPhilosophers] = useState(arr1);
    const [spoons, setSpoons] = useState(arr2);

    const spo = useRef();
    spo.current = spoons;

    const phil = useRef();
    phil.current = philosophers;
    const nr = useRef();
    nr.current = props.philosophers;
    const n1 = props.philosophers;
    const speed = useRef();
    speed.current = props.speed;
    const angle = 360 / n1;

    function diningPhilosopher() {
        for (let i = 0; i < n1; i++) {
            philosopherMadness(i);
        }
    }

    async function philosopherMadness(index) {
        await sleep(speed.current * 1000 * (Math.random() * 4 + 1));
        while (true) {
            let temp1 = spo.current;
            let temp2 = phil.current;
            let n1 = nr.current
            // console.log(`spoon:${temp1} phil:${temp2}`)
            console.log(n1)
            await sleep(speed.current * 1000 * (Math.random() * 2 + 1));
            let changeState = false;
            let newState = 0;
            changeState = Math.floor(Math.random() * 2) === 1 ? true : false;
            if (changeState) {
                
                let dp = phil.current;
                newState = parseInt(dp[index]) === 0 ? 1 : parseInt(dp[index]) === 1 ? 2 : 0;
                if (index === 0) {
                    if (newState === 2) {
                        let spoon = spo.current;

                        if ((parseInt(spoon[n1 - index - 1]) === -1 && parseInt(spoon[index]) === -1)) {
                            setSpoons(spoons => [index, ...spoons.slice(index + 1, n1-1), index]);
                            
                            spoon = spo.current;
                            // if (parseInt(spoon[n1 - index - 1]) === index && parseInt(spoon[index]) === index) {
                            //     setPhilosophers((prev) => ([newState, ...prev.slice(index + 1)]));
                            //     await sleep(speed.current * 1000);
                            // }
                            setPhilosophers((prev) => ([newState, ...prev.slice(index + 1)]));
                        }
                        
                    } else if (newState === 0) {
                        await sleep(speed.current * 3000);
                        setSpoons(spoons => [-1, ...spoons.slice(index + 1, n1-1), -1]);
                        setPhilosophers((prev) => ([newState, ...prev.slice(index + 1)]));
                        await sleep(speed.current * 4000);
                    } else {
                        await sleep(speed.current * 1000);
                        setPhilosophers((prev) => ([newState, ...prev.slice(index + 1)]));
                    }
                } else {
                    if (newState === 2) {
                        let spoon = spo.current;

                        if ((parseInt(spoon[index - 1]) === -1 && parseInt(spoon[index]) === -1)) {
                            setSpoons(spoons => [...spoons.slice(0, index - 1), index, index, ...spoons.slice(index + 1)]);
                            spoon = spo.current;
                            // if (parseInt(spoon[index - 1]) === index && parseInt(spoon[index]) === index) {
                            //     setPhilosophers((prev) => ([...prev.slice(0, index), newState, ...prev.slice(index + 1)]));
                            //     await sleep(speed.current * 1000);
                            // }
                            setPhilosophers((prev) => ([...prev.slice(0, index), newState, ...prev.slice(index + 1)]));
                        }
                        
                    } else if (newState === 0) {
                        await sleep(speed.current * 3000);
                        setSpoons(spoons => [...spoons.slice(0, index - 1), -1, -1, ...spoons.slice(index + 1)]);
                        setPhilosophers((prev) => ([...prev.slice(0, index), newState, ...prev.slice(index + 1)]));
                        await sleep(speed.current * 6000);
                    } else {
                        await sleep(speed.current * 1000);
                        setPhilosophers((prev) => ([...prev.slice(0, index), newState, ...prev.slice(index + 1)]));
                    }
                }

            }

        }
    }


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        setPhilosophers(arr1);
        setSpoons(arr2);
        diningPhilosopher();
    }, [n1, speed.current, props.reset]);



    const din = [...Array(n1)].map((item, index) => {
        let x_center = 45;
        let y_center = 45;
        let r = 40;
        let first_diner = 360 / (2 * n1) + 270;
        let a = first_diner + (angle * index) > 360 ? first_diner + (angle * index) - 360 : first_diner + (angle * index);
        let x = x_center + r * Math.cos(a * Math.PI / 180);
        let y = y_center - r * Math.sin(a * Math.PI / 180);
        let rot = 225 - a; //270 - 45 = 225;
        let disp = index === n1-1 ? (parseInt(philosophers[index]) === 2 || parseInt(philosophers[0]) === 2 ? "none" : "block"): (parseInt(philosophers[index]) === 2 || parseInt(philosophers[index + 1]) === 2 ? "none" : "block");
        return (
            <FaUtensilSpoon key={index} style={{ top: `${y}%`, left: `${x}%`, transform: `rotate(${rot}deg)`, display: `${ disp }` }} className='table-spoon' />
        );
    })
    const plates = [...Array(n1)].map((item, index) => {
        let x_center = 40;
        let y_center = 40;
        let r = 37;
        let first_diner = 270;
        let a = first_diner + (angle * index) > 360 ? first_diner + (angle * index) - 360 : first_diner + (angle * index);
        let x = x_center + r * Math.cos(a * Math.PI / 180);
        let y = y_center - r * Math.sin(a * Math.PI / 180);
        let rot = 225 - a; //270 - 45 = 225;
        return (
            <div key={index}>
                <img src={Plate} style={{ top: `${y}%`, left: `${x}%` }} className='plate' />

            </div>

        );
    })

    const phils = [...Array(n1)].map((item, index) => {
        let x_center = 35;
        let y_center = 35;
        let r = 62;
        let first_diner = 270;
        let a = first_diner + (angle * index) > 360 ? first_diner + (angle * index) - 360 : first_diner + (angle * index);
        let x = x_center + r * Math.cos(a * Math.PI / 180);
        let y = y_center - r * Math.sin(a * Math.PI / 180);
        let rot = 225 - a; //270 - 45 = 225;
        return (
            <div key={index}>
                <Diner style={{ top: `${y}%`, left: `${x}%` }} state={parseInt(philosophers[index])} />
            </div>

        );
    })
    return (
        <div className='table-space' style={{userSelect:"none"}}>
            <img src={DiningTable} alt='dining table' className='table-img' />
            {/* {console.log(spoons)} */}
            {din}
            {plates}
            {phils}
        </div>
    )
}