import { debounce, isJSON, formatJSON } from './utils.js';

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

