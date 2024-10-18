import axios from "axios";
import './css/main.css';
import del from "./images/delete icon.png";

export default function main() {
  let data;
  let task=[];
  let i=0;

  (async function fun (){
  data = await axios.get('http://localhost:3000/tasks');
  task = data.data;

  let x = document.getElementById('ma');
  x.innerHTML="";
  let button = document.createElement('button');
  x.appendChild(button);
  button.innerHTML="⟳";
  button.onclick=refresh;
  button.id="refresh";
  let p = document.createElement('p');
  x.appendChild(p);
  p.innerHTML=`total task are :${task.length}`;
  p.id="count";


  while (i<task.length){
  let c1 = document.createElement('div');
  let c2 = document.createElement('p');
  let c3 = document.createElement('p');
  let c4 = document.createElement('button');
  let c5 = document.createElement('button');
  let c6 = document.createElement('img');
  
  x.appendChild(c1);
  c1.appendChild(c4); 
  c1.appendChild(c2);
  c1.appendChild(c3); 
  c1.appendChild(c5);
  c5.appendChild(c6);
  
  c1.className="listing";
  c2.className="ts";
  c3.className="da";
  c4.className="combut";
  c4.onclick=complete;
  c5.className="delbut";
  c6.className="delimg";
  c5.onclick=deletee;
  c2.innerHTML=task[i].task;
  c3.innerHTML=task[i].date;
  if (window.screen.width <= 599) {
    c6.src=del;
  } else {
    c5.innerHTML="Delete";
  }
  
  
  if (task[i].complete === "complete"){
  c4.innerHTML="&#10004;";
  }
  i++;
  }
})();
console.log(del);

  return (
    <div id="ma" >
      
    </div>
  )
}


function complete (evt) {
  let complete="complete";
  let task=evt.target.nextSibling.innerHTML;
  console.log(task);
  axios.post('http://localhost:3000/complete',{complete,task})
  window.location.reload();
}
function deletee (evtt) {
  let date=evtt.target.previousSibling.innerHTML;
  axios.post('http://localhost:3000/delete',{date});
  window.location.reload();
}
function refresh (){
  window.location.reload();
}