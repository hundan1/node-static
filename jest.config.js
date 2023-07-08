/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    // preset: "jest",         // 如果是 js 工程，则是 "jest" 
    testEnvironment: 'node',   // 测试代码所运行的环境
    // verbose: true,          // 是否需要在测试时输出详细的测试情况
    // collectCoverage: true,// 是否产生测试报告，开启后测试会变慢。建议不开启 需要是通过带指令产生 npx jest --coverage
    rootDir: "./test",         // 测试文件所在的目录
    globals: {                 // 全局属性。如果你的被测试的代码中有使用、定义全局变量，那你应该在这里定义全局属性
        // window: {},
        // cc: {}
    }
};