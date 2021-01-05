import got, { Options } from 'got';
import { latestPx, scriptData, tags } from './types';

const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36';
const headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,de;q=0.7',
    'User-Agent': userAgent,
}
const config: Options = {
    headers,
    decompress: true,
	responseType: 'text',
	timeout: 10000,
};

/** Gets the details of the pX version currently on selected site
 * @param url of site to fetch from
 * @returns version data required for generating valid _px3 cookies
 */
export async function getLatestPx(url: string): Promise<latestPx> {
	//url = resetPath(url);
	try {
		const { appId, scriptUrl } = await getScriptData(url);
        const { tag, fTag } = await getTags(appId);
        return { tag, fTag, appId, scriptUrl, site: url };
	} catch (e) {
		console.error(e);
		console.log('Reattempting to get latest pX');
		//return await getLatestPx(url);
		throw e;
	}
}

/** Extracts the App ID of the PX script from HTML
 * @todo add evaluation of script where src uses vars ie: s.src = '/' + window._pxAppId.substring(2) + '/init.js';
 * @todo consider switching to babel
 */
async function getScriptData(url: string): Promise<scriptData> {
    
try {
	const response: any = await got.get(url, config);
	if (!response || !response.body) {
		throw new Error('Received Empty Response.');
    }
    
    const scriptExp = /<script\b[^>]*>([\s\S\n]*?)<\/script>/g;
    const scripts = response.body.matchAll(scriptExp);
    let pxConfig = '';
    for ( let [, script] of scripts) {
        if (script.includes('_pxAppId')) {
            pxConfig = script;
            break;
        }
    }

    if (!pxConfig) {
        throw new Error('Unable to find pX Config Script')
    }

    const appIdExp = /window\._pxAppId\s?=\s?['"](\w*?)['"];?/;
	const [, appId] = pxConfig.match(appIdExp) || [];
	if (!appId) {
		throw new Error('Unable to find App ID.');
	}

	const scriptUrlExp = /\w{1}\.src\s?=\s?["']?(.*?)["']?;/;
	const [, scriptUrl] = pxConfig.match(scriptUrlExp) || [];
    if (!scriptUrl) {
		throw new Error('Unable to find Script URL.');
	}
	return { appId, scriptUrl };
} catch(e) {console.log(e); return {appId: '', scriptUrl: ''}}
    
}

/** Extracts Tag Data from PX Script */
async function getTags(appId: string): Promise<tags> {
    const url = `https://client.px-cloud.net/${appId}/main.min.js`;
	const response: any = await got.get(url, config);
	const script = response.body;
	const fTagExp = /\s?=\s?["'](\d{3})["']/;
	const tagExp = /["'](v\d\.\d\.\d)["']/;

	const tagMatch = script.match(tagExp);
	const fTagMatch = script.match(fTagExp);

	if (
		!tagMatch ||
		!fTagMatch ||
		tagMatch.length < 1 ||
		fTagMatch.length < 1
	) {
		throw new Error('Unable to find Tag and/or FTag.');
	}

	return { tag: tagMatch[1], fTag: fTagMatch[1] };
}