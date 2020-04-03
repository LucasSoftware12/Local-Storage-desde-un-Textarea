// Variables
const listaTweets = document.getElementById("lista-tweets");

// Event Listeners

eventListeners();

function eventListeners() {
  //Cuando se envia el formulario
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  // Borrar Tweets
  listaTweets.addEventListener("click", borrarTweet);

  // Contenido cargado
  document.addEventListener("DOMContentLoaded", localStorageListo);
}

// Funciones

// Añadir tweet del formulario
function agregarTweet(e) {
  // debugger;
  e.preventDefault();
  // leer el valor del textarea
  const tweet = document.getElementById("tweet").value;
  // crear boton de eliminar
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";

  // Crear elemento y añadirle el contenido a la lista
  const li = document.createElement("li");
  li.innerText = tweet;
  // añade el botón de borrar al tweet
  li.appendChild(botonBorrar);
  // añade el tweet a la lista
  listaTweets.appendChild(li);

  // Añadir a Local Storage
  agregarTweetLocalStorage(tweet);
  document.getElementById("tweet").value = "";
}
// Elimina el Tweet del DOM
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}
// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
  let tweets;

  tweets = obtenerTweetsLocalStorage();

  tweets.storage.forEach(function (tweet) {
    // crear boton de eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement("li");
    li.innerText = tweet;
    // añade el botón de borrar al tweet
    li.appendChild(botonBorrar);
    // añade el tweet a la lista
    listaTweets.appendChild(li);
  });
}

// Agrega tweet a local storage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  console.log(tweets);
  // Añadir el nuevo tweet
  tweets.storage.push(tweet);
  //console.log(tweets);
  // Convertir de string a arreglo para local storage
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
  let tweets;
  // Revisamos los valoes de local storage
  if (!localStorage.getItem("tweets")) {
    tweets = { storage: [] };
  } else {
    // console.log(localStorage.getItem("tweets"));
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

// Eliminar tweet de Local Storage

function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;
  // Elimina la X del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.storage.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.storage.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}
