const Rx = require('rxjs');

const names = ['Sarah Smith', 'Adam Scott', 'Eva Livingston'];

let observableNameCreation$ = Rx.Observable.from(names);
let observableCreateCreation$ =
    Rx.Observable.create((observer) => {
        // observer.next()
        // observer.error()
        // observer.complete()
        names.forEach((name) => observer.next(name));
        observer.complete();
    });

function callMe(callback) {
	console.log('Call me sometimes');
	callback(names);
}
let callMeCreation$ = Rx.Observable.bindNodeCallback(callMe);

let observableSeq$ = observableCreateCreation$
	.map((name) => {
		const names = name.split(' ');
		return {
			firstName: names[0],
			lastName: names[1]
		};
	})
	.map((user) => {
			// throw 'Bad code';
			const key = user.firstName.toLowerCase() + user.lastName;
			return { ...user, key };
	})
	.reduce((prev, next) => {
		prev[next.key] = next;
		return prev;
	}, {});

// subscribe executes the stream
let observableSub = observableSeq$.subscribe(
	function onNext(data) { // only required func
		console.log('from data', data);
	},
	function onError(error) {
		console.log('Error', error);
	},
	function onComplete() { // will not be fired if Error happens
		console.log('I am done!');
	}
);


// console.log(observableSub);