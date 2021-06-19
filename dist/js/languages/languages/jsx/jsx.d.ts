import { Language } from '../../types';
/**
 * Options for the JSX language definition.
 *
 * @since 0.0.12
 */
interface JsxOptions {
    /**
     * The base language. The default value is `javascript()`.
     */
    base?: () => Language;
}
/**
 * Returns the JSX language definition.
 *
 * @return A Language object.
 */
export declare function jsx(options?: JsxOptions): Language;
export {};
//# sourceMappingURL=jsx.d.ts.map