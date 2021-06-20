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


export function formValidator(input): void {
  const chars = `~!@#$%^&*()[]{}_-+=|:;"'<>,.?/1234567890`;
  const emailChars = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (
    (input.getAttribute("type") == "text" &&
      input.value.trim() &&
      !chars.split("").some((ch) => input.value.includes(ch)) &&
      input.value.split("").length <= 30) ||
    (input.getAttribute("type") == "email" && emailChars.test(input.value))
  ) {
    //input is valid
    input.closest("label").classList.remove("invalid");
    input.closest("label").classList.add("valid");
  } else {
    //input is not valid
    input.closest("label").classList.remove("valid");
    input.closest("label").classList.add("invalid");
  }
}