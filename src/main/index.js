const fs = require('fs');
/**
 * 读取指定路径下的txt文档，并解析内容，将汉字作为key，形近字作为值生成映射。
 * @param {string} filePath - 要读取的txt文件的路径。
 * @returns {Promise<Object>} - 一个Promise，将会解析成一个形如{ '汉字': '形近字' }的映射对象。
 */
function readTxtFile(filePath) {
    return new Promise((resolve, reject) => {
        const charMap = {};
        const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

        readStream.on('data', (chunk) => {
            const lines = (charMap.remainingData || '') + chunk;
            const endOfLineIndex = lines.lastIndexOf('\n');
            const completeLines = lines.substring(0, endOfLineIndex + 1);
            charMap.remainingData = lines.substring(endOfLineIndex + 1);

            completeLines.split('\n').forEach((line) => {
                const [key, ...values] = line.trim().split(' ');
                charMap[key] = values.join('');
            });
        });

        readStream.on('end', () => {
            if (charMap.remainingData) {
                const [key, ...values] = charMap.remainingData.trim().split(' ');
                charMap[key] = values.join('');
                delete charMap.remainingData;
            }
            resolve(charMap);
        });

        readStream.on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * 根据传入的汉字获取对应的形近字，并指定返回字数。
 * @param {string} filePath - txt文件的路径。
 * @param {string} targetChar - 要查找形近字的目标汉字。
 * @param {number} [numChars=10] - 指定返回的形近字数目，默认为10个。
 * @returns {Promise<string|null>} - 一个Promise，将会解析成目标汉字对应的形近字组成的字符串（或null，如果找不到目标汉字）。
 */
async function getSimilarChars(filePath, targetChar, numChars = 10) {
    const charMap = await readTxtFile(filePath);
    const similarChars = charMap[targetChar] || null;

    if (!similarChars) {
        return null;
    }

    // 如果请求的字数大于实际可用的形近字数，将返回所有的形近字
    return similarChars.slice(0, Math.min(similarChars.length, numChars));
}

// 测试
const txtFilePath = '../resources/hanzi_similar_list.txt'; // 替换为实际的txt文件路径
const targetChar = '匿'; // 替换为用户传入的汉字
const numChars = 5; // 替换为用户需要的返回字数

getSimilarChars(txtFilePath, targetChar, numChars)
    .then((result) => {
        if (result) {
            console.log(`"${targetChar}"对应的形近字为: ${result}`);
        } else {
            console.log(`找不到"${targetChar}"对应的形近字`);
        }
    })
    .catch((err) => {
        console.error('出现错误:', err);
    });
