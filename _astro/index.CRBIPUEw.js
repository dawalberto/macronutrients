import{r as l}from"./index.NEDEFKed.js";import{l as u}from"./user-attributes.D0Ug1cFK.js";function c(e,r={}){let i=l.useCallback(s=>r.keys?u(e,r.keys,s):e.listen(s),[r.keys,e]),t=e.get.bind(e);return l.useSyncExternalStore(i,t,t)}export{c as u};
