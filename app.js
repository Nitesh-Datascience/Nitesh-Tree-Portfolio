(() => {
  'use strict';
  const config = window.PORTFOLIO;
  if (!config || !Array.isArray(config.projects)) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const NS = 'http://www.w3.org/2000/svg';
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const safeURL = value => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : '#'; } catch { return '#'; } };
  const svgEl = (name, attributes, parent) => {
    const element = document.createElementNS(NS, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    if (parent) parent.append(element);
    return element;
  };
  let seed = 7142;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const between = (min, max) => min + random() * (max - min);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let toastTimer;
  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove('is-visible'), 3200);
  }
  $$('[data-name]').forEach(el => { el.textContent = config.name; });
  $$('[data-github]').forEach(el => { el.href = safeURL(config.github); });
  document.title = config.title;
  $('#year').textContent = String(new Date().getFullYear());

  // Project illustrations use sample shapes, never claimed performance metrics.
  function plot(type) {
    const grid = '<path d="M15 27h140M15 52h140M15 77h140M15 102h140" stroke="#dfe5d5" stroke-width=".7"/>';
    if (type === 'learning') return `<svg viewBox="0 0 170 130" aria-hidden="true"><circle cx="85" cy="64" r="41" fill="none" stroke="#e0e5ce" stroke-width="15"/><circle cx="85" cy="64" r="41" fill="none" stroke="#a4b482" stroke-width="15" stroke-dasharray="125 258" transform="rotate(-90 85 64)"/><circle cx="85" cy="64" r="41" fill="none" stroke="#e1bc57" stroke-width="15" stroke-dasharray="70 258" stroke-dashoffset="-132" transform="rotate(-90 85 64)"/><path d="m74 64 8 8 17-19" fill="none" stroke="#8b9a71" stroke-width="3"/><circle cx="140" cy="24" r="3" fill="#dcb959"/></svg>`;
    if (type === 'fraud') return `<svg viewBox="0 0 170 130" aria-hidden="true">${grid}<path d="M15 104 30 86 45 88 60 62 75 71 90 34 105 57 120 42 135 67 155 20" fill="none" stroke="#adbc98" stroke-width="2"/><circle cx="90" cy="34" r="6" fill="#e59a7f" stroke="#fafbf5" stroke-width="2"/><circle cx="155" cy="20" r="6" fill="#df8068" stroke="#fafbf5" stroke-width="2"/><path d="m155 31-12 20" stroke="#df8068" stroke-width="1" stroke-dasharray="2 2"/></svg>`;
    if (type === 'churn') return `<svg viewBox="0 0 170 130" aria-hidden="true">${grid}<g fill="#a9bdd3"><rect x="24" y="62" width="13" height="40" rx="2"/><rect x="53" y="44" width="13" height="58" rx="2"/><rect x="82" y="33" width="13" height="69" rx="2"/><rect x="111" y="49" width="13" height="53" rx="2"/><rect x="140" y="21" width="13" height="81" rx="2"/></g><path d="M30 45Q72 18 90 24T146 15" fill="none" stroke="#758f70" stroke-width="2"/><circle cx="146" cy="15" r="3" fill="#758f70"/></svg>`;
    return `<svg viewBox="0 0 170 130" aria-hidden="true">${grid}<path d="M15 100C40 95 35 64 61 69S84 48 104 54 128 31 155 22L155 103H15Z" fill="#e0e8d1"/><path d="M15 100C40 95 35 64 61 69S84 48 104 54 128 31 155 22" fill="none" stroke="#9eb37d" stroke-width="2.5"/><g fill="#fafbf5" stroke="#8ea56d" stroke-width="2"><circle cx="61" cy="69" r="4"/><circle cx="104" cy="54" r="4"/><circle cx="155" cy="22" r="4"/></g></svg>`;
  }
  function artwork(project, extra = '') {
    const names = {learning:'A learning journey',fraud:'Patterns worth a closer look',churn:'Understanding retention',care:'Following the care journey'};
    return `<div class="project-art ${escape(project.color)} ${extra}"><span class="art-label">${escape(project.label.toUpperCase())}</span><span class="art-number">${escape(project.number)}</span><div class="preview-window"><div class="preview-top"><i></i><i></i><i></i><span>${escape(project.title)}</span></div><div class="preview-body"><div class="preview-side"><strong>${escape(names[project.art] || 'Explore the data')}</strong><span class="preview-line"></span><span class="preview-line short"></span><span class="preview-chip">Explore the patterns ↗</span><span class="preview-line"></span></div><div class="preview-plot">${plot(project.art)}</div></div></div><span class="art-caption">ILLUSTRATIVE PROJECT PREVIEW</span></div>`;
  }
  const grid = $('#project-grid');
  config.projects.forEach(project => {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.dataset.category = project.category;
    article.innerHTML = `<button class="project-button" type="button" data-project="${escape(project.id)}" aria-label="Explore ${escape(project.title)}">${artwork(project)}<div class="project-meta"><div><span class="project-category">${escape(project.label)}</span><h3>${escape(project.title)}</h3></div><span class="project-arrow" aria-hidden="true">↗</span></div><p class="project-subtitle">${escape(project.subtitle)}</p></button>`;
    grid.append(article);
  });
  $('.filter-button[data-filter="all"] span').textContent = String(config.projects.length).padStart(2, '0');
  $$('.filter-button').forEach(button => button.addEventListener('click', () => {
    $$('.filter-button').forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    $$('.project-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  }));

  const dialog = $('#project-dialog');
  let previousFocus;
  function openProject(id, trigger) {
    previousFocus = trigger || document.activeElement;
    const project = config.projects.find(item => item.id === id);
    if (project) {
      $('#dialog-content').innerHTML = `${artwork(project, 'dialog-art')}<div class="dialog-body"><span class="project-category">${escape(project.label)} / ${escape(project.number)}</span><h2 id="dialog-title">${escape(project.title)}</h2><p class="dialog-description">${escape(project.description)}</p><p class="dialog-question">${escape(project.question)}</p><h3>The project approach</h3><ul>${project.approach.map(step => `<li>${escape(step)}</li>`).join('')}</ul><div class="skills">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div><div class="dialog-actions"><a class="primary-button" href="${safeURL(project.url)}" target="_blank" rel="noopener noreferrer">Open project <span aria-hidden="true">↗</span></a><a class="text-link" href="${safeURL(config.github)}" target="_blank" rel="noopener noreferrer">My GitHub <span aria-hidden="true">↗</span></a></div></div>`;
    } else if (id === 'github') {
      $('#dialog-content').innerHTML = `<div class="dialog-body"><span class="project-category">THE EXPERIMENTAL BRANCH</span><h2 id="dialog-title">There’s more growing here.</h2><p class="dialog-description">New ideas, learning projects, and experiments live on my GitHub. Follow along as this little garden keeps growing.</p><div class="skills"><span>Python</span><span>SQL</span><span>Data analytics</span><span>AI &amp; ML</span></div><a class="primary-button" href="${safeURL(config.github)}" target="_blank" rel="noopener noreferrer">Explore GitHub <span aria-hidden="true">↗</span></a></div>`;
    } else return;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    $('.dialog-close').focus();
  }
  function closeProject() { dialog.close(); }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project]');
    if (trigger) openProject(trigger.dataset.project, trigger);
  });
  $('.dialog-close').addEventListener('click', closeProject);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
  });

  // The hand-drawn tree is built from seeded curves; no image assets or network required.
  const branches = $('#branches');
  const leaves = $('#botanical-leaves');
  const twigTips = [];
  const branchData = [
    [550,405,545,339,555,250,549,196,11],
    [550,345,511,341,464,336,416,306,4.3],
    [550,324,503,311,458,292,428,258,4.7],
    [551,306,591,304,638,286,676,253,4.4],
    [550,283,587,262,621,227,646,194,4],
    [551,271,510,245,477,194,459,155,4.7],
    [551,260,548,213,528,167,514,127,4.5],
    [551,246,581,204,586,157,599,117,3.9],
    [550,237,554,188,565,141,559,91,3.1],
    [551,366,588,366,619,359,643,342,2.4],
    [549,362,520,367,487,361,462,350,2.8],
    [550,298,516,291,498,260,487,235,2.4]
  ];
  branchData.forEach(([x,y,c1x,c1y,c2x,c2y,ex,ey,width]) => {
    svgEl('path',{d:`M${x} ${y}C${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey}`,fill:'none',stroke:'url(#trunk-ink)','stroke-width':width,'stroke-linecap':'round'},branches);
    twigTips.push({x:ex,y:ey});
    for (let i=0;i<3;i++) {
      const t = .47 + i*.2;
      const u = 1-t;
      const bx = u*u*u*x+3*u*u*t*c1x+3*u*t*t*c2x+t*t*t*ex;
      const by = u*u*u*y+3*u*u*t*c1y+3*u*t*t*c2y+t*t*t*ey;
      const direction = i%2 ? 1 : -1;
      const length = between(15,31);
      const tx = bx + direction*length;
      const ty = by - between(14,38);
      svgEl('path',{d:`M${bx.toFixed(1)} ${by.toFixed(1)}Q${(bx+direction*length*.7).toFixed(1)} ${(by-3).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`,fill:'none',stroke:'#42483a','stroke-width':between(.7,1.25).toFixed(2),'stroke-linecap':'round'},branches);
      twigTips.push({x:tx,y:ty});
      if (i===2) {
        const sx = tx-direction*8, sy = ty-13;
        svgEl('path',{d:`M${tx} ${ty}q${-direction*6}-8 ${-direction*8}-18`,fill:'none',stroke:'#60674c','stroke-width':.7},branches);
        twigTips.push({x:sx,y:sy});
      }
    }
  });
  svgEl('path',{d:'M544 406Q548 368 548 347L553 347Q551 378 557 406Q551 410 544 406Z',fill:'#23291f'},branches);
  const leafColors = ['#b5ad43','#77995b','#bd7864','#647fb5','#a78fbb','#69a79f','#858f72'];
  const alphabet = ['P','Y','S','Q','L','E','X','D','A','I','M','B','R','O','C','T','+','{','}','↗'];
  twigTips.forEach((tip,index) => {
    const angle = between(-120,120);
    const group=svgEl('g',{transform:`translate(${tip.x} ${tip.y}) rotate(${angle})`},leaves);
    if(index%4===0) {
      svgEl('path',{d:'M0 2Q-6-4-3-12Q5-9 0 2Z',fill:'none',stroke:'#7b875f','stroke-width':.65,opacity:.6},group);
    } else {
      const letter=svgEl('text',{x:0,y:-3,'font-family':'Georgia, serif','font-size':between(7,11).toFixed(1),fill:leafColors[index%leafColors.length],opacity:between(.4,.7)},group);
      letter.textContent=alphabet[index%alphabet.length];
    }
  });
  // Tiny letters and open rings echo the reference's sparse, typographic canopy.
  for(let i=0;i<80;i++) {
    const angle=between(0,Math.PI*2), radius=Math.sqrt(random());
    const x=550+Math.cos(angle)*between(105,170)*radius;
    const y=220+Math.sin(angle)*between(100,150)*radius;
    const group=svgEl('g',{transform:`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${between(-100,100).toFixed(1)})`,opacity:between(.35,.68).toFixed(2)},leaves);
    const type=i%6;
    const stroke=['#91a568','#b6b874','#94a9b8','#c4a27e','#b7a5b6','#899077'][type];
    if(type===0) {
      const letter=svgEl('text',{'font-family':'Georgia, serif','font-size':between(8,13).toFixed(1),fill:stroke},group);
      letter.textContent=alphabet[i%alphabet.length];
    }
    else if(type===1) svgEl('path',{d:'M0-7 2-2 7 0 2 2 0 7-2 2-7 0-2-2Z',fill:'none',stroke,'stroke-width':.9},group);
    else if(type===2) svgEl('circle',{r:between(2,5).toFixed(1),fill:'none',stroke,'stroke-width':.8},group);
    else if(type===3) svgEl('path',{d:'M-4-3Q2-10 5-3T0 5Q-6 3-4-3Z',fill:'none',stroke,'stroke-width':.8},group);
    else if(type===4) svgEl('path',{d:'M-4 0h8M0-4v8',fill:'none',stroke,'stroke-width':1},group);
    else svgEl('path',{d:'M-3 5Q-9-7 3-5Q8 2-3 5Z',fill:'none',stroke,'stroke-width':.7},group);
  }

  function fruitSVG(project) {
    const gradient=`fruit-gradient-${project.id}`;
    const glyph={edupro:'E',fraud:'F',churn:'C',care:'+',github:'{ }'}[project.id] || '✳';
    return `<svg viewBox="0 0 50 65" aria-hidden="true"><defs><radialGradient id="${gradient}" cx="30%" cy="23%" r="78%"><stop stop-color="var(--fruit-light)"/><stop offset=".43" stop-color="var(--fruit)"/><stop offset="1" stop-color="var(--fruit-dark)"/></radialGradient></defs><path d="M26 17q-3-7 1-13" fill="none" stroke="#49503d" stroke-width="1.3" stroke-linecap="round"/><path d="M27 9q10-8 13-2-6 6-13 2" fill="#a8b780" stroke="#677a4f" stroke-width=".6"/><circle cx="25" cy="34" r="19" fill="url(#${gradient})"/><ellipse cx="18" cy="24" rx="6" ry="4" fill="white" opacity=".18" transform="rotate(-33 18 24)"/><text x="25" y="39" text-anchor="middle" fill="white" opacity=".7" font-family="Georgia,serif" font-size="16">${glyph}</text></svg>`;
  }
  const fruits=[...config.projects,{id:'github',label:'More on GitHub',color:'purple',x:45.2,y:55.5}];
  fruits.forEach((project,index) => {
    const button=document.createElement('button');
    button.type='button';button.className=`fruit-button ${project.color}`;
    button.dataset.project=project.id;
    button.setAttribute('aria-label',`Explore ${project.title || 'more projects on GitHub'}`);
    button.style.left=`${project.x}%`;button.style.top=`${project.y}%`;
    button.style.animationDelay=`-${index*1.2}s`;
    button.innerHTML=fruitSVG(project)+`<span class="fruit-tooltip" aria-hidden="true">${escape(project.label)} ↗</span>`;
    $('#fruit-layer').append(button);
  });

  // Canvas doodles drift on the breeze and react to nearby pointer movement.
  const canvas=$('#leaves-canvas');
  const garden=$('#garden');
  const ctx=canvas.getContext('2d');
  let W=1100,H=440,scale=1,dpr=1,lastTime=0,frameId=0,wind=0,visible=true;
  let groundY=405,nextBreeze=12,elapsed=0;
  const pointer={x:-1000,y:-1000};
  const particles=[];
  const colors=['#8a9d58','#b9a643','#6e96b2','#a78bb1','#d07c61','#6d9e8e','#727779'];
  for(let i=0;i<380;i++) {
    const isGround=i<235;
    const nx=isGround?between(.005,.995):between(.02,.98);
    const ny=isGround?between(.915,.94):between(.15,.88);
    particles.push({nx,ny,x:nx*1100,y:ny*440,vx:between(-.16,.18),vy:between(-.08,.17),rotation:between(-1.8,1.8),spin:between(-.008,.008),size:between(2.8,5.2),kind:i%11,color:colors[i%colors.length],phase:between(0,Math.PI*2),ground:isGround,groundOffset:between(-5,7),glyph:alphabet[i%alphabet.length],outlined:i%5===0});
  }
  function resize() {
    const rect=garden.getBoundingClientRect();
    W=rect.width;H=rect.height;dpr=Math.min(window.devicePixelRatio||1,2);scale=Math.min(W/1100,H/440);
    canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
    canvas.style.width=`${W}px`;canvas.style.height=`${H}px`;
    ctx?.setTransform(dpr,0,0,dpr,0,0);
    // Keep the HTML fruit buttons aligned with the SVG's letterboxed drawing.
    const layerRect=$('#fruit-layer').getBoundingClientRect();
    const fit=Math.min(layerRect.width/1100,layerRect.height/440);
    const offsetX=(layerRect.width-1100*fit)/2,offsetY=(layerRect.height-440*fit)/2;
    groundY=(layerRect.top-rect.top)+offsetY+405*fit;
    $$('.fruit-button').forEach((button,index)=>{
      const treeX=550+(fruits[index].x/100*1100-550)*1.22;
      button.style.left=`${offsetX+treeX*fit}px`;
      button.style.top=`${offsetY+fruits[index].y/100*480*fit}px`;
    });
    particles.forEach(p=>{p.x=p.nx*W;p.y=p.ground?groundY+p.groundOffset:p.ny*H;});
    render(0);
  }
  function doodle(p) {
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rotation);ctx.scale(Math.max(.65,scale),Math.max(.65,scale));
    ctx.strokeStyle=p.color;ctx.fillStyle=p.color;ctx.lineWidth=.8;ctx.globalAlpha=p.ground ? .76 : .56;
    const s=p.size;ctx.beginPath();
    if(p.kind>=6){ctx.font=`${Math.round(s*2.4)}px Georgia,serif`;ctx.textAlign='center';ctx.textBaseline='middle';if(p.outlined){ctx.lineWidth=.6;ctx.strokeText(p.glyph,0,0);}else ctx.fillText(p.glyph,0,0);ctx.restore();return;}
    if(p.kind===0){ctx.moveTo(0,s);ctx.quadraticCurveTo(-s*1.7,-s,0,-s);ctx.quadraticCurveTo(s*1.7,s,0,s);ctx.stroke();ctx.beginPath();ctx.moveTo(0,s+2);ctx.lineTo(0,-s*.6);ctx.stroke();}
    else if(p.kind===1){ctx.arc(0,0,s*.65,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(0,s);ctx.lineTo(0,s*2);ctx.stroke();}
    else if(p.kind===2){ctx.moveTo(-s,0);ctx.lineTo(s,0);ctx.moveTo(0,-s);ctx.lineTo(0,s);ctx.stroke();}
    else if(p.kind===3){ctx.moveTo(0,-s);ctx.lineTo(s*.5,0);ctx.lineTo(0,s);ctx.lineTo(-s*.5,0);ctx.closePath();ctx.stroke();}
    else if(p.kind===4){ctx.moveTo(-s,0);ctx.quadraticCurveTo(0,-s*1.7,s,0);ctx.quadraticCurveTo(0,s*1.7,-s,0);ctx.stroke();}
    else if(p.kind===5){ctx.moveTo(-s,s);ctx.lineTo(-s,-s*.1);ctx.lineTo(0,-s);ctx.lineTo(s,-s*.1);ctx.lineTo(s,s);ctx.closePath();ctx.stroke();}
    else {ctx.arc(0,0,s*.35,0,Math.PI*2);ctx.fill();}
    ctx.restore();
  }
  function render(time) {
    if(!ctx)return;
    ctx.clearRect(0,0,W,H);
    const step=time>0 ? Math.min(lastTime>0 ? Math.max(0,(time-lastTime)/16.67) : 1,2) : 0;
    lastTime=time;
    if(!paused && visible) {
      elapsed+=step/60;
      if(elapsed>=nextBreeze){breeze(false);nextBreeze=elapsed+between(13,18);}
      wind*=Math.pow(.982,step);
      particles.forEach(p=>{
        const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);
        if(dist<100 && dist>0){p.vx+=dx/dist*.13*step;p.vy+=dy/dist*.11*step;p.ground=false;}
        p.vx+=Math.sin(time*.0004+p.phase)*.002*step+wind*.025*step;
        p.vy+=(.007+wind*.001)*step;
        p.vx*=Math.pow(.989,step);
        p.x+=(p.vx+Math.sin(time*.0005+p.phase)*.14)*step;
        p.y+=p.vy*step;p.rotation+=p.spin*step;
        if(p.y>groundY+p.groundOffset){p.y=groundY+p.groundOffset;p.vy=0;p.vx*=.9;p.ground=true;}
        if(p.x<-15)p.x=W+10;
        if(p.x>W+15)p.x=-10;
        if(p.y<-20)p.y=H*.25;
        p.nx=p.x/W;p.ny=p.y/H;
      });
    }
    particles.forEach(doodle);
  }
  function tick(time){render(time);frameId=0;if(!paused && visible)frameId=requestAnimationFrame(tick);}
  function start(){lastTime=0;if(!frameId && !paused && visible)frameId=requestAnimationFrame(tick);}
  function updateMotionButton() {
    document.body.classList.toggle('is-paused',paused);
    $('#motion-button').setAttribute('aria-pressed',String(paused));
    $('#motion-button').setAttribute('aria-label',paused?'Play garden animation':'Pause garden animation');
    $('.motion-icon').textContent=paused?'▷':'Ⅱ';
    $('.motion-label').textContent=paused?'Play':'Pause';
    if(paused){cancelAnimationFrame(frameId);frameId=0;render(0);}else start();
  }
  $('#motion-button').addEventListener('click',()=>{paused=!paused;updateMotionButton();});
  reducedMotion.addEventListener('change',event=>{paused=event.matches;updateMotionButton();});
  function breeze(announce=true) {
    if(paused){if(announce)toast('Press Play to let the garden move.');return;}
    wind=between(2,4);
    particles.forEach((p,index)=>{if(index%3===0&&!announce)return;p.vx+=between(-1.3,1.3);p.vy-=between(1.8,4.1);p.ground=false;});
    if(announce)toast('A little breeze. A fresh perspective.');
    start();
  }
  $('#wind-button').addEventListener('click',()=>breeze(true));
  garden.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const rect=garden.getBoundingClientRect();pointer.x=event.clientX-rect.left;pointer.y=event.clientY-rect.top;});
  garden.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;});
  const resizeObserver = new ResizeObserver(resize);resizeObserver.observe(garden);
  const gardenObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting && !document.hidden;if(visible)start();else{cancelAnimationFrame(frameId);frameId=0;}},{threshold:.01});gardenObserver.observe(garden);
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden && garden.getBoundingClientRect().bottom>0;if(visible)start();else{cancelAnimationFrame(frameId);frameId=0;}});
  resize();updateMotionButton();

  const sectionObserver=new IntersectionObserver(entries=>{
    const current=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!current)return;
    $$('.main-nav a').forEach(link=>{const active=link.hash===`#${current.target.id}`;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  },{rootMargin:'-12% 0px -45% 0px',threshold:0});
  $$('main > section').forEach(section=>sectionObserver.observe(section));
  $('#copy-link').addEventListener('click',async()=>{
    const url=new URL(window.location.href);url.hash='';
    if(url.protocol==='file:'){toast('Publish the site first to share your portfolio link.');return;}
    try {
      if(navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(url.href);
      else {
        const input=document.createElement('textarea');input.value=url.href;input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();const copied=document.execCommand('copy');input.remove();if(!copied)throw new Error('Copy unavailable');
      }
      toast('Portfolio link copied. Plant it somewhere good!');
    } catch {toast('Copy is unavailable here. You can copy the address from your browser.');}
  });
})();
