import{j as e}from"./jsx-runtime.K1e75nIr.js";import{g as n,h as i}from"./user-attributes.URoZLC9E.js";import{c as t,s as c}from"./clsx.DRbz3u-j.js";import{r as s}from"./index.NEDEFKed.js";const M=()=>{const[o,r]=s.useState(!1),m=s.useCallback(a=>{const l=a.target.value;r(l==="Manual"),n({formula:l})},[]),u=s.useCallback(a=>{const l=Number(a.target.value);isNaN(l)||n({lbmManual:l})},[]);return e.jsxs("div",{className:"w-full",children:[e.jsx("label",{htmlFor:"LBMFormula",className:"mb-2 block text-sm font-medium text-lime-900",children:"LBM formula"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("select",{id:"LBMFormula",name:"LBMFormula",defaultValue:i,onChange:m,className:t(c,o?"w-3/5":"w-full","border-lime-300 bg-lime-50 text-lime-900 focus:border-lime-500 focus:ring-lime-500"),children:[e.jsx("option",{value:"Boer",children:"Boer"}),e.jsx("option",{value:"James",children:"James"}),e.jsx("option",{value:"Hume",children:"Hume"}),e.jsx("option",{value:"Manual",children:"Manual"})]}),e.jsx("input",{type:"number",name:"manualLBMInput",onChange:u,placeholder:"LBM in Kg",className:t(o?"block w-2/5":"hidden","block h-10 max-h-12 min-h-9 rounded-none border border-lime-300 bg-lime-50 p-2.5 text-sm text-lime-900 focus:border-lime-500 focus:ring-lime-500")})]})]})};export{M as LBMSelector};