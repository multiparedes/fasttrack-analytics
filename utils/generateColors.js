function generateDynamicColors(numColors) {
  const dynamicColors = [];
  const initialOffset = Math.floor(Math.random() * 360);
  for (let i = 0; i < numColors; i++) {
    const hue = (initialOffset + i * 40) % 360;
    dynamicColors.push(`hsla(${hue}, 80%, 80%, 0.8)`);
  }
  return dynamicColors;
}

export { generateDynamicColors };
