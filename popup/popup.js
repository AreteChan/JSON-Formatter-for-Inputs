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

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('jsonInput');

  textarea.addEventListener('input', () => {
    const value = textarea.value.trim();

    if (isJSON(value)) {
      const formattedJSON = formatJSON(value);
      textarea.value = formattedJSON;
    }
  });
});