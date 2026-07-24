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
    // 跳过只读和禁用的输入框（由 setupReadonlyPolling 处理）
    if (input.readOnly || input.disabled) return;

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

// 设置只读输入框的JSON格式化（轮询方式，处理系统自动填入的场景）
function setupReadonlyPolling() {
  // WeakMap 缓存每个字段的上次值，元素移除后自动GC
  var cachedValues = new WeakMap();

  // 检查并格式化单个字段
  function checkField(el) {
    var currentRaw = el.value;
    var lastValue = cachedValues.get(el);

    // 内容未变化，跳过
    if (currentRaw === lastValue) return;

    // 先缓存当前原始值，防止重入
    cachedValues.set(el, currentRaw);

    // 如果是有效的JSON，则格式化
    if (currentRaw && isJSON(currentRaw)) {
      var formatted = formatJSON(currentRaw);
      if (formatted !== currentRaw) {
        el.value = formatted;
        // 更新缓存为格式化后的值，避免下次轮询重复格式化
        cachedValues.set(el, formatted);
      }
    }
  }

  // 立即执行：处理页面加载时已有的内容
  var readonlyElements = document.querySelectorAll("textarea[readonly], input[readonly], textarea[disabled], input[disabled]");
  readonlyElements.forEach(checkField);

  // 定期轮询：检测系统后续通过 JS 填入的 JSON
  setInterval(function () {
    var elements = document.querySelectorAll("textarea[readonly], input[readonly], textarea[disabled], input[disabled]");
    elements.forEach(checkField);
  }, 1000);
}

// 初始化
setupJSONFormatting();
setupReadonlyPolling();