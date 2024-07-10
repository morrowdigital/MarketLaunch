export function stripHeadStr(head: string, input: string): string {
  if (input.startsWith(head)) {
    return input.slice(head.length);
  }
  return input;
}
