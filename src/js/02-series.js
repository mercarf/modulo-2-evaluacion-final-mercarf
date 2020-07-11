/* eslint-disable strict */
//Funcion que pinta las series (titulo, imagen y resumen)
const paintSeriesSearch = () => {
  const listSeries = document.querySelector('.js-list-series');
  const defaultImage =
    'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

  for (let serieData of searchSeries) {
    const serie = serieData.show;
    let summary = serie.summary || 'No hay informacion sobre esta serie';
    //Elemento li
    const li = document.createElement('li');
    li.classList.add('serie');
    li.classList.add('js-serie');
    li.setAttribute('id', serie.id);
    //Elemento h2
    const liTitle = document.createElement('h2');
    liTitle.classList.add('serie-title');
    const liTitleContent = document.createTextNode(serie.name);
    liTitle.appendChild(liTitleContent);
    liTitle.setAttribute('id', serie.id);
    li.appendChild(liTitle);
    //Elemento img
    const liImg = document.createElement('img');
    liImg.classList.add('js-serie__img');
    if (serie.image !== null) {
      liImg.setAttribute('src', serie.image.medium);
    } else {
      liImg.setAttribute('src', defaultImage);
    }
    liImg.setAttribute('alt', `Serie ${serie.name}`);
    liImg.setAttribute('id', serie.id);
    li.appendChild(liImg);
    //Elemento div
    const liText = document.createElement('div');
    liText.classList.add('serie-summary');
    const liTextContent = document.createTextNode(summary);
    liText.appendChild(liTextContent);
    liText.setAttribute('id', serie.id);
    li.appendChild(liText);
    //Lo metemos todo dentro del ul
    listSeries.appendChild(li);
  }
  listenProductsClicks();
  inputSearch.value = '';
};

// Lo que ocurre al clicar en las series
const handleSerieClick = (ev) => {
  // obtenemos el id del producto clickado
  const clickedId = parseInt(ev.currentTarget.id);
  // buscamos con find
  const serieFind = searchSeries.find(
    (productItem) => productItem.show.id === clickedId
  );
  const index = favSeries.findIndex(
    (productItem) => productItem.show.id === clickedId
  );
  const seriesclick = ev.currentTarget;
  seriesclick.classList.toggle('favorite');

  const seriefav = favSeries.find(
    (productItem) => productItem.show.id === clickedId
  );

  if (seriefav === undefined) {
    favSeries.push(serieFind);
  } else {
    favSeries.splice(index, 1);
  }

  console.log(serieFind);
  paintSeriesFav();
  updateLocalStorage();
};

// Funcion manejadora/Evento click de las series
const listenProductsClicks = () => {
  const seriesAll = document.querySelectorAll('.js-serie');
  for (let index = 0; index < seriesAll.length; index++) {
    const serieFind = seriesAll[index];
    serieFind.addEventListener('click', handleSerieClick);
  }
};

/* PINTAR CON INNERHTML */
//FUERA DEL FOR
// let codeHTML = '';
//DENTRO DEL FOR
// codeHTML += `<li class="serie js-serie" id="${serie.id}">`;
// codeHTML += `<h2 id="${serie.id}" class="serie__title">${serie.name}</h2>`;
// if (serie.image !== null) {
//   codeHTML += `<img src="${serie.image.medium}" id="${serie.id}" class="js-serie__img" alt="Serie ${serie.name}" />`;
// } else {
//   codeHTML += `<img src="${defaultImage}" id="${serie.id}" class="js-serie__img" alt="Serie ${serie.name}" />`;
// }
// codeHTML += `<div class="serie-summary" id="${serie.id}">${summary}</div>`;
// codeHTML += `</li>`;
// listSeries.innerHTML = codeHTML;
