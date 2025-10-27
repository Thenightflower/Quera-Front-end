document.querySelector(".btn").addEventListener("click", () => {
  const input = document.querySelector(".input").value;
  const result = document.querySelector(".result");
  
  let totalDots = 0;
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    
    if (char === "ی") {
      // اگر ی آخر کلمه نباشه (یعنی وسط یا اول باشه)
      if (i !== input.length - 1 && input[i + 1] !== " ") {
        totalDots += 2; 
      }
      continue;
    }
    
    if (obj[char] !== undefined) {
      totalDots += Number(obj[char]);
    }
  }
  
  result.textContent = totalDots;
});