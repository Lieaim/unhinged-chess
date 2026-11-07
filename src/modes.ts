export interface PieceDefinition {id:string;name:string;sprite:string;movement:[number,number][];health:number;abilities:string[];cooldown:number;level:number;data:Record<string,unknown>}
export interface RulesEngine {width:number;height:number;pieces:PieceDefinition[];legalMoves:(x:number,y:number)=>[number,number][];}
export interface Gamemode {id:string;name:string;description:string;stockfishCompatible:boolean;create?:()=>RulesEngine}
export const modes=new Map<string,Gamemode>();
export function register(mode:Gamemode){if(modes.has(mode.id))throw Error('Duplicate mode');modes.set(mode.id,mode);}
export const jumper:PieceDefinition={id:'jumper',name:'Chaos Jumper',sprite:'✦',movement:[[3,0],[-3,0],[0,3],[0,-3]],health:1,abilities:['Leap three squares'],cooldown:0,level:1,data:{}};
['Standard','Sandbox','Custom','Developer'].forEach(name=>register({id:name,name,description:name==='Custom'?'Chaos Jumpers: leap three squares; capture the enemy king.':'Chess laboratory',stockfishCompatible:name!=='Custom'}));
