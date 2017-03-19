var TreeCheckbox = function(options) {
	var me = this;
	// this.addEventListener("click", onClick);
	if (!options.store) {
		throw "Store not defined for this component";
	}
	this.store = options.store;
	if (!options.container) {
		throw "No container defined";
	}
	this.container = options.container;

	var getData = function getData(info) {
		if (!info.url) {
			throw "URL not defined";
		}
		var request = new XMLHttpRequest();
		request.open('GET', info.url, true);
		request.setRequestHeader("Content-type", "application-json");

		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				// Success!
				var response = JSON.parse(request.responseText);
				// console.log(arguments);
				// debugger;
				var locations = [],
					state,
					obj,
					parent;
				for (var location in response) {
					obj = response[location];
					parent = obj.parent
						// if the location is a obj
					if (parent === null) {
						if (locations.indexOf(location) === -1) {
							locations.push(location);
							locations[location] = {
								"selected": obj.selected ? obj.selected : false,
								"children": []
							};
						}
						// if the location is a city
					} else if (parent !== null) {
						if (locations.indexOf(parent) === -1) {
							locations.push(parent);
							locations[parent] = {
								"selected": obj.selected ? obj.selected : false,
								"children": []
							};
							locations[parent].children.push({
								"city": location,
								"selected": obj.selected ? obj.selected : false
							})
						} else {
							locations[parent].children.push({
								"city": location,
								"selected": obj.selected ? obj.selected : false
							});
						}
					}
				}
				buildTreeDom(locations);
				debugger;
			} else {
				// We reached our target server, but it returned an error

			}
		};

		request.onerror = function() {
			// There was a connection error of some sort
		};

		request.send();
	}

	var init = function init() {
		// var treeContainer = options.container;
		getData(options.store);
	}

	function onClick() {
		debugger;
	}

	var buildTreeDom = function buildTreeDom(data) {
		// var ulItem = document.createElement("ul");
		// var liItem = document.createElement("li");
		// var divContainer = document.createElement("div");
		var divContainer = options.container;
		var stateDivBox = document.createElement("div");
		// var cityDivBox = document.createElement("div");
		var len = data.length;
		for (var i = 0; i < len; i += 1) {
			if (data[i]) {
				var stateNode = document.createElement("div");
				stateNode.textContent = data[i];
				stateNode.setAttribute("class", "state");
				if (data[data[i]].children) {
					var cities = data[data[i]].children;
					var cityDivBox = document.createElement("div");
					for (var j = 0; j < cities.length; j += 1) {
						var cityNode = document.createElement("div");
						cityNode.textContent = cities[j].city;
						cityNode.setAttribute("class", "city");
						cityDivBox.appendChild(cityNode);
					}
				}
				stateDivBox.appendChild(stateNode).appendChild(cityDivBox);
			}
			divContainer.appendChild(stateDivBox);
		}
		// debugger;
		document.body.appendChild(divContainer);
	}
	// init();
	return {
		init: init,
	// onClick: onClick
	};
};