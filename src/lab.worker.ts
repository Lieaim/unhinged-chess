import{State}from'./labRules';import{chooseCustomAction}from'./customBot';
self.onmessage=(e:MessageEvent<{state:State;elo:number}>)=>{postMessage(chooseCustomAction(e.data.state,e.data.elo));};
