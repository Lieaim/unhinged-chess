import {describe,it,expect} from 'vitest';
import {moveAccuracy,reviewPositions,completeRanking} from './accuracyRules';
describe('strict game accuracy',()=>{
it('anchors the best and worst moves exactly',()=>{expect(moveAccuracy(80,[-900,0,80])).toBe(100);expect(moveAccuracy(-900,[-900,0,80])).toBe(0);});
it('scores intermediate moves by relative evaluation',()=>{expect(moveAccuracy(0,[-100,0,100])).toBe(50);expect(moveAccuracy(-90,[-100,0,100])).toBe(5);});
it('handles forced moves and tied choices',()=>{expect(moveAccuracy(-500,[-500])).toBe(100);expect(moveAccuracy(0,[0,0])).toBe(100);expect(moveAccuracy(-10,[-10,-10,100])).toBe(0);});
it('uses the deepest complete ranking, never mixes depths',()=>{const full=new Map([['e2e4',10],['d2d4',0]]),groups=new Map([[4,full],[5,new Map([['e2e4',20]])]]);expect(completeRanking(groups,['e2e4','d2d4'])).toBe(full);expect(()=>completeRanking(groups,['a2a3'])).toThrow();});
it('reconstructs UCI moves for both colours',()=>{const r=reviewPositions('1. e4 e5 2. Nf3');expect(r).toHaveLength(3);expect(r[1].side).toBe('b');expect(r[1].uci).toBe('e7e5');expect(r[0].after).toBe(r[1].before);});
});
