document.addEventListener('DOMContentLoaded', function() {
	debugger;
	function init() {
		// 
		var treeContainers = document.querySelectorAll(".treeContainer");
		var tcLength = treeContainers.length;
		var i = 0;
		if (tcLength > 0) {
			for (i; i < tcLength; i += 1) {
				var tc = new TreeCheckbox({
					container: treeContainers[i],
					store: {
						url: treeContainers[i].getAttribute("storeURL")
					}
				});
				tc.init();
			}
		}
	}
	init();
});