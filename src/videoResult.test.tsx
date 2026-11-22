import {it,expect} from 'vitest';import {renderToStaticMarkup} from 'react-dom/server';import {VideoResult} from './VideoResult';
it('shows the winning side and checkmate',()=>{const html=renderToStaticMarkup(<VideoResult reason="Checkmate - Black wins"/>);expect(html).toContain('Black wins');expect(html).toContain('Checkmate');});
it('shows draw reasons including stalemate',()=>{for(const reason of ['Draw - stalemate (no legal moves)','Draw - the same position occurred three times','Draw - insufficient material to checkmate']){expect(renderToStaticMarkup(<VideoResult reason={reason}/>)).toContain(reason);}});
it('waits for the final move and hides during play',()=>{expect(renderToStaticMarkup(<VideoResult reason={null}/>)).toBe('');expect(renderToStaticMarkup(<VideoResult reason="Checkmate - White wins" animating/>)).toBe('');});

it('does not label insufficient material as checkmate',()=>{expect(renderToStaticMarkup(<VideoResult reason="Draw - insufficient material to checkmate"/>)).not.toContain('<h3>Checkmate</h3>');});
