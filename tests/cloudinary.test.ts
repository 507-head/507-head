import { afterEach, describe, expect, it, vi } from "vitest";
import { v2 as cloudinary } from "cloudinary";

vi.mock("server-only", () => ({}));

const credentialNames = [
  "CLOUDINARY_URL",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
] as const;

async function loadConfig(values: Record<string, string>) {
  for (const name of credentialNames) vi.stubEnv(name, values[name] ?? "");
  cloudinary.config(true);
  vi.resetModules();
  return import("../lib/cloudinary");
}

afterEach(() => {
  vi.unstubAllEnvs();
  cloudinary.config(true);
});

describe("Cloudinary server credentials", () => {
  it("accepts the full Cloudinary environment URL", async () => {
    const { getCloudinaryConfig } = await loadConfig({
      CLOUDINARY_URL: "cloudinary://example-key:example-secret@example-cloud",
    });
    expect(getCloudinaryConfig()).toEqual({
      cloudName: "example-cloud",
      apiKey: "example-key",
      apiSecret: "example-secret",
    });
  });

  it("accepts separate credentials configured in Vercel", async () => {
    const { getCloudinaryConfig } = await loadConfig({
      CLOUDINARY_CLOUD_NAME: "example-cloud",
      CLOUDINARY_API_KEY: "example-key",
      CLOUDINARY_API_SECRET: "example-secret",
    });
    expect(getCloudinaryConfig()).toEqual({
      cloudName: "example-cloud",
      apiKey: "example-key",
      apiSecret: "example-secret",
    });
  });

  it("rejects incomplete credentials", async () => {
    const { getCloudinaryConfig } = await loadConfig({
      CLOUDINARY_API_SECRET: "example-secret",
    });
    expect(() => getCloudinaryConfig()).toThrow(
      "Cloudinary credentials are missing",
    );
  });
});
