/* Shared MyTyles volume section navigation: scrollspy, active state, mobile menu */
(function(){'use strict';
const sidebar=document.querySelector('.sidebar');if(!sidebar)return;
const toc=sidebar.querySelector('[data-volume-toc]');if(!toc)return;
const links=[...toc.querySelectorAll('a[href^="#"]')];
const entries=links.map(link=>({link,target:document.getElementById(decodeURIComponent(link.hash.slice(1)))})).filter(x=>x.target);
if(!entries.length)return;
let requested=null,raf=false;
function update(){raf=false;let active=entries[0];for(const item of entries){if(item.target.getClientRects().length&&item.target.getBoundingClientRect().top<=165)active=item}
if(requested){const found=entries.find(x=>x.link.hash===requested);if(found&&Math.abs(found.target.getBoundingClientRect().top)>200)active=found;else requested=null}
for(const {link} of entries){const isActive=link===active.link;link.classList.toggle('active',isActive);if(isActive)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')}
}
function schedule(){if(!raf){raf=true;requestAnimationFrame(update)}}
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});window.addEventListener('hashchange',()=>{requested=null;schedule()});
for(const {link} of entries)link.addEventListener('click',()=>{requested=link.hash;schedule()});
// LinkedIn Strategy already supplies its own mobile menu; preserve it.
if(!document.getElementById('menuBtn')){
document.body.classList.add('playbook-shared-mobile');const btn=document.createElement('button');btn.type='button';btn.className='playbook-menu';btn.setAttribute('aria-label','Open volume navigation');btn.setAttribute('aria-expanded','false');btn.textContent='☰  Contents';const topbar=document.querySelector('.topbar,.top,.topnav,.mobilebrand,header');if(topbar)topbar.prepend(btn);else{btn.style.cssText='position:fixed;top:12px;right:12px;z-index:1000';document.body.append(btn)}
const overlay=document.createElement('div');overlay.className='playbook-overlay';document.body.append(overlay);
function close(){sidebar.classList.remove('open');overlay.classList.remove('show');btn.setAttribute('aria-expanded','false')}
btn.addEventListener('click',()=>{const opened=sidebar.classList.toggle('open');overlay.classList.toggle('show',opened);btn.setAttribute('aria-expanded',String(opened))});overlay.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});toc.addEventListener('click',e=>{if(e.target.closest('a'))close()});
}
update();
})();
