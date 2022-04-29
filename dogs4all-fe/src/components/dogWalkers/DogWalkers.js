import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './DogWalkers.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {Slider, Input} from '@material-ui/core'



const DogWalkers = () => {
  const [dogWalkers, setDogWalkers] = useState([]);
  useEffect(() => {
    getDogWalkers();
  }, []);
  
  const getDogWalkers = () => {
    axios.get('/api/dogWalkers')
    .then((res) => {
      console.log(res);
      setDogWalkers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };


  const acptPuppy = () => {
    var isChecked = document.getElementById("acpt_pup");
    if(isChecked.checked)
    {
        axios.get('/api/dogWalkers/acpt_pup')
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogWalkers();
    }
  };

  const avblMorn = () => {
    var isChecked = document.getElementById("avbl_morn");
    if(isChecked.checked)
    {
        axios.get('/api/dogWalkers/avbl_morn')
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogWalkers();
    }
  };

  const avblAftn = () => {
    var isChecked = document.getElementById("avbl_aftn");
    if(isChecked.checked)
    {
        axios.get('/api/dogWalkers/avbl_aftn')
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogWalkers();
    }
  };

  const avblEve = () => {
    var isChecked = document.getElementById("avbl_eve");
    if(isChecked.checked)
    {
        axios.get('/api/dogWalkers/avbl_eve')
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogWalkers();
    }
  };

  const acpt_7k = () => {
    var isChecked = document.getElementById("acpt_7k");
    if(isChecked.checked)
    {
        axios.get('/api/dogWalkers/acpt_7k')
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogWalkers();
    }
  };

  const acpt_18k = () => {
    var isChecked = document.getElementById("acpt_18k");
    if(isChecked.checked)
    {
        axios.get('/api/dogWalkers/acpt_18k')
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogWalkers();
    }
  };

  const acpt_45k = () => {
    var isChecked = document.getElementById("acpt_45k");
    console.log(isChecked);
    if(isChecked.checked)
    {
        axios.get('/api/dogWalkers/acpt_45k')
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogWalkers();
    }
  };

  const acpt_abv_45k = () => {
    var isChecked = document.getElementById("acpt_abv_45k");
    if(isChecked.checked)
    {
        axios.get('/api/dogWalkers/acpt_abv_45k')
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogWalkers();
    }
  };



//Slider filter 
const [value, setValue] = useState(15)

const handleChange = (event, value) => {
  setValue(value);
  console.log(value);
  axios.get('/api/dogWalkers/price?price='+ value)                                                                     
  .then((res) => {                                                        
    console.log(res);                                         
     setDogWalkers(res.data);      
   })
  .catch((err) => {
     console.log(err);
   });
  {
      //getDogWalkers();
  }
} 


  //used for the date picker 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  


  //Used to mark start, middle and end of slider
  const mark=[
    {value: 0,
      label: "£0"},
    {value: 15,
      label: "£15"},
    {value: 30,
      label: "£30"}
  ]

  return(
    //side bar
    <div>
      <div className="sidebar">
        <h5>Find your dog walker!</h5>
        <hr></hr>
        <input type="checkbox" id="acpt_pup" onClick={() => acptPuppy()}/>
        <label for="acpt_pup">Is your dog a puppy?</label>
        <hr></hr>

        <h6>Available times</h6>
        <input type="checkbox" id="avbl_morn" onClick={() => avblMorn()}/>
        <label for="avbl_morn">6am-11am</label>
        <hr></hr>

        <input type="checkbox" id="avbl_aftn" onClick={() => avblAftn()}/>
        <label for="avbl_aftn">11am-3pm</label>
        <hr></hr>

        <input type="checkbox" id="avbl_eve" onClick={() => avblEve()}/>
        <label for="avbl_eve">3pm-10pm</label>
        <hr></hr>

        <h6>Size of dogs walkers will accept</h6>
        <input type="checkbox" id="acpt_7k" onClick={() => acpt_7k()}/>
        <label for="acpt_7k"> Less than 7kg</label>
        <hr></hr>

        <input type="checkbox" id="acpt_18k" onClick={() => acpt_18k()}/>
        <label for="acpt_18k"> Less than 18kg</label>
        <hr></hr>

        <input type="checkbox" id="acpt_45k" onClick={() => acpt_45k()}/>
        <label for="acpt_45k"> Less than 45kg</label>
        <hr></hr>

        <input type="checkbox" id="acpt_abv_45k" onClick={() => acpt_abv_45k()}/>
        <label for="acpt_abv_45k"> Greater than 45kg</label>
        <hr></hr>
        

        <h6>Price range (£/hour):</h6>
        <div style={{width:160, margin:24}}>
        <Slider id = "slider" defaultValue = {15} max={30} step = {1} 
        valueLabelDisplay='auto' 
        onChange={handleChange} marks={mark}
        />

        </div>
        <h6>Dates available:</h6>
        <DatePicker selected ={startDate} onChange={onDateChange} 
        startDate={startDate} endDate={endDate} dateFormat="dd/MM/yyyy"
        minDate={new Date()} isClearable selectsRange inline/>
      </div>

      <div className="dogWalkers">
        <h1>Dog Walkers</h1>
        <div>
        {dogWalkers.map((dogWalker) => (
          <div className="walker" key={dogWalker.id}>
            <hr></hr>
            {<h4>{dogWalker.name}</h4>/*//would add more data using a similar command */}
            <p>{dogWalker.usr_info}</p> 
            <h6>Price:</h6>
            <p>{dogWalker.price}</p>
            <h6>Rating:</h6>
            <p>{dogWalker.rating}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
    );    
};

export default DogWalkers;