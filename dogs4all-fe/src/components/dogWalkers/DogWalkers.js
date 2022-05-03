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
//     var isChecked = document.getElementById("acpt_pup");
//     if(isChecked.checked){
//     var acpt_p = [...dogWalkers].filter((a) => a.acpt_pup === true);
//     setDogWalkers(acpt_p)
//     console.log(acpt_p);
//   }
//   else 
//   {
//     getDogWalkers();
//   }
// }
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

                      //****Above is the commented out code for how the filters worked originally using axios and the api */
                      //The new method doesn't require these and allows multiple filters to be used at once 
                      //I'm going to keep this code just in case we need to revert back to it
                      //Only issue with this method of filtering (same issue as before) is when one checkbox is unchecked 
                      //it removes all filters even if some are still checked
                      //but the issue with the old way is this- when a checkbox is checked it'll return users. when another checkbox is checked on
                      //top of the og one the filter system should filter based only on the users shown (keeping the first filter applied)
                      //but instead the system applies the newly checked filter to the original user database meaning the first, og filter is just forgotten about

  
  //method for the avbl_morn checkbox
  const avblMorn = () => {
    var isChecked = document.getElementById("avbl_morn");
    if(isChecked.checked){
    var avbl_m = [...dogWalkers].filter((a) => a.avbl_morn === true);
    setDogWalkers(avbl_m)
    console.log(avbl_m);
  }
  else 
  {
    getDogWalkers();
  }
  };

  //method for the avbl_aftn checkbox
  const avblAftn = () => {
    var isChecked = document.getElementById("avbl_aftn");
    if(isChecked.checked)
    {
      var acpt_A = [...dogWalkers].filter((a) => a.avbl_aftn === true);
      setDogWalkers(acpt_A)
      console.log(acpt_A);
    }
    else
    {
        getDogWalkers();
    }
  };

  //method for the avbl_eve checkbox
  const avblEve = () => {
    var isChecked = document.getElementById("avbl_eve");
    if(isChecked.checked)
    {
      var filtered = [...dogWalkers].filter((a) => a.avbl_eve === true);
      setDogWalkers(filtered)
      console.log(filtered);
    }
    else
    {
        getDogWalkers();
    }
  };

   //method for the acpt_7k checkbox
  const acpt_7k = () => {
    var isChecked = document.getElementById("acpt_7k");
    if(isChecked.checked)
    {
      var filtered = [...dogWalkers].filter((a) => a.acpt_7k === true);
      setDogWalkers(filtered)
      console.log(filtered);
      
    }
    else
    {
        getDogWalkers();
    }
  };

  //method for the acpt_18k checkbox
  const acpt_18k = () => {
    var isChecked = document.getElementById("acpt_18k");
    if(isChecked.checked)
    {
      var filtered = [...dogWalkers].filter((a) => a.acpt_18k === true);
      setDogWalkers(filtered)
      console.log(filtered);
    }
    else
    {
        getDogWalkers();
    }
  };

  //method for the acpt_45k checkbox
  const acpt_45k = () => {
    var isChecked = document.getElementById("acpt_45k");
    console.log(isChecked);
    if(isChecked.checked)
    {
      var filtered = [...dogWalkers].filter((a) => a.acpt_45k === true);
      setDogWalkers(filtered)
      console.log(filtered);
    }
    else
    {
        getDogWalkers();
    }
  };

    //method for the acpt_abv_45k checkbox
  const acpt_abv_45k = () => {
    var isChecked = document.getElementById("acpt_abv_45k");
    if(isChecked.checked)
    {
      var filtered = [...dogWalkers].filter((a) => a.acpt_abv_45k === true);
      setDogWalkers(filtered)
      console.log(filtered);
    }
    else
    {
        getDogWalkers();
    }
  };



//Slider filter hook and method
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
    axios.get('/api/dogWalkers/date_range?avbl_from=' + (format(new Date(start), 'yyyy-MM-dd')) + '&avbl_to=' + (format(new Date(end), 'yyyy-MM-dd')))
    .then((res) => {
      console.log(res);
        setDogWalkers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  };

  //Method for 'reset calendar' button
  const reset = () =>{
    setStartDate(null);
    setEndDate(null);
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
        <Slider id = "slider" defaultValue = {30} max={30} step = {1} 
        valueLabelDisplay='auto' 
        onChangeCommitted={handleChange} marks={mark}
        />


      </div>
        <h6>Dates available:</h6>
        <DatePicker selected ={startDate} onChange={onDateChange} 
        startDate={startDate} endDate={endDate} dateFormat="dd/MM/yyyy"
        minDate={new Date()} isClearable selectsRange inline/>
        <button onClick={reset}>Reset calendar</button>
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
          </div>
          ))}
        </div>
      </div>
    </div>
    );    
};

export default DogWalkers;