$(document).ready(function(){
function checkboxTree(element, dataObject) {
	var me = this;
	me.el = element;
	me.data = dataObject;
	me.render = function() {
		$(element).append("<div class=\"tree\"></div><br>");
		for (var item in me.data) {
// 			console.log(me.data[item]);
			var state = me.data[item].name.replace(/\s/g, '')
			if (me.data[item].selected) {
				$(".tree").append("<p class='state_"+state+"'><input type=\"checkbox\" checked></input>"+me.data[item].name+"</p>");
			} else {
				$(".tree").append("<p class='state_"+state+"'><input type=\"checkbox\"></input>"+me.data[item].name+"</p>");
			}
			if (me.data[item].children.length > 0) {
				$(".state_"+state).prepend("<span class='toggleButton arrow-down'></span>");
				jQuery.each(me.data[item].children, function(i, val) {
// 					console.log(i);
// 					console.log(val);
					if (val.selected) {
            			$(".state_"+state).append("<div class='city'><input type=\"checkbox\" checked></input>"+val.name+"</div>");
            		} else {
	            		$(".state_"+state).append("<div class='city'><input type=\"checkbox\"></input>"+val.name+"</div>");
            		}
				});
			}
		}
		$("span.toggleButton").click(function() {
			var self = this;
			var selector = $(self)[0].parentNode.className;
			$("."+selector+" div.city").slideToggle("slow");
			if ($(self)[0].className==="toggleButton arrow-down") {
				$(self).removeClass("toggleButton arrow-down").addClass("toggleButton arrow-right");
			} else if ($(self)[0].className=="toggleButton arrow-right") {
				$(self).removeClass("toggleButton arrow-right").addClass("toggleButton arrow-down");
			}
		});
	};
};
	var list,
		states=[],
		jsonData=[],
		findState={},
		pos;
	$.ajax({
	//     url: "https://raw.github.com/cskevint/interview/master/checkbox_tree.json",
		url: "test.txt",
		dataType: "jsonp",
		type: "GET",
		async: false,
		jsonpCallback: 'data',
		contentType: "application/json",
		success: function(response) {
			list = JSON.parse(response);
			jQuery.each(list, function(i, val){
				if (i && (val.parent === null) && ($.inArray(i, states)==-1)) {
				/*In case of a state item*/
					states.push(i);
					if (val.selected) {
						pos = jsonData.push({"name":i, "selected": true, "children": []});
					} else {
						pos = jsonData.push({"name":i, "children": []});
					}
					pos--;
					findState[jsonData[pos].name] = jsonData[pos];
					findState[jsonData[pos].name].position = pos;
				} else if (i && (val.parent !== null) && ($.inArray(val.parent, states)==-1)) {
				/*In case of a city item*/
					states.push(val.parent);
					pos = jsonData.push({"name": val.parent, "children": []});
					pos--;
					findState[jsonData[pos].name] = jsonData[pos];
					findState[jsonData[pos].name].position = pos;
				}
				if (i && val.parent!==null) {
					/*
					For a child, check for the val.parent name and get position
					*/
					var stateIndex = findState[val.parent].position;
					if (val.selected) {
						jsonData[stateIndex].children.push({"name":i, "selected": true});
					} else {
						jsonData[stateIndex].children.push({"name":i});
					}
				}
			});
			for (var ind in jsonData) {
				delete jsonData[ind].position;
			}
		},
		failure: function(response) {
			throw Error(response);
		}
	});
	
	var checkBoxTree = new checkboxTree("#cities",jsonData);
	checkBoxTree.render();
});