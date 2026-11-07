import{it,expect}from'vitest';import{Chess}from'chess.js';import{ending}from'./ending';
it('explains repetition ending in bot battles',()=>{const c=new Chess();['Nf3','Nf6','Ng1','Ng8','Nf3','Nf6','Ng1','Ng8'].forEach(m=>c.move(m));expect(ending(c)).toContain('three times');expect(c.isGameOver()).toBe(true);});
it('explains stalemate',()=>expect(ending(new Chess('7k/5K2/6Q1/8/8/8/8/8 b - - 0 1'))).toContain('stalemate'));
it('does not end an ordinary position',()=>expect(ending(new Chess())).toBeNull());
