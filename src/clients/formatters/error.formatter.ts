import { format } from "winston";

export const errorField = format((info) => {
  if (info.stack) {
    info.error = info.stack;
    delete info.stack;
  }
  return info;
});
