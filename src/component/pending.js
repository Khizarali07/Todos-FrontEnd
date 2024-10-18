import axios from "axios";
import '../component/css/main.css';

export default function pending() {
  let data;
  let task=[];
  let i=0;

  (async function fun (){
  data = await axios.get('http://localhost:3000/pending');
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
  
  x.appendChild(c1);
  c1.appendChild(c4); 
  c1.appendChild(c2);
  c1.appendChild(c3); 
  c1.appendChild(c5); 
  
  c1.className="listing";
  c2.className="ts";
  c3.className="da";
  c4.className="combut";
  c4.onclick=complete;
  c5.className="delbut";
  c5.onclick=deletee;
  c2.innerHTML=task[i].task;
  c3.innerHTML=task[i].date;
  c5.innerHTML="Delete";
  
  if (task[i].complete === "complete"){
  c4.innerHTML="&#10004;";
  }
  i++;
  }
})();

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
  pending();
}
function deletee (evtt) {
  let date=evtt.target.previousSibling.innerHTML;
  axios.post('http://localhost:3000/delete',{date});
  pending();
}
function refresh (){
  pending();
}