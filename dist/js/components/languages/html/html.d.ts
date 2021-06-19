import { Language } from '../../types';
/**
 * The HTML language options.
 *
 * @since 0.0.12
 */
export interface HtmlOptions {
    /**
     * The language for tokenizing script blocks.
     */
    script?: () => Language;
    /**
     * The language for tokenizing style blocks.
     */
    style?: () => Language;
}
/**
 * Returns the HTML language definition.
 *
 * @param options - Optional. Options.
 *
 * @return A Language object.
 */
export declare function html(options?: HtmlOptions): Language;
//# sourceMappingURL=html.d.ts.map