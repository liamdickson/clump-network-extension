var React = require('react');
var Promise = require('es6-promise').Promise;
var ClumpPanelWrapper = require('./ClumpPanelWrapper');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            width: window.innerWidth - 15,
            height: window.innerHeight - 100,
            harLog: {requests: [], responses: []}
        };
    },
    handleResize: function(e) {
        this.setState({width: window.innerWidth - 15});
        this.setState({height: window.innerHeight - 100});
    },
    parseHar: function(harLog) {
        var output = [];
        for (var i in harLog){
            var item = harLog[i];
            if(item.request.url.includes('clump')){
                output.push(item);
            }
        }
        return output;
    },
    divideHar: function(harLog) {
        var returnArr = [];
        var i, j, requests = [], responses = [];
        for(i = 0; i < harLog.length; i++){
            requests = requests.concat(this.divideRequests(harLog[i]));

            responses = responses.concat([1]);
        }
        return {requests: requests, responses: responses};
    },
    divideRequests: function(har) {
        var i, output = [], requestBody = JSON.parse(har.request.postData.text);
        for(var i = 0; i < requestBody.elements.length; i++){
            output.push(requestBody.elements[i]);
        }
        return output;
    },
    divideResponses: function(har) {
    },
    componentDidMount: function() {
        var self = this;
        var harLog;
        window.addEventListener('resize', this.handleResize);
        this.devToolsListenerFunc = function(request) {
            if(request.request.url.includes("clump")){
                chrome.devtools.network.getHAR(function (newLog) {
                    console.log('ClumpMain: new clump found');
                    harLog = newLog.entries;
                    harLog = self.parseHar(harLog);
                    harLog = self.divideHar(harLog);
                    self.setState({harLog: harLog});
                });
            }
        };
        chrome.devtools.network.onRequestFinished.addListener(this.devToolsListenerFunc);
    },
    componentDidUnMount: function() {
        window.removeEventListener('resize', this.handleResize);
        chrome.devtools.network.onRequestFinished.removeListener(this.devToolsListenerFunc);
    },
    render: function() {
        return <ClumpPanelWrapper
            width={this.state.width}
            height={this.state.height}
            harLog={this.state.harLog}
        />;
    }
});