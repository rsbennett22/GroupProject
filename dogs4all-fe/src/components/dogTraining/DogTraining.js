import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './DogTraining.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {Slider, Input} from '@material-ui/core'



const DogTraining = () => {
  const [dogTraining, setDogTraining] = useState([]);
  useEffect(() => {
    getDogTraining();
  }, []);
  
  const getDogTraining = () => {
    axios.get('/api/dogTraining')
    .then((res) => {
      console.log(res);
      setDogTraining(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };


  const acptTrainer = () => {
    var isChecked = document.getElementById("acpt_Trainer");
    if(isChecked.checked)
    {
        axios.get('/api/dogTraining/acpt_Trainer')
      .then((res) => {
        console.log(res);
        setDogTraining(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogTraining();
    }
  };

  const acpt_7k = () => {
    var isChecked = document.getElementById("acpt_7k");
    if(isChecked.checked)
    {
        axios.get('/api/dogTraining/acpt_7k')
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
        getDogTraining();
    }
  };

  const acpt_18k = () => {
    var isChecked = document.getElementById("acpt_18k");
    if(isChecked.checked)
    {
        axios.get('/api/dogTraining/acpt_18k')
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
        getDogTraining();
    }
  };

  const acpt_45k = () => {
    var isChecked = document.getElementById("acpt_45k");
    console.log(isChecked);
    if(isChecked.checked)
    {
        axios.get('/api/dogTraining/acpt_45k')
      .then((res) => {
        console.log(res);
        setDogTraining(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogTraining();
    }
  };

  const acpt_abv_45k = () => {
    var isChecked = document.getElementById("acpt_abv_45k");
    if(isChecked.checked)
    {
        axios.get('/api/dogTraining/acpt_abv_45k')
      .then((res) => {
        console.log(res);
        setDogTraining(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
        getDogTraining();
    }
  };



//Slider filter 
const [value, setValue] = useState(15)

const handleChange = (event, value) => {
  setValue(value);
  console.log(value);
  axios.get('/api/dogTraining/price?price='+ value)                                                                     
  .then((res) => {                                                        
    console.log(res);                                         
     setDogTraining(res.data);      
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
        <h5>Find your dog Trainer!</h5>
        <hr></hr>
        <input type="checkbox" id="acpt_Trainer" onClick={() => acptPuppy()}/>
        <label for="acpt_Trainer">Choosing the right trainer for your dog</label>

        <h6>Size of dogs trainer will accept</h6>
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

      <div className="dogTraining">
        <h1>Dog Training</h1>
        <div>
        {dogTraining.map((dogTrainer) => (
          <div className="trainer" key={dogTrainer.id}>
            <hr></hr>
            {<h4>{dogTrainer.name}</h4>/*//would add more data using a similar command */}
            <p>{dogTrainer.usr_info}</p> 
            <h6>Price:</h6>
            <p>{dogTrainer.price}</p>
            <h6>Rating:</h6>
            <p>{dogTrainer.rating}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
    );    
};

export default DogTraining;