import{Dn as e,In as t,Jn as n,Mn as r,Sn as i,_n as a,ar as o,bn as s,in as c,nn as l,qt as u,sn as d,sr as f}from"../jse/index-index-_SvYlc06.js";import{B as p,F as m,L as h,R as g,U as _,V as v,j as y,n as b,t as x}from"./use-theme-5NPw1J3_.js";import{t as S}from"./use-rtl-BE_mgN8z.js";import{r as C,s as w,t as T}from"./Scrollbar-DlYFQb5A.js";import{r as E}from"./css-BCm6yWvQ.js";import{i as D,n as O,t as k}from"./light-DTYIu0LP.js";import{t as A}from"./misc-B5EK0Bqt.js";import{t as j}from"./keep-r-jEu_H2.js";import{t as M}from"./keysOf-nSrwPlrn.js";import{t as N}from"./omit-CvRahqeG.js";import{t as P}from"./render-IYLrfreY.js";import{t as F}from"./Close-Dp06J0hr.js";import{i as I,n as L,r as R,t as z}from"./Warning-BrzcFHA5.js";var B={closeMargin:`16px 12px`,closeSize:`20px`,closeIconSize:`16px`,width:`365px`,padding:`16px`,titleFontSize:`16px`,metaFontSize:`12px`,descriptionFontSize:`12px`};function V(e){let{textColor2:t,successColor:n,infoColor:r,warningColor:i,errorColor:a,popoverColor:o,closeIconColor:s,closeIconColorHover:c,closeIconColorPressed:l,closeColorHover:u,closeColorPressed:d,textColor1:f,textColor3:p,borderRadius:m,fontWeightStrong:h,boxShadow2:g,lineHeight:_,fontSize:v}=e;return Object.assign(Object.assign({},B),{borderRadius:m,lineHeight:_,fontSize:v,headerFontWeight:h,iconColor:t,iconColorSuccess:n,iconColorInfo:r,iconColorWarning:i,iconColorError:a,color:o,textColor:t,closeIconColor:s,closeIconColorHover:c,closeIconColorPressed:l,closeBorderRadius:m,closeColorHover:u,closeColorPressed:d,headerTextColor:f,descriptionTextColor:p,actionTextColor:t,boxShadow:g})}var H=x({name:`Notification`,common:k,peers:{Scrollbar:C},self:V}),U=m(`n-notification-provider`),W=a({name:`NotificationContainer`,props:{scrollable:{type:Boolean,required:!0},placement:{type:String,required:!0}},setup(){let{mergedThemeRef:e,mergedClsPrefixRef:t,wipTransitionCountRef:r}=i(U),a=f(null);return n(()=>{var e,t;r.value>0?(e=a==null?void 0:a.value)==null||e.classList.add(`transitioning`):(t=a==null?void 0:a.value)==null||t.classList.remove(`transitioning`)}),{selfRef:a,mergedTheme:e,mergedClsPrefix:t,transitioning:r}},render(){let{$slots:e,scrollable:t,mergedClsPrefix:n,mergedTheme:r,placement:i}=this;return s(`div`,{ref:`selfRef`,class:[`${n}-notification-container`,t&&`${n}-notification-container--scrollable`,`${n}-notification-container--${i}`]},t?s(T,{theme:r.peers.Scrollbar,themeOverrides:r.peerOverrides.Scrollbar,contentStyle:{overflow:`hidden`}},e):e)}}),G={info:()=>s(R,null),success:()=>s(L,null),warning:()=>s(z,null),error:()=>s(I,null),default:()=>null},K={closable:{type:Boolean,default:!0},type:{type:String,default:`default`},avatar:Function,title:[String,Function],description:[String,Function],content:[String,Function],meta:[String,Function],action:[String,Function],onClose:{type:Function,required:!0},keepAliveOnHover:Boolean,onMouseenter:Function,onMouseleave:Function},q=M(K),J=a({name:`Notification`,props:K,setup(e){let{mergedClsPrefixRef:t,mergedThemeRef:n,props:r}=i(U),{inlineThemeDisabled:a,mergedRtlRef:o}=y(),s=S(`Notification`,o,t),c=d(()=>{let{type:t}=e,{self:{color:r,textColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,headerTextColor:c,descriptionTextColor:l,actionTextColor:u,borderRadius:d,headerFontWeight:f,boxShadow:p,lineHeight:m,fontSize:h,closeMargin:g,closeSize:v,width:y,padding:b,closeIconSize:x,closeBorderRadius:S,closeColorHover:C,closeColorPressed:w,titleFontSize:T,metaFontSize:D,descriptionFontSize:O,[_(`iconColor`,t)]:k},common:{cubicBezierEaseOut:A,cubicBezierEaseIn:j,cubicBezierEaseInOut:M}}=n.value,{left:N,right:P,top:F,bottom:I}=E(b);return{"--n-color":r,"--n-font-size":h,"--n-text-color":i,"--n-description-text-color":l,"--n-action-text-color":u,"--n-title-text-color":c,"--n-title-font-weight":f,"--n-bezier":M,"--n-bezier-ease-out":A,"--n-bezier-ease-in":j,"--n-border-radius":d,"--n-box-shadow":p,"--n-close-border-radius":S,"--n-close-color-hover":C,"--n-close-color-pressed":w,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-line-height":m,"--n-icon-color":k,"--n-close-margin":g,"--n-close-size":v,"--n-close-icon-size":x,"--n-width":y,"--n-padding-left":N,"--n-padding-right":P,"--n-padding-top":F,"--n-padding-bottom":I,"--n-title-font-size":T,"--n-meta-font-size":D,"--n-description-font-size":O}}),l=a?O(`notification`,d(()=>e.type[0]),c,r):void 0;return{mergedClsPrefix:t,showAvatar:d(()=>e.avatar||e.type!==`default`),handleCloseClick(){e.onClose()},rtlEnabled:s,cssVars:a?void 0:c,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){var e;let{mergedClsPrefix:t}=this;return(e=this.onRender)==null||e.call(this),s(`div`,{class:[`${t}-notification-wrapper`,this.themeClass],onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave,style:this.cssVars},s(`div`,{class:[`${t}-notification`,this.rtlEnabled&&`${t}-notification--rtl`,this.themeClass,{[`${t}-notification--closable`]:this.closable,[`${t}-notification--show-avatar`]:this.showAvatar}],style:this.cssVars},this.showAvatar?s(`div`,{class:`${t}-notification__avatar`},this.avatar?P(this.avatar):this.type===`default`?null:s(w,{clsPrefix:t},{default:()=>G[this.type]()})):null,this.closable?s(F,{clsPrefix:t,class:`${t}-notification__close`,onClick:this.handleCloseClick}):null,s(`div`,{ref:`bodyRef`,class:`${t}-notification-main`},this.title?s(`div`,{class:`${t}-notification-main__header`},P(this.title)):null,this.description?s(`div`,{class:`${t}-notification-main__description`},P(this.description)):null,this.content?s(`pre`,{class:`${t}-notification-main__content`},P(this.content)):null,this.meta||this.action?s(`div`,{class:`${t}-notification-main-footer`},this.meta?s(`div`,{class:`${t}-notification-main-footer__meta`},P(this.meta)):null,this.action?s(`div`,{class:`${t}-notification-main-footer__action`},P(this.action)):null):null)))}}),Y=Object.assign(Object.assign({},K),{duration:Number,onClose:Function,onLeave:Function,onAfterEnter:Function,onAfterLeave:Function,onHide:Function,onAfterShow:Function,onAfterHide:Function}),X=a({name:`NotificationEnvironment`,props:Object.assign(Object.assign({},Y),{internalKey:{type:String,required:!0},onInternalAfterLeave:{type:Function,required:!0}}),setup(t){let{wipTransitionCountRef:n}=i(U),a=f(!0),o=null;function s(){a.value=!1,o&&window.clearTimeout(o)}function c(t){n.value++,e(()=>{t.style.height=`${t.offsetHeight}px`,t.style.maxHeight=`0`,t.style.transition=`none`,t.offsetHeight,t.style.transition=``,t.style.maxHeight=t.style.height})}function l(e){n.value--,e.style.height=``,e.style.maxHeight=``;let{onAfterEnter:r,onAfterShow:i}=t;r&&r(),i&&i()}function u(e){n.value++,e.style.maxHeight=`${e.offsetHeight}px`,e.style.height=`${e.offsetHeight}px`,e.offsetHeight}function d(e){let{onHide:n}=t;n&&n(),e.style.maxHeight=`0`,e.offsetHeight}function p(){n.value--;let{onAfterLeave:e,onInternalAfterLeave:r,onAfterHide:i,internalKey:a}=t;e&&e(),r(a),i&&i()}function m(){let{duration:e}=t;e&&(o=window.setTimeout(s,e))}function h(e){e.currentTarget===e.target&&o!==null&&(window.clearTimeout(o),o=null)}function g(e){e.currentTarget===e.target&&m()}function _(){let{onClose:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&s()}):s()}return r(()=>{t.duration&&(o=window.setTimeout(s,t.duration))}),{show:a,hide:s,handleClose:_,handleAfterLeave:p,handleLeave:d,handleBeforeLeave:u,handleAfterEnter:l,handleBeforeEnter:c,handleMouseenter:h,handleMouseleave:g}},render(){return s(u,{name:`notification-transition`,appear:!0,onBeforeEnter:this.handleBeforeEnter,onAfterEnter:this.handleAfterEnter,onBeforeLeave:this.handleBeforeLeave,onLeave:this.handleLeave,onAfterLeave:this.handleAfterLeave},{default:()=>this.show?s(J,Object.assign({},j(this.$props,q),{onClose:this.handleClose,onMouseenter:this.duration&&this.keepAliveOnHover?this.handleMouseenter:void 0,onMouseleave:this.duration&&this.keepAliveOnHover?this.handleMouseleave:void 0})):null})}}),Z=h([g(`notification-container`,`
 z-index: 4000;
 position: fixed;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 `,[h(`>`,[g(`scrollbar`,`
 width: initial;
 overflow: visible;
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[h(`>`,[g(`scrollbar-container`,`
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[g(`scrollbar-content`,`
 padding-top: 12px;
 padding-bottom: 33px;
 `)])])])]),v(`top, top-right, top-left`,`
 top: 12px;
 `,[h(`&.transitioning >`,[g(`scrollbar`,[h(`>`,[g(`scrollbar-container`,`
 min-height: 100vh !important;
 `)])])])]),v(`bottom, bottom-right, bottom-left`,`
 bottom: 12px;
 `,[h(`>`,[g(`scrollbar`,[h(`>`,[g(`scrollbar-container`,[g(`scrollbar-content`,`
 padding-bottom: 12px;
 `)])])])]),g(`notification-wrapper`,`
 display: flex;
 align-items: flex-end;
 margin-bottom: 0;
 margin-top: 12px;
 `)]),v(`top, bottom`,`
 left: 50%;
 transform: translateX(-50%);
 `,[g(`notification-wrapper`,[h(`&.notification-transition-enter-from, &.notification-transition-leave-to`,`
 transform: scale(0.85);
 `),h(`&.notification-transition-leave-from, &.notification-transition-enter-to`,`
 transform: scale(1);
 `)])]),v(`top`,[g(`notification-wrapper`,`
 transform-origin: top center;
 `)]),v(`bottom`,[g(`notification-wrapper`,`
 transform-origin: bottom center;
 `)]),v(`top-right, bottom-right`,[g(`notification`,`
 margin-left: 28px;
 margin-right: 16px;
 `)]),v(`top-left, bottom-left`,[g(`notification`,`
 margin-left: 16px;
 margin-right: 28px;
 `)]),v(`top-right`,`
 right: 0;
 `,[Q(`top-right`)]),v(`top-left`,`
 left: 0;
 `,[Q(`top-left`)]),v(`bottom-right`,`
 right: 0;
 `,[Q(`bottom-right`)]),v(`bottom-left`,`
 left: 0;
 `,[Q(`bottom-left`)]),v(`scrollable`,[v(`top-right`,`
 top: 0;
 `),v(`top-left`,`
 top: 0;
 `),v(`bottom-right`,`
 bottom: 0;
 `),v(`bottom-left`,`
 bottom: 0;
 `)]),g(`notification-wrapper`,`
 margin-bottom: 12px;
 `,[h(`&.notification-transition-enter-from, &.notification-transition-leave-to`,`
 opacity: 0;
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 `),h(`&.notification-transition-leave-from, &.notification-transition-enter-to`,`
 opacity: 1;
 `),h(`&.notification-transition-leave-active`,`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-in),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `),h(`&.notification-transition-enter-active`,`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-out),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `)]),g(`notification`,`
 background-color: var(--n-color);
 color: var(--n-text-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 font-family: inherit;
 font-size: var(--n-font-size);
 font-weight: 400;
 position: relative;
 display: flex;
 overflow: hidden;
 flex-shrink: 0;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 width: var(--n-width);
 max-width: calc(100vw - 16px - 16px);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 box-sizing: border-box;
 opacity: 1;
 `,[p(`avatar`,[g(`icon`,`
 color: var(--n-icon-color);
 `),g(`base-icon`,`
 color: var(--n-icon-color);
 `)]),v(`show-avatar`,[g(`notification-main`,`
 margin-left: 40px;
 width: calc(100% - 40px); 
 `)]),v(`closable`,[g(`notification-main`,[h(`> *:first-child`,`
 padding-right: 20px;
 `)]),p(`close`,`
 position: absolute;
 top: 0;
 right: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),p(`avatar`,`
 position: absolute;
 top: var(--n-padding-top);
 left: var(--n-padding-left);
 width: 28px;
 height: 28px;
 font-size: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[g(`icon`,`transition: color .3s var(--n-bezier);`)]),g(`notification-main`,`
 padding-top: var(--n-padding-top);
 padding-bottom: var(--n-padding-bottom);
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 margin-left: 8px;
 width: calc(100% - 8px);
 `,[g(`notification-main-footer`,`
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 12px;
 `,[p(`meta`,`
 font-size: var(--n-meta-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),p(`action`,`
 cursor: pointer;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-action-text-color);
 `)]),p(`header`,`
 font-weight: var(--n-title-font-weight);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-title-text-color);
 `),p(`description`,`
 margin-top: 8px;
 font-size: var(--n-description-font-size);
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),p(`content`,`
 line-height: var(--n-line-height);
 margin: 12px 0 0 0;
 font-family: inherit;
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-text-color);
 `,[h(`&:first-child`,`margin: 0;`)])])])])]);function Q(e){return g(`notification-wrapper`,[h(`&.notification-transition-enter-from, &.notification-transition-leave-to`,`
 transform: translate(${e.split(`-`)[1]===`left`?`calc(-100%)`:`calc(100%)`}, 0);
 `),h(`&.notification-transition-leave-from, &.notification-transition-enter-to`,`
 transform: translate(0, 0);
 `)])}var $=m(`n-notification-api`),ee=a({name:`NotificationProvider`,props:Object.assign(Object.assign({},b.props),{containerClass:String,containerStyle:[String,Object],to:[String,Object],scrollable:{type:Boolean,default:!0},max:Number,placement:{type:String,default:`top-right`},keepAliveOnHover:Boolean}),setup(e){let{mergedClsPrefixRef:n}=y(e),r=f([]),i={},a=new Set;function s(t){let n=A(),s=()=>{a.add(n),i[n]&&i[n].hide()},c=o(Object.assign(Object.assign({},t),{key:n,destroy:s,hide:s,deactivate:s})),{max:l}=e;if(l&&r.value.length-a.size>=l){let e=!1,t=0;for(let n of r.value){if(!a.has(n.key)){i[n.key]&&(n.destroy(),e=!0);break}t++}e||r.value.splice(t,1)}return r.value.push(c),c}let c=[`info`,`success`,`warning`,`error`].map(e=>t=>s(Object.assign(Object.assign({},t),{type:e})));function l(e){a.delete(e),r.value.splice(r.value.findIndex(t=>t.key===e),1)}let u=b(`Notification`,`-notification`,Z,H,e,n),d={create:s,info:c[0],success:c[1],warning:c[2],error:c[3],open:m,destroyAll:h},p=f(0);t($,d),t(U,{props:e,mergedClsPrefixRef:n,mergedThemeRef:u,wipTransitionCountRef:p});function m(e){return s(e)}function h(){Object.values(r.value).forEach(e=>{e.hide()})}return Object.assign({mergedClsPrefix:n,notificationList:r,notificationRefs:i,handleAfterLeave:l},d)},render(){var e,t,n;let{placement:r}=this;return s(l,null,(t=(e=this.$slots).default)==null?void 0:t.call(e),this.notificationList.length?s(c,{to:(n=this.to)==null?`body`:n},s(W,{class:this.containerClass,style:this.containerStyle,scrollable:this.scrollable&&r!==`top`&&r!==`bottom`,placement:r},{default:()=>this.notificationList.map(e=>s(X,Object.assign({ref:t=>{let n=e.key;t===null?delete this.notificationRefs[n]:this.notificationRefs[n]=t}},N(e,[`destroy`,`hide`,`deactivate`]),{internalKey:e.key,onInternalAfterLeave:this.handleAfterLeave,keepAliveOnHover:e.keepAliveOnHover===void 0?this.keepAliveOnHover:e.keepAliveOnHover})))})):null)}});function te(){let e=i($,null);return e===null&&D(`use-notification`,"No outer `n-notification-provider` found."),e}export{V as i,ee as n,H as r,te as t};