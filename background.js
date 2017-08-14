chrome.browserAction.onClicked.addListener( (tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "new_clarity_request") {
      console.log(request.data);
      requestClarification(request.url, request.data)
    }
  }
);

const requestClarification = (url, selection) => {
  let xhr = new XMLHttpRequest();
  let apiEndPoint = 'http://localhost:3000/clarifications'
  let params = JSON.stringify({clarification: { url: url, selection: selection, state: 0}})

  xhr.open('POST', apiEndPoint, true)
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhr.onload = () => {
    if (xhr.status === 200) relayResponseData(xhr.responseText)
  }
//this isn't correct, fix this in the am
  xhr.send(params);
}


const relayResponseData = (responseJSON) => {
  let parsedResponse = JSON.parse(responseJSON)
  //relays the returned data to teh currently active tabs content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { "message": "add_responses", "responses": responseJSON });
  });
}
