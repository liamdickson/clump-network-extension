var React = require('react');
var Promise = require('es6-promise').Promise;
var ClumpPanelWrapper = require('./ClumpPanelWrapper');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            harLog: {requests: [], responses: []}
        };
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
        var self = this;
        var returnArr = [];
        var i, j, requests = [], promises = [];
        for(i = 0; i < harLog.length; i++){
            requests = requests.concat(this.divideRequests(harLog[i]));
            promises[i] = new Promise(function (resolve, reject){
                harLog[i].getContent(function(content){
                    resolve(content);
                });
            });
        }
        Promise.all(promises).then(function(results){
            var tempHarLog = self.state.harLog;
            var i, responses = [];
            for(i = 0; i < results.length; i++) {
                responses = responses.concat(self.divideResponses(results[i]));
            }
            tempHarLog.responses = responses;
            self.setState({harLog: tempHarLog});
        });
        return {requests: requests, responses: []};
    },
    divideRequests: function(har) {
        var i, output = [], requestBody = JSON.parse(har.request.postData.text);
        for(var i = 0; i < requestBody.elements.length; i++){
            output.push(requestBody.elements[i]);
        }
        return output;
    },
    divideResponses: function(har) {
        var i, output = [], response = JSON.parse(har);
        for(var i = 0; i < response.result.clumpResponse.elements.length; i++){
            output.push(response.result.clumpResponse.elements[i]);
        }
        return output;
    },
    componentDidMount: function() {
        var self = this;
        var harLog;
        this.devToolsListenerFunc = function(request) {
            if(request.request.url.includes("clump")){
                chrome.devtools.network.getHAR(function (newLog) {
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
        chrome.devtools.network.onRequestFinished.removeListener(this.devToolsListenerFunc);
    },
    render: function() {
        return <ClumpPanelWrapper
            harLog={this.state.harLog}
        />;
    }
});