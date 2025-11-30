// uuid.ts
import { v4 as uuidv4, v5 as uuidv5, validate, version } from "uuid";

export type UUIDVersion = "v4" | "v5";

export type UUIDFormat = "standard" | "uppercase" | "no-dashes";

export interface UUIDOptions {
  version: UUIDVersion;
  namespace?: string;
  name?: string;
  format: UUIDFormat;
}

const DEFAULT_OPTIONS: Readonly<UUIDOptions> = {
  version: "v4",
  format: "standard",
};

/**
 * Safely merge user options with default options.
 */
export function normalizeUUIDOptions(
  options?: Partial<UUIDOptions>
): UUIDOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
  };
}

/**
 * Generate a UUID based on the provided options.
 * Supports v4 (random) and v5 (name-based) UUIDs with different output formats.
 */
export function generateUUID(rawOptions?: Partial<UUIDOptions>): string {
  const options = normalizeUUIDOptions(rawOptions);
  let uuid: string;

  if (options.version === "v5") {
    const { namespace, name } = options;

    if (!namespace || !name) {
      throw new Error("Namespace and name are required for UUID v5");
    }

    if (!validate(namespace)) {
      throw new Error("Invalid namespace UUID");
    }

    uuid = uuidv5(name, namespace);
  } else {
    uuid = uuidv4();
  }

  switch (options.format) {
    case "uppercase":
      return uuid.toUpperCase();
    case "no-dashes":
      return uuid.replace(/-/g, "");
    case "standard":
    default:
      return uuid;
  }
}

/**
 * Validate whether a given string is a valid UUID.
 */
export function validateUUID(uuid: string): boolean {
  return validate(uuid);
}

/**
 * Get the UUID version for a given UUID string.
 */
export function getUUIDVersion(uuid: string): number | null {
  if (!validate(uuid)) return null;
  return version(uuid);
}

/**
 * Parse a UUID and attempt to extract metadata.
 * For v1 UUIDs, extracts the embedded timestamp.
 */
export function parseUUID(uuid: string): {
  timestamp?: Date;
  version: number | null;
} {
  if (!validate(uuid)) {
    throw new Error("Invalid UUID");
  }

  const ver = version(uuid);
  let timestamp: Date | undefined;

  // Only v1 UUIDs contain timestamps
  if (ver === 1) {
    const parts = uuid.split("-");
    const timeLow = parseInt(parts[0] ?? "", 16);
    const timeMid = parseInt(parts[1] ?? "", 16);
    const timeHigh = (parseInt(parts[2] ?? "", 16) ?? 0) & 0x0fff;

    const timestamp100Nanos =
      timeHigh * 0x100000000000000 + timeMid * 0x10000 + timeLow;

    // Adjust from UUID epoch (1582-10-15) to Unix epoch (1970-01-01)
    timestamp = new Date((timestamp100Nanos - 122192928000000000) / 10000);
  }

  return {
    timestamp,
    version: ver,
  };
}
