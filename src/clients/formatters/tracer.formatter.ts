import { format } from "winston";
import otel from "@opentelemetry/api";

export const traceId = format((info, opts) => {
  if (!otel.context.active() || !otel.trace.getSpan(otel.context.active())) {
    return {
      xRayTraceId: null,
      ...info,
    };
  }
  const trace = otel.trace.getSpan(otel.context.active())?.spanContext()?.traceId;
  return {
    xRayTraceId: trace ? `1-${trace.substring(0, 8)}-${trace.substring(8)}` : null,
    ...info,
  };
});
