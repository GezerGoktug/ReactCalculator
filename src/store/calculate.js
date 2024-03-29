//! İşlem önceliğine göre verilen genel işlemi hesaplar.

const calculate = (expression) => {
  // İşlem operatörlerini ve sayıları ayırma
  let parts = expression.match(/(?:\d+\.?\d*|[-+*/])/g);

  // Negatif sayıları işaretlendirme
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "-") {
      // Eğer bir önceki eleman bir işlem operatörü ise, bu bir negatif sayıdır
      if (
        i === 0 ||
        (isNaN(parseFloat(parts[i - 1])) && parts[i - 1] !== ")")
      ) {
        parts.splice(i, 2, "-" + parts[i + 1]);
      }
    }
  }

  // Çarpma ve bölme işlemlerini yapma
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "*" || parts[i] === "/") {
      let leftOperand = parseFloat(parts[i - 1]);
      let rightOperand = parseFloat(parts[i + 1]);
      let result;
      if (parts[i] === "*") {
        result = leftOperand * rightOperand;
      } else if (parts[i] === "/") {
        result = leftOperand / rightOperand;
      }
      // Sonucu yerine koy
      parts.splice(i - 1, 3, result);
      // Yerine koyduğumuz elemanın bir önceki elemana dönmemiz gerekiyor
      i--;
    }
  }

  // Toplama ve çıkarma işlemlerini yapma
  let result = parseFloat(parts[0]);
  for (let i = 1; i < parts.length; i += 2) {
    let operator = parts[i];
    let operand = parseFloat(parts[i + 1]);
    if (operator === "+") {
      result += operand;
    } else if (operator === "-") {
      result -= operand;
    }
  }
  return result;
};

export default calculate;
