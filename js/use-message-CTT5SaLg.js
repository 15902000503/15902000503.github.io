import{Sn as e,_n as t,bn as n,sn as r}from"../jse/index-index-_SvYlc06.js";import{B as i,F as a,G as o,I as s,L as c,R as l,U as u,V as d,W as f,j as p,n as m}from"./use-theme-5NPw1J3_.js";import{t as h}from"./use-rtl-BE_mgN8z.js";import{t as g}from"./Scrollbar-DlYFQb5A.js";import{r as _}from"./css-BCm6yWvQ.js";import{i as v,n as y,t as b}from"./light-DTYIu0LP.js";import{n as x,o as S,s as C}from"./use-form-item-CRPWN-GH.js";import{t as w}from"./keysOf-nSrwPlrn.js";import{t as T}from"./Close-Dp06J0hr.js";var E={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function D(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},E),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var O={name:`Card`,common:b,self:D},k=l(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),A=c([l(`card`,`
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[s({background:`var(--n-color-modal)`}),d(`hoverable`,[c(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),d(`content-segmented`,[c(`>`,[l(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),i(`content-scrollbar`,[c(`>`,[l(`scrollbar-container`,[c(`>`,[l(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),d(`content-soft-segmented`,[c(`>`,[l(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),i(`content-scrollbar`,[c(`>`,[l(`scrollbar-container`,[c(`>`,[l(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),d(`footer-segmented`,[c(`>`,[i(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),d(`footer-soft-segmented`,[c(`>`,[i(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),c(`>`,[l(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[i(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),i(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),i(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),i(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),k,l(`card-content`,[c(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),i(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[c(`>`,[l(`scrollbar-container`,[c(`>`,[k])])]),c(`&:first-child >`,[l(`scrollbar-container`,[c(`>`,[l(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),i(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[c(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),i(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),l(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[c(`img`,`
 display: block;
 width: 100%;
 `)]),d(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[c(`&:target`,`border-color: var(--n-color-target);`)]),d(`action-segmented`,[c(`>`,[i(`action`,[c(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),d(`content-segmented, content-soft-segmented`,[c(`>`,[l(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[c(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),i(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[c(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),d(`footer-segmented, footer-soft-segmented`,[c(`>`,[i(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[c(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),d(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),f(l(`card`,`
 background: var(--n-color-modal);
 `,[d(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),o(l(`card`,`
 background: var(--n-color-popover);
 `,[d(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),j={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},M=w(j),N=t({name:`Card`,props:Object.assign(Object.assign({},m.props),j),slots:Object,setup(e){let t=()=>{let{onClose:t}=e;t&&C(t)},{inlineThemeDisabled:n,mergedClsPrefixRef:i,mergedRtlRef:a,mergedComponentPropsRef:o}=p(e),s=m(`Card`,`-card`,A,O,e,i),c=h(`Card`,a,i),l=r(()=>{var t,n;return e.size||((n=(t=o==null?void 0:o.value)==null?void 0:t.Card)==null?void 0:n.size)||`medium`}),d=r(()=>{let e=l.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:o,borderColor:c,actionColor:d,borderRadius:f,lineHeight:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:v,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[u(`padding`,e)]:O,[u(`fontSize`,e)]:k,[u(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=s.value,{top:M,left:N,bottom:P}=_(O);return{"--n-bezier":j,"--n-border-radius":f,"--n-color":t,"--n-color-modal":n,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":r,"--n-text-color":i,"--n-line-height":p,"--n-action-color":d,"--n-title-text-color":a,"--n-title-font-weight":o,"--n-close-icon-color":m,"--n-close-icon-color-hover":h,"--n-close-icon-color-pressed":g,"--n-close-color-hover":v,"--n-close-color-pressed":y,"--n-border-color":c,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),f=n?y(`card`,r(()=>l.value[0]),d,e):void 0;return{rtlEnabled:c,mergedClsPrefix:i,mergedTheme:s,handleCloseClick:t,cssVars:n?void 0:d,themeClass:f==null?void 0:f.themeClass,onRender:f==null?void 0:f.onRender}},render(){let{segmented:e,bordered:t,hoverable:r,mergedClsPrefix:i,rtlEnabled:a,onRender:o,embedded:s,tag:c,$slots:l}=this;return o==null||o(),n(c,{class:[`${i}-card`,this.themeClass,s&&`${i}-card--embedded`,{[`${i}-card--rtl`]:a,[`${i}-card--content-scrollable`]:this.contentScrollable,[`${i}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${i}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${i}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${i}-card--bordered`]:t,[`${i}-card--hoverable`]:r}],style:this.cssVars,role:this.role},S(l.cover,e=>{let t=this.cover?x([this.cover()]):e;return t&&n(`div`,{class:`${i}-card-cover`,role:`none`},t)}),S(l.header,e=>{let{title:t}=this,r=t?x(typeof t==`function`?[t()]:[t]):e;return r||this.closable?n(`div`,{class:[`${i}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},n(`div`,{class:`${i}-card-header__main`,role:`heading`},r),S(l[`header-extra`],e=>{let t=this.headerExtra?x([this.headerExtra()]):e;return t&&n(`div`,{class:[`${i}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&n(T,{clsPrefix:i,class:`${i}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),S(l.default,e=>{let{content:t}=this,r=t?x(typeof t==`function`?[t()]:[t]):e;return r?this.contentScrollable?n(g,{class:`${i}-card__content-scrollbar`,contentClass:[`${i}-card-content`,this.contentClass],contentStyle:this.contentStyle},r):n(`div`,{class:[`${i}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},r):null}),S(l.footer,e=>{let t=this.footer?x([this.footer()]):e;return t&&n(`div`,{class:[`${i}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),S(l.action,e=>{let t=this.action?x([this.action()]):e;return t&&n(`div`,{class:`${i}-card__action`,role:`none`},t)}))}}),P=a(`n-message-api`),F=a(`n-message-provider`);function I(){let t=e(P,null);return t===null&&v(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),t}export{M as a,D as c,N as i,P as n,j as o,F as r,O as s,I as t};