export const Charset = {
  Lowercase: "abcdefghijklmnopqrstuvwxyz",
  Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  Digits: "0123456789",
  Symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;
export type CharsetType = keyof typeof Charset;

export const defaultLength = 20;
export const defaultCharsets = [
  Charset.Lowercase,
  Charset.Uppercase,
  Charset.Digits,
  Charset.Symbols,
];

export const generate = (length: number, charsets: string[]) => {
  const charset = charsets.join("");
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

export const evaluate = (length: number, charsets: string[]): Strength => {
  const entropy = getEntropy(length, charsets);
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

const getEntropy = (length: number, charsets: string[]) => {
  const charset = charsets.join("");
  return Math.log2(charset.length) * length;
};
