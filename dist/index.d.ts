import { latestPx } from './types';
/** Gets the details of the pX version currently on selected site
 * @param url of site to fetch from
 * @returns version data required for generating valid _px3 cookies
 */
export declare function getLatestPx(url: string): Promise<latestPx>;
