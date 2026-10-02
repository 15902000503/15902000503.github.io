import{n as e}from"./chunk-BOhHC3M6.js";import{In as t,Sn as n,_n as r,bn as i,fr as a,sn as o,sr as s}from"../jse/index-index-B2FSYgnh.js";import{B as c,F as l,G as u,L as d,R as f,U as p,V as m,W as h,j as g,n as _}from"./use-theme-M9daym8h.js";import{t as v}from"./use-rtl-De6CBx5Q.js";import{n as y}from"./light-HTQcNbc3.js";import{t as b}from"./misc-B5EK0Bqt.js";import{n as x}from"./delegate-B43BbCoW.js";import{t as S}from"./use-memo-BzaRfIeA.js";import{t as C}from"./use-merged-state-COlkbaMc.js";import{n as w,t as T}from"./icon-switch.cssr--6r5lx_0.js";import{o as E,s as D,t as O}from"./use-form-item-BU2GQwKM.js";import{t as k}from"./light-D3XRUOMp.js";var A=l(`n-checkbox-group`),j=r({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:n}=g(e),r=O(e),{mergedSizeRef:i,mergedDisabledRef:c}=r,l=s(e.defaultValue),u=C(o(()=>e.value),l),d=o(()=>{var e;return((e=u.value)==null?void 0:e.length)||0}),f=o(()=>Array.isArray(u.value)?new Set(u.value):new Set);function p(t,n){let{nTriggerFormInput:i,nTriggerFormChange:a}=r,{onChange:o,"onUpdate:value":s,onUpdateValue:c}=e;if(Array.isArray(u.value)){let e=Array.from(u.value),r=e.findIndex(e=>e===n);t?~r||(e.push(n),c&&D(c,e,{actionType:`check`,value:n}),s&&D(s,e,{actionType:`check`,value:n}),i(),a(),l.value=e,o&&D(o,e)):~r&&(e.splice(r,1),c&&D(c,e,{actionType:`uncheck`,value:n}),s&&D(s,e,{actionType:`uncheck`,value:n}),o&&D(o,e),l.value=e,i(),a())}else t?(c&&D(c,[n],{actionType:`check`,value:n}),s&&D(s,[n],{actionType:`check`,value:n}),o&&D(o,[n]),l.value=[n],i(),a()):(c&&D(c,[],{actionType:`uncheck`,value:n}),s&&D(s,[],{actionType:`uncheck`,value:n}),o&&D(o,[]),l.value=[],i(),a())}return t(A,{checkedCountRef:d,maxRef:a(e,`max`),minRef:a(e,`min`),valueSetRef:f,disabledRef:c,mergedSizeRef:i,toggleCheckbox:p}),{mergedClsPrefix:n}},render(){return i(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),M=()=>i(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},i(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),N=()=>i(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},i(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),P=d([f(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[m(`show-label`,`line-height: var(--n-label-line-height);`),d(`&:hover`,[f(`checkbox-box`,[c(`border`,`border: var(--n-border-checked);`)])]),d(`&:focus:not(:active)`,[f(`checkbox-box`,[c(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),m(`inside-table`,[f(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),m(`checked`,[f(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[f(`checkbox-icon`,[d(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),m(`indeterminate`,[f(`checkbox-box`,[f(`checkbox-icon`,[d(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),d(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),m(`checked, indeterminate`,[d(`&:focus:not(:active)`,[f(`checkbox-box`,[c(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),f(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[c(`border`,{border:`var(--n-border-checked)`})])]),m(`disabled`,{cursor:`not-allowed`},[m(`checked`,[f(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[c(`border`,{border:`var(--n-border-disabled-checked)`}),f(`checkbox-icon`,[d(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),f(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[c(`border`,`
 border: var(--n-border-disabled);
 `),f(`checkbox-icon`,[d(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),c(`label`,`
 color: var(--n-text-color-disabled);
 `)]),f(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),f(`checkbox-box`,`
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `,[c(`border`,`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `),f(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[d(`.check-icon, .line-icon`,`
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `),T({left:`1px`,top:`1px`})])]),c(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[d(`&:empty`,{display:`none`})])]),h(f(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),u(f(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),F=r({name:`Checkbox`,props:Object.assign(Object.assign({},_.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),setup(e){let t=n(A,null),r=s(null),{mergedClsPrefixRef:i,inlineThemeDisabled:c,mergedRtlRef:l,mergedComponentPropsRef:u}=g(e),d=s(e.defaultChecked),f=C(a(e,`checked`),d),m=S(()=>{if(t){let n=t.valueSetRef.value;return n&&e.value!==void 0?n.has(e.value):!1}else return f.value===e.checkedValue}),h=O(e,{mergedSize(n){var r,i;let{size:a}=e;if(a!==void 0)return a;if(t){let{value:e}=t.mergedSizeRef;if(e!==void 0)return e}if(n){let{mergedSize:e}=n;if(e!==void 0)return e.value}return((i=(r=u==null?void 0:u.value)==null?void 0:r.Checkbox)==null?void 0:i.size)||`medium`},mergedDisabled(n){let{disabled:r}=e;if(r!==void 0)return r;if(t){if(t.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:n}=t;if(e!==void 0&&n.value>=e&&!m.value)return!0;let{minRef:{value:r}}=t;if(r!==void 0&&n.value<=r&&m.value)return!0}return n?n.disabled.value:!1}}),{mergedDisabledRef:x,mergedSizeRef:w}=h,T=_(`Checkbox`,`-checkbox`,P,k,e,i);function E(n){if(t&&e.value!==void 0)t.toggleCheckbox(!m.value,e.value);else{let{onChange:t,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=h,s=m.value?e.uncheckedValue:e.checkedValue;r&&D(r,s,n),i&&D(i,s,n),t&&D(t,s,n),a(),o(),d.value=s}}function j(e){x.value||E(e)}function M(e){if(!x.value)switch(e.key){case` `:case`Enter`:E(e)}}function N(e){switch(e.key){case` `:e.preventDefault()}}let F={focus:()=>{var e;(e=r.value)==null||e.focus()},blur:()=>{var e;(e=r.value)==null||e.blur()}},I=v(`Checkbox`,l,i),L=o(()=>{let{value:e}=w,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:m,borderChecked:h,boxShadowFocus:g,textColor:_,textColorDisabled:v,checkMarkColorDisabledChecked:y,colorDisabledChecked:b,borderDisabledChecked:x,labelPadding:S,labelLineHeight:C,labelFontWeight:E,[p(`fontSize`,e)]:D,[p(`size`,e)]:O}}=T.value;return{"--n-label-line-height":C,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":h,"--n-border-focus":f,"--n-border-disabled":m,"--n-border-disabled-checked":x,"--n-box-shadow-focus":g,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":b,"--n-text-color":_,"--n-text-color-disabled":v,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":y,"--n-font-size":D,"--n-label-padding":S}}),R=c?y(`checkbox`,o(()=>w.value[0]),L,e):void 0;return Object.assign(h,F,{rtlEnabled:I,selfRef:r,mergedClsPrefix:i,mergedDisabled:x,renderedChecked:m,mergedTheme:T,labelId:b(),handleClick:j,handleKeyUp:M,handleKeyDown:N,cssVars:c?void 0:L,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:a,privateInsideTable:o,cssVars:s,labelId:c,label:l,mergedClsPrefix:u,focusable:d,handleKeyUp:f,handleKeyDown:p,handleClick:m}=this;(e=this.onRender)==null||e.call(this);let h=E(t.default,e=>l||e?i(`span`,{class:`${u}-checkbox__label`,id:c},l||e):null);return i(`div`,{ref:`selfRef`,class:[`${u}-checkbox`,this.themeClass,this.rtlEnabled&&`${u}-checkbox--rtl`,n&&`${u}-checkbox--checked`,r&&`${u}-checkbox--disabled`,a&&`${u}-checkbox--indeterminate`,o&&`${u}-checkbox--inside-table`,h&&`${u}-checkbox--show-label`],tabindex:r||!d?void 0:0,role:`checkbox`,"aria-checked":a?`mixed`:n,"aria-labelledby":c,style:s,onKeyup:f,onKeydown:p,onClick:m,onMousedown:()=>{x(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},i(`div`,{class:`${u}-checkbox-box-wrapper`},`\xA0`,i(`div`,{class:`${u}-checkbox-box`},i(w,null,{default:()=>this.indeterminate?i(`div`,{key:`indeterminate`,class:`${u}-checkbox-icon`},N()):i(`div`,{key:`check`,class:`${u}-checkbox-icon`},M())}),i(`div`,{class:`${u}-checkbox-box__border`}))),h)}}),I=e({NCheckbox:()=>F,NCheckboxGroup:()=>j});export{F as n,j as r,I as t};