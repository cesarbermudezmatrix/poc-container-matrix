import { format } from "winston";

export const setType = format((info) => {
  let data = { type: "text" };
  if (info.meta && info.meta.data) {
    data = {
      type: "json",
    };
  }
  return {
    ...data,
    ...info,
  };
});
