var sum = 0;
var object = {
	number: 35,
	dep1: {
		number: 40,
		dep11: {
			number: 50,
		},
	},
	dep2: {
		number: 60,
	},
	dep3: {
		dep31: {
			dep311: {
				number: 100,
			},
		},
	},
};

function sumLoop(obj, res) {
	if (typeof obj === "number") {
		return res + obj;
	}
	return res + Object.keys(obj).reduce((acc, key) => sumLoop(obj[key], acc), 0);
}

console.log(sumLoop(object, sum));
