import {Chess} from 'chess.js';
export const winChance=(cp:number)=>100/(1+Math.exp(-.00368208*Math.max(-10000,Math.min(10000,cp))));
export function moveAccuracy(before:number,after:number,side:'w'|'b') {const loss=Math.max(0,(winChance(before)-winChance(after))*(side==='w'?1:-1));return Math.max(0,Math.min(100,100*Math.exp(-loss/20)));}
export function reviewPositions(pgn:string){const game=new Chess();game.loadPgn(pgn);const history=game.history({verbose:true});return history.map((m,i)=>({number:i+1,san:m.san,side:m.color,before:m.before,after:m.after}));}
