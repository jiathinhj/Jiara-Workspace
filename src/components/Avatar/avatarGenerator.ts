export function generateRandomColorNumber() {
  let randomHue = Math.floor(Math.random() * 360);
  return randomHue;
}
export function generatePlaceholderName(firstname: string, lastname?: string) {
  let initials =
    firstname?.charAt(0).toUpperCase() + lastname?.charAt(0).toUpperCase();
  return `${initials}`;
}
