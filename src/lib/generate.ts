export const Charset = {
  Lowercase: "abcdefghijklmnopqrstuvwxyz",
  Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  Digits: "0123456789",
  Symbols: "!@#$%^&*_+-=?",
} as const;
export type CharsetType = keyof typeof Charset;

export type Option = {
  type: CharsetType;
  enabled: boolean;
};

export const defaultLength = 20;
export const defaultCharset = [
  Charset.Lowercase,
  Charset.Uppercase,
  Charset.Digits,
  Charset.Symbols,
].join("");

export const generate = (length: number, charset: string) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};

export const Strength = {
  VeryWeak: "Very weak",
  Weak: "Weak",
  Strong: "Strong",
  VeryStrong: "Very strong",
} as const;
export type Strength = (typeof Strength)[keyof typeof Strength];

export const evaluate = (length: number, charset: string): Strength => {
  const entropy = getEntropy(length, charset);
  if (entropy < 36) {
    return Strength.VeryWeak;
  }
  if (entropy < 60) {
    return Strength.Weak;
  }
  if (entropy < 120) {
    return Strength.Strong;
  }
  return Strength.VeryStrong;
};

const getEntropy = (length: number, charset: string) => {
  return Math.log2(charset.length) * length;
};
