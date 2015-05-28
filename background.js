///**
// * Created by liam.dickson on 5/28/15.
// */
//
//addOnBeforeRequestListener = function () {
//    chrome.webRequest.onBeforeRequest.addListener(
//        function(details) {
//            if(details.url.includes("clump")) {
//                notifyDevtools(details);
//            }
//        },
//        {urls: ["<all_urls>"]},
//        ['requestBody']
//    );
//};
////removeOnBeforeRequestListener = function (callback) {
////    chrome.webRequest.onBeforeRequest.removeListener(callback);
////    console.log("Background webRequest Listener Destroyed");
////};
//
//addOnBeforeRequestListener();
//
//var ports = [];
//chrome.runtime.onConnect.addListener(function(port) {
//    if (port.name !== "devtools") return;
//    ports.push(port);
//    // Remove port when destroyed (eg when devtools instance is closed)
//    port.onDisconnect.addListener(function() {
//        var i = ports.indexOf(port);
//        if (i !== -1) ports.splice(i, 1);
//    });
//    port.onMessage.addListener(function(msg) {
//        console.log(msg)
//    });
//});
//// Function to send a message to all devtools.html views:
//function notifyDevtools(msg) {
//    ports.forEach(function(port) {
//        port.postMessage(msg);
//    });
//}