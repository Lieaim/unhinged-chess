import {Chess} from 'chess.js';
// Scores are from the moving player's perspective, all at the same search depth.
export function moveAccuracy(played:number,candidates:number[]) {
 if(!candidates.length||![played,...candidates].every(Number.isFinite))throw Error('Incomplete move evaluations');
 const best=Math.max(...candidates),worst=Math.min(...candidates);
 // A forced move or equally good choices cannot lose accuracy.
 if(best===worst)return 100;
 return 100*Math.max(0,Math.min(1,(played-worst)/(best-worst)));
}
export function reviewPositions(pgn:string){const game=new Chess();game.loadPgn(pgn);return game.history({verbose:true}).map((m,i)=>({number:i+1,san:m.san,side:m.color,before:m.before,after:m.after,uci:m.from+m.to+(m.promotion||'')}));}
export function completeRanking(groups:Map<number,Map<string,number>>,legal:string[]){
 const depth=[...groups.keys()].sort((a,b)=>b-a).find(d=>legal.every(move=>groups.get(d)!.has(move)));
 if(depth===undefined)throw Error('Could not evaluate every legal move. Try analysing again.');
 return groups.get(depth)!;
}
