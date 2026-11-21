import {it,expect} from 'vitest';import {randomVideoRatings,videoPresets} from './videoRules';
it('samples independently and includes the full rating range',()=>{const v=[0,1-Number.EPSILON];expect(randomVideoRatings(()=>v.shift()!)).toEqual({w:-1000,b:5000});});
it('registers the accuracy preset',()=>{expect(videoPresets[0].id).toBe('guess-accuracy');});
