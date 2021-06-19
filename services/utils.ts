export function generateUserID(): string {
  return "user" + Math.random().toString(36).substr(2, 9);
}

export function imgToBlobConverter(img): { size: number; type: string } {
  let binaryData = [];
  binaryData.push(img);
  return new Blob(binaryData, { type: "image" });
}

export function imgToBase64Converter(img, success): void {
  let reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = function (): void {
    success(reader.result);
  };
  reader.onerror = function (error) {
    alert(`Error: ${error}`);
  };
}
