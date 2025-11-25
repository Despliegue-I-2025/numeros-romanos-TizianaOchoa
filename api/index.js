module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  class ConversorRomanos {
    static aArabigo(romano) {
      if (typeof romano !== 'string' || !romano.match(/^[IVXLCDM]+$/i)) return null;
      const valores = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
      let total = 0;
      for (let i = 0; i < romano.length; i++) {
        const actual = valores[romano[i].toUpperCase()];
        const siguiente = valores[romano[i+1]?.toUpperCase()] || 0;
        total += actual < siguiente ? -actual : actual;
      }
      return total > 0 ? total : null;
    }

    static aRomano(numero) {
      if (typeof numero !== 'number' || numero <= 0 || numero >= 4000) return null;
      const equivalencias = [
        [1000,"M"], [900,"CM"], [500,"D"], [400,"CD"],
        [100,"C"], [90,"XC"], [50,"L"], [40,"XL"],
        [10,"X"], [9,"IX"], [5,"V"], [4,"IV"], [1,"I"]
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

  const { url } = req;

  if (url.startsWith("/a2r")) {
    const numero = parseInt(req.query.arabic, 10);
    if (isNaN(numero)) return res.status(400).json({ error: "Debe proporcionar el parámetro 'arabic'." });
    const romano = ConversorRomanos.aRomano(numero);
    if (romano === null) return res.status(400).json({ error: "Número arábigo fuera de rango." });
    return res.json({ roman: romano });
  }

  if (url.startsWith("/r2a")) {
    const { roman } = req.query;
    if (!roman) return res.status(400).json({ error: "Debe proporcionar el parámetro 'roman'." });
    const numero = ConversorRomanos.aArabigo(roman);
    if (numero === null) return res.status(400).json({ error: "Número romano inválido." });
    return res.json({ arabic: numero });
  }

  return res.status(404).json({ error: "Ruta no válida." });
};
