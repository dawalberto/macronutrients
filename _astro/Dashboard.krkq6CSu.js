import{j as e,l as t}from"./forms.B4KJdIdB.js";import{u as h}from"./index.CRBIPUEw.js";import{$ as g,a as x,b as o,c as u,d}from"./user-attributes.D0Ug1cFK.js";/* empty css                       */import{r as p}from"./index.NEDEFKed.js";const w=()=>{const{weight:l,height:r,age:n,genre:i}=h(d),s=p.useCallback(m=>{const c=m.target.name;let a=m.target.value;switch(c!=="genre"&&(a=parseInt(a)),c){case"weight":u(a);return;case"height":o(a);return;case"age":x(a);return;case"genre":g(a);return}},[]);return e.jsxs("div",{className:"mx-auto flex w-full flex-col items-center justify-center gap-4 text-sm font-medium text-amber-900",children:[e.jsxs("div",{className:"flex w-full justify-start gap-4",children:[e.jsxs("label",{className:"radio-button",htmlFor:"genreMale",children:[e.jsx("input",{type:"radio",id:"genreMale",name:"genre",value:"male",checked:i==="male",onChange:s}),"🙋‍♂️ Male",e.jsx("span",{})]}),e.jsxs("label",{className:"radio-button",htmlFor:"genreFemale",children:[e.jsx("input",{type:"radio",id:"genreFemale",name:"genre",value:"female",checked:i==="female",onChange:s}),"🙋‍♀️ Female",e.jsx("span",{})]})]}),e.jsxs("div",{className:"mt-2 flex w-full flex-col items-start gap-3",children:[e.jsxs("label",{htmlFor:"weight",className:t,children:["Weight: ",e.jsx("span",{className:"text-base text-amber-600",children:l})," kg"]}),e.jsx("input",{type:"range",id:"weight",name:"weight",value:l,min:"0",max:"200",onChange:s})]}),e.jsxs("div",{className:"flex w-full flex-col items-start gap-3",children:[e.jsxs("label",{htmlFor:"height",className:t,children:["Height: ",e.jsx("span",{className:"text-base text-amber-600",children:r})," cm"]}),e.jsx("input",{type:"range",id:"height",name:"height",value:r,min:"0",max:"250",onChange:s})]}),e.jsxs("div",{className:"flex w-full flex-col items-start gap-3",children:[e.jsxs("label",{htmlFor:"age",className:t,children:["Age: ",e.jsx("span",{className:"text-base text-amber-600",children:n})," years"]}),e.jsx("input",{type:"range",id:"age",name:"age",value:n,min:"0",max:"100",onChange:s})]})]})};export{w as Dashboard};