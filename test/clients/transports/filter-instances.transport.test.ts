import { FilterInstancesTransport } from "../../../src/clients/transports/filter-instances.transport";
import { transports } from "winston";

describe("FilterInstancesTransport", () => {
  let transport: FilterInstancesTransport;
  const consoleLogSpy = jest.spyOn(transports.Console.prototype, "log");

  beforeEach(() => {
    transport = new FilterInstancesTransport();
  });

  afterEach(() => {
    consoleLogSpy.mockClear();
  });

  it("calls super.log() for non-ignored logger instances", () => {
    const callback = jest.fn();
    transport.log(
      {
        loggerName: "Logger",
      },
      callback,
    );
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it("does not call super.log() for ignored logger instances: RouterExplorer", () => {
    const callback = jest.fn();
    transport.log({ loggerName: "RouterExplorer" }, callback);
    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it("does not call super.log() for ignored logger instances: RoutesResolver", () => {
    const callback = jest.fn();
    transport.log({ loggerName: "RoutesResolver" }, callback);
    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it("does not call super.log() for ignored logger instances: InstanceLoader", () => {
    const callback = jest.fn();
    transport.log({ loggerName: "InstanceLoader" }, callback);
    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it("call super.log() when loggerName is undefined", () => {
    const callback = jest.fn();
    transport.log({ loggerName: undefined }, callback);
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });
});
