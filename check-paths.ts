import { join } from 'path';

console.log('__dirname:', __dirname);
console.log('Uploads resolved path:', join(__dirname, '..', '..', 'uploads'));
