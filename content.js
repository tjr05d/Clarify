//adds message listener for browser action click
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    if (request.message === "clicked_browser_action") {
      let url = window.location.href
      let selection = getSelectedText(window);
      chrome.runtime.sendMessage({ "message": "new_clarity_request", "data": selection, "url": url });
      addResponseDiv(document, selection)
    }
  }
);


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let container = document.getElementById("container")
  if (request.message === "add_responses") {
    let responses = JSON.parse(request.responses)
    console.log(responses)
    if(responses.length === 0){
      console.log("if")
      addLoadingGif()
    } else {
      for(let response of responses){
        console.log("else")
        appendResponseToContainer(response.response_text) 
      }
    }
  } 
});


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

const addResponseDiv = (document, selection) => {
  document.documentElement.style.height = '100%'
  document.body.style.height = '100%'
  document.documentElement.style.width = '100%'
  document.body.style.width = '100%'

  let div = document.createElement('div')

  //append all elements
  document.body.appendChild(div)
  //set attributes for div
  div.id = 'container'
  div.style.position = 'fixed'
  div.style.bottom = '0'
  div.style.right = '0'
  div.style.zIndex = '999999'
  div.style.width = '30%'
  div.style.height = '100%'
  div.style.border = '1px solid gray'
  div.style.backgroundColor = 'white'
  div.display = 'flex'
  div.flexDirection = 'column' 

  AddTextToClarifyDiv('Clarify', div, '#42c5f4', '30px')
  AddTextToClarifyDiv(selection, div, 'white')
}

const AddTextToClarifyDiv = (text, parentDiv, color, height) => {
  let promptDiv = document.createElement('div')
  promptDiv.id = 'prompt'
  promptDiv.style.width = '100%'
  promptDiv.style.minHeight = height
  promptDiv.style.backgroundColor = color
  promptDiv.style.display = 'flex'
  promptDiv.style.flex = '1'
  promptDiv.style.justifyContent = 'center'
  promptDiv.style.padding = '18px'
  promptDiv.style.borderBottom = '1px solid lightgrey'
  promptDiv.innerText = text
  parentDiv.appendChild(promptDiv)
}

const appendResponseToContainer = (responseText) => {
  let container = document.getElementById('container')

  let responseDiv = document.createElement('div')
  responseDiv.innerHTML = responseText

  container.appendChild(responseDiv)
}

const addLoadingGif = () => {
  let container = document.getElementById('container')
  
  let loadingGif = new Image(100, 100)
  let imgURL = chrome.extension.getURL('loading.gif');
  loadingGif.src = imgURL
  loadingGif.style.marginTop = '200px'
  container.appendChild(loadingGif)
}