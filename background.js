
console.originalWarn = console.warn;
console.warn = function () {
    if (arguments.length == 1 && typeof arguments[0] === 'string' && arguments[0].startsWith('Manifest v2 support is deprecated and will be removed in a future version of Chrome.')) {
        return;
    } 
};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'start_tab_events') {
        let page_url;
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            page_url = tabs[0].url
            console.log("tab", tabs[0].url);


            chrome.windows.create({
                url: tabs[0].url,
                width: 370,
                height: 600,
            }, function (window) {
                var tabId = window.tabs[0].id;
                chrome.storage.sync.set({ mobiletabid: tabId });

                console.log("Tab ID in the new window: " + tabId);
            });
        });
    }
    else if (request.action === 'mousedown') {
        chrome.storage.sync.get("mobiletabid", function (data) {
            console.log("request.event", request.event)
            if (Object.keys(data)) {
                if (data.mobiletabid) {
                    chrome.tabs.sendMessage(data.mobiletabid, { message: 'id clicked', tabId: data.mobiletabid, "click_postion": request.event });
                }
            }
        })
    }
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
        console.log('tabArray', tabArray)
    }
    );
    sendResponse({ status: 'ok' });
    let scrollPositions = {};
});
























