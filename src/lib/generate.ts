export const Charset = {
  Lowercase: 'abcdefghijklmnopqrstuvwxyz',
  Uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  Digits: '0123456789',
  Symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
} as const;

export const generate = (length: number, charsets: string[]) => {
  const charset = charsets.join('');
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}
