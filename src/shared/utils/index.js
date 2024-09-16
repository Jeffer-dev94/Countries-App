export const removeDiacritics = (text) => {
  return text
    ?.normalize('NFD')
    .replace(/n(?![\u0300-\u036f])|[\u0300-\u036f]+/gi, '$1')
    .normalize();
};

export const searchInObjects = (array, text, keys) => {
  const normalizedText = removeDiacritics(text);
  const getNestedValue = (obj, path) => {
    const value = path.includes('.')
      ? path.split('.').reduce((acc, key) => acc?.[key]?.toString(), obj)
      : obj?.[path]?.toString();
    return removeDiacritics(value);
  };

  return array.filter((obj) =>
    keys.some((key) => getNestedValue(obj, key)?.includes(normalizedText))
  );
};
