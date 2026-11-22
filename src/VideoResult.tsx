import {resultTitle} from './GameOver';
export function VideoResult({reason,animating=false}:{reason:string|null;animating?:boolean}){
 if(!reason||animating)return null;
 const winner=reason.match(/(White|Black) wins/i)?.[0],title=winner?resultTitle(reason):reason.toLowerCase().includes('stalemate')?'Stalemate':'Draw';
 return <div className="video-result" role="status" aria-live="polite"><div className="video-result-card"><span>GAME OVER</span><h2>{winner||'Draw'}</h2><h3>{title}</h3><p>{reason}</p></div></div>;
}
