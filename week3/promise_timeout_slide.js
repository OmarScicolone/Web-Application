'use strict';

function wait(duration) {
    // Create and return a new promise
    return new Promise((resolve, reject) => { //prende come parametro una callback, che ha due parametri resolve, reject... 
        //Devo scrivere il codice da implementare
        
        // If the argument is invalid, reject the promise
        if (duration < 0) {
            reject(new Error('Time travel not yet implemented')); //c'è stato un problema, chiamiamo la reject
        } else {
            // otherwise, wait asynchronously and then resolve the Promise; 
            // setTimeout will invoke resolve() with no arguments:
            // the Promise will fulfill with the undefined value
            setTimeout(resolve, duration); //abbiamo invocato la resolve (dopo un duration)
        }
    });
}

// if a function returns a Promise...
wait(1000).then(() => { //con 1000 aspetto un secondo per il SUCCESS
    console.log("Success!");
}).catch((error) => {
    console.log("Error: ", error.toString()); // toString() to avoid printing stack trace
});