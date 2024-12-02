/**
 * Métodos utilitarios y un mapa para aplicar diversas estrategias de ofuscación a datos sensibles.
 * Cada método de ofuscación reemplaza partes de la cadena de entrada con un carácter de máscara definido.
 */

import { ILogReplacementMethod } from "../interfaces/log-replacement.interface";

const REPLACEMENT_CHARACTER = "*";

/**
 * Ofusca todos los caracteres excepto los primeros dos de una cadena.
 * @param {string} value - La cadena a ofuscar.
 * @returns {string} La cadena ofuscada.
 */
const firstTwoCharacter: ILogReplacementMethod = (value) => {
  const regex = new RegExp("^(.{2})(.*)$");
  const substrings = value.match(regex)!;
  const maskReplacement = REPLACEMENT_CHARACTER.repeat(substrings[substrings.length - 1].length);
  const replacement = `$1${maskReplacement}`;
  return value.replace(regex, replacement);
};

/**
 * Ofusca todos los caracteres excepto los últimos dos de una cadena.
 * @param {string} value - La cadena a ofuscar.
 * @returns {string} La cadena ofuscada.
 */
const lastTwoCharacters: ILogReplacementMethod = (value) => {
  const regex = new RegExp("^(.*)(.{2})$");
  const substrings = value.match(regex)!;
  const maskReplacement = REPLACEMENT_CHARACTER.repeat(substrings[substrings.length - 1].length);
  const replacement = `${maskReplacement}$2`;
  return value.replace(regex, replacement);
};

/**
 * Ofusca todos los caracteres excepto los últimos cinco de una cadena.
 * @param {string} value - La cadena a ofuscar.
 * @returns {string} La cadena ofuscada.
 */
const lastFiveCharacters: ILogReplacementMethod = (value) => {
  const regex = new RegExp("^(.*)(.{5})$");
  const substrings = value.match(regex)!;
  const maskReplacement = REPLACEMENT_CHARACTER.repeat(substrings[substrings.length - 1].length);
  const replacement = `${maskReplacement}$2`;
  return value.replace(regex, replacement);
};

/**
 * Ofusca todos los caracteres excepto los últimos nueve de una cadena.
 * @param {string} value - La cadena a ofuscar.
 * @returns {string} La cadena ofuscada.
 */
const lastNineCharacters: ILogReplacementMethod = (value) => {
  const regex = new RegExp("^(.*)(.{9})$");
  const substrings = value.match(regex)!;
  const maskReplacement = REPLACEMENT_CHARACTER.repeat(substrings[substrings.length - 1].length);
  const replacement = `${maskReplacement}$2`;
  return value.replace(regex, replacement);
};

/**
 * Ofusca solo la primera palabra de una cadena, dejando el resto sin cambios.
 * @param {string} value - La cadena a ofuscar.
 * @returns {string} La cadena ofuscada.
 */
const firstWord: ILogReplacementMethod = (value) => {
  const substrings = value.split(" ");
  const maskReplacement = REPLACEMENT_CHARACTER.repeat(substrings[0].length);
  substrings[0] = maskReplacement;
  return substrings.join(" ");
};

/**
 * Ofusca toda la cadena reemplazando todos los caracteres por el carácter de máscara.
 * @param {string} value - La cadena a ofuscar.
 * @returns {string} La cadena ofuscada.
 */
const all: ILogReplacementMethod = (value) => {
  const substrings = value.split(" ");
  return substrings.map((substring) => REPLACEMENT_CHARACTER.repeat(substring.length)).join(" ");
};

/**
 * Ofusca la parte local de un correo electrónico, dejando intacto el dominio.
 * @param {string} value - La dirección de correo electrónico a ser ofuscada.
 * @returns {string} La dirección de correo electrónico ofuscada.
 */
const email: ILogReplacementMethod = (value) => {
  const regex = new RegExp("^([a-zA-Z0-9]{2})([a-zA-Z0-9._-]*)(@.*)");
  const substrings = value.match(regex)!;
  const maskReplacement = REPLACEMENT_CHARACTER.repeat(substrings[2].length);
  const replacement = `$1${maskReplacement}$3`;
  return value.replace(regex, replacement);
};

/**
 * Ofusca la fecha de nacimiento, dejando solo la primera parte visible.
 * @param {string} value - La fecha de nacimiento en formato `dd/MM/yyyy`.
 * @returns {string} La fecha de nacimiento ofuscada.
 */
