chrome.webRequest.onHeadersReceived.addListener(details => {
}, {
    urls: ['*://icpc.ptit.edu.vn/*', '*://code.ptit.edu.vn/*']
}, [])

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    let { requestHeaders } = details
    for (let i in requestHeaders) {
        if (requestHeaders[i].name.toLowerCase() == 'user-agent') {
            requestHeaders[i].value = 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36 PTITCode/Application'
        }
    }
    return {
        requestHeaders
    }
}, {
    urls: ['*://icpc.ptit.edu.vn/*', '*://code.ptit.edu.vn/*']
}, ['requestHeaders', 'blocking', 'extraHeaders'])

const loggingApp = () => {
    fetch('http://code.ptit.edu.vn/client/version?current=3', {
        method: 'GET'
    })
}
chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.create({
        url: chrome.runtime.getURL('login.html')
    })
    loggingApp()
})