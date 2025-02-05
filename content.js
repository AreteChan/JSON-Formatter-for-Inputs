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
    return JSON.stringify(parsedJSON, null, 2);
  } catch (e) {
    return value; // 如果不是JSON，返回原值
  }
}

// 设置JSON格式化功能
function setupJSONFormatting() {
  const inputElements = document.querySelectorAll('input, textarea');

  inputElements.forEach((input) => {
    let lastValue = input.value; // 缓存上一次的值

    const handleInput = debounce((event) => {
      const value = event.target.value.trim();

      // 如果内容没有变化，直接返回
      if (value === lastValue) return;

      // 如果是JSON格式，则格式化
      if (isJSON(value)) {
        const formattedJSON = formatJSON(value);
        event.target.value = formattedJSON;
        lastValue = formattedJSON; // 更新缓存值
      } else {
        lastValue = value; // 更新缓存值
      }
    }, 300); // 防抖时间设置为300ms

    input.addEventListener('input', handleInput);
  });
}

// 初始化
setupJSONFormatting();