const birthDate: ILogReplacementMethod = (value) => {
  const substrings = value.split("/");
  return substrings
    .map((substring, index) => {
      if (index === 0) {
        return substring;
      }
      return REPLACEMENT_CHARACTER.repeat(substring.length);
    })
    .join("/");
};

/**
 * Ofusca los últimos tres caracteres de una cadena.
 * @param {string} value - La cadena a ofuscar.
 * @returns {string} La cadena ofuscada.
 */
const lastThreeCharacters: ILogReplacementMethod = (value) => {
  const regex = new RegExp("^(.*)(.{3})$");
  const substrings = value.match(regex)!;
  const maskReplacement = REPLACEMENT_CHARACTER.repeat(substrings[2].length);
  const replacement = `${maskReplacement}$2`;
  return value.replace(regex, replacement);
};

/**
 * Ofusca los últimos cuatro caracteres de una cadena.
 * @param {string} value - La cadena a ofuscar.
 * @returns {string} La cadena ofuscada.
 */
const lastFourCharacters: ILogReplacementMethod = (value) => {
  const regex = new RegExp("^(.*)(.{4})$");
  const substrings = value.match(regex)!;
  const maskReplacement = REPLACEMENT_CHARACTER.repeat(substrings[2].length);
  const replacement = `${maskReplacement}$2`;
  return value.replace(regex, replacement);
};

/**
 * Ofusca los últimos `maskLength` caracteres de una cadena.
 * Si no se proporciona `maskLength`, se ofusca el 20% final de la cadena.
 * @param {string} value - La cadena a ofuscar.
 * @param {number} [maskLength] - El número de caracteres a dejar sin ofuscar.
 * @returns {string} La cadena ofuscada.
 */
const lastNCharacters: ILogReplacementMethod = (value, maskLength) => {
  const finalMaskLength = maskLength || Math.floor(value.length * 0.2);
  const regex = new RegExp(`^(.*)(.{${finalMaskLength}})$`);
  const substrings = value.match(regex)!;
  const maskReplacement = REPLACEMENT_CHARACTER.repeat(substrings[2].length);
  const replacement = `${maskReplacement}$2`;
  return value.replace(regex, replacement);
};

/**
 * Un mapa de nombres de campos a sus métodos de ofuscación correspondientes.
 * Esto permite estrategias de ofuscación de datos flexibles y específicas para diferentes campos.
 */
const DATA_REPLACEMENT_MAP = new Map<string, ILogReplacementMethod>();

// Agregando los mapeos al mapa
DATA_REPLACEMENT_MAP.set("displayName", firstTwoCharacter);
DATA_REPLACEMENT_MAP.set("fatherName", firstTwoCharacter);
DATA_REPLACEMENT_MAP.set("fullName", firstTwoCharacter);
DATA_REPLACEMENT_MAP.set("legalName", firstTwoCharacter);
DATA_REPLACEMENT_MAP.set("name", firstTwoCharacter);
DATA_REPLACEMENT_MAP.set("fatherLastName", firstTwoCharacter);
DATA_REPLACEMENT_MAP.set("lastName", firstTwoCharacter);
DATA_REPLACEMENT_MAP.set("marriedLastName", firstTwoCharacter);
DATA_REPLACEMENT_MAP.set("motherLastName", firstTwoCharacter);
DATA_REPLACEMENT_MAP.set("citizenId", lastFiveCharacters);
DATA_REPLACEMENT_MAP.set("customerId", lastFiveCharacters);
DATA_REPLACEMENT_MAP.set("consumerId", lastFiveCharacters);
DATA_REPLACEMENT_MAP.set("idc", lastNineCharacters);
DATA_REPLACEMENT_MAP.set("dniDocumentNumber", lastNineCharacters);
DATA_REPLACEMENT_MAP.set("phone", lastTwoCharacters);
DATA_REPLACEMENT_MAP.set("email", email);
DATA_REPLACEMENT_MAP.set("birthDate", birthDate);
DATA_REPLACEMENT_MAP.set("loanId", lastThreeCharacters);

export {
  DATA_REPLACEMENT_MAP,
  all,
  email,
  birthDate,
  firstWord,
  lastFiveCharacters,
  lastFourCharacters,
  lastNineCharacters,
  lastThreeCharacters,
  lastTwoCharacters,
  firstTwoCharacter,
  lastNCharacters,
};
