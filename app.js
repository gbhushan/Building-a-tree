document.addEventListener('DOMContentLoaded', function() {
	NS.init = function init() {
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
				// recommended: keep the appendChild / modification of DOM outside of the creation of treecheckbox
				tc.initComponent();
			}
		}
	}
	NS.init();
});