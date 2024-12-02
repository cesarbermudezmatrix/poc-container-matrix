import { IMaskController, IObj } from "../interfaces/mask-controller.interface";
import { all, DATA_REPLACEMENT_MAP } from "../utils/data-replacement";
import { MESSAGE } from "../utils/message";
import { Primitives } from "../utils/validate-primitives";

/**
 * Un controlador responsable de enmascarar o ofuscar datos sensibles en objetos o arreglos similares a JSON.
 * Implementa la interfaz `IMaskController`.
 */
export class MaskController implements IMaskController {
  /**
   * Crea una instancia de `MaskController`.
   */
  constructor() {}

  /**
   * Inicia el proceso de ofuscación para los datos proporcionados.
   * Determina si la entrada es un valor primitivo, un objeto o un arreglo y lo procesa en consecuencia.
   * @param {IObj} data - Los datos de entrada a ser ofuscados.
   * @returns {Array<any> | IObj} Los datos ofuscados.
   */
  public init(data: IObj): Array<any> | IObj {
    if (Primitives.isPrimitive(data)) return data;
    return this.prepareObfuscation(data);
  }

  /**
   * Prepara los datos para la ofuscación identificando su tipo y delegando al manejador correspondiente.
   * @private
   * @param {IObj} data - Los datos de entrada a preparar.
   * @returns {Array<any> | IObj} Los datos preparados para la ofuscación.
   */
  private prepareObfuscation(data: IObj): Array<any> | IObj {
    if (Primitives.isArray(data)) {
      return this.obfuscateArray(data as Array<any>);
    } else if (Primitives.isObj(data)) {
      return this.obfuscateJson(data);
    } else {
      return data;
    }
  }

  /**
   * Ofusca un arreglo procesando cada elemento de manera recursiva.
   * @private
   * @param {any[]} data - El arreglo a ofuscar.
   * @returns {Array<any>} El arreglo ofuscado.
   */
  private obfuscateArray(data: any[]): Array<any> {
    try {
      const newArray: any[] = [];
      data.forEach((item) => {
        if (Primitives.isPrimitive(item)) {
          newArray.push(this.nestedPrimitive(item, ""));
        } else if (Primitives.isObj(item)) {
          newArray.push(this.obfuscateJson(item));
        } else if (Primitives.isArray(item)) {
          newArray.push(this.obfuscateArray(item));
        }
      });
      return newArray;
    } catch (error) {
      return [MESSAGE.OBFUSCATE_NOT_SUPPORTED];
    }
  }

  /**
   * Ofusca un objeto similar a JSON procesando cada par clave-valor de manera recursiva.
   * @private
   * @param {IObj} data - El objeto a ofuscar.
   * @returns {IObj} El objeto ofuscado.
   */
  private obfuscateJson(data: IObj): IObj {
    const keys = Object.keys(data);
    const newObj: IObj = {};
    keys.forEach((key) => {
      if (Primitives.isPrimitive(data[key])) {
        newObj[key] = this.nestedPrimitive(data[key], key);
      } else if (Primitives.isObj(data[key])) {
        newObj[key] = this.obfuscateJson(data[key]);
      } else if (Primitives.isArray(data[key])) {
        newObj[key] = this.obfuscateArray(data[key]);
      }
    });

    return newObj;
  }

  /**
   * Maneja los tipos de datos primitivos durante el proceso de ofuscación.
   * @private
   * @param {string | number | boolean} data - Los datos primitivos a procesar.
   * @param {string} [key=""] - La clave asociada con los datos (se usa para mapear los métodos de reemplazo).
   * @returns {string | number | boolean | undefined} Los datos procesados.
   */
  private nestedPrimitive(data: string | number | boolean, key: string = ""): string | number | boolean | undefined {
    if (Primitives.isString(data) || Primitives.isNumber(data)) {
      return key ? this.obfuscate(String(data), key) : data;
    } else if (Primitives.isBoolean(data)) {
      return data;
    }
  }

  /**
   * Aplica la ofuscación a un valor de tipo cadena según la clave asociada.
   * Si no se encuentra un método de ofuscación específico para la clave, aplica un método de ofuscación por defecto.
   * @private
   * @param {string} data - La cadena a ofuscar.
   * @param {string} key - La clave usada para determinar el método de ofuscación.
   * @returns {string} La cadena ofuscada.
   */
  private obfuscate(data: string, key: string): string {
    const replacementMethod = DATA_REPLACEMENT_MAP.get(key);
    try {
      return !replacementMethod ? data : replacementMethod(data);
    } catch (error) {
      return all(data);
    }
  }
}
