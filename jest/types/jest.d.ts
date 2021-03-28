import { Token } from '../../src/js/types';


declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTokenized( lang: string, tokens: Token[], ignoreSpaces?: boolean, ignoreDepth?: boolean ): R;
      toBeTokenizedWithDepth( lang: string, tokens: Required<Token>[], ignoreSpaces?: boolean ): R;
    }

    interface Expect {
      toBeTokenized( lang: string, tokens: Token[], ignoreSpaces?: boolean ): any;
      toBeTokenizedWithDepth( lang: string, tokens: Required<Token>[], ignoreSpaces?: boolean ): any;
    }
  }
}

export {};
