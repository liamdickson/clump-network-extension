"use strict";

var React = require('react');
var Promise = require('es6-promise').Promise;
var ClumpPanelWrapper = require('./ClumpPanelWrapper');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            harLog: [],
            selectedObject: -1
        };
    },
    parseHar: function(newLog) {
        var harLog = [];
        var rawRequests = [];
        var rawResponses = [];
        var clumpRequests = [];
        var clumpResponses = [];
        var responsePromises = [];
        var newHarLog = [];

        // Filter newLog for clump requests
        newLog.forEach((log) => {
            if (log.request.url.includes('clump')) {
                harLog.push(log);
            }
        });

        harLog.forEach((har, i) => {
            // Put the request data in the clumpRequests Array
            try {
                rawRequests = JSON.parse(har.request.postData.text);
            } catch (e) {
                alert("Clump Request was invalid: " + har.request.postData.text + " "+e);
            }
            rawRequests.elements.forEach((request) => {
                clumpRequests.push(request);
            });

            // Construct an array of response promises
            responsePromises[i] = new Promise((resolve) => {
                har.getContent((content) => {
                    resolve(content);
                });
            });
        });

        // When promises resolve then update the data
        Promise.all(responsePromises).then((results) => {
            results.forEach((result) => {
                try {
                    rawResponses = JSON.parse(result);
                    rawResponses.result.clumpResponse.elements.forEach((clumpResponse) => {
                        clumpResponses.push(clumpResponse);
                    });
                } catch (e1) {
                    try {
                        rawResponses = JSON.parse(result.replace(/:\s+(['"])?([a-zA-Z0-9_. ]+)(['"])?\s+,/g, ': "$2",'));
                        rawResponses.result.clumpResponse.elements.forEach((clumpResponse) => {
                            clumpResponses.push(clumpResponse);
                        });
                    } catch (e2) {
                        clumpResponses.push({url: "ERR", method: "ERR", payload: result, httpCode: "ERR"});
                    }
                }
            });

            newHarLog = clumpRequests.map((request, i) => {
                return {
                    request: request,
                    response: clumpResponses[i],
                    id: i,
                    requestVars: {
                        display: request.url
                    },
                    responseVars: {
                        display: clumpResponses[i].httpCode,
                        className: (clumpResponses[i].httpCode === 200) ? "goodCode" : "badCode"
                    },
                    err: clumpResponses[i].url === "ERR" ? 1 : 0
                };
            });

            this.setState({harLog: newHarLog});
        });
    },
    setSelectedObject: function(i, e) {
        $('.selected').removeClass('selected');
        if(e){
            $(e.currentTarget).addClass('selected');
        }
        this.setState({selectedObject: i});
    },
    devToolsListenerFunc: function (request) {
        if(request.request.url.includes("clump")){
            chrome.devtools.network.getHAR((newLog) => {
                this.parseHar(newLog.entries);
            });
        }
    },
    refreshPageFunc: function () {
        this.setState({harLog: [], selectedObject: -1});
    },
    componentDidMount: function() {
        chrome.devtools.network.onRequestFinished.addListener(this.devToolsListenerFunc);
        chrome.devtools.network.onNavigated.addListener(this.refreshPageFunc);
    },
    componentDidUnMount: function() {
        chrome.devtools.network.onRequestFinished.removeListener(this.devToolsListenerFunc);
        chrome.devtools.network.onNavigated.removeListener(this.refreshPageFunc);
    },
    render: function() {
        return <ClumpPanelWrapper
            harLog={this.state.harLog}
            selectedObject={this.state.selectedObject}
            setSelectedObject={this.setSelectedObject}
        />;
    }
});