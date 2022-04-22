let moduleMap = {
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'assets/resources/index.js' () { return require('assets/resources/index.js') },
'src/scripts/test_bundle_1/index.js' () { return require('src/scripts/test_bundle_1/index.js') },
'assets/main/index.js' () { return require('assets/main/index.js') },
// tail
};

window.__cocos_require__ = function (moduleName) {
    let func = moduleMap[moduleName];
    if (!func) {
        throw new Error(`cannot find module ${moduleName}`);
    }
    return func();
};