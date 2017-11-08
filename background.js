chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
    	found_one(request.res);
    	function found_one(results) {
		    if(results["new_house"]){

		    	var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://127.0.0.1:5000/go.py", false);
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
				xhr.withCredentials = false;
				xhr.send(JSON.stringify(results));
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				  chrome.tabs.sendMessage(tabs[0].id, {resp: xhr.response}, function(response) {
				    // nothing
				  });
				});
		    }else{
		    	// Do nothing
		    }

		};
    }
);