import { snakeCase, camelCase } from 'change-case';

function transformKeysToCase(input: any, transformer: (str: string) => string): any {
  if (Array.isArray(input)) {
    // If the input is an array, recursively transform each element
    return input.map((value) => transformKeysToCase(value, transformer));
  } else if (typeof input === 'object' && input !== null) {
    // If the input is an object, create a new object with snake-cased keys
    const snakeCasedObject: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      const snakeCasedKey = transformer(key);
      snakeCasedObject[snakeCasedKey] = transformKeysToCase(value, transformer);
    }
    return snakeCasedObject;
  } else {
    // If the input is not an array or object, return it as-is
    return input;
  }
}

export const makeSnakeCaseKeys = (input: any) => transformKeysToCase(input, snakeCase);
export const makeCamelCaseKeys = (input: any) => transformKeysToCase(input, camelCase);
