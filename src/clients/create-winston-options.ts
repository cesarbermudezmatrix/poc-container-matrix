import { format, LoggerOptions } from "winston";

import { setType } from "./formatters/type.formatter";
import { errorField } from "./formatters/error.formatter";
import { traceId } from "./formatters/tracer.formatter";
import { changeContext } from "./formatters/context.formatter";
import { determinateLogLevel, LogLevelName } from "../constants/log-levels";
import { FilterInstancesTransport } from "./transports/filter-instances.transport";
import { MaskController } from "./controller/mask-controller";

const { combine, timestamp, printf, splat, errors, prettyPrint } = format;
const controller = new MaskController();

/**
 * Opciones de configuración para el logger de Winston utilizado en Matrix.
 */
export interface MatrixWinstonLoggerOpts {
  /**
   * Versión del servicio.
   * @default "undefined"
   */
  serviceVersion: string;

  /**
   * Configuración de memoria del contenedor.
   * @default "undefined"
   */
  memorySettings: string;

  /**
   * Nombre del servicio.
   * @default "undefined"
   */
  service?: string;

  /**
   * Entorno en el que se ejecuta el servicio.
   * @default "dev"
   */
  env?: string;

  /**
   * Nivel de log deseado.
   * @default ""
   */
  logLevel?: string;
}

/**
 * Crea las opciones de configuración para un logger de Winston.
 *
 * @param {MatrixWinstonLoggerOpts} options - Opciones para personalizar el logger.
 * @param {string} [options.serviceVersion="undefined"] - Versión del servicio.
 * @param {string} [options.memorySettings="undefined"] - Configuración de memoria del contenedor.
 * @param {string} [options.service="undefined"] - Nombre del servicio.
 * @param {string} [options.env="dev"] - Entorno en el que se ejecuta el servicio.
 * @param {string} [options.logLevel=""] - Nivel de log deseado.
 * @returns {LoggerOptions} Opciones configuradas para el logger de Winston.
 */
export const createWinstonOptions = ({
  serviceVersion = "undefined",
  memorySettings = "undefined",
  service = "undefined",
  env = "dev",
  logLevel = "",
}: MatrixWinstonLoggerOpts): LoggerOptions => {
  const logLevelName = determinateLogLevel(env, logLevel);

  return {
    level: logLevelName,
    silent: logLevelName == LogLevelName.SILENT,
    format: combine(
      setType(),
      timestamp(),
      splat(),
      changeContext(),
      errors({ stack: true }),
      errorField(),
      traceId(),
      prettyPrint(),
      printf((msg) => {
        return JSON.stringify({
          ...msg,
          ...controller.init(msg),
        });
      }),
    ),
    defaultMeta: {
      service,
      containerInfo: {
        memorySettings,
      },
      env,
      serviceVersion,
    },
    transports: [new FilterInstancesTransport()],
    exitOnError: false,
  };
};
