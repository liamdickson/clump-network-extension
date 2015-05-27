var ext_console = "{";
var passed = 0;

chrome.devtools.network.onRequestFinished.addListener( function(request) {
	if(request.request.url.includes("clump")){
        JSONFormatter.format(request, {collapse: false, appendTo: '#data'});
	}
});
//
//chrome.devtools.network.onRequestFinished.addListener( function(request) {
//	if(request.request.url.includes("clump")){
//		if(passed){
//    		ext_console += ",";
//    	}
//    	ext_console += "\"obj" + passed + "\":" + JSON.stringify(request, null, 4);
//    	passed += 1;
//	}
//});
//
//document.getElementById("log_btn").addEventListener("click", function(){
//	$('#log').text(ext_console + "}");
//});