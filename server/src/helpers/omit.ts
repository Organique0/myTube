function omit<T extends object, K extends keyof T>(object: T, property: K | K[]): Omit<T, K> {
    if (Array.isArray(property)) {
      const entries = Object.entries(object).filter(([key]) => !property.includes(key as K));
      return Object.fromEntries(entries) as Omit<T, K>;
    }
  
    const { [property]: unused, ...rest } = object;
    return rest;
  }

export default omit;