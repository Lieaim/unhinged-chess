import{readdir,copyFile,mkdir}from'node:fs/promises';
const dir='node_modules/stockfish/src';const files=await readdir(dir);const js=files.find(f=>/lite-single.*\.js$/.test(f));if(!js)throw Error('Missing single-thread Stockfish build');await mkdir('public/engine',{recursive:true});for(const f of files.filter(f=>f.startsWith(js.slice(0,-3))))await copyFile(dir+'/'+f,'public/engine/'+f);await copyFile(dir+'/'+js,'public/engine/stockfish.js');

