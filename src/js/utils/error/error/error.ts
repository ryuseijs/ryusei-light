import { PROJECT_CODE } from '../../../constants/project';


/**
 * Displays an error message on the console.
 *
 * @param message - An error message.
 */
export function error( message: string ): void {
  console.error( `[${ PROJECT_CODE }] ${ message }` );
}
