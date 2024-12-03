import { Primitives } from "../../src/clients/utils/validate-primitives";

describe("Validate primitives", () => {
  it("Should return true if it is a valid json object", () => {
    const arrange = {
      hello: "world",
    };
    const isObj = Primitives.isObj(arrange);
    expect(isObj).toBeTruthy();
  });

  it("Should return true if it is a valid array", () => {
    const arrange = [1, 2, 3];
    const isArray = Primitives.isArray(arrange);
    expect(isArray).toBeTruthy();
  });

  it("Should return true if it is a primitive", () => {
    const arrange = "string";
    const isPrimitive = Primitives.isPrimitive(arrange);
    expect(isPrimitive).toBeTruthy();
  });

  it("Should return true if it is a number", () => {
    const arrange = 1;
    const isNumber = Primitives.isNumber(arrange);
    expect(isNumber).toBeTruthy();
  });

  it("Should return true if it is a string", () => {
    const arrange = "string";
    const isString = Primitives.isString(arrange);
    expect(isString).toBeTruthy();
  });

  it("Should return true if it is a boolean", () => {
    const arrange = true;
    const isBoolean = Primitives.isBoolean(arrange);
    expect(isBoolean).toBeTruthy();
  });
});
