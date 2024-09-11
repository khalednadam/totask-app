import{ad as r,ae as g,r as h,c as o,o as b,h as V,w as a,g as t,f as l,e as w,I as k,t as y,k as B}from"./index-ed4259d6.js";const D={class:"flex justify-between items-center"},C=l("h1",{class:"px-5 py-3 text-xl"},"Delete Board?",-1),M={class:"font-bold text-lg"},T=l("p",null,"Things to know:",-1),N=l("ul",{class:"decoration-dotted list-disc px-5"},[l("li",{class:"decoration-dotted"}," This is permanent and can't be undone. "),l("li",null," All the data related to this board will be permanently deleted ")],-1),$=l("p",{class:"pt-5 pb-1"},"Enter the board name to delete it",-1),L={__name:"DangerDeleteModal",props:r({name:String,isLoading:Boolean},{modelValue:{},modelModifiers:{}}),emits:r(["delete"],["update:modelValue"]),setup(d,{emit:E}){const s=g(d,"modelValue"),i=h("");return(m,e)=>{const c=o("v-btn"),u=o("v-text-field"),_=o("v-card-text"),v=o("v-col"),f=o("v-row"),p=o("v-card"),x=o("v-dialog");return b(),V(x,{modelValue:s.value,"onUpdate:modelValue":e[3]||(e[3]=n=>s.value=n)},{default:a(()=>[t(p,{class:"self-center h-full overflow-hidden",rounded:"lg"},{default:a(()=>[t(f,{class:"max-w-[500px]"},{default:a(()=>[t(v,{cols:"12",lg:"12",class:""},{default:a(()=>[l("div",D,[C,t(c,{onClick:e[0]||(e[0]=n=>s.value=!1),size:"x-small",class:"right-5",icon:"",variant:"text"},{default:a(()=>[t(w(k),{icon:"ph:x",width:"25"})]),_:1})]),t(_,null,{default:a(()=>[l("p",M,' Enter the board name "'+y(d.name)+'" to delete ',1),T,N,$,t(u,{density:"compact",modelValue:i.value,"onUpdate:modelValue":e[1]||(e[1]=n=>i.value=n)},null,8,["modelValue"]),t(c,{class:"w-full",color:"error",loading:d.isLoading,disabled:i.value!==d.name,variant:"outlined",onClick:e[2]||(e[2]=n=>m.$emit("delete"))},{default:a(()=>[B("delete")]),_:1},8,["loading","disabled"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}};export{L as default};