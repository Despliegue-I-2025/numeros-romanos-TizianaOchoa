const { ConversorRomanos } = require('../romanos.js');

// Tests Romano a Arábigo 
describe('ConversorRomanos.aArabigo', () => {
  test('Convierte correctamente I → 1', () => {
    expect(ConversorRomanos.aArabigo('I')).toBe(1);
  });

  test('Convierte correctamente V → 5', () => {
    expect(ConversorRomanos.aArabigo('V')).toBe(5);
  });

  test('Convierte correctamente X → 10', () => {
    expect(ConversorRomanos.aArabigo('X')).toBe(10);
  }); 

  test('Convierte correctamente IV → 4', () => {
    expect(ConversorRomanos.aArabigo('IV')).toBe(4);
  });

  test('Convierte correctamente IX → 9', () => {
    expect(ConversorRomanos.aArabigo('IX')).toBe(9);
  });

  test('Convierte correctamente XL → 40', () => {
    expect(ConversorRomanos.aArabigo('XL')).toBe(40);
  });

  test('Convierte correctamente MCMXCIX → 1999', () => {
    expect(ConversorRomanos.aArabigo('MCMXCIX')).toBe(1999);
  });

  test('Rechaza símbolos inválidos', () => {
    expect(ConversorRomanos.aArabigo('ABC')).toBeNull();
  });

  test('Rechaza string vacío', () => {
    expect(ConversorRomanos.aArabigo('')).toBeNull();
  });
});


// Tests Arábigo a Romano 
describe('ConversorRomanos.aRomano', () => {
  test('Convierte correctamente 1 → I', () => {
    expect(ConversorRomanos.aRomano(1)).toBe('I');
  });

  test('Convierte correctamente 4 → IV', () => {
    expect(ConversorRomanos.aRomano(4)).toBe('IV');
  });

  test('Convierte correctamente 9 → IX', () => {
    expect(ConversorRomanos.aRomano(9)).toBe('IX');
  });

  test('Convierte correctamente 40 → XL', () => {
    expect(ConversorRomanos.aRomano(40)).toBe('XL');
  });

  test('Convierte correctamente 3999 → MMMCMXCIX', () => {
    expect(ConversorRomanos.aRomano(3999)).toBe('MMMCMXCIX');
  });

  test('Rechaza números menores a 1', () => {
    expect(ConversorRomanos.aRomano(0)).toBeNull();
  });

  test('Rechaza números mayores o iguales a 4000', () => {
    expect(ConversorRomanos.aRomano(4000)).toBeNull();
  });

  test('Rechaza entradas no numéricas', () => {
    expect(ConversorRomanos.aRomano("hola")).toBeNull();
  });
});
