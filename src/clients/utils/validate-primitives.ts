/**
 * Clase de utilidad para validar e identificar tipos de datos primitivos y complejos.
 */
export class Primitives {
  /**
   * Verifica si los datos proporcionados son un objeto.
   * Un objeto se define como una función o un valor no nulo de tipo "object" que no es un arreglo.
   * @param {unknown} data - Los datos a verificar.
   * @returns {boolean} `true` si los datos son un objeto; de lo contrario, `false`.
   */
  static isObj(data: unknown): boolean {
    const type = typeof data;
    return type === "function" || (type === "object" && !!data && !Array.isArray(data));
  }

  /**
   * Verifica si los datos proporcionados son un arreglo.
   * @param {unknown} data - Los datos a verificar.
   * @returns {boolean} `true` si los datos son un arreglo; de lo contrario, `false`.
   */
  static isArray(data: unknown): boolean {
    return Array.isArray(data);
  }

  /**
   * Verifica si los datos proporcionados son un tipo primitivo.
   * Un primitivo se define como un número, cadena o booleano.
   * @param {unknown} data - Los datos a verificar.
   * @returns {boolean} `true` si los datos son un primitivo; de lo contrario, `false`.
   */
  static isPrimitive(data: unknown): boolean {
    const type = typeof data;
    const matchers = ["number", "string", "boolean"];
    return matchers.includes(type);
  }

  /**
   * Verifica si los datos proporcionados son un número.
   * @param {unknown} data - Los datos a verificar.
   * @returns {boolean} `true` si los datos son un número; de lo contrario, `false`.
   */
  static isNumber(data: unknown): boolean {
    return typeof data === "number";
  }

  /**
   * Verifica si los datos proporcionados son un booleano.
   * @param {unknown} data - Los datos a verificar.
   * @returns {boolean} `true` si los datos son un booleano; de lo contrario, `false`.
   */
  static isBoolean(data: unknown): boolean {
    return typeof data === "boolean";
  }

  /**
   * Verifica si los datos proporcionados son una cadena.
   * @param {unknown} data - Los datos a verificar.
   * @returns {boolean} `true` si los datos son una cadena; de lo contrario, `false`.
   */
  static isString(data: unknown): boolean {
    return typeof data === "string";
  }
}
