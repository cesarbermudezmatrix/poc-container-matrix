import * as winston from "winston";
import { createWinstonOptions, MatrixWinstonLoggerOpts } from "../src";
import { Environment } from "../src/constants/environment";
import { LogLevelName } from "../src/constants/log-levels";

describe("createWinstonOptions", () => {
  let logger: winston.Logger;
  const getLogger = (environment: Environment, logLevel?: LogLevelName) => {
    const opts: MatrixWinstonLoggerOpts = {
      env: environment,
      logLevel: logLevel,
      memorySettings: "100M",
      service: "service",
      serviceVersion: "1.0",
    };

    return winston.createLogger(createWinstonOptions(opts));
  };

  it("loglevel should be info and shouldn't be silent when environment is prod", () => {
    logger = getLogger(Environment.prod);
    logger.info("test");
    expect(logger.level).toEqual(LogLevelName.INFO);
    expect(logger.silent).toEqual(false);
  });

  it("loglevel should be info and shouldn't be silent when environment is uat", () => {
    logger = getLogger(Environment.uat);
    expect(logger.level).toEqual(LogLevelName.INFO);
    expect(logger.silent).toEqual(false);
  });

  it("loglevel should be info and should be silent when environment is qa", () => {
    logger = getLogger(Environment.qa);
    expect(logger.level).toEqual(LogLevelName.SILENT);
    expect(logger.silent).toEqual(true);
  });

  it("loglevel should be silent and should be silent when environment is dev", () => {
    logger = getLogger(Environment.dev);
    expect(logger.level).toEqual(LogLevelName.SILENT);
    expect(logger.silent).toEqual(true);
  });

  it("if env is set to QA and logLevel is set to DEBUG, then level should be debug and silent false", () => {
    logger = getLogger(Environment.qa, LogLevelName.DEBUG);
    expect(logger.level).toEqual(LogLevelName.DEBUG);
    expect(logger.silent).toEqual(false);
  });

  it("if env is set to DEV and logLevel is set to INFO, then level should be info and silent false", () => {
    logger = getLogger(Environment.dev, LogLevelName.INFO);
    expect(logger.level).toEqual(LogLevelName.INFO);
    expect(logger.silent).toEqual(false);
  });

  it("if env is set to DEV and logLevel is set to DEBUG, then level should be debug and silent false", () => {
    logger = getLogger(Environment.dev, LogLevelName.DEBUG);
    expect(logger.level).toEqual(LogLevelName.DEBUG);
    expect(logger.silent).toEqual(false);
  });
});
