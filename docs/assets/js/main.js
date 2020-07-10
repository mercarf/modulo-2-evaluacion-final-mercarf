"use strict";let searchSeries=[],favSeries=[];const form=document.querySelector(".form-search"),inputSearch=document.querySelector(".js-input-search"),getDataFromApi=e=>{const i=inputSearch.value;e.preventDefault(),fetch("http://api.tvmaze.com/search/shows?q="+i).then(e=>e.json()).then(e=>{searchSeries=e,""!==i?paintSeriesSearch():paintError()})};function paintError(){document.querySelector(".js-error-message").innerHTML="No has introducido nintun dato"}const paintSeriesSearch=()=>{const e=document.querySelector(".js-list-series");let i="";for(let s of searchSeries){const t=s.show;i+=`<li class="serie js-serie" id="${t.id}">`,i+=`<h2 id="${t.id}" class="serie__title">${t.name}</h2>`,null!==t.image?i+=`<img src="${t.image.medium}" id="${t.id}" class="js-serie__img" alt="Serie ${t.name}" />`:i+=`<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" id="${t.id}" class="serie__img" alt="Serie ${t.name}" />`,i+=`<p class="serie__summary" id="${t.id}">${t.summary}</p>`,i+="</li>",e.innerHTML=i}listenProductsClicks(),inputSearch.value=""},paintSeriesFav=()=>{const e=document.querySelector(".js-list-favorites");let i="";for(let s of favSeries){const t=s.show;i+=`<li class="serie js-fav" id="${t.id}">`,i+=`<h2 id="${t.id}" class="fav__title">${t.name}</h2>`,null!==t.image?i+=`<img src="${t.image.medium}" id="${t.id}" class="js-fav__img" alt="Serie ${t.name}" />`:i+=`<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" id="${t.id}" class="fav__img" alt="Serie ${t.name}" />`,i+="</li>",e.innerHTML=i}listenFavsClicks()},handleSerieClick=e=>{const i=parseInt(e.currentTarget.id),s=searchSeries.find(e=>e.show.id===i);e.currentTarget.classList.toggle("favorite");void 0===favSeries.find(e=>e.show.id===i)&&favSeries.push(s),console.log(s),paintSeriesFav(),updateLocalStorage()},handleFavsClick=e=>{const i=parseInt(e.currentTarget.id);console.log(i);const s=favSeries.findIndex(e=>e.show.id===i);console.log(s),favSeries.splice(s,1),updateLocalStorage(),paintSeriesFav()},updateLocalStorage=()=>{localStorage.setItem("Favorites",JSON.stringify(favSeries))},getFromLocalStorage=()=>{const e=JSON.parse(localStorage.getItem("Favorites"));null!==e&&(favSeries=e,paintSeriesFav())},listenProductsClicks=()=>{const e=document.querySelectorAll(".js-serie");for(let i=0;i<e.length;i++){e[i].addEventListener("click",handleSerieClick)}},listenFavsClicks=()=>{const e=document.querySelectorAll(".js-fav");for(let i=0;i<e.length;i++){e[i].addEventListener("click",handleFavsClick)}};form.addEventListener("submit",getDataFromApi),getFromLocalStorage();