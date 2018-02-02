const Rx = require('rxjs');

function asyncArray(time, callback) {
	console.log('init', time);
	setTimeout(() => {
		callback(time);
	}, time);
}

// Async non-deterministic order of fired event
Rx.Observable.merge(
	Rx.Observable.bindCallback(asyncArray)(1000),
	Rx.Observable.bindCallback(asyncArray)(2000),
	Rx.Observable.bindCallback(asyncArray)(250),
	Rx.Observable.bindCallback(asyncArray)(120)
)
// Return individual event in fired order
// Rx.Observable.concat(
// 	Rx.Observable.bindCallback(asyncArray)(1000),
// 	Rx.Observable.bindCallback(asyncArray)(2000),
// 	Rx.Observable.bindCallback(asyncArray)(250),
// 	Rx.Observable.bindCallback(asyncArray)(120)
// )
// Return single event with order result
// Rx.Observable.forkJoin(
// 	Rx.Observable.bindCallback(asyncArray)(1000),
// 	Rx.Observable.bindCallback(asyncArray)(2000),
// 	Rx.Observable.bindCallback(asyncArray)(250),
// 	Rx.Observable.bindCallback(asyncArray)(120)
// )
	.do( // like listener with side-effect on current stream
		function onNext(data) {
			console.log('do1 next', data);
		},
		function onError(error) {
			console.log('do1 error', error);
		},
		function onComplete() {
			console.log('do1 complete');
		}
	)
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
