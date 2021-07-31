export function pickBy(
  predicateFn: (entry: [key: string, value: any]) => boolean,
  object: any
) {
  return Object.fromEntries(Object.entries(object).filter(predicateFn));
}

export function pick(keys: string[], object: any) {
  return pickBy(predicateFn, object);

  function predicateFn([key]: [string, any]) {
    return keys.includes(key);
  }
}
