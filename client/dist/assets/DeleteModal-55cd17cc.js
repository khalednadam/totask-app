import{c as e,o as m,h as _,w as a,g as n,k as u,t as x}from"./index-b477b231.js";const p={__name:"DeleteModal",props:{title:String,text:String,actionBtnText:String,isLoading:Boolean},emits:["cancel","delete"],setup(t){return(l,o)=>{const c=e("v-card-text"),r=e("v-spacer"),i=e("v-btn"),d=e("v-card-actions"),s=e("v-card");return m(),_(s,{title:t.title},{default:a(()=>[n(c,null,{default:a(()=>[u(x(t.text),1)]),_:1}),n(d,null,{default:a(()=>[n(r),n(i,{variant:"outlined",text:"Cancel",onClick:o[0]||(o[0]=v=>l.$emit("cancel"))}),n(i,{loading:t.isLoading,disabled:t.isLoading,variant:"tonal",text:t.actionBtnText,color:"error",onClick:o[1]||(o[1]=v=>l.$emit("delete"))},null,8,["loading","disabled","text"])]),_:1})]),_:1},8,["title"])}}};export{p as default};
