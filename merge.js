const Rx = require('rxjs');

// regular js callback function
function asyncArray(time, callback) {
	console.log('init', time);
	setTimeout(() => {
		callback(time);
	}, time);
}

// Async non-deterministic order of fired event
// Organize individual observers to process them altogether
Rx.Observable.merge( // parallel
	Rx.Observable.bindCallback(asyncArray)(1000),
	Rx.Observable.bindCallback(asyncArray)(2000),
	Rx.Observable.bindCallback(asyncArray)(250),
	Rx.Observable.bindCallback(asyncArray)(120)
)
// Return individual event in fixed fired order
// Rx.Observable.concat( // series
// 	Rx.Observable.bindCallback(asyncArray)(1000),
// 	Rx.Observable.bindCallback(asyncArray)(2000),
// 	Rx.Observable.bindCallback(asyncArray)(250),
// 	Rx.Observable.bindCallback(asyncArray)(120)
// )
// Return single event with fixed order
// wait for all async finished then collected result into array
// Rx.Observable.forkJoin( // map
// 	Rx.Observable.bindCallback(asyncArray)(1000),
// 	Rx.Observable.bindCallback(asyncArray)(2000),
// 	Rx.Observable.bindCallback(asyncArray)(250),
// 	Rx.Observable.bindCallback(asyncArray)(120)
// )
	.do( // like listener/interceptor with side-effect on current stream
        // but it cannot alter returned data
		function onNext(data) {
			console.log('do next', data);
		},
		function onError(error) {
			console.log('do error', error);
			throw error;
		},
		function onComplete() {
			console.log('do complete');
		}
	)
	.subscribe(
		function onNext(data) { // only required func
			console.log('Result: ', data);
		},
		function onError(error) {
			console.log('Subscribe Error', error);
		},
		function onComplete() { // will not be fired if Error happens
			console.log('Complete: I am done!');
		}
	);
