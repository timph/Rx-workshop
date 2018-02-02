const Rx = require('rxjs');

const names = ['Sarah Smith', 'Adam Scott', 'Eva Livingston'];

function callMe(name, callback) {
	console.log('Call me sometimes');
	let error = null;
	let newNames = [...names, name];
	callback(error, newNames); // node callback type with (error, result)
}

function createArray(a, b, c, callback) {
	console.log('Create new array');
	callback([ a, b, c ]);
}

// Rx.Observable.bindCallback(createArray)(1, 2, 3)
// Rx.Observable.bindNodeCallback(callMe)('Tim Pham')
Rx.Observable.create((observer) => {
	observer.next(1);
	observer.next(2);
	observer.error('STOP HERE');
	observer.next(3);
	observer.complete();
})//.toArray()
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
