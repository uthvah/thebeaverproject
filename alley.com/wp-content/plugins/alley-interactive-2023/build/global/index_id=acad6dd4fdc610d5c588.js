!function(){"use strict";const t={"animate-block--fade-in-up":"animate__fadeInUp","animate-block--fade-in-down":"animate__fadeInDown","animate-block--fade-in-left":"animate__fadeInLeft","animate-block--fade-in-right":"animate__fadeInRight"},e=new IntersectionObserver((e=>{e.forEach((e=>{if(e.target instanceof HTMLElement)if((t=>{const e=t.boundingClientRect;return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)})(e)||e.boundingClientRect.top<0)e.target.dataset.noAnimate="true";else if(e.boundingClientRect.top>0&&e.target.classList.add("animate-block--hide"),e.isIntersecting&&!e.target.dataset.noAnimate){const n=(e=>{const n=Array.from(e.classList);let a="";return Object.keys(t).forEach((e=>{n.includes(e)&&(a=t[e])})),a})(e.target);e.target.classList.add("animate__animated",n),e.target.classList.remove("animate-block--hide")}}))}),{threshold:0});document.addEventListener("DOMContentLoaded",(()=>{!function(){const t=document.querySelectorAll(".animate-block");t.length<1||t.forEach((t=>{e.observe(t)}))}(),(()=>{const t=document.querySelectorAll(".wp-block-alley-interactive-2023-accordion");0!==t.length&&Array.from(t).forEach((t=>{const e=t.querySelector(".accordion__button"),n=e.getAttribute("id"),a=t.querySelector(".accordion__content"),i=a.getAttribute("id");e.setAttribute("aria-controls",i),a.setAttribute("aria-labelledby",n),a.setAttribute("aria-hidden","true"),e.addEventListener("click",(()=>{t.classList.contains("is-open")?(t.classList.remove("is-open"),e.setAttribute("aria-expanded","false"),a.setAttribute("aria-hidden","true")):(t.classList.add("is-open"),e.setAttribute("aria-expanded","true"),a.setAttribute("aria-hidden","false"))}))}))})()}))}();