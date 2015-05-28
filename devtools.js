chrome.devtools.panels.create("Clump Network", "icon.png", "panel.html", function(panel) {
    //var _window; // Going to hold the reference to panel.html's `window`
    //
    //var data = [];
    //var port = chrome.runtime.connect({name: 'devtools'});
    //port.onMessage.addListener(function(msg) {
    //    if(_window) {
    //        _window.messageReceived(msg);
    //    }else{
    //        data.push(msg);
    //    }
    //});
    //
    //panel.onShown.addListener(function tmp(panelWindow) {
    //    panel.onShown.removeListener(tmp); // Run once only
    //    _window = panelWindow;
    //
    //    // Release queued data
    //    var msg;
    //    while (msg = data.shift()) {
    //        _window.messageReceived(msg);
    //    }
    //
    //    // Just to show that it's easy to talk to pass a message back:
    //    _window.messageSend = function(msg) {
    //        port.postMessage(msg);
    //    };
    //});
});