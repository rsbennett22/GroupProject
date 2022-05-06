import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './DogWalkers.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {Slider, Input} from '@material-ui/core'
import { format } from 'date-fns';



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
  

//method for the accept_puppy checkbox
  const acptPuppy = () => {
    var isChecked = document.getElementById("acpt_pup");
    if(isChecked.checked){
    var avbl = [...dogWalkers].filter((a) => a.acpt_pup === true);
    setDogWalkers(avbl)
    console.log(avbl);
  }
  else 
  {
    axios.get('/api/dogWalkers/filter?pup=' + false)
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
  }
  };
  
  const hasAvbl = () => {
    var isChecked = document.getElementById("has_avbl");
    if(isChecked.checked){
    var avbl = [...dogWalkers].filter((a) => a.has_avbl === true);
    setDogWalkers(avbl)
    console.log(avbl);
  }
  else 
  {
    axios.get('/api/dogWalkers/filter?avail=' + false)
      .then((res) => {
        console.log(res);
        setDogWalkers(res.data);      
      })
      .catch((err) => {
        console.log(err);
      });
  }
  };



//Price Slider filter hook and method
  const [value, setValue] = useState(15)

  const handleChange = (event, value) => {
    setValue(value);
    console.log(value);
    axios.get('/api/dogWalkers/filter?price='+ value)                                                                     
    .then((res) => {                                                        
      console.log(res);                                         
       setDogWalkers(res.data);      
     })
    .catch((err) => {
      console.log(err);
    });
  } 

  const [weight, setWeight] = useState(60)

  const handleWeightChange = (event, weight) => {
    setWeight(weight);
    console.log(weight);
    axios.get('/api/dogWalkers/filter?weight='+ weight)
    .then((res) => {
      console.log(res);
      setDogWalkers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }



  //used for the date picker 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onDateChange = (dates) => {
    const [start, end] = dates;
    
    setStartDate(start);
    setEndDate(end);
    console.log(format(new Date(start), 'yyyy-MM-dd'))
    console.log(format(new Date(end), 'yyyy-MM-dd'))
    axios.get('/api/dogWalkers/filter?avbl_from=' + (format(new Date(start), 'yyyy-MM-dd')) + '&avbl_to=' + (format(new Date(end), 'yyyy-MM-dd')))
    .then((res) => {
      console.log(res);
        setDogWalkers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  };


  //Method for 'reset filter' button
  const reset = () =>{
    setStartDate(null);
    setEndDate(null);
    setValue(null);
    setWeight(null);
    getDogWalkers();
  }

  
  //'sort by' buttons
  const numDesc = () => {
    var sorted = [...dogWalkers].sort((a, b) => b.price - a.price);
    setDogWalkers(sorted)
    console.log(numDesc);
  }
  const numAsc = () => {
    var sorted = [...dogWalkers].sort((a, b) => a.price - b.price);
    setDogWalkers(sorted)
    console.log(numAsc);
  }
  const rating = () => {
    var sorted = [...dogWalkers].sort((a, b) => b.rating - a.rating);
    setDogWalkers(sorted)
    console.log(rating);
  }
  

  //Used to mark start, middle and end of slider
  const mark=[
    {value: 0,
      label: "£0"},
    {value: 15,
      label: "£15"},
    {value: 30,
      label: "£30"}
  ]

  const mark2=[
    {value: 0,
      label: "0"},
    {value: 30,
      label: "30"},
    {value: 60,
      label: "60"},
    {value: 90,
      label: "90"},
    {value: 120,
      label: "120"}
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
        <input type="checkbox" id="has_avbl" onClick={() => hasAvbl()}/>
        <label for="">Has availability?</label>
        <hr></hr>


  
        <h6>Weight of your dog:</h6>
        <div style={{width: 200, margin:60}}>
        <Slider id = "wSlider" defaultValue = {null} max={120} step = {1} 
        valueLabelDisplay='auto' 
        onChangeCommitted={handleWeightChange} marks={mark2}
        />
        

        <h6>Price range (£/hour):</h6>
        <div style={{width:160, margin:24}}>
        <Slider id = "slider" defaultValue = {null} max={30} step = {1} 
        valueLabelDisplay='auto' 
        onChangeCommitted={handleChange} marks={mark}
        />
        

      </div>
      </div>
        <h6>Dates available:</h6>
        <DatePicker selected ={startDate} onChange={onDateChange} 
        startDate={startDate} endDate={endDate} dateFormat="dd/MM/yyyy" defaultValue = {null}
        minDate={new Date()} isClearable selectsRange inline/>
        <button onClick={onDateChange, handleChange, handleWeightChange}>Apply filters</button>
        <button onClick={reset}>Reset filters</button>
      </div>

      <div className="dogWalkers">
        <h1>Dog Walkers</h1>
        <button onClick={numDesc} id ="descSort">Sort by Price: High to Low</button>
        <button onClick={numAsc} id ="ascSort">Sort by Price: Low to High</button>
        <button onClick={rating} id ="ratingBtn">Sort by Rating</button>
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
            <p>{dogWalker.avbl_from}</p>
            <p>{dogWalker.avbl_to}</p>
            <h6>Min and Max weight:</h6>
            <p>{dogWalker.min_wt +"kg"}</p>
            <p>{dogWalker.max_wt+ "kg"}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
    );    
};

export default DogWalkers;