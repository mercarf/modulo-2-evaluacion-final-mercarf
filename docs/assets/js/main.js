"use strict";let searchSeries=[],favSeries=[];const form=document.querySelector(".form-search"),inputSearch=document.querySelector(".js-input-search"),errorMessage=document.querySelector(".js-error-message"),listSeries=document.querySelector(".js-list-series"),listFav=document.querySelector(".js-list-favorites"),getDataFromApi=e=>{const t=inputSearch.value;e.preventDefault(),fetch("http://api.tvmaze.com/search/shows?q="+t).then(e=>e.json()).then(e=>{searchSeries=e,""!==t?(paintSeriesSearch(),errorMessage.innerHTML=""):paintError()})};function paintError(){errorMessage.innerHTML="🔔 No has introducido nintun dato 🔔",listSeries.innerHTML=""}form.addEventListener("submit",getDataFromApi);const paintSeriesSearch=()=>{const e=document.querySelector(".js-list-series");e.innerHTML="";for(let t of searchSeries){const s=t.show;let r=s.summary||"No hay informacion sobre esta serie";const i=document.createElement("li");i.classList.add("serie"),i.classList.add("js-serie"),i.setAttribute("id",s.id);void 0!==favSeries.find(e=>e.show.id===s.id)&&i.classList.add("favorite");const a=document.createElement("h2");a.classList.add("serie-title");const n=document.createTextNode(s.name);a.appendChild(n),a.setAttribute("id",s.id),i.appendChild(a);const c=document.createElement("img");c.classList.add("js-serie__img"),null!==s.image?c.setAttribute("src",s.image.medium):c.setAttribute("src","https://via.placeholder.com/210x295/ffffff/666666/?text=TV"),c.setAttribute("alt","Serie "+s.name),c.setAttribute("id",s.id),i.appendChild(c);const o=document.createElement("div");o.innerHTML=r,o.classList.add("js-serie-summary"),o.setAttribute("id",s.id),i.appendChild(o),e.appendChild(i)}listenProductsClicks(),updateLocalStorage(),inputSearch.value=""},handleSerieClick=e=>{const t=e.currentTarget,s=parseInt(e.currentTarget.id),r=searchSeries.find(e=>e.show.id===s),i=favSeries.find(e=>e.show.id===s),a=favSeries.findIndex(e=>e.show.id===s);void 0===i?(favSeries.push(r),t.classList.add("favorite")):(favSeries.splice(a,1),t.classList.remove("favorite")),paintSeriesFav(),updateLocalStorage(),paintSeriesSearch()},listenProductsClicks=()=>{const e=document.querySelectorAll(".js-serie");for(let t=0;t<e.length;t++){e[t].addEventListener("click",handleSerieClick)}},paintSeriesFav=()=>{listFav.innerHTML="";for(let e of favSeries){const t=e.show,s=document.createElement("li");s.classList.add("fav"),s.classList.add("js-fav"),s.setAttribute("id",t.id);const r=document.createElement("div");r.classList.add("fav__container"),s.appendChild(r);const i=document.createElement("h3");i.classList.add("fav__title");const a=document.createTextNode(t.name);i.appendChild(a),i.setAttribute("id",t.id),r.appendChild(i);const n=document.createElement("i");n.classList.add("far"),n.classList.add("fa-trash-alt"),r.appendChild(n);const c=document.createElement("img");c.classList.add("js-fav__img"),null!==t.image?c.setAttribute("src",t.image.medium):c.setAttribute("src","https://via.placeholder.com/210x295/ffffff/666666/?text=TV"),c.setAttribute("alt","Serie "+t.name),c.setAttribute("id",t.id),s.appendChild(c),listFav.appendChild(s)}listenFavsClicks()},handleFavsClick=e=>{const t=parseInt(e.currentTarget.id),s=favSeries.findIndex(e=>e.show.id===t);favSeries.splice(s,1),updateLocalStorage(),paintSeriesFav(),paintSeriesSearch()},listenFavsClicks=()=>{const e=document.querySelectorAll(".js-fav");for(let t=0;t<e.length;t++){e[t].addEventListener("click",handleFavsClick)}},updateLocalStorage=()=>{localStorage.setItem("Favorites",JSON.stringify(favSeries))},getFromLocalStorage=()=>{const e=JSON.parse(localStorage.getItem("Favorites"));null!==e&&(favSeries=e,paintSeriesFav())},btnReset=document.querySelector(".js-reset-btn"),resetFav=()=>{favSeries=[],updateLocalStorage(),paintSeriesFav(),paintSeriesSearch()};btnReset.addEventListener("click",resetFav),getFromLocalStorage();const arrowTransform=document.querySelector(".js-arrowTransform"),arrowMenu=document.querySelector(".js-arrow"),collapsibleHidden=document.querySelector(".js-hidden");function changeCollapsible(){collapsibleHidden.classList.toggle("hidden"),arrowTransform.classList.toggle("transform")}arrowMenu.addEventListener("click",changeCollapsible);