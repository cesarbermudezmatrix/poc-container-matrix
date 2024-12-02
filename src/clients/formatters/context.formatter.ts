import { format } from "winston";
export const changeContext = format((info) => {
  const loggerName = info.context ? String(info.context) : "Logger";
  delete info.context;
  return {
    ...info,
    loggerName,
  };
});
