declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTokenized( lang: string, tokens: [ string, string ][], ignoreSpaces?: boolean ): R;
    }

    interface Expect {
      toBeTokenized( lang: string, tokens: [ string, string ][], ignoreSpaces?: boolean ): any;
    }
  }
}

export {};
