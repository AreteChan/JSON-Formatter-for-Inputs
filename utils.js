// 防抖函数
export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 判断是否为JSON格式
export function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// 格式化JSON
export function formatJSON(value) {
  try {
    const parsedJSON = JSON.parse(value);
    return JSON.stringify(parsedJSON, null, 2); // 参数null表示不使用额外的分隔符，2表示缩进2个空格
  } catch (e) {
    return value; // 如果不是JSON，返回原值
  }
}