export default function handler(req, res) {
  const { value } = req.query;
  const path = req.url.split("?")[0];

  if (path.endsWith("/r2a")) {
    if (!value || typeof value !== "string") {
      return res.status(400).json({ error: "Parámetro 'value' requerido" });
    }

    const roman = value.toUpperCase();

    const validRomanRegex =
      /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

    if (!validRomanRegex.test(roman)) {
      return res.status(400).json({ error: "Número romano inválido" });
    }

    const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
    let result = 0;

    for (let i = 0; i < roman.length; i++) {
      const current = map[roman[i]];
      const next = map[roman[i + 1]];

      if (next > current) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }

    return res.status(200).json({ result });
  }


  if (path.endsWith("/a2r")) {
    if (!value) {
      return res.status(400).json({ error: "Parámetro 'value' requerido" });
    }

    if (!/^\d+$/.test(value)) {
      return res.status(400).json({ error: "Formato inválido" });
    }

    const num = parseInt(value);

    if (num < 1 || num > 3999) {
      return res.status(400).json({ error: "Fuera de rango (1-3999)" });
    }

    const map = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"],  [90,  "XC"], [50,  "L"], [40,  "XL"],
      [10,  "X"],  [9,   "IX"], [5,   "V"], [4,   "IV"],
      [1,   "I"],
    ];

    let result = "";
    let n = num;

    for (const [val, roman] of map) {
      while (n >= val) {
        result += roman;
        n -= val;
      }
    }

    return res.status(200).json({ result });
  }

  return res.status(404).json({ error: "Ruta no encontrada" });
}
