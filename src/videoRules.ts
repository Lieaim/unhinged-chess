export const videoPresets=[{id:'guess-accuracy',name:'Guess the game accuracy'}] as const;
export function randomVideoRatings(random=Math.random){return {w:Math.floor(random()*6001)-1000,b:Math.floor(random()*6001)-1000};}
