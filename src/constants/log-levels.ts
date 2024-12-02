import { Environment } from "./environment";

export enum LogLevelName {
  DEBUG = "debug",
  INFO = "info",
  ERROR = "error",
  SILENT = "silent",
}

export function determinateLogLevel(environment: string, logLevelName?: string): LogLevelName {
  const env = <Environment>environment;

  if ([Environment.uat, Environment.prod].includes(env)) {
    return LogLevelName.INFO;
  }

  if ([Environment.dev, Environment.qa].includes(env) && !logLevelName) {
    return LogLevelName.SILENT;
  }

  if (logLevelName) {
    return <LogLevelName>logLevelName?.toLowerCase();
  }

  return LogLevelName.SILENT;
}
