export default class Time {
	constructor(el) {
		this.el = el
		var dtime = toSeconds(25);
		var count = 0;
		var circle = document.getElementById('outer');
		var circleSize = document.defaultView.getComputedStyle(circle,null).getPropertyValue('stroke-dasharray');

		var playButton = document.getElementById('playButton');
		var play = true;

		// not selfinvoking because of namespace -> start stop function
		timer();

		function timer() {
			if(count  < dtime && play) {
				count++;
				el.innerHTML = toMinutes(dtime - count);
				setCircle(count / dtime * 1000);
				window.setTimeout(timer ,1000);
			}
			else if (count >= dtime) finish();
		};

		function finish() {
			el.innerHTML = toMinutes(0);
		};

		function setCircle(permil) {
			circle.style['stroke-dashoffset'] =  -(parseInt(circleSize) * (permil / 1000));
			console.log('circle transformed!', document.defaultView.getComputedStyle(circle,null).getPropertyValue('stroke-dashoffset'));
		} 

		function toMinutes(seconds) {
			var minutes = Math.floor(seconds / 60);
			var seconds = seconds % 60;
			if(seconds < 10) var seconds = '0' + seconds;
			if(minutes < 10) var minutes = '0' + minutes;
			return minutes + ':' + seconds
		}

		function toSeconds(minutes) {
			return minutes * 60
		}

		playButton.addEventListener('click', function() {
			play = !play;
			if (play) timer();
		});
	}
}