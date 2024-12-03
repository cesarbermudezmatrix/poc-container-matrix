import { isJsonString } from "../../src/clients/utils/is-valid-json-string";


describe("Is valid json string", () => {
  it("Should return true due to is a valid string", () => {
    const json = JSON.stringify({ hello: "world" });
    const isValidJson = isJsonString(json);
    expect(isValidJson).toBeTruthy();
  });

  it("Should return false due to is not a valid string", () => {
    const isValidJson = isJsonString("Hello world");
    expect(isValidJson).toBeFalsy();
  });
});
