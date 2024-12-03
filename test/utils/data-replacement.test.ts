import { DATA_REPLACEMENT_MAP } from "./../../src/clients/utils/data-replacement";

describe("Data replacement map test", () => {
  it("Should get the regex successfully", () => {
    const key = "displayName";
    const response = DATA_REPLACEMENT_MAP.get(key);
    expect(response).toBeDefined();
  });

  it("Should not found the regex", () => {
    const key = "not_found_key";
    const response = DATA_REPLACEMENT_MAP.get(key);
    expect(response).toBeFalsy();
  });
});
