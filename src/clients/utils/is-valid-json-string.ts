/**
 * Verifica si una cadena dada es una cadena JSON válida.
 *
 * Esta función intenta analizar la cadena de entrada utilizando `JSON.parse`.
 * Si el análisis falla, la cadena no es un JSON válido.
 *
 * @param {string} str - La cadena a validar como JSON.
 * @returns {boolean} `true` si la cadena es un JSON válido, de lo contrario, `false`.
 */
export const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
