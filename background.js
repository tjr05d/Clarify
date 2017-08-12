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

  xhr.open('POST', apiEndPoint, true)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    if (xhr.status === 200) relayClarificationData()
  }
//this isn't correct, fix this in the am
  xhr.send("clarification[url=" + url + "]clarification[&selection=" + selection + "]clarification[&state=0]");
}


const relayResponseData = () => {
  console.log("request was returned")
}
