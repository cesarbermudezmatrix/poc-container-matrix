import { transports } from "winston";

const ignoredInstances = ["InstanceLoader", "RoutesResolver", "RouterExplorer"];
export class FilterInstancesTransport extends transports.Console {
  log(info: any, callback: () => void) {
    if (!ignoredInstances.includes(info.loggerName || "")) {
      super.log && super.log(info, callback);
    } else {
      callback();
    }
  }
}
