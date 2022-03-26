'use strict';

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result); //eseguito solo dopo la funzione precedente; quindi ci siamo 
    //bloccati all'esecuzione (DI QUESTO CODICE) alla linea 13, nel frattempo JS avrebbe potuto fare altro
    
    //return 'end';
}

asyncCall();
//asyncCall().then(console.log);