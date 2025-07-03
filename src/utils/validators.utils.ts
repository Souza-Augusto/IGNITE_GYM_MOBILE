const checkForUppercaseLetter = (value: string): boolean => /[A-Z]/.test(value);

const checkForLowercaseLetter = (value: string): boolean => /[a-z]/.test(value);

const checkForNumber = (value: string): boolean => /\d/.test(value);

const checkForSpecialCharacter = (value: string): boolean =>
  /[^A-Za-z0-9]/.test(value);

export const validators = {
  checkForUppercaseLetter,
  checkForLowercaseLetter,
  checkForNumber,
  checkForSpecialCharacter,
};
