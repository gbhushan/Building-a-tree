var TreeCheckbox = function(options) {
	var me = this;

	var getData = function(info) {
		// we'll get data from the URL
		// on success, we'll build an object to suit our needs for the TreeCheckbox
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
			} else {
				// We reached our target server, but it returned an error

			}
		};

		request.onerror = function() {
			// There was a connection error of some sort
		};

		request.send();
	}

	var initComponent = function() {
		// in the init component we set up the properties of the component
		/*if (!options.store) {
			throw "Store not defined for this component";
		}
		me.store = options.store;
		if (!options.container) {
			throw "No container defined";
		}
		me.container = options.container;*/
		getData(options.store);
	}

	// function onClick() {
	// 	debugger;
	// }

	var buildTreeDom = function(data) {
		var divContainer = document.createElement("div");
		var stateDivBox = document.createElement("div");
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
		options.container.appendChild(divContainer);
	}
	// return {
	// 	initComponent: initComponent
	// };
};