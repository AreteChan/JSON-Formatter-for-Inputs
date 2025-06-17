let popupWindow = null;

// 监听扩展图标点击
chrome.action.onClicked.addListener(() => {
    // 否则创建一个新窗口
    chrome.windows.create({
      url: chrome.runtime.getURL("popup/popup.html"),
      type: "popup",
      width: 540,
      height: 560,
      left: 0, 
      top: 0,  
      focused: true
    }, (window) => {
      popupWindow = window;
    });
});

// 监听窗口关闭事件
chrome.windows.onRemoved.addListener((windowId) => {
  if (popupWindow && popupWindow.id === windowId) {
    popupWindow = null;
  }
});