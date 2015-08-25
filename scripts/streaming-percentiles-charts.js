var Gaussian = function(mean, variance) {
  if (variance <= 0) {
    throw new Error('Variance must be > 0 (but was ' + variance + ')');
  }

  var stddev = Math.sqrt(variance);
  var precision = 1 / variance;
  var precisionmean = precision * mean;

  // Complementary error function
  // From Numerical Recipes in C 2e p221
  var erfc = function(x) {
    var z = Math.abs(x);
    var t = 1 / (1 + z / 2);
    var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
            t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
            t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
            t * (-0.82215223 + t * 0.17087277)))))))))
    return x >= 0 ? r : 2 - r;
  };

  // Inverse complementary error function
  // From Numerical Recipes 3e p265
  var ierfc = function(x) {
    if (x >= 2) { return -100; }
    if (x <= 0) { return 100; }

    var xx = (x < 1) ? x : 2 - x;
    var t = Math.sqrt(-2 * Math.log(xx / 2));

    var r = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);

    for (var j = 0; j < 2; j++) {
      var err = erfc(r) - xx;
      r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
    }

    return (x < 1) ? r : -r;
  };

  // Construct a new distribution from the precision and precisionmean
  var fromPrecisionMean = function(precision, precisionmean) {
    var mean = precisionmean / precision;
    var variance = 1 / precision;
    return new Gaussian(mean, variance);
  };

  return {
    mean: mean,
    variance: variance,
    standardDeviation: stddev,

    precision: precision,
    precisionmean: precisionmean,

    // Probability density function
    pdf: function(x) {
      var m = stddev * Math.sqrt(2 * Math.PI);
      var e = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
      return e / m;
    },

    // Cumulative density function
    cdf: function(x) {
      return 0.5 * erfc(-(x - mean) / (stddev * Math.sqrt(2)));
    },

    // Percent point function (inverse of cdf)
    ppf: function(x) {
      return mean - stddev * Math.sqrt(2) * ierfc(2 * x);
    },

    // Product distribution of this and d
    mul: function(d) {
      return fromPrecisionMean(
          precision + d.precision,
          precisionmean  + d.precisionmean);
    },

    // Quotient distribution of this and d
    div: function(d) {
      return fromPrecisionMean(
          precision - d.precision,
          precisionmean  - d.precisionmean);
    }
  };
};


