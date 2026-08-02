import jwt from "jsonwebtoken";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { generateToken } from "../../src/utils/generateToken.js";

describe("generateToken", () => {
  const previousSecret = process.env.JWT_SECRET;

  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret";
  });

  afterEach(() => {
    process.env.JWT_SECRET = previousSecret;
  });

  it("signs the user id with the configured secret", () => {
    const token = generateToken("user-1");

    const decoded = jwt.verify(token, "test-secret") as {
      id: string;
      exp: number;
      iat: number;
    };

    expect(decoded.id).toBe("user-1");
  });

  it("expires the token after 7 days", () => {
    const decoded = jwt.decode(generateToken("user-1")) as {
      exp: number;
      iat: number;
    };

    expect(decoded.exp - decoded.iat).toBe(7 * 24 * 60 * 60);
  });

  it("produces a token that fails verification with another secret", () => {
    const token = generateToken("user-1");

    expect(() => jwt.verify(token, "other-secret")).toThrow();
  });
});
