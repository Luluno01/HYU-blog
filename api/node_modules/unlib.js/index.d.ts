import Generators from './Generators';
import Random from './Random';
import Constants from './Constants';
import Binary from './Binary';
import Promise from './Prom';
import * as fs from './fs';
import * as Object from './Object';
declare var unlib: {
    Random: typeof Random;
    Generators: typeof Generators;
    Constants: typeof Constants;
    Binary: typeof Binary;
    Time: {
        Timer: typeof import("./Time/Timer").Timer;
        sleep: typeof import("./Time/sleep").sleep;
    };
    Promise: typeof Promise;
    fs: fs.fs;
    JSON: import("./JSON").EnhancedJSON;
    Object: Object.EnhancedObject;
};
export default unlib;
