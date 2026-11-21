import {describe,it,expect} from 'vitest';
import {moveAccuracy,reviewPositions} from './accuracyRules';
describe('game accuracy',()=>{
it('does not punish improvements or equal evaluations',()=>{expect(moveAccuracy(0,100,'w')).toBe(100);expect(moveAccuracy(0,-100,'b')).toBe(100);expect(moveAccuracy(0,0,'w')).toBe(100);});
it('punishes lost chances from each player perspective',()=>{expect(moveAccuracy(0,-500,'w')).toBeLessThan(20);expect(moveAccuracy(0,500,'b')).toBeLessThan(20);});
it('reconstructs both sides',()=>{const r=reviewPositions('1. e4 e5 2. Nf3');expect(r).toHaveLength(3);expect(r[1].side).toBe('b');expect(r[0].after).toBe(r[1].before);});
});
