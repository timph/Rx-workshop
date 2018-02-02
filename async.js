const Rx = require('rxjs');

function asyncArray(time, callback) {
	console.log('init', time);
	setTimeout(() => {
		callback(time);
	}, time);
}

// Rx.Observable.bindCallback(createArray)(1, 2, 3)
// Rx.Observable.bindNodeCallback(callMe)('Tim Pham')
Rx.Observable.from([ 5000, 1000, 250, 125 ])
	// map works with sync call
	// flatMap with async call
	.flatMap((time) => {
		return Rx.Observable.bindCallback(asyncArray)(time)
	})
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
