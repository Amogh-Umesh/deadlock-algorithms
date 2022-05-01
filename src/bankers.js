import './Banker.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from 'react';


function TRow(props) {
  let tableMaxResourceData = [...Array(props.resources)].map((e, i) => {
    return <td key={i}>{props.maxResources[i + 1]}</td>

  });

  let tableAllocResourceData = [...Array(props.resources)].map((e, i) => (
    <td key={i}>{props.allocResources[i + 1]}</td>
  ));

  let tableNeededResourceData = [...Array(props.resources)].map((e, i) => (
    <td key={i}>{props.maxResources[i + 1] - props.allocResources[i + 1]}</td>
  ));
  return (
    <tr>
      <td>{props.PID}</td>
      {tableMaxResourceData}
      {tableAllocResourceData}
      {tableNeededResourceData}
    </tr>
  );
}




function Bankers() {
  const [mainInput, setMainInput] = useState([0, 0]);
  const [resources, setResources] = useState({});
  const [processes, setProcesses] = useState({});
  const [maxResources, setMaxResources] = useState({});
  const [allocResources, setAllocResources] = useState({});
  const [iserror, setIserror] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(1);
  const [isSafe, setIsSafe] = useState(false);
  const [button, setButton] = useState(0);
  const [reqResources, setReqResources] = useState({});
  const [reqResourcesPID, setReqResourcesPID] = useState(0);
  const [reqStatus, setReqStatus] = useState(0);
  const [safetyStatus, setSafetyStatus] = useState(0);
  const [safetySequence, setSafetySequence] = useState([]);
  function safety() {
    let res = [];
    let max = [];
    let alloc = [];
    let p = mainInput[0];
    let r = mainInput[1];
    let tem = false;
    let completed = [...Array(p)];
    let safety_sequence = [];
    for (let i = 1; i <= r; i++) {
      res.push(parseInt(resources[i]));
    }
    for (let i = 1; i <= p; i++) {
      let temp = [];
      for (let j = 1; j <= r; j++) {
        temp.push(parseInt(processes[i].MaximumResources[j]));
      }
      max.push(temp);
      temp = [];
      for (let j = 1; j <= r; j++) {
        temp.push(parseInt(processes[i].AllocatedResources[j]));
      }
      alloc.push(temp);
    }
    for (let i = 0; i < p; i++) {
      completed[i] = false;
    }

    for (let i = 0; i < p; i++) {
      for (let j = 0; j < p; j++) {
        if (completed[j] === false) {
          tem = false;
          for (let k = 0; k < r; k++) {
            // console.log(max[j][k]-alloc[j][k], res[k]);
            if ((max[j][k] - alloc[j][k]) > res[k]) {
              tem = true;
              // console.log('here');
            }
          }
          if (tem === false) {
            safety_sequence.push(j + 1);
            for (let k = 0; k < r; k++) {
              res[k] = res[k] + alloc[j][k];
            }
            completed[j] = true;
            // console.log(completed)
          }
        }
      }
    }
    tem = false;
    for (let i = 0; i < p; i++) {
      if (completed[i] === false) {
        tem = true;
        break;
      }
    }
    if (tem === true) {
      setSafetyStatus(1);
    } else {
      // console.log(max)
      // console.log(alloc)
      // console.log(res)
      setSafetyStatus(2);
      setSafetySequence(safety_sequence);
    }
  }

  function resourceRequest() {
    let res1 = [...new Array(mainInput[1])];
    let max1 = [...new Array(mainInput[0])].fill(new Array(mainInput[1]));
    let alloc1 = [...new Array(mainInput[0])].fill(new Array(mainInput[1]));
    let p1 = mainInput[0];
    let r1 = mainInput[1];
    let temp1 = false;
    let completed1 = [...Array(p1)];
    let safety_sequence1 = [];
    console.log(resources)
    for (let i = 1; i <= r1; i++) {
      res1.push(parseInt(resources[i]));
    }
    
    for (let i = 1; i <= p1; i++) {
      for (let j = 1; j <= r1; j++) {
        max1[i-1][j-1] = parseInt(processes[i].MaximumResources[j]);
        alloc1[i-1][j-1] = parseInt(processes[i].AllocatedResources[j]);
      }
    }
    // console.log(alloc1)
    for (let i = 1; i <= r1; i++) {
      if (typeof reqResources[i] == 'undefined') {
        setReqStatus(1);
        setSafetyStatus(0);
        return;
      }
    }
    for (let i = 1; i <= r1; i++) {
      if (parseInt(reqResources[i]) > res1[i - 1] || parseInt(reqResources[i]) > max1[i - 1]) {
        setReqStatus(1);
        setSafetyStatus(0);
        return;
      }
    }
    for (let i = 1; i <= r1; i++) {
      alloc1[i - 1] = alloc1[i - 1] + parseInt(reqResources[i]);
    }

    for (let i = 0; i < p1; i++) {
      completed1[i] = false;
    }

    for (let i = 0; i < p1; i++) {
      for (let j = 0; j < p1; j++) {
        if (completed1[j] === false) {
          temp1 = false;
          for (let k = 0; k < r1; k++) {
            // console.log(max[j][k]-alloc[j][k], res[k]);
            if ((max1[j][k] - alloc1[j][k]) > res1[k]) {
              temp1 = true;
              // console.log('here');
            }
          }
          if (temp1 === false) {
            safety_sequence1.push(j + 1);
            for (let k = 0; k < r1; k++) {
              res1[k] = res1[k] + alloc1[j][k];
            }
            completed1[j] = true;
            // console.log(completed)
          }
        }
      }
    }
    temp1 = false;
    for (let i = 0; i < p1; i++) {
      if (completed1[i] === false) {
        temp1 = true;
        break;
      }
    }
    if (temp1 === true) {
      setReqStatus(1);
      setSafetyStatus(0);
    } else {
      let a = {};

      for (let i = 1; i <= p1; i++) {
        a[i] = alloc1[i - 1];
      }
      // console.log(max1)
      // console.log(alloc1)
      // console.log(res1)
      setReqStatus(2);
      setSafetyStatus(2);
      setSafetySequence(safety_sequence1);
      // setProcesses(prev => ({ ...prev, [reqResourcesPID]: { MaximumResources: { ...maxResources }, AllocatedResources: { ...a} } }));
      // console.log(alloc);
      // console.log(a)
    }


  }

  function safetyClick() {
    setButton(2);
    setSafetyStatus(0);
    setReqStatus(0);
    safety();
  }

  function resourceClick() {
    setButton(1);
    setSafetyStatus(0);
    setReqStatus(0);
  }









  function handleprocesses(event) {
    if (parseInt(event.target.value) >= 0) {
      setMainInput(prev => [parseInt(event.target.value), prev[1]]);
    }
  }
  function resourceInput(event, index) {
    if (parseInt(event.target.value) >= 0) {
      setResources(prev => ({ ...prev, [index]: parseInt(event.target.value) }));
    }
  }
  function handlemaxResources(event, index) {
    setMaxResources(prev => ({ ...prev, [index]: parseInt(event.target.value) }));
    // if (parseInt(event.target.value) <= resources[index]) {
    //   setIserror(false);
    //   setMaxResources(prev => ({ ...prev, [index]: parseInt(event.target.value) }));
    // } else {
    //   setIserror(true);
    // }
  }
  function handleallocResources(event, index) {
    if (parseInt(event.target.value) <= maxResources[index]) {
      setIserror(false);
      setAllocResources(prev => ({ ...prev, [index]: parseInt(event.target.value) }));
    } else {
      setIserror(true);
    }
  }
  function handlereqResources(event, index) {
    setReqResources(prev => ({ ...prev, [index]: parseInt(event.target.value) }));
  }
  function handlereqResourcesPID(event) {
    if (processes[parseInt(event.target.value)] !== undefined) {
      setReqResourcesPID(parseInt(event.target.value));
    }
  }

  function handleresources(event) {
    if (parseInt(event.target.value) >= 0) {
      setMainInput(prev => [prev[0], parseInt(event.target.value)]);
    }
  }
  function getinput() {
    let resources = [...Array(mainInput[1])].map((e, i) => (
      <div key={i} className='var-inp-box'>
        <span className='inp-text'>Resource {i + 1}: </span>
        <input type='number' min={0} className='input' placeholder='0' onChange={e => { resourceInput(e, i + 1) }} />
      </div>
    )
    );
    return (
      <div className='inp-box'>
        {resources}
      </div>
    )
  }
  let maxResourceAllocation = [...Array(mainInput[1])].map((e, i) => (
    <div key={i} className='var-form-box'>
      <span className='inp-text'>Resource {i + 1}: </span>
      <input type='number' min={0} className='input' placeholder='0' onChange={e => { handlemaxResources(e, i + 1) }} />
    </div>
  )
  );
  let reqResource = [...Array(mainInput[1])].map((e, i) => (
    <div key={i} className='var-form-box'>
      <span className='inp-text'>Resource {i + 1}: </span>
      <input type='number' min={0} className='input' placeholder='0' onChange={e => { handlereqResources(e, i + 1) }} />
    </div>
  )
  )
  let allocResourceAllocation = [...Array(mainInput[1])].map((e, i) => (
    <div key={i} className='var-form-box'>
      <span className='inp-text'>Resource {i + 1}: </span>
      <input type='number' min={0} className='input' placeholder='0' onChange={e => { handleallocResources(e, i + 1) }} />
    </div>
  )
  )
  function checkIsValid() {
    // let temp = [...Array(mainInput[1])];
    // for (let i = 0; i < mainInput[1]; i++) { temp[i] = 0 }
    // for (let i = 1; i <= Object.keys(processes).length; i++) {
    //   for (let j = 1; j <= mainInput[1]; j++) {
    //     temp[j - 1] += parseInt(processes[i].AllocatedResources[j]);
    //   }
    // }
    // for (let i = 1; i <= mainInput[1]; i++) {
    //   temp[i - 1] += parseInt(allocResources[i]);
    // }
    // for (let i = 1; i <= mainInput[1]; i++) {
    //   if (temp[i - 1] > resources[i]) {
    //     return false;
    //   }
    // }

    return true;
  }
  function next() {
    if (Object.keys(maxResources).length === mainInput[1] && Object.keys(allocResources).length === mainInput[1] && checkIsValid() && !iserror) {
      setIserror(false);
      setProcesses(prev => ({ ...prev, [currentProcess]: { MaximumResources: { ...maxResources }, AllocatedResources: { ...allocResources } } }));
      if (currentProcess === mainInput[0]) {
        submit();
      } else {
        setCurrentProcess(prev => prev + 1);
      }
    } else {
      setIserror(true);
    }
  }
  function submit() {
    for (let i = 1; i <= mainInput[0]; i++) {
      if ((typeof processes[i] != 'undefined' && typeof processes[i].MaximumResources != 'undefined' && typeof processes[i].AllocatedResources != 'undefined') && (Object.keys(processes[i].MaximumResources).length !== mainInput[1] || Object.keys(processes[i].AllocatedResources).length !== mainInput[1])) {
        setIserror(true);
        return;
      }
    }
  }
  //   useEffect(() => {
  // window.addEventListener("wheel", (evt) => {
  //     evt.preventDefault();
  //     scrollContainer.scrollLeft += evt.deltaY;
  // });
  function previous() {
    if (Object.keys(maxResources).length === mainInput[1] && Object.keys(allocResources).length === mainInput[1] && checkIsValid() && !iserror) {
      setIserror(false);
      setProcesses(prev => ({ ...prev, [currentProcess]: { MaximumResources: { ...maxResources }, AllocatedResources: { ...allocResources } } }));
      if (currentProcess === 1) {
      } else {
        setCurrentProcess(prev => prev - 1);
      }
    } else {
      setIserror(true);
    }
  }
  let form = (
    <>

      <div className='card'>
        <div className='text'>
          Enter resource requirements for process {currentProcess}:
        </div>
        <br></br>
        <div className='form-box'>
          <p className='ftext'>Max resources needed: </p>
          {maxResourceAllocation}
        </div>
        <div className='form-box'>
          <p className='ftext'>Allocated Resources: </p>
          {allocResourceAllocation}
        </div>
        <div className='error-text'>
          {iserror ? 'Please enter valid values' : ''}
        </div>
        <div className='form-box'>
          <button className='btn btn-outline-primary form-but' onClick={previous} >Previous</button>
          <button className='btn btn-outline-primary form-but' onClick={next} >{currentProcess === mainInput[0] ? "Continue" : "Continue"}</button>
        </div>
      </div>

    </>
  )
  let input_box = getinput();
  let tableResourceHeaders = mainInput[1] > 0 ? [...Array(mainInput[1])].map((e, i) => (
    <th key={i}>R{i + 1}</th>
  )) : null;


  let process_table = Object.keys(processes).map((e, i) => {
    if (typeof processes[i + 1] != 'undefined') {
      return <TRow key={i} PID={i + 1} resources={mainInput[1]} maxResources={processes[i + 1].MaximumResources} allocResources={processes[i + 1].AllocatedResources} />
    } else {
      return null;
    }
  });

  let res_request = button === 1 ? (
    <div className='card'>
      <div className='text'>
        Request resource:
      </div>
      <br></br>
      <div className='form-box'>
        {/* <div className='ftext'>
          <div style={{ display: 'table' }}>
            <p className='reqtext'>Process ID: </p>
            <input type='number' min={0} className='input' style={{ display: 'table-cell' }} onChange={e => { handlereqResourcesPID(e) }} />
          </div>

        </div> */}
        <div className='var-form-box'>
          <span className='inp-text'>Process ID: </span>
          <input type='number' min={0} className='input' style={{ display: 'table-cell' }} onChange={e => { handlereqResourcesPID(e) }} />
        </div>

        {reqResource}
      </div>
      <div className='form-box'>
        <button className='btn btn-outline-primary ' onClick={resourceRequest} >Request</button>
      </div>
    </div>) : null;



  let res_response = reqStatus === 2 ? (
    <div className='card green'>
      <div className='text'>
        Request has been approved!!
      </div>
    </div>
  ) : reqStatus === 1 ? (
    <div className='card red'>
      <div className='text'>
        Request has been denied!!
      </div>
    </div>
  ) : null;

  function get_ss() {
    if (safetyStatus === 2) {
      let ss = ' Safety Sequence: '
      for (let i = 0; i < mainInput[0]; i++) {
        if (i !== mainInput[0] - 1) {
          ss = ss.concat(`${safetySequence[i]}-->`);
        } else {
          ss = ss.concat(`${safetySequence[i]}`)
        }
      }
      return ss;
    } else {
      return ' ';
    }

  }
  let ss = get_ss();
  let safety_response = safetyStatus === 2 ? (
    <div className='card green'>
      <div className='text'>
        System is in safe state!!
      </div>
      <div>
        {ss}
      </div>

    </div>
  ) : safetyStatus === 1 ? (
    <div className='card red'>
      <div className='text'>
        System is not in safe state!!
      </div>
    </div>
  ) : null;
  return (
    <div className='main'>
      <div className='navbar topbar'>
        {/* <button className='back-button'>
          back
        </button> */}
        <h2 className='title center'>Banker's Algorithm</h2>
      </div>


      <div className='container'>
        <div className='top-box'>
          <div className='inp-box'>
            <p className='text'>
              Enter total number of processes:
            </p>
            <input className='input' type='number' min={0} id='processes' placeholder='0' onChange={handleprocesses}></input>
          </div>
          <div style={{ width: "10vw" }}></div>
          <div className='inp-box'>
            <p className='text'>
              Enter total types of resources:
            </p>
            <input className='input' type='number' min={0} id='resources' placeholder='0' onChange={handleresources}></input>
          </div>
        </div>
        <br></br>
        {mainInput[1] ? (
          <div>
            <p className='text'>
              Enter Available number of each resource:
            </p>
          </div>
        ) : (<div></div>)}

        {input_box}
        <div className='space'></div>
        {mainInput[0] && mainInput[1] ?
          form
          : (<div></div>)}

        {typeof processes != 'undefined' && Object.keys(processes).length > 0 ? (
          <table className='table table-bordered table-dark tble'>
            <thead>
              <tr>
                <th rowSpan={2}>Process ID</th>
                <th colSpan={mainInput[1]}>Max Resources</th>
                <th colSpan={mainInput[1]}>Allocated Resources</th>
                <th colSpan={mainInput[1]}>Needed Resources</th>
              </tr>
              <tr>
                {tableResourceHeaders}
                {tableResourceHeaders}
                {tableResourceHeaders}
              </tr>
              {process_table}

            </thead>


          </table>) : null}
        {Object.keys(processes).length === mainInput[0] && mainInput[0] !== 0 ? (
          <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <button type='button' className='btn btn-outline-primary' style={{ margin: '10px' }} onClick={resourceClick}>Resource-Request Algorithm</button>
            <button type='button' className='btn btn-outline-primary' style={{ margin: '10px' }} onClick={safetyClick} >Safety Algorithm</button>

          </div>
        ) : null}
        {res_request}
        {res_response}
        {safety_response}
      </div>



    </div>
  );
}

export default Bankers;
