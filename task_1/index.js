import { encoded, translations } from './data.js'

console.log("Let's rock");
console.log(encoded, translations);

let decoded = encoded;

let uniqueId = [];
let notUniqueId = [];

function decodedFunc(decoded, translations) {
	for (let i of decoded) {
		for (let j in i) {
			if (translations.hasOwnProperty(i[j])) {
				if (uniqueId.indexOf(i[j]) === -1 && notUniqueId.indexOf(i[j]) === -1) {
					uniqueId.push(i[j]);
				} else {
					notUniqueId.push(i[j]);
					uniqueId = uniqueId.filter(el => el !== uniqueId[uniqueId.indexOf(i[j])]);
				}

				i[j] = translations[i[j]];
			}
		}
	}
}


decodedFunc(decoded, translations);
console.log(decoded);
console.log(uniqueId);
