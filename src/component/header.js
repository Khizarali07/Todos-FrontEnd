import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/header.css';
import main from './main.js';

export default function Header() {
    const [task,settask] = useState("");
    const [date,setdate] = useState("");
    const complete ="uncomplete";
    const navigate = useNavigate();

    const handlesubmit = (evt) => {
        evt.preventDefault();
        axios.post('http://localhost:3000/task',{task,date,complete});
        settask("");
        setdate("");
        navigate('/');
        main();
        let x = document.getElementsByClassName('link');
        x[0].style.color="black";
        x[0].style.textDecoration="solid 10px underline";
        x[1].style.color='blue';
        x[1].style.textDecorationLine="none";
        x[2].style.color='blue';
        x[2].style.textDecorationLine="none";
    }
  return (
    <>
    <h1 id='heading'>To-Do List</h1>

    <form onSubmit={handlesubmit} id='form'>
        <input type='text' placeholder='Type your Task' id='text' value={task} onChange={(evt)=>{settask(evt.target.value)}} required/>
        <input type='date' id='date' value={date} onChange={(evt)=>{setdate(evt.target.value)}} required/>
        <button type='submit' id='add'>Add</button>
    </form>
    
    <div id='links'>
    <Link to='/' className='link def' onClick={alll} >All</Link>
    <Link to='pending' className='link' onClick={pend} >Pending</Link>
    <Link to='complete' className='link' onClick={comp} >Complete</Link>
    </div>
    </>
  )
}

function alll (){
    let x = document.getElementsByClassName('link');
    x[0].style.color="black";
    x[0].style.textDecoration="solid 10px underline";
    x[1].style.color='blue';
    x[1].style.textDecorationLine="none";
    x[2].style.color='blue';
    x[2].style.textDecorationLine="none";
}
function pend (){
    let x = document.getElementsByClassName('link');
    x[1].style.color="black";
    x[1].style.textDecoration="solid 10px underline";
    x[0].style.color='blue';
    x[0].style.textDecorationLine="none";
    x[2].style.color='blue';
    x[2].style.textDecorationLine="none";
}
function comp (){
    let x = document.getElementsByClassName('link');
    x[2].style.color="black";
    x[2].style.textDecoration="solid 10px underline";
    x[1].style.color='blue';
    x[1].style.textDecorationLine="none";
    x[0].style.color='blue';
    x[0].style.textDecorationLine="none";
}