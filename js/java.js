let formholder=document.querySelector('.form-holder');

let myform=`<form class="col-3 mb-5 mt-3">
<select class="my-select p-1 col-5 rounded">
</select>
<input type="submit" class="my-submit p-1 btn-success col-3 rounded">
</form>
<div class="row col-10 ">
<table class="table">
<tr class="table-header"></tr>
<tr class="table-holder" ></tr>
</table>
</div>
`
formholder.innerHTML=myform;

let myselect=document.querySelector('.my-select');
let mysubmit=document.querySelector('.my-submit');
// let tableholder=document.querySelector('.table-holder');
let tableheader=document.querySelector('.table-header');
let containtable=document.querySelector('.table');
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '387309231dmshc955ed4ec7972e1p10f5e5jsn4f64b619281d',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

fetch('https://covid-193.p.rapidapi.com/statistics', options)
	.then(response => response.json())
	.then((Data)=>{
    let x=Data.response
    x.map((m)=>{
   let myop =`<option>${m.continent}</option>` // let myop =`<option>${m.country}</option>` to get by country
   myselect.innerHTML+=myop;
    })
  
    let y=x.filter((v,i)=>{return i==0})
    let y1=Object.keys(y[0])
   y1.map((k)=>{
  let myh=`<th>${k}</th>`
    tableheader.innerHTML+=myh
   })
  
mysubmit.addEventListener('click',(e)=>{
  e.preventDefault();
   x.filter((v)=>{return v.continent==myselect.value}).map((m)=>{  // return v.country==myselect.value} to get by country
      // console.log(m)
      let mytr=`
      <td>${m.continent}</td>
      <td>${m.country}</td>
      <td>${m.population}</td>
      <td>${displayobj(m.cases,0)}<br>${displayobj(m.cases,1)}<br>${displayobj(m.cases,2)}<br>
      ${displayobj(m.cases,3)}<br>${displayobj(m.cases,4)}<br>${displayobj(m.cases,5)}</td>
      <td>${displayobj(m.deaths,0)}<br>${displayobj(m.deaths,1)}<br>${displayobj(m.deaths,2)}</td>
      <td>${displayobj(m.tests,0)}<br>${displayobj(m.tests,1)}</td>
      <td>${m.day}</td>
      <td>${m.time}</td>
      `
      // tableholder.innerHTML=mytr
     let content=`<tr class="tr-table">${mytr}</tr>`
      containtable.innerHTML+=content

myselect.addEventListener('change',()=>{let t=document.querySelectorAll('.tr-table');
t.forEach((e)=>{e.remove()})})

   
})
    // console.log(mytable)
  })
  

	function displayobj(x,i){
    let l;
    if(Object.values(x)[i]!==null){l= Object.entries(x)[i].join(':')}
    else{l=`${Object.entries(x)[i].join(':')}0`}
return l;
  }

})
