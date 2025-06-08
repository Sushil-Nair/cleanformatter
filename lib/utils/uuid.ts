import { v4 as uuidv4, v5 as uuidv5, validate, version } from 'uuid';

export interface UUIDOptions {
  version: 'v4' | 'v5';
  namespace?: string;
  name?: string;
  format: 'standard' | 'uppercase' | 'no-dashes';
}

const defaultOptions: UUIDOptions = {
  version: 'v4',
  format: 'standard'
};

export function generateUUID(options: UUIDOptions = defaultOptions): string {
  let uuid: string;

  if (options.version === 'v5') {
    if (!options.namespace || !options.name) {
      throw new Error('Namespace and name are required for UUID v5');
    }
    if (!validate(options.namespace)) {
      throw new Error('Invalid namespace UUID');
    }
    uuid = uuidv5(options.name, options.namespace);
  } else {
    uuid = uuidv4();
  }

  switch (options.format) {
    case 'uppercase':
      return uuid.toUpperCase();
    case 'no-dashes':
      return uuid.replace(/-/g, '');
    default:
      return uuid;
  }
}

export function validateUUID(uuid: string): boolean {
  return validate(uuid);
}

export function getUUIDVersion(uuid: string): number | null {
  if (!validate(uuid)) return null;
  return version(uuid);
}

export function parseUUID(uuid: string): { timestamp?: Date; version: number | null } {
  if (!validate(uuid)) {
    throw new Error('Invalid UUID');
  }

  const ver = version(uuid);
  let timestamp: Date | undefined;

  // Only v1 UUIDs contain timestamps
  if (ver === 1) {
    const parts = uuid.split('-');
    const timeLow = parseInt(parts[0], 16);
    const timeMid = parseInt(parts[1], 16);
    const timeHigh = parseInt(parts[2], 16) & 0x0FFF;
    const timestamp100Nanos = timeHigh * 0x100000000000000 + timeMid * 0x10000 + timeLow;
    timestamp = new Date((timestamp100Nanos - 122192928000000000) / 10000);
  }

  return {
    timestamp,
    version: ver
  };
}