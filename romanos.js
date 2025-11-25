const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

class ConversorRomanos {
  // Romano → Arábigo
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

  // Arábigo → Romano
  static aRomano(numero) {
    if (typeof numero !== 'number' || numero <= 0 || numero >= 4000) {
      return null;
    }

    const equivalencias = [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I'],   
    ];

    let resultado = '';
    for (const [valor, simbolo] of equivalencias) {
      while (numero >= valor) {
        resultado += simbolo;
        numero -= valor;
      }
    }

    return resultado;
  }
}


// Romanos a Arabigos
app.get('/romano-a-arabigo', (req, res) => {
  const { roman } = req.query;

  if (!roman) {
    return res.status(400).json({ error: 'Debe proporcionar el parámetro "roman".' });
  }

  const valor = ConversorRomanos.aArabigo(roman);

  if (valor === null) {
    return res.status(400).json({ error: 'Número romano inválido.' });
  }

  return res.json({ arabic: valor });
});

// Arabigos a Romanos
app.get('/arabigo-a-romano', (req, res) => {
  const numero = parseInt(req.query.arabic, 10);

  if (isNaN(numero)) {
    return res.status(400).json({ error: 'Debe proporcionar el parámetro "arabic".' });
  }

  const resultado = ConversorRomanos.aRomano(numero);

  if (resultado === null) {
    return res.status(400).json({ error: 'Número arábigo fuera de rango o inválido.' });
  }

  return res.json({ roman: resultado });
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor del conversor iniciado en el puerto ${PORT}`);
  });
}

module.exports = { app, ConversorRomanos };