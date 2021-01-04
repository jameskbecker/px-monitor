"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestPx = void 0;
var got_1 = __importDefault(require("got"));
/** Gets the details of the pX version currently on selected site
 * @param url of site to fetch from
 * @returns version data required for generating valid _px3 cookies
 */
function getLatestPx(url) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, appId, scriptUrl, _b, tag, fTag, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getScriptData(url)];
                case 1:
                    _a = _c.sent(), appId = _a.appId, scriptUrl = _a.scriptUrl;
                    return [4 /*yield*/, getTags(appId)];
                case 2:
                    _b = _c.sent(), tag = _b.tag, fTag = _b.fTag;
                    return [2 /*return*/, { tag: tag, fTag: fTag, appId: appId, scriptUrl: scriptUrl, site: url }];
                case 3:
                    e_1 = _c.sent();
                    console.error(e_1);
                    console.log('Reattempting to get latest pX');
                    //return await getLatestPx(url);
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getLatestPx = getLatestPx;
/** Extracts the App ID of the PX script from HTML
 * @todo add evaluation of script where src uses vars ie: s.src = '/' + window._pxAppId.substring(2) + '/init.js';
 * @todo consider switching to babel parser ( function regex causes timeout on regex101 )
 */
function getScriptData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, scriptExp, scripts, pxConfig, scripts_1, scripts_1_1, _a, script, appIdExp, _b, appId, scriptUrlExp, _c, scriptUrl, e_2;
        var e_3, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, got_1.default.get(url, config)];
                case 1:
                    response = _e.sent();
                    if (!response || !response.body) {
                        throw new Error('Received Empty Response.');
                    }
                    scriptExp = /<script\b[^>]*>([\s\S\n]*?)<\/script>/g;
                    scripts = response.body.matchAll(scriptExp);
                    pxConfig = '';
                    try {
                        for (scripts_1 = __values(scripts), scripts_1_1 = scripts_1.next(); !scripts_1_1.done; scripts_1_1 = scripts_1.next()) {
                            _a = __read(scripts_1_1.value, 2), script = _a[1];
                            if (script.includes('_pxAppId')) {
                                pxConfig = script;
                                break;
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (scripts_1_1 && !scripts_1_1.done && (_d = scripts_1.return)) _d.call(scripts_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    if (!pxConfig) {
                        throw new Error('Unable to find pX Config Script');
                    }
                    appIdExp = /window\._pxAppId\s?=\s?['"](\w*?)['"];?/;
                    _b = __read(pxConfig.match(appIdExp) || [], 2), appId = _b[1];
                    if (!appId) {
                        throw new Error('Unable to find App ID.');
                    }
                    scriptUrlExp = /\w{1}\.src\s?=\s?["']?(.*?)["']?;/;
                    _c = __read(pxConfig.match(scriptUrlExp) || [], 2), scriptUrl = _c[1];
                    if (!scriptUrl) {
                        throw new Error('Unable to find Script URL.');
                    }
                    return [2 /*return*/, { appId: appId, scriptUrl: scriptUrl }];
                case 2:
                    e_2 = _e.sent();
                    console.log(e_2);
                    return [2 /*return*/, { appId: '', scriptUrl: '' }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/** Shared default configuration for different Got requests */
var config = {
    decompress: true,
    headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,de;q=0.7',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36',
    },
    responseType: 'text',
    timeout: 10000,
};
/** Extracts Tag Data from PX Script */
function getTags(appId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, script, fTagExp, tagExp, tagMatch, fTagMatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://client.px-cloud.net/" + appId + "/main.min.js";
                    return [4 /*yield*/, got_1.default.get(url, config)];
                case 1:
                    response = _a.sent();
                    script = response.body;
                    fTagExp = /\s?=\s?["'](\d{3})["']/;
                    tagExp = /["'](v\d\.\d\.\d)["']/;
                    tagMatch = script.match(tagExp);
                    fTagMatch = script.match(fTagExp);
                    if (!tagMatch ||
                        !fTagMatch ||
                        tagMatch.length < 1 ||
                        fTagMatch.length < 1) {
                        throw new Error('Unable to find Tag and/or FTag.');
                    }
                    return [2 /*return*/, { tag: tagMatch[1], fTag: fTagMatch[1] }];
            }
        });
    });
}
//# sourceMappingURL=index.js.map