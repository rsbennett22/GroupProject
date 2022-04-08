import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './DogWalkers.css';

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
  return(
    //side bar
    <div>
      <div className="sidebar">
        <h5>Filters</h5>
        <hr></hr>
        <input type="checkbox" id="acpt_pup" onClick={() => acptPuppy()}/>
        <label for="acpt_pup">Puppy</label>
      </div>
      <div className="dogWalkers">
        <h1>Dog Walkers</h1>
        <div>
        {dogWalkers.map((dogWalker) => (
          <div className="walker" key={dogWalker.id}>
            <h4>{dogWalker.name}</h4>
            <p>{dogWalker.usr_info}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
    );
};
export default DogWalkers;