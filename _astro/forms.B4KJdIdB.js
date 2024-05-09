import{r as f}from"./index.NEDEFKed.js";var p={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=f,_=Symbol.for("react.element"),d=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,c=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,x={key:!0,ref:!0,__self:!0,__source:!0};function a(t,e,l){var r,o={},n=null,m=null;l!==void 0&&(n=""+l),e.key!==void 0&&(n=""+e.key),e.ref!==void 0&&(m=e.ref);for(r in e)i.call(e,r)&&!x.hasOwnProperty(r)&&(o[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)o[r]===void 0&&(o[r]=e[r]);return{$$typeof:_,type:t,key:n,ref:m,props:o,_owner:c.current}}s.Fragment=d;s.jsx=a;s.jsxs=a;p.exports=s;var v=p.exports;const y="block md:text-sm text-base font-bold",E="mb-2 "+y,O="block ml-1 min-h-9 rounded-none border-2 p-2.5 md:text-sm text-base w-full md:h-auto shadow-md cursor-pointer outline-0";export{O as a,v as j,y as l,E as s};
