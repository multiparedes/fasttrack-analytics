import{_ as h}from"./nuxt-link.821a706f.js";import{A as y,K as k,L as b,o as i,c,C as f,J as w,B as g,M as v,_ as l,a as n,b as s,w as r,d as u}from"./entry.f4cf185e.js";const m=y({__name:"Button",props:{color:{type:String,required:!0,default:"primary",validator:e=>["primary","secondary","transparent"].includes(e)},variant:{type:String,required:!1,default:"solid",validator:e=>["solid","bordered"].includes(e)},size:{type:String,required:!1,default:"md"},icon:{type:Object,required:!1,default:null},disabled:{type:Boolean,required:!1,default:!1},iconStart:{type:Boolean,required:!1,default:!1},link:{type:String,required:!1,default:""},isExternalLink:{type:Boolean,required:!1,default:!1}},setup(e){const o=e,t=k();function a(){o.isExternalLink?window.open(o.link,"_blank"):t.push(o.link)}return(p,K)=>{var d,_;const x=b("font-awesome-icon");return i(),c("button",{class:v(["inline-flex items-center gap-2 px-4 py-2 transition-color duration-200 linear text-white rounded-full",`button-${e.color}-${e.variant} ${e.iconStart?"flex-row-reverse":""}`]),target:"_blank",onClick:a},[f(p.$slots,"default"),e.icon?(i(),w(x,{key:0,class:"aspect-square w-6",icon:[(d=e.icon)==null?void 0:d.prefix,(_=e.icon)==null?void 0:_.iconName]},null,8,["icon"])):g("",!0)],2)}}});const $={},B={class:"w-full bg-white"},N={class:"flex p-4 justify-center shadow-xl"},q={class:"flex gap-1 w-full max-w-screen-xl items-center h-6 justify-between py-4 px-4"},C={class:"flex gap-2 text-sm"},S=n("span",{class:"hidden md:block"},"API Docs",-1),j=n("span",{class:"hidden md:block"},"Code ",-1);function L(e,o){const t=h,a=m;return i(),c("header",B,[n("div",N,[n("nav",q,[s(t,{class:"font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text",to:"/"},{default:r(()=>[u(" FastTrack Analytics ")]),_:1}),n("div",C,[s(a,{color:"secondary",variant:"bordered",link:"http://ergast.com/mrd/","is-external-link":"",icon:{prefix:"fas",iconName:"book-open"}},{default:r(()=>[S]),_:1}),s(a,{color:"primary",link:"https://github.com/multiparedes/fasttrack-analytics","is-external-link":"",icon:{prefix:"fas",iconName:"code"}},{default:r(()=>[j]),_:1})])])])])}const V=l($,[["render",L]]),A={},E={class:"w-full py-1 h-8 bg-white text-center text-sm inline-flex items-center gap-2 justify-center"},M={class:"flex gap-2"};function z(e,o){const t=m;return i(),c("div",E,[u(" Made by Martí Paredes "),n("div",M,[s(t,{class:"w-4",color:"transparent",icon:{prefix:"fab",iconName:"github"},link:"https://github.com/multiparedes","is-external-link":""}),s(t,{class:"w-4",color:"transparent",icon:{prefix:"fab",iconName:"linkedin"},link:"https://www.linkedin.com/in/martiparedessalom/","is-external-link":""})])])}const F=l(A,[["render",z]]),P={},T={class:"bg-slate-300 flex flex-col relative",style:{"font-family":"'Barlow', sans-serif"}},D={class:"min-h-screen"},I={class:"flex justify-center"};function J(e,o){const t=V,a=F;return i(),c("div",T,[s(t),n("main",D,[n("div",I,[f(e.$slots,"default")])]),s(a)])}const G=l(P,[["render",J]]);export{G as default};