// First steph: show the dots
function only_dots(div, opts) {
	var labels = [];
	var data = [];

	if(!opts)
		opts = {};

	if(!opts.count)
		opts.count = 20;

	for(i=0;i<opts.count;i++) {
		labels.push('');
		data.push(Math.random());
	}

	var percentile_90_val = data.slice().sort()[Math.floor(opts.count * 0.9) - 1 ];

	var percentile_90 = [];
	for(i=0;i<opts.count;i++) {
		percentile_90.push(percentile_90_val);
	}

	var dots = {
		labels: labels,
		datasets: [{	
			label: 'Dots',
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "rgba(151,187,205,0.8)",
			data: data
		}, {	
			label: '90% percentile',
			fillColor: "rgba(0,0,0,0)",
			strokeColor: "rgba(220,20,20,1)",
			data: percentile_90
		}]
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

	if(!opts.fixed) {
		setInterval(function() {
			c.addData([Math.random()], "");
			c.removeData();
		}, 100);		
	}
};


function percentile_with_memory(div, opts) {
	var labels = [];
	var data = [];

	if(!opts)
		opts = {};

	if(!opts.count)
		opts.count = 20;

	for(i=0;i<opts.count;i++) {
		labels.push('');
		data.push(Math.random());
	}


	var percentile_90 = [];
	for(i=0;i<opts.count;i++) {
		var _slice = data.slice(0,i).sort();
		percentile_90.push(_slice[Math.floor(_slice.length*9/10 -1)]);
	}

	var dots = {
		labels: labels,
		datasets: [{	
			label: 'Dots',
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "rgba(151,187,205,0.8)",
			data: data
		}, {	
			label: '90% percentile',
			fillColor: "rgba(0,0,0,0)",
			strokeColor: "rgba(220,20,20,1)",
			data: percentile_90
		}]
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

	if(!opts.fixed) {
		setInterval(function() {
			c.addData([Math.random()], "");
			c.removeData();
		}, 100);		
	}
};


function percentiles_as_local_maxima(div, opts) {
	var labels = [];
	var data = [];
	var small_decay_local_maximums = [];
	var medium_decay_local_maximums = [];
	var heavy_decay_local_maximums = [];
	var small_decay_latest_local_max = null;
	var medium_decay_latest_local_max = null;
	var heavy_decay_latest_local_max = null;
	var small_decay = 0;
	var medium_decay = 0;
	var heavy_decay = 0;

	if(!opts)
		opts = {};

	if(!opts.count)
		opts.count = 20;

	function addDot() {
		labels.push('');
		var x = Math.random();

		// small decay
		if(!small_decay_latest_local_max || small_decay_latest_local_max - small_decay < x) {
			small_decay = 0;
			small_decay_latest_local_max = x;
		}
		else {
			small_decay += 0.001;
		}

		// medium decay
		if(!medium_decay_latest_local_max || medium_decay_latest_local_max - medium_decay < x) {
			medium_decay = 0;
			medium_decay_latest_local_max = x;
		}
		else {
			medium_decay += 0.1;
		}

		// heavy decay
		if(!heavy_decay_latest_local_max || heavy_decay_latest_local_max - heavy_decay < x) {
			heavy_decay = 0;
			heavy_decay_latest_local_max = x;
		}
		else {
			heavy_decay += 0.4;
		}


 		return [x, small_decay_latest_local_max, medium_decay_latest_local_max, heavy_decay_latest_local_max];
	}

	for(i=0;i<opts.count;i++) {
		var a = addDot();
		data.push(a[0]);
		small_decay_local_maximums.push(a[1]);
		medium_decay_local_maximums.push(a[2]);
		heavy_decay_local_maximums.push(a[3]);
	}

	var dots = {
		labels: labels,
		datasets: [{	
			label: 'Dots',
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "rgba(151,187,205,0.8)",
			data: data
		}, {	
			label: 'small decay',
			fillColor: "rgba(0,0,0,0)",
			strokeColor: "rgba(220,20,20,1)",
			data: small_decay_local_maximums
		},
		{	
			label: 'medium decay',
			fillColor: "rgba(0,0,0,0)",
			strokeColor: "rgba(20,220,20,1)",
			data: medium_decay_local_maximums
		},
		{	
			label: 'heavy decay',
			fillColor: "rgba(0,0,0,0)",
			strokeColor: "rgba(20,20,220,1)",
			data: heavy_decay_local_maximums
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

	if(!opts.fixed) {
		setInterval(function() {
			var x = addDot();
			c.addData(x, "");
			c.removeData();
		}, 300);		
	}
};


function percentiles_with_chebyshev(div, opts) {
	var labels = [];
	var data = [];
	var percentile_90 = [];
	var recursiveAverage = 0;
	var recursiveAverageOfSquares = 0;

	var recurs = 100;
	var vals = 0;

	if(!opts)
		opts = {};

	if(!opts.count)
		opts.count = 20;

	var distribution = Gaussian(0.5, 0.01);


	function addDot() {
		labels.push('');
		var x = distribution.ppf(Math.random());
		vals +=1;
		var weight = Math.min(vals, recurs);
		recursiveAverage = 1/weight * (recursiveAverage * (weight - 1) + x);
		recursiveAverageOfSquares = 1/weight * (recursiveAverageOfSquares * (weight - 1) + x*x);
		var variance = recursiveAverageOfSquares - (recursiveAverage * recursiveAverage);
		var stdDev = Math.sqrt(variance);
 		return [x, recursiveAverage + 1.65*stdDev];
	}

	for(i=0;i<opts.count;i++) {
		var a = addDot();
		data.push(a[0]);
		percentile_90.push(a[1]);
	}

	var dots = {
		labels: labels,
		datasets: [{	
			label: 'Dots',
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "rgba(151,187,205,0.8)",
			data: data
		}, {	
			label: '90th percentile',
			fillColor: "rgba(0,0,0,0)",
			strokeColor: "rgba(220,20,20,1)",
			data: percentile_90
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

	if(!opts.fixed) {
		setInterval(function() {
			var x = addDot();
			c.addData(x, "");
			c.removeData();
		}, 300);		
	}
};


only_dots('static-dots', {fixed: true, count: 50});
percentile_with_memory('static-percentile-with-memory', {fixed: true, count: 50});
percentiles_as_local_maxima('percentiles-as-local-maxima', {fixed: false, count: 50});
percentiles_with_chebyshev('percentiles-with-chebyshev', {fixed: false, count: 50});
