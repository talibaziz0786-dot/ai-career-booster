import type { NextFunction, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const verify = vi.fn();
const findById = vi.fn();

vi.mock("jsonwebtoken", () => ({
  default: { verify },
}));

vi.mock("../../src/models/user.model.js", () => ({
  User: { findById },
}));

const { authMiddleware } = await import(
  "../../src/middleware/auth.middleware.js"
);

type AuthRequest = Parameters<typeof authMiddleware>[0];

function mockResponse() {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };

  return res as unknown as Response & typeof res;
}

function mockRequest(authorization?: string) {
  return { headers: { authorization } } as unknown as AuthRequest;
}

function selectResolving(value: unknown) {
  return { select: vi.fn().mockResolvedValue(value) };
}

describe("authMiddleware", () => {
  let next: NextFunction;

  beforeEach(() => {
    verify.mockReset();
    findById.mockReset();
    next = vi.fn();
    process.env.JWT_SECRET = "test-secret";
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects a request without an authorization header", async () => {
    const res = mockResponse();

    await authMiddleware(mockRequest(), res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects a header that is not a Bearer token", async () => {
    const res = mockResponse();

    await authMiddleware(mockRequest("Basic abc"), res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
  });

  it("rejects an invalid token", async () => {
    verify.mockImplementation(() => {
      throw new Error("jwt malformed");
    });
    const res = mockResponse();

    await authMiddleware(mockRequest("Bearer bad-token"), res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects a token whose user no longer exists", async () => {
    verify.mockReturnValue({ id: "user-1" });
    findById.mockReturnValue(selectResolving(null));
    const res = mockResponse();

    await authMiddleware(mockRequest("Bearer token"), res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    expect(next).not.toHaveBeenCalled();
  });

  it("attaches the user and calls next for a valid token", async () => {
    const user = { id: "user-1", role: "user" };
    const select = vi.fn().mockResolvedValue(user);

    verify.mockReturnValue({ id: "user-1" });
    findById.mockReturnValue({ select });

    const req = mockRequest("Bearer token");
    const res = mockResponse();

    await authMiddleware(req, res, next);

    expect(verify).toHaveBeenCalledWith("token", "test-secret");
    expect(findById).toHaveBeenCalledWith("user-1");
    expect(select).toHaveBeenCalledWith("-password");
    expect(req.user).toBe(user);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("returns 401 when the user lookup fails", async () => {
    verify.mockReturnValue({ id: "user-1" });
    findById.mockReturnValue({
      select: vi.fn().mockRejectedValue(new Error("db down")),
    });
    const res = mockResponse();

    await authMiddleware(mockRequest("Bearer token"), res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
  });
});
