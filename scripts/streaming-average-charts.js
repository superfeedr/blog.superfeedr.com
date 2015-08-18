
// First steph: show the dots
function onlydots(div) {
	var labels = [];
	var data = [];

	for(i=0;i<20;i++) {
		labels.push('');
		data.push(Math.random());
	}

	var dots = {
		labels: labels,
		datasets: [
		{	
			label: 'Dots',
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "rgba(151,187,205,0.8)",
			data: data
		}
		]
	};

	var c = new Chart(document.getElementById(div).getContext("2d")).Line(dots, {
		showTooltips: false,
		animation: false,
		scaleShowGridLines : false,
		pointDotRadius : 2,
		tooltipEvents: [],
		scaleOverride: true,
		scaleSteps: 10,
		scaleStepWidth: 0.1,
		scaleStartValue: 0
	});	

	setInterval(function() {
		c.addData([Math.random()], "");
		c.removeData();
	}, 100);
};

// 2nd step; show running average
function dotsandrunningaverage(div) {
	var labels = [];
	var data = [];
	var averages = []

	var count = 0;
	var sum = 0;

	function addDot() {
		labels.push('');
		var x = Math.random();
		count+=1;
		sum+=x;
		return [x, sum/count];
	}

	for(i=0;i<20;i++) {
		pair = addDot();
		data.push(pair[0]);
		averages.push(pair[1]);
	}

	var dots = {
		labels: labels,
		datasets: [
		{	
			label: 'Dots',
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "rgba(151,187,205,0.8)",
			data: data
		},
		{	
			label: 'Averages',
			fillColor: "rgba(220,20,20,0.2)",
			strokeColor: "rgba(220,20,20,1)",
			data: averages
		},
		]
	};

	var c = new Chart(document.getElementById(div).getContext("2d")).Line(dots, {
		showTooltips: false,
		animation: false,
		scaleShowGridLines : false,
		pointDotRadius : 2,
		tooltipEvents: [],
		scaleOverride: true,
		scaleSteps: 10,
		scaleStepWidth: 0.1,
		scaleStartValue: 0
	});	

	setInterval(function() {
		var pair = addDot();
		c.addData(pair, "");
		c.removeData();
	}, 100);
};

function dotsandrecursiveaverage(div) {
	var labels = [];
	var data = [];
	var average10 = [];
	var average100 = [];


	var average10i, average100i;

	function addDot() {
		labels.push('');
		var x = Math.random();
		if(!average10i)
			average10i = x;
		else
			average10i = (average10i * 9 + x)/10
		if(!average100i)
			average100i = x;
		else
			average100i = (average100i * 99 + x)/100;

		return [x, average10i, average100i];
	}

	for(i=0;i<20;i++) {
		pair = addDot();
		data.push(pair[0]);
		average10.push(pair[1]);
		average100.push(pair[2]);
	}

	var dots = {
		labels: labels,
		datasets: [
		{	
			label: 'Dots',
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "rgba(151,187,205,0.8)",
			data: data
		},
		{	
			label: 'Recursive Average alpha = 10',
			fillColor: "rgba(220,20,20,0.2)",
			strokeColor: "rgba(220,20,20,1)",
			data: average10
		},
		{	
			label: 'Recursive Average alpha = 100',
			fillColor: "rgba(220,220,20,0.2)",
			strokeColor: "rgba(220,220,20,1)",
			data: average100
		},
		]
	};

	var c = new Chart(document.getElementById(div).getContext("2d")).Line(dots, {
		showTooltips: false,
		animation: false,
		scaleShowGridLines : false,
		pointDotRadius : 2,
		tooltipEvents: [],
		scaleOverride: true,
		scaleSteps: 10,
		scaleStepWidth: 0.1,
		scaleStartValue: 0
	});	

	setInterval(function() {
		var pair = addDot();
		c.addData(pair, "");
		c.removeData();
	}, 100);
}


onlydots('dots');
dotsandrunningaverage('running_average');
dotsandrecursiveaverage("recursive_average");

