
window.onload = async function () {
    console.originalWarn = console.warn;
    console.warn = function () {
        if (arguments.length == 1 && typeof arguments[0] === 'string' && arguments[0].startsWith('Manifest v2 support is deprecated and will be removed in a future version of Chrome.')) {
            return;
        } else {
            console.originalWarn.apply(console, arguments);
        }
    };
    var start_tab_events = document.getElementById('start_tab_events')
    if (start_tab_events) {
        start_tab_events.onclick = () => {
            chrome.runtime.sendMessage({ action: 'start_tab_events' }, function (response) {
                window.close()
            })
        }
    }
}
