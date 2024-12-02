import { format, LoggerOptions } from "winston";

import { setType } from "./formatters/type.formatter";
import { errorField } from "./formatters/error.formatter";
import { traceId } from "./formatters/tracer.formatter";
import { changeContext } from "./formatters/context.formatter";
import { determinateLogLevel, LogLevelName } from "../constants/log-levels";
import { FilterInstancesTransport } from "./transports/filter-instances.transport";
import { MaskController } from "./controller/mask-controller";
import { isJsonString } from "./utils/is-valid-json-string";

const { combine, timestamp, printf, splat, errors, prettyPrint } = format;
const controller = new MaskController();

export interface MatrixWinstonLoggerOpts {
  serviceVersion: string;
  memorySettings: string;
  service?: string;
  env?: string;
  logLevel?: string;
}

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
