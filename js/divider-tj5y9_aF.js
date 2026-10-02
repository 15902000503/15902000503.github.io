import{_n as e,bn as t,nn as n,sn as r}from"../jse/index-index-_SvYlc06.js";import{B as i,H as a,R as o,V as s,j as c,n as l}from"./use-theme-5NPw1J3_.js";import{n as u}from"./light-DTYIu0LP.js";import{t as d}from"./light-DH9EyrXS.js";var f=o(`divider`,`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[a(`vertical`,`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[a(`no-title`,`
 display: flex;
 align-items: center;
 `)]),i(`title`,`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),s(`title-position-left`,[i(`line`,[s(`left`,{width:`28px`})])]),s(`title-position-right`,[i(`line`,[s(`right`,{width:`28px`})])]),s(`dashed`,[i(`line`,`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),s(`vertical`,`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),i(`line`,`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),a(`dashed`,[i(`line`,{backgroundColor:`var(--n-color)`})]),s(`dashed`,[i(`line`,{borderColor:`var(--n-color)`})]),s(`vertical`,{backgroundColor:`var(--n-color)`})]),p=e({name:`Divider`,props:Object.assign(Object.assign({},l.props),{titlePlacement:{type:String,default:`center`},dashed:Boolean,vertical:Boolean}),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=c(e),i=l(`Divider`,`-divider`,f,d,e,t),a=r(()=>{let{common:{cubicBezierEaseInOut:e},self:{color:t,textColor:n,fontWeight:r}}=i.value;return{"--n-bezier":e,"--n-color":t,"--n-text-color":n,"--n-font-weight":r}}),o=n?u(`divider`,void 0,a,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:a,themeClass:o==null?void 0:o.themeClass,onRender:o==null?void 0:o.onRender}},render(){var e;let{$slots:r,titlePlacement:i,vertical:a,dashed:o,cssVars:s,mergedClsPrefix:c}=this;return(e=this.onRender)==null||e.call(this),t(`div`,{role:`separator`,class:[`${c}-divider`,this.themeClass,{[`${c}-divider--vertical`]:a,[`${c}-divider--no-title`]:!r.default,[`${c}-divider--dashed`]:o,[`${c}-divider--title-position-${i}`]:r.default&&i}],style:s},a?null:t(`div`,{class:`${c}-divider__line ${c}-divider__line--left`}),!a&&r.default?t(n,null,t(`div`,{class:`${c}-divider__title`},this.$slots),t(`div`,{class:`${c}-divider__line ${c}-divider__line--right`})):null)}});export{p as NDivider};