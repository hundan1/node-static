const Regexs = require("../../utils/regexs");
// describe('netAddr', () => {
//     for (let a = 0; a <= 255; a++) {
//         for (let b = 0; b <= 255; b++) {
//             for (let c = 0; c <= 255; c++) {
//                 for (let d = 0; d <= 255; d++) {
//                     for (let e = 0; e <= 65535; e++) {
//                         let str = `http://${a}.${b}.${c}.${d}:${e}/`;
//                         test(str, () => {
//                             expect(Regexs.netAddr.test(str)).toBeTruthy();
//                         })
//                     }
//                 }
//             }
//         }
//     }

// });

for (let a = 0; a <= 255; a++) {
    for (let b = 0; b <= 255; b++) {
        for (let c = 0; c <= 255; c++) {
            for (let d = 0; d <= 255; d++) {
                for (let e = 0; e <= 65535; e++) {
                    let str = `http://${a}.${b}.${c}.${d}:${e}/`;
                    if (!Regexs.netAddr.test(str)) {
                        console.log(str);
                    }
                }
            }
        }
    }
}

console.log("test end");



