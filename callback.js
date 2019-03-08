const Rx = require('rxjs');

const names = ['Sarah Smith', 'Adam Scott', 'Eva Livingston'];

// js callback
function createArray(a, b, c, callback) {
    console.log('Create new array');
    callback([ a, b, c ]);
}

// node JS callback
function callMe(name, callback) {
	console.log('Call me sometimes');
	let error = null;
	let newNames = [...names, name];
	callback(error, newNames); // node callback type with (error, result)
}

// Rx.Observable.bindCallback(createArray)(1, 2, 3) // regular js callback -> use bindCallback
// Rx.Observable.bindNodeCallback(callMe)('Tim Pham')  // typical node callback
Rx.Observable.create((observer) => {
	observer.next(1);
	observer.next(2);
	// observer.error('STOP HERE'); // uncomment to see exception thrown
	observer.next(3);
	observer.complete();
})//.toArray() // collect all results into array before next processing
.subscribe(
	function onNext(data) { // only required func
		console.log('Result: ', data);
	},
	function onError(error) {
		console.log('Error', error);
	},
	function onComplete() { // will not be fired if Error happens
		console.log('Complete: I am done!');
	}
);
