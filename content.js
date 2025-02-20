// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 判断是否为JSON格式
function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// 格式化JSON
function formatJSON(value) {
  try {
    const parsedJSON = JSON.parse(value);
    return JSON.stringify(parsedJSON, null, 2); // 参数null表示不使用额外的分隔符，2表示缩进2个空格
  } catch (e) {
    return value; // 如果不是JSON，返回原值
  }
}

// 设置JSON格式化功能
function setupJSONFormatting() {
  const inputElements = document.querySelectorAll("input, textarea");

  inputElements.forEach((input) => {
    let lastValue = input.value; // 缓存上一次的值

    const handleInput = debounce((event) => {
      const target = event.target;
      const value = target.value.trim();

      // 如果内容没有变化，直接返回
      if (value === lastValue) return;

      // 记录光标位置
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;

      // 如果是JSON格式，则格式化
      if (isJSON(value)) {
        const formattedJSON = formatJSON(value);
        // 更新输入框的值
        target.value = formattedJSON;
        // 更新缓存值
        lastValue = formattedJSON;
        // 计算偏移量
        const offset = formattedJSON.length - value.length;
        // 恢复光标位置
        event.target.setSelectionRange(start + offset, end + offset);
      }
    }, 1000); // 防抖时间设置为1000ms

    input.addEventListener("input", handleInput);
  });
}

// 初始化
setupJSONFormatting();