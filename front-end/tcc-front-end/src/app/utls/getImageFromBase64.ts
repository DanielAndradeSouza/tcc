function getImageFromBase64(dataUrl: string): HTMLImageElement {
  const img = new window.Image();
  img.src = dataUrl;
  return img;
}
