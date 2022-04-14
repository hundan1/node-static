const StaticServer = require('./static-server');
var options = require( "yargs" )
    .option( "p", { alias: "port",  describe: "Port number", type: "number" } )
    .option( "r", { alias: "root", describe: "Static resource directory", type: "string" } )
    .option( "i", { alias: "index", describe: "Default page", type: "string" } )
    .option( "c", { alias: "cachecontrol", default: true, describe: "Use Cache-Control", type: "boolean" } )
    .option( "e", { alias: "expires", default: true, describe: "Use Expires", type: "boolean" } )
    .option( "t", { alias: "etag", default: true, describe: "Use ETag", type: "boolean" } )
    .option( "l", { alias: "lastmodified", default: true, describe: "Use Last-Modified", type: "boolean" } )
    .option( "m", { alias: "maxage", describe: "Time a file should be cached for", type: "number" } )
    .help()
    .alias( "?", "help" )
    .argv;
// 请求头格式注意
// Ranges: bytes=[start]-[end]
(new StaticServer()).start();