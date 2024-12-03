

import { MESSAGE } from "../src/constants/message";
import { MaskController } from "../src/clients/controller/mask-controller";
import { dummy } from "./resources/data.json";

describe("Mask controller", () => {
  let maskController: MaskController;

  beforeEach(() => {
    maskController = new MaskController();
  });

  it("init should return a valid json", () => {
    const response = maskController.init(dummy);
    expect(response).toBeInstanceOf(Object);
  });

  it("init should return a valid json with an array", () => {
    const response = maskController.init([dummy]);
    expect(response).toBeInstanceOf(Object);
  });

  it("prepareObfuscation should return the same data when not match prepareObfuscation", () => {
    const arrange = true;
    const response = maskController["prepareObfuscation"](arrange as any);
    expect(response).toBe(arrange);
  });

  it("obfuscateArray should return array when an array is send", () => {
    const response = maskController["obfuscateArray"]([dummy]);
    expect(response).toBeInstanceOf(Array);
  });

  it("obfuscateArray should handle when parse array fail", () => {
    const arrange = 1;
    const response = maskController["obfuscateArray"](arrange as any);
    expect(response[0]).toBe(MESSAGE.OBFUSCATE_NOT_SUPPORTED);
  });

  it("obfuscateArray should parse an array of primitives", () => {
    const arrange = ["hello", true, 1];
    const response = maskController["obfuscateArray"](arrange);
    expect(response).toMatchObject(arrange);
  });

  it("obfuscateArray should parse a nested array", () => {
    const arrange = [[dummy]];
    const response = maskController["obfuscateArray"](arrange);
    expect(response).toBeDefined();
  });

  it("obfuscateJson should parse a nested array inside json", () => {
    const arrange = {
      data: [
        {
          data: {
            displayName: "Jane",
          },
        },
      ],
    };
    const response = maskController["obfuscateJson"](arrange);
    expect(response).toBeDefined();
  });
});
