import{j as e}from"./jsx-runtime.K1e75nIr.js";import{r as i}from"./index.NEDEFKed.js";import{l as g,$ as h,a as u,b as x,c as d,d as o}from"./user-attributes.URoZLC9E.js";/* empty css                       */function p(a,s={}){let r=i.useCallback(t=>s.keys?g(a,s.keys,t):a.listen(t),[s.keys,a]),n=a.get.bind(a);return i.useSyncExternalStore(r,n,n)}const v=()=>{const{weight:a,height:s,age:r,genre:n}=p(o),t=i.useCallback(m=>{const c=m.target.name;let l=m.target.value;switch(c!=="genre"&&(l=parseInt(l)),c){case"weight":d(l);return;case"height":x(l);return;case"age":u(l);return;case"genre":h(l);return}},[]);return e.jsxs("div",{className:"mx-auto flex w-full flex-col items-center justify-center gap-6 text-sm font-medium text-amber-900",children:[e.jsxs("div",{className:"flex w-full justify-center gap-6",children:[e.jsxs("label",{className:"radio-button",htmlFor:"genreMale",children:[e.jsx("input",{type:"radio",id:"genreMale",name:"genre",value:"male",checked:n==="male",onChange:t}),"🙋‍♂️ Male",e.jsx("span",{})]}),e.jsxs("label",{className:"radio-button",htmlFor:"genreFemale",children:[e.jsx("input",{type:"radio",id:"genreFemale",name:"genre",value:"female",checked:n==="female",onChange:t}),"🙋‍♀️ Female",e.jsx("span",{})]})]}),e.jsxs("div",{className:"flex w-full flex-col items-start gap-3",children:[e.jsxs("label",{htmlFor:"weight",children:["Weight: ",e.jsx("span",{className:"font-bold text-amber-600",children:a})," kg"]}),e.jsx("input",{type:"range",id:"weight",name:"weight",value:a,min:"0",max:"200",onChange:t})]}),e.jsxs("div",{className:"flex w-full flex-col items-start gap-3",children:[e.jsxs("label",{htmlFor:"height",children:["Height: ",e.jsx("span",{className:"font-bold text-amber-600",children:s})," cm"]}),e.jsx("input",{type:"range",id:"height",name:"height",value:s,min:"0",max:"250",onChange:t})]}),e.jsxs("div",{className:"flex w-full flex-col items-start gap-3",children:[e.jsxs("label",{htmlFor:"age",children:["Age: ",e.jsx("span",{className:"font-bold text-amber-600",children:r})]}),e.jsx("input",{type:"range",id:"age",name:"age",value:r,min:"0",max:"100",onChange:t})]})]})};export{v as Dashboard};