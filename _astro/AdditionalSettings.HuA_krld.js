import{j as e,s as u,a as m}from"./forms.B4KJdIdB.js";import{r as n}from"./index.NEDEFKed.js";import{u as d}from"./index.CRBIPUEw.js";import{d as h,f as b,i as c}from"./user-attributes.D0Ug1cFK.js";import{c as r}from"./clsx.B-dksMZM.js";const f=()=>{const{bmrAndExercise:a}=d(h),l=t=>{const s=t.target.value;b({equation:s})};return e.jsxs("div",{className:"w-full",children:[e.jsx("label",{htmlFor:"BMREquation",className:r(u,"text-amber-900"),children:"BMR equation"}),e.jsxs("select",{id:"BMREquation",name:"BMREquation",defaultValue:a.equation,onChange:l,className:r(m,"border-amber-300 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500"),children:[e.jsx("option",{value:"Mifflin St Jeor",children:"Mifflin St Jeor"}),e.jsx("option",{value:"Revised Harris-Benedict",children:"Revised Harris-Benedict"}),e.jsx("option",{value:"Katch-McArdle",children:"Katch-McArdle"})]})]})},M=()=>{const{lbm:a}=d(h),[l,t]=n.useState(a.formula==="Manual"),s=n.useCallback(i=>{const o=i.target.value;t(o==="Manual"),c({formula:o})},[]),x=n.useCallback(i=>{const o=Number(i.target.value);isNaN(o)||c({lbmManual:o})},[]);return e.jsxs("div",{className:"w-full",children:[e.jsx("label",{htmlFor:"LBMFormula",className:r(u,"text-lime-900"),children:"LBM formula"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("select",{id:"LBMFormula",name:"LBMFormula",defaultValue:a.formula,onChange:s,className:r(m,l?"w-3/5":"w-full","border-lime-300 bg-lime-50 text-lime-900 focus:border-lime-500 focus:ring-lime-500"),children:[e.jsx("option",{value:"Boer",children:"Boer"}),e.jsx("option",{value:"James",children:"James"}),e.jsx("option",{value:"Hume",children:"Hume"}),e.jsx("option",{value:"Manual",children:"Manual"})]}),e.jsx("input",{type:"number",name:"manualLBMInput",onChange:x,defaultValue:a.lbmKg,placeholder:"LBM in Kg",className:r(l?"block w-2/5":"hidden","block h-10 max-h-12 min-h-9 rounded-none border border-lime-300 bg-lime-50 p-2.5 text-sm text-lime-900 shadow-md focus:border-lime-500 focus:ring-lime-500")})]})]})},w=()=>{const[a,l]=n.useState(!1),t=n.useCallback(()=>{l(s=>!s),window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})},[]);return e.jsxs("div",{className:"mt-6 w-full",children:[e.jsx("button",{onClick:t,className:"mx-auto block w-fit rounded-full bg-amber-400 px-4 py-2 text-center font-semibold text-amber-950 shadow-md transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-100 active:border-amber-500 active:shadow-none active:ring-amber-500",children:"Additional settings"}),a&&e.jsxs("div",{className:"mt-6 flex flex-col gap-6",children:[e.jsx("div",{children:e.jsx(M,{})}),e.jsx("div",{children:e.jsx(f,{})})]})]})};export{w as AdditionalSettings};
