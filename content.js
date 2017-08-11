//adds message listener for browser action click
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    if (request.message === "clicked_browser_action") {
      let selection = getSelectedText(window);
      alert(selection);
      chrome.runtime.sendMessage({ "message": "new_clarity_request", "data": selection });
    }
  }
);

//grab highlighted text from the DOM
const getSelectedText = (window) => {
  let text =""
  if (window.getSelection){
    text = window.getSelection().toString()
  } else if (document.selection && document.selection.type !== "Control") {
    text = document.selection.createRange().text
  } 
  return text
}