'use script';

let p = document.createElement('p'); //adesso esiste nella memoria, niente dentro, non è collegato a niente nel dom
let d = dayjs().format('YYYY-MM-DD HH:mm:ss');
p.innerText = d;

//document.getElementById('ora').innerText="qui ci va l'ora";
document.getElementById('ora').prepend(p);

setInterval(() => { p.innerText = dayjs().format('YYYY-MM-DD HH:mm:ss'); }, 1000);

window.addEventListener('load', event => {
   const rows = document.querySelectorAll('table tr');
   for (const row of rows) {

      row.addEventListener('click', event => {
         console.log(event.target, row);
         const voto = row.children[1].innerText;
         const p = document.createElement('p');
         p.innerText = voto;
         document.getElementById('comment').appendChild(p);
      })


      if (row.firstElementChild.tagName.toLowerCase() !== 'th'){
         row.querySelector('.btn').addEventListener('click', event => {
            while (row.firstChild)
               row.removeChild(row.firstChild)
            const parent = row.parentNode;
            parent.removeChild(row);
         })
      }

   }
})