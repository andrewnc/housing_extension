var number_of_errors = 0;
var stop_running = false;
if(window.location.hostname != 'www.facebook.com'){
	stop_running = true;
}



// Building housing scanner
function check_listing(){
	var listing = $("*[id^='mall_post_']").first();
	var listing_title = listing.find("._l53").first().find("span").eq(1).html();
	var post_info = listing.find(".userContent").eq(1).find("p").first().text();
	var poster = listing.find(".fwb").find("a").first().text();
	// console.log(poster + " posted a new house " + listing_title);
	return {title: listing_title, author:poster, info:post_info}

}
function go(){
	var response = check_listing();
	var unique = true;
	var listing = response['title'] + " " + response['author'] + " " + response['info'];
	if(listing in localStorage){
		console.log("same home");
		unique = false;
	} else {
		console.log("new house");
		unique = true;
		localStorage[listing] = '1';
	}

	return [{success: true, new_house:unique, info:response}];
};

function simulatedClick(target, options) {

  var event = target.ownerDocument.createEvent('MouseEvents'),
      options = options || {},
      opts = { // These are the default values, set up for un-modified left clicks
        type: 'click',
        canBubble: true,
        cancelable: true,
        view: target.ownerDocument.defaultView,
        detail: 1,
        screenX: 0, //The coordinates within the entire page
        screenY: 0,
        clientX: 0, //The coordinates within the viewport
        clientY: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
        button: 0, //0 = left, 1 = middle, 2 = right
        relatedTarget: null,
      };

  //Merge the options with the defaults
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      opts[key] = options[key];
    }
  }

  //Pass in the options
  event.initMouseEvent(
      opts.type,
      opts.canBubble,
      opts.cancelable,
      opts.view,
      opts.detail,
      opts.screenX,
      opts.screenY,
      opts.clientX,
      opts.clientY,
      opts.ctrlKey,
      opts.altKey,
      opts.shiftKey,
      opts.metaKey,
      opts.button,
      opts.relatedTarget
  );

  //Fire the event
  target.dispatchEvent(event);
}



function comment_on_the_post(){
	var listing = $("*[id^='mall_post_']").first();
	// var place_holder = $("*[id^=placeholder-]").first();
	var emoj = document.getElementsByClassName("UFICommentEmojiIcon")[0];
	var box = document.getElementsByClassName("UFIAddCommentInput")[0];
	
	simulatedClick(emoj);
	setTimeout(function (){
	var to_click = document.getElementsByClassName("_5zfs")[0];
	console.log(to_click.parentNode);
	simulatedClick(to_click.parentNode);
	to_click.parentNode.click();
	simulatedClick(box);
	box.click();
	simulatedClick(to_click);
	to_click.click();

	box.focus();

	var e = jQuery.Event("keypress");
	e.which = 13; //choose the one you want
	e.keyCode = 13;
	box.trigger(e);

	// to_click.click();


	}, 5000);


}

// var time_to_wait = 600000;
var time_to_wait = 10000;
var stime = setInterval(filter, time_to_wait);

chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    if (request.resp == "comment"){
	    	// logic to comment on the tab
	    	comment_on_the_post();
	    	console.log("comment");
	    }else{
	    	// location.reload();
	    	comment_on_the_post();
	    	console.log("no");
	    }
	  });

function filter(){
	if(stop_running){
		clearInterval(stime);
	}
	results = go();
	chrome.runtime.sendMessage({
	  res: results[0]
	});
	
	


	
}




