!function(){var e={149:function(e,t,n){var s;!function(t){"use strict";var i=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(e){return setTimeout(e,16)};function o(){var e=this;e.reads=[],e.writes=[],e.raf=i.bind(t)}function r(e){e.scheduled||(e.scheduled=!0,e.raf(a.bind(null,e)))}function a(e){var t,n=e.writes,s=e.reads;try{s.length,e.runTasks(s),n.length,e.runTasks(n)}catch(e){t=e}if(e.scheduled=!1,(s.length||n.length)&&r(e),t){if(t.message,!e.catch)throw t;e.catch(t)}}function l(e,t){var n=e.indexOf(t);return!!~n&&!!e.splice(n,1)}o.prototype={constructor:o,runTasks:function(e){for(var t;t=e.shift();)t()},measure:function(e,t){var n=t?e.bind(t):e;return this.reads.push(n),r(this),n},mutate:function(e,t){var n=t?e.bind(t):e;return this.writes.push(n),r(this),n},clear:function(e){return l(this.reads,e)||l(this.writes,e)},extend:function(e){if("object"!=typeof e)throw new Error("expected object");var t=Object.create(this);return function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}(t,e),t.fastdom=this,t.initialize&&t.initialize(),t},catch:null};var c=t.fastdom=t.fastdom||new o;void 0===(s=function(){return c}.call(c,n,c,e))||(e.exports=s)}("undefined"!=typeof window?window:this)},788:function(e,t,n){"use strict";e.exports=n.p+"9c8da33492eac4b88f04.jpg"}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s].call(o.exports,o,o.exports,n),o.exports}n.p="/wp-content/themes/alley-interactive-2023/client/build/",function(){"use strict";class e{constructor(e){this.element=e.element,this.started=!1,this.name=e.name,this.options=e.options||{},this.children=e.children||{},e.querySelector&&Object.keys(e.querySelector).forEach((t=>{this.children[t]=this.element.querySelector(e.querySelector[t])})),e.querySelectorAll&&Object.keys(e.querySelectorAll).forEach((t=>{this.children[t]=this.element.querySelectorAll(e.querySelectorAll[t])}))}destroy(){this.element.parentNode.removeChild(this.element)}getOffsetTop(e,t){return t===e?0:e.offsetTop+this.getOffsetTop(e.parentElement,t)}static isChild(e,t){if(e){let n=e.parentNode;for(;n;){if(n===t)return!0;n=n.parentNode}}return!1}}var t=function(e,t){let n=!1;const s=[],i=function(){s.length&&!n&&(n=!0,s.shift().call(),setTimeout((()=>{n=!1,i()}),t))};return function(){s.push(e.bind(this,...arguments)),i()}};function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n(149),n(788);var i={name:"siteHeader",class:class extends e{constructor(e){super(e),s(this,"setupEvents",(()=>{const{modalCloseBtn:e,navToggle:t}=this.children;t&&(t.addEventListener("click",(e=>{this.handleMenuClick(e)})),e.addEventListener("click",(e=>{this.handleMenuClick(e)})),this.setModalKeyTrap(),this.setHotKeys())})),s(this,"setupA11y",(()=>{const{navToggle:e,modalCloseBtn:t}=this.children;e.setAttribute("aria-expanded","false"),e.setAttribute("aria-controls","js-site-header__modal"),t.setAttribute("aria-controls","js-site-header__modal"),t.setAttribute("aria-expanded","false"),this.focusableElements.forEach((e=>{e.setAttribute("tabindex","-1")}))})),s(this,"handleMenuClick",(e=>{e.preventDefault();const{siteHeaderModal:t}=this.children;t.classList.contains("is-open")?this.closeMenu():this.openMenu()})),s(this,"openMenu",(()=>{const{navToggle:e,siteHeaderModal:t,modalCloseBtn:n}=this.children;t.classList.add("is-open"),t.setAttribute("aria-hidden","false"),e.setAttribute("aria-expanded","true"),n.setAttribute("aria-expanded","true"),this.focusableElements.forEach((e=>{e.setAttribute("tabindex","0")})),this.focusableElements[0].focus()})),s(this,"closeMenu",(()=>{const{navToggle:e,siteHeaderModal:t,modalCloseBtn:n}=this.children;t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"),e.setAttribute("aria-expanded","false"),n.setAttribute("aria-expanded","false"),this.focusableElements.forEach((e=>{e.setAttribute("tabindex","-1")})),e.focus()})),s(this,"getFocusableElements",(()=>{const{siteHeaderModal:e}=this.children;return Array.from(e.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'))})),s(this,"setModalKeyTrap",(()=>{const{siteHeaderModal:e}=this.children;e.addEventListener("keydown",(t=>{if(!e.classList.contains("is-open"))return;const n=this.focusableElements[0],s=this.focusableElements[this.focusableElements.length-1];"Tab"!==t.key&&9!==t.keyCode||(t.shiftKey?document.activeElement===n&&(t.preventDefault(),s.focus()):document.activeElement===s&&(t.preventDefault(),n.focus()))}))})),s(this,"setHotKeys",(()=>{const{siteHeaderModal:e}=this.children;e.addEventListener("keydown",(e=>{"Escape"!==e.key&&27!==e.keyCode||this.closeMenu()}))})),this.offset=this.options.offset,this.navToggle=this.options.navToggle,this.siteHeaderModal=this.options.siteHeaderModal,this.modalCloseBtn=this.options.modalCloseBtn,this.focusableElements=this.getFocusableElements(),this.setupEvents(),this.setupA11y()}},querySelector:{navToggle:".js-site-header-nav-toggle",siteHeaderModal:"#js-site-header__modal",modalCloseBtn:".js-site-header__modal-close"},querySelectorAll:{},options:{}};const o=new class{constructor(e){window[e]=window[e]?window[e]:{components:{}},window.jsComponentFrameworkLimiter=window.jsComponentFrameworkLimiter?window.jsComponentFrameworkLimiter:t,this.manifest=window[e],this.limiter=window.jsComponentFrameworkLimiter}initComponents(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;(Array.isArray(e)?e:[e]).forEach(this.limiter((e=>this.initComponent(e,t)),500))}initComponent(t,n){const s=t.name,i=t.class;if(i.prototype instanceof e){const e=Object.keys(this.manifest.components).includes(s),o=n.querySelectorAll("[data-component='".concat(s,"']"));if(!o.length)return void console.info('No elements found for data-component="'.concat(s,'"'));e||(this.manifest.components[s]={config:t,instances:[]}),Array.prototype.forEach.call(o,(e=>{const n=this.manifest.components[s].instances.some((t=>e.isSameNode(t.element)));if(n)return;const o=t;o.element=e;const r=new i(o);this.manifest.components[s].instances.push({instance:r,element:e})}))}}reinitComponent(e,t){const n=this.manifest.components[e].config;n&&this.initComponents([n],t)}static callComponentMethod(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];this.manifest[e]&&this.manifest[e].instances&&this.manifest[e].instances.forEach((e=>{"function"==typeof e[t]&&e[t].call(e,...n)}))}}("alley-2023");document.addEventListener("DOMContentLoaded",(()=>{o.initComponents([i])}))}()}();
//# sourceMappingURL=global.bundle.min.js.map