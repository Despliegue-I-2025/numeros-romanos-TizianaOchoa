// api/romanos.js

class ConversorRomanos {
  static aArabigo(romano) {
    if (typeof romano !== 'string' || !romano.match(/^[IVXLCDM]+$/i)) {
      return null;
    }

    const valores = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;

    for (let i = 0; i < romano.length; i++) {
      const actual = valores[romano[i].toUpperCase()];
      const siguiente = valores[romano[i + 1]?.toUpperCase()] || 0;

      total += actual < siguiente ? -actual : actual;
    }

    return total > 0 ? total : null;
  }

  static aRomano(numero) {
    if (typeof numero !== 'number' || numero <= 0 || numero >= 4000) {
      return null;
    }

    const equivalencias = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];

    let resultado = "";
    for (const [valor, simbolo] of equivalencias) {
      while (numero >= valor) {
        resultado += simbolo;
        numero -= valor;
      }
    }

    return resultado;
  }
}

module.exports = (req, res) => {
  const { path, roman, arabic } = req.query;

  if (path === "romano-a-arabigo") {
    if (!roman) return res.status(400).json({ error: 'Debe proporcionar el parámetro "roman".' });

    const valor = ConversorRomanos.aArabigo(roman);
    if (valor === null) return res.status(400).json({ error: "Número romano inválido." });

    return res.json({ arabic: valor });
  }

  if (path === "arabigo-a-romano") {
    const numero = parseInt(arabic, 10);
    if (isNaN(numero)) return res.status(400).json({ error: 'Debe proporcionar el parámetro "arabic".' });

    const resultado = ConversorRomanos.aRomano(numero);
    if (resultado === null) return res.status(400).json({ error: "Número arábigo fuera de rango." });

    return res.json({ roman: resultado });
  }

  return res.status(404).json({ error: "Ruta no válida." });
};

module.exports.ConversorRomanos = ConversorRomanos;
