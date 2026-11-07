import {names} from './labRules';
// Original vector silhouettes share a Staunton-style plinth and distinct heraldic tops.
const silhouettes:Record<string,string>={
a:'M19 49 L23 37 L18 30 L22 23 L28 26 L27 16 L33 7 L40 20 L38 29 L44 35 L40 49 Z',
c:'M18 49 L22 35 L17 29 L20 20 L28 23 L27 10 L33 5 L39 16 L43 16 L43 30 L38 36 L42 49 Z',
d:'M20 49 L24 36 L19 28 L22 15 L28 19 L32 7 L36 19 L42 15 L45 28 L40 36 L44 49 Z',
j:'M17 49 L20 36 L12 30 L14 22 L21 25 L20 13 L26 7 L32 18 L38 7 L44 13 L43 25 L50 22 L52 30 L44 36 L47 49 Z',
h:'M21 49 L25 35 L21 28 Q17 19 26 12 L32 5 L38 12 Q47 19 43 28 L39 35 L43 49 Z',
f:'M15 49 L19 26 L15 26 L15 11 L23 11 L23 18 L29 18 L29 8 L35 8 L35 18 L41 18 L41 11 L49 11 L49 26 L45 26 L49 49 Z',
i:'M18 49 L22 35 L18 28 L21 18 L26 22 L25 10 L32 4 L39 10 L38 22 L43 18 L46 28 L42 35 L46 49 Z',
s:'M15 49 L18 31 L14 31 L14 22 L22 22 L22 13 L29 13 L29 22 L35 22 L35 15 L48 10 L52 16 L40 26 L45 31 L49 49 Z',
o:'M17 49 L22 34 L17 25 L17 12 L25 20 L32 5 L39 20 L47 12 L47 25 L42 34 L47 49 Z',
t:'M17 49 L20 29 L16 29 L16 17 L23 17 L23 23 L28 23 L28 13 L32 5 L36 13 L36 23 L41 23 L41 17 L48 17 L48 29 L44 29 L47 49 Z',
v:'M16 49 L22 37 L16 31 L20 23 L27 26 L25 15 L33 5 L41 14 L43 25 L39 34 L44 42 L48 49 Z',
g:'M16 49 L21 34 L16 24 L18 9 L25 18 L32 3 L39 18 L46 9 L48 24 L43 34 L48 49 Z'
};
const details:Record<string,string>={a:'M30 11 L35 24 M22 30 L32 34 L38 29 M26 41 L37 41',c:'M29 12 L35 18 L39 18 M21 29 L32 33 L38 29 M26 41 L37 41',d:'M23 29 L41 29 M27 36 L37 36 M32 18 L32 25',j:'M26 14 L29 20 M38 14 L35 20 M21 32 L28 36 M43 32 L36 36 M32 28 L32 45',h:'M35 13 L28 27 M25 33 L39 33 M27 41 L37 41',f:'M19 27 L45 27 M26 33 L26 44 M38 33 L38 44 M30 30 L34 30',i:'M27 14 L32 10 L37 14 M22 28 L42 28 M27 36 L37 36 M32 32 L32 45',s:'M20 30 L42 30 M36 24 L46 16 M23 37 L23 43 M39 37 L39 43',o:'M20 26 L44 26 M25 32 L32 38 L39 32 M27 43 L37 43',t:'M21 30 L43 30 M32 31 L32 44 M25 35 L25 42 M39 35 L39 42',v:'M30 13 L36 19 M22 31 L35 34 M27 39 L38 42 M24 46 L40 46',g:'M20 25 L44 25 M24 31 L32 35 L40 31 M27 40 L37 40 M32 37 L32 46'};
export function FusionPiece({kind,side='w'}:{kind:string;side?:'w'|'b'}){return <svg className={'fusion-piece '+(side==='w'?'ivory':'obsidian')} viewBox="0 0 64 64" role="img" aria-label={names[kind]}><title>{names[kind]}</title><g strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path className="piece-body" d={silhouettes[kind]}/><path className="piece-body" d="M18 49 H46 L49 54 H15 Z M14 54 H50 L52 59 H12 Z"/><path className="piece-detail" d={details[kind]}/>{['f','s','t'].includes(kind)&&<path className="piece-inlay" d="M28 35 L32 32 L36 35 L35 41 L32 44 L29 41 Z"/>}{['a','c','i','v'].includes(kind)&&<circle className="piece-eye" cx="35" cy="23" r="1.5"/>}{['d','h','o','g'].includes(kind)&&<path className="piece-inlay" d="M32 19 L35 23 L32 27 L29 23 Z"/>}</g></svg>}
