import{Sn as e,_n as t,bn as n,fr as r,kn as i}from"../jse/index-index-_SvYlc06.js";import{B as a,L as o,N as s,P as c,R as l,a as u,r as d}from"./use-theme-5NPw1J3_.js";import{n as f,t as p}from"./icon-switch.cssr-Dwjg5uU2.js";function m(t,n,r){if(!n)return;let a=c(),o=e(s,null),l=()=>{let e=r.value;n.mount({id:e===void 0?t:e+t,head:!0,anchorMetaName:u,props:{bPrefix:e?`.${e}-`:void 0},ssr:a,parent:o==null?void 0:o.styleMountTarget}),o!=null&&o.preflightStyleDisabled||d.mount({id:`n-global`,head:!0,anchorMetaName:u,ssr:a,parent:o==null?void 0:o.styleMountTarget})};a?l():i(l)}var h=o([o(`@keyframes rotator`,`
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`),l(`base-loading`,`
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `,[a(`transition-wrapper`,`
 position: absolute;
 width: 100%;
 height: 100%;
 `,[p()]),a(`placeholder`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[p({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),a(`container`,`
 animation: rotator 3s linear infinite both;
 `,[a(`icon`,`
 height: 1em;
 width: 1em;
 `)])])]),g=`1.6s`,_=t({name:`BaseLoading`,props:Object.assign({clsPrefix:{type:String,required:!0},show:{type:Boolean,default:!0}},{strokeWidth:{type:Number,default:28},stroke:{type:String,default:void 0},scale:{type:Number,default:1},radius:{type:Number,default:100}}),setup(e){m(`-base-loading`,h,r(e,`clsPrefix`))},render(){let{clsPrefix:e,radius:t,strokeWidth:r,stroke:i,scale:a}=this,o=t/a;return n(`div`,{class:`${e}-base-loading`,role:`img`,"aria-label":`loading`},n(f,null,{default:()=>this.show?n(`div`,{key:`icon`,class:`${e}-base-loading__transition-wrapper`},n(`div`,{class:`${e}-base-loading__container`},n(`svg`,{class:`${e}-base-loading__icon`,viewBox:`0 0 ${2*o} ${2*o}`,xmlns:`http://www.w3.org/2000/svg`,style:{color:i}},n(`g`,null,n(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${o} ${o};270 ${o} ${o}`,begin:`0s`,dur:g,fill:`freeze`,repeatCount:`indefinite`}),n(`circle`,{class:`${e}-base-loading__icon`,fill:`none`,stroke:`currentColor`,"stroke-width":r,"stroke-linecap":`round`,cx:o,cy:o,r:t-r/2,"stroke-dasharray":5.67*t,"stroke-dashoffset":18.48*t},n(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${o} ${o};135 ${o} ${o};450 ${o} ${o}`,begin:`0s`,dur:g,fill:`freeze`,repeatCount:`indefinite`}),n(`animate`,{attributeName:`stroke-dashoffset`,values:`${5.67*t};${1.42*t};${5.67*t}`,begin:`0s`,dur:g,fill:`freeze`,repeatCount:`indefinite`})))))):n(`div`,{key:`placeholder`,class:`${e}-base-loading__placeholder`},this.$slots)}))}});export{m as n,_ as t};