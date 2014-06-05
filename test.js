$(document).ready(function(){
/*
Assumptions:- All of them have a key-value pair of parent-value
- need a variable to store the list of parents
*/
var list;
var parentList=[];
var addButton = function() {
	prepend("<input type=\"button\" class=\"\"></input>");
};
var addCheckbox = function(value) {
// 	$(".city").prepend("<input type=\"checkbox\" checked></input>").removeClass("city");
		
};
var addParent = function(value, check) {
	var state = value.replace(/\s/g, '')
	if (check) {
		$(".list").append("<p class='state_"+state+"'><input type=\"checkbox\" checked></input>"+value+"</p>");
	} else {
		$(".list").append("<p class='state_"+state+"'><input type=\"checkbox\"></input>"+value+"</p>");
	}
	$(".state_"+state).prepend("<span class='toggleButton arrow-down'></span>");
};
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
        $(".container").append("<div class=\"list\"></div><br>");
            
            jQuery.each(list, function(i, val){
             	console.log(i);
             	console.log(parentList);
             	console.log($.inArray(val.parent, parentList));
             	//console.log(val.parent);
//              	if (val.selected) {
//              		$(".list").append("<input type=\"checkbox\" checked></input>");
//              	}
            	if (val.parent !== null && ($.inArray(val.parent, parentList)==-1)) {
            		parentList.push(val.parent);
            		addParent(val.parent, val.selected);
//             		$(".list").append("<p class='parent_"+val.parent+"'>"+val.parent+"</p><br>");
            	}
            	if (val.parent !== null) {
            		var state = val.parent.replace(/\s/g, '');
// 	            	$(".state_"+state).append("<div class='city'><input type=\"checkbox\"></input>"+i+"</div>");
	            	if (val.selected) {
            			$(".state_"+state).append("<div class='city'><input type=\"checkbox\" checked></input>"+i+"</div>");
            		} else {
	            		$(".state_"+state).append("<div class='city'><input type=\"checkbox\"></input>"+i+"</div>");
            		}
	            }
            });
            
            $("span.toggleButton").click(function() {
                var me = this;
				var selector = $(this)[0].parentNode.className;
                $("."+selector+" div.city").slideToggle("slow");
                if ($(me)[0].className==="toggleButton arrow-down") {
					$(me).removeClass("toggleButton arrow-down").addClass("toggleButton arrow-right");
				} else if ($(me)[0].className=="toggleButton arrow-right") {
					$(me).removeClass("toggleButton arrow-right").addClass("toggleButton arrow-down");
				}
			});
    },
    failure: function(response) {
        throw Error(response);
    }
});

//$(".container").append("<div class=\"list\">"+list+"</div>");

});