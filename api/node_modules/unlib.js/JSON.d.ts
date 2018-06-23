import fs from './fs';
export interface EnhancedJSON extends JSON {
    load: typeof fs.loadJSON;
    dump: typeof fs.dumpJSON;
}
declare const EnhancedJSON: EnhancedJSON;
export default EnhancedJSON;
