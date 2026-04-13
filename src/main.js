import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { usersApp } from './users/users-app';



document.querySelector('#app').innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src=${viteLogo} class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>CRUD-VITE</h1>
    <div id="card"> </div>
  </div>
  
</section>
`;

const element = document.getElementById('card');

usersApp( element );