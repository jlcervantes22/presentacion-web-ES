
const imageSets = {
  cpa: {images:["assets/producto-cpa-01.jpg", "assets/producto-cpa-02.jpg", "assets/producto-cpa-03.jpg", "assets/producto-cpa-04.jpg", "assets/producto-cpa-05.jpg", "assets/producto-cpa-06.jpg", "assets/producto-cpa-07.jpg"], captionPrefix:'CPA + Historias', title:'Comprender antes de operar', text:'Las actividades combinan representaciones visuales y manipulativos para que niñas y niños exploren conceptos, los representen y avancen hacia la comprensión matemática.', list:[], note:'Vista ilustrativa de experiencias de Kouchea.'},
  ia: {images:["assets/kouchi-ia-01.jpg", "assets/kouchi-ia-02.jpg", "assets/kouchi-ia-03.jpg", "assets/kouchi-ia-04.jpg"], captionPrefix:'Kouchi-IA', title:'Acompañar sin revelar la respuesta', text:'Kouchi-IA guía el razonamiento mediante preguntas, pistas y nuevas explicaciones para que cada estudiante encuentre su propio camino.', list:['Muestra de una conversación.','El tutor pide contexto, orienta y adapta la explicación.'], note:'Vista ilustrativa de experiencias de Kouchea.'},
  game: {images:["assets/gamificacion-01.jpg", "assets/gamificacion-02.jpg", "assets/gamificacion-03.jpg", "assets/gamificacion-04.jpg", "assets/gamificacion-05.jpg"], captionPrefix:'Gamificación + Educación financiera', title:'Ahorrar, invertir o gastar', text:'La aventura espacial incorpora principios de educación financiera: ahorrar, invertir o gastar monedas virtuales para acceder a experiencias y recompensas.', list:['Integra tutorial, tienda y experiencias.','Niñas y niños exploran decisiones inteligentes con sentido lúdico.'], note:'Vista ilustrativa de experiencias de Kouchea.'}
};
let currentSlide=0; const slides=[...document.querySelectorAll('.slide')]; const totalSlides=slides.length;
function showSlide(n){ currentSlide=Math.max(0,Math.min(totalSlides-1,n)); slides.forEach((s,i)=>s.classList.toggle('active',i===currentSlide)); document.getElementById('pageTag').textContent=String(currentSlide+1).padStart(2,'0')+' / '+String(totalSlides).padStart(2,'0'); document.getElementById('slideName').textContent=slides[currentSlide].dataset.title; document.getElementById('progressFill').style.width=((currentSlide+1)/totalSlides*100)+'%'; document.getElementById('prevSlide').disabled=currentSlide===0; document.getElementById('nextSlide').textContent=currentSlide===totalSlides-1?'Volver al inicio ↺':'Siguiente →'; document.getElementById('liveRegion').textContent='Pantalla '+(currentSlide+1)+': '+slides[currentSlide].dataset.title; window.location.hash='s'+(currentSlide+1); if(currentSlide===1) requestAnimationFrame(fitHitosSlide); window.scrollTo({top:0,behavior:'smooth'}); }
document.getElementById('prevSlide').onclick=()=>showSlide(currentSlide-1); document.getElementById('nextSlide').onclick=()=>currentSlide===totalSlides-1?showSlide(0):showSlide(currentSlide+1);
let activeTab='cpa', activeIndex=0;
function renderProductThumbs(){
  const strip=document.getElementById('productThumbs');
  const data=imageSets[activeTab];
  if(strip.dataset.tab!==activeTab){
    strip.dataset.tab=activeTab;
    strip.replaceChildren(...data.images.map((src,index)=>{
      const button=document.createElement('button');button.type='button';button.className='thumbBtn';
      button.setAttribute('aria-label',data.captionPrefix+' · imagen '+(index+1)+' de '+data.images.length);
      button.setAttribute('aria-controls','mainImage');
      const img=document.createElement('img');img.src=src;img.alt='';button.append(img);
      button.addEventListener('click',()=>{activeIndex=index;renderTab();});
      button.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
        event.preventDefault();event.stopPropagation();
        activeIndex=event.key==='Home'?0:event.key==='End'?data.images.length-1:(index+(event.key==='ArrowRight'?1:-1)+data.images.length)%data.images.length;
        renderTab();strip.children[activeIndex].focus({preventScroll:true});
      });
      return button;
    }));
    strip.scrollLeft=0;
  }
  [...strip.children].forEach((button,index)=>button.setAttribute('aria-pressed',String(index===activeIndex)));
  const selected=strip.children[activeIndex];
  const box=strip.getBoundingClientRect(),item=selected.getBoundingClientRect();
  if(item.left<box.left)strip.scrollLeft-=box.left-item.left+3;
  else if(item.right>box.right)strip.scrollLeft+=item.right-box.right+3;
}
function renderTab(){ const data=imageSets[activeTab]; document.querySelectorAll('.tab').forEach(btn=>btn.classList.toggle('on',btn.dataset.tab===activeTab)); document.getElementById('mainImage').src=data.images[activeIndex]; document.getElementById('mainImage').alt=data.captionPrefix+' · imagen '+(activeIndex+1); document.getElementById('imgCaption').textContent=data.captionPrefix+' · '+(activeIndex+1)+' de '+data.images.length; document.getElementById('featureTitle').textContent=data.title; document.getElementById('featureText').textContent=data.text; document.getElementById('featureList').innerHTML=data.list.map(item=>'<li>'+item+'</li>').join(''); document.getElementById('featureNote').textContent=data.note; document.getElementById('modalCap').textContent=data.captionPrefix+' · '+(activeIndex+1)+' de '+data.images.length;renderProductThumbs(); }
document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{activeTab=btn.dataset.tab; activeIndex=0; renderTab();}); document.getElementById('prevImg').onclick=()=>{const data=imageSets[activeTab]; activeIndex=(activeIndex-1+data.images.length)%data.images.length; renderTab();}; document.getElementById('nextImg').onclick=()=>{const data=imageSets[activeTab]; activeIndex=(activeIndex+1)%data.images.length; renderTab();};
const modal=document.getElementById('imgModal'), modalImg=document.getElementById('modalImage');
function openModal(){ modal.classList.add('on'); modalImg.src=imageSets[activeTab].images[activeIndex]; modal.setAttribute('aria-hidden','false'); document.getElementById('modalCap').textContent=imageSets[activeTab].captionPrefix+' · '+(activeIndex+1)+' de '+imageSets[activeTab].images.length; }
function closeModal(){ modal.classList.remove('on'); modal.setAttribute('aria-hidden','true'); }
function modalShift(dir){ const data=imageSets[activeTab]; activeIndex=(activeIndex+dir+data.images.length)%data.images.length; modalImg.src=data.images[activeIndex]; renderTab(); }
document.getElementById('zoomBtn').onclick=openModal; document.getElementById('mainImage').onclick=openModal; document.getElementById('closeModal').onclick=closeModal; document.getElementById('modalPrev').onclick=(e)=>{e.stopPropagation(); modalShift(-1);}; document.getElementById('modalNext').onclick=(e)=>{e.stopPropagation(); modalShift(1);}; modal.onclick=(e)=>{if(e.target===modal)closeModal();};
document.addEventListener('keydown',e=>{ if(e.target===document.getElementById('studentsRange'))return; if(e.key==='ArrowRight'){ if(modal.classList.contains('on')) modalShift(1); else if(currentSlide<totalSlides-1) document.getElementById('nextSlide').click(); } if(e.key==='ArrowLeft'){ if(modal.classList.contains('on')) modalShift(-1); else document.getElementById('prevSlide').click(); } if(e.key==='Escape') closeModal(); });
if(location.hash.startsWith('#s')){ const n=parseInt(location.hash.slice(2)); if(n>=1&&n<=totalSlides) showSlide(n-1); }
const range=document.getElementById('studentsRange'); function formatInt(n){return new Intl.NumberFormat('en-US').format(n)} function formatMoney(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:n%1?2:0,minimumFractionDigits:n%1?2:0}).format(n)}
function calc(){ const students=+range.value; let unit=49, tier=1, label='Hasta 10,000 estudiantes'; if(students>100000){unit=12.9;tier=3;label='Más de 100,000 estudiantes';} else if(students>10000){unit=19;tier=2;label='10,001 a 100,000';} if(students===0){unit=0;tier=0;label='';} const total=students*unit; document.getElementById('studentsValue').textContent=formatInt(students); document.getElementById('unitPrice').textContent=students===0?'—':formatMoney(unit); document.getElementById('totalPrice').textContent=formatMoney(total); document.getElementById('tierLabel').textContent=label; document.querySelectorAll('.tier').forEach(el=>el.classList.toggle('active',+el.dataset.tier===tier)); document.querySelectorAll('.quick button[data-s]').forEach(btn=>{const selected=+btn.dataset.s===students;btn.classList.toggle('on',selected);btn.setAttribute('aria-pressed',String(selected));}); }
document.getElementById('resetScenario').addEventListener('click',()=>{range.value=0;calc();});
range.addEventListener('input',calc); document.querySelectorAll('.quick button[data-s]').forEach(btn=>btn.onclick=()=>{range.value=btn.dataset.s; calc();}); calc(); renderTab();

const hitoData={
  enlaces:{title:'Enlaces con la Educación',text:'770,000 computadoras y más de 298,000 tabletas fueron entregadas a estudiantes del sector público. La entrega se sumó a los paquetes escolares de libros, útiles y uniformes. En ciertos centros educativos también se ha incorporado conectividad satelital Starlink.',meta:['Cantidad reportada','2021–2022','Presidencia de El Salvador']},
  google:{title:'Google for Education',text:'Desde 2023 se promovieron convocatorias oficiales de formación docente en herramientas de Google. En 2025 se difundieron recursos de Classroom, Gemini y NotebookLM para fortalecer competencias digitales y pedagógicas.',meta:['Formación docente','2023–2025','Fuente oficial: MINED']},
  crecer:{title:'Crecer Juntos',text:'Política liderada por el Despacho de la Primera Dama, Gabriela de Bukele, orientada al desarrollo integral de la niñez.',meta:['Desarrollo integral','2021–2025','Fuente oficial: Crecer Juntos / Gobierno de El Salvador']},
  aprendes:{title:'AprendES',text:'El Banco Mundial aprobó US$501 millones para un programa orientado a acelerar el aprendizaje, fortalecer prácticas pedagógicas e integrar tecnología en la educación pública.',meta:['US$501 millones','2026','Fuente oficial: Banco Mundial']},
  grok:{title:'Grok (xAI)',text:'xAI anunció una colaboración con El Salvador para desplegar Grok en más de 5,000 centros escolares durante dos años.',meta:['Más de 5,000 centros escolares','2025','Fuente oficial: xAI / Gobierno de El Salvador']}
};
const hitoHighlights={
  enlaces:['770,000 computadoras','más de 298,000 tabletas','paquetes escolares de libros, útiles y uniformes','Starlink'],
  google:['formación docente','Classroom, Gemini y NotebookLM'],
  crecer:['Gabriela de Bukele','desarrollo integral de la niñez'],
  aprendes:['aprobó US$501 millones','acelerar el aprendizaje','tecnología'],
  grok:['anunció una colaboración','más de 5,000 centros escolares']
};
function fillHitoPanel(panel,key){
  const item=hitoData[key];
  panel.querySelector('h3').textContent=item.title;
  const fragment=document.createDocumentFragment();
  const phrases=hitoHighlights[key]||[];
  let cursor=0;
  while(cursor<item.text.length){
    let next=-1,phrase='';
    phrases.forEach(value=>{const at=item.text.indexOf(value,cursor);if(at!==-1&&(next===-1||at<next)){next=at;phrase=value;}});
    if(next===-1){fragment.append(document.createTextNode(item.text.slice(cursor)));break;}
    if(next>cursor)fragment.append(document.createTextNode(item.text.slice(cursor,next)));
    const emphasis=document.createElement('strong');emphasis.textContent=phrase;fragment.append(emphasis);
    cursor=next+phrase.length;
  }
  panel.querySelector('p').replaceChildren(fragment);
  panel.querySelector('.hitoMeta').replaceChildren(...item.meta.map(value=>{const span=document.createElement('span');span.textContent=value;return span;}));
}
function fitHitosSlide(){
  const slide=document.querySelector('.hitosSlide');
  if(!slide||!slide.classList.contains('active')) return;
  const panel=document.getElementById('hitoDetail');
  slide.classList.remove('hitosCompact','hitosDense');
  slide.style.setProperty('--hitos-gap-trim','0px');
  panel.style.removeProperty('min-height');
  if(!window.matchMedia('(min-width:1101px)').matches) return;
  // Measure every explanation once, so the selected card never changes the layout.
  const measure=panel.cloneNode(true);
  measure.removeAttribute('id');
  measure.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
  measure.querySelectorAll('[aria-live]').forEach(node=>node.removeAttribute('aria-live'));
  measure.setAttribute('aria-hidden','true');
  Object.assign(measure.style,{position:'fixed',top:'0',left:'0',visibility:'hidden',pointerEvents:'none',width:panel.getBoundingClientRect().width+'px',maxWidth:'none',minHeight:'0',height:'auto',margin:'0'});
  slide.append(measure);
  let commonHeight=0;
  Object.keys(hitoData).forEach(key=>{fillHitoPanel(measure,key);commonHeight=Math.max(commonHeight,Math.ceil(measure.getBoundingClientRect().height));});
  measure.remove();
  panel.style.minHeight=commonHeight+'px';
  // Only tighten gaps if necessary, preserving the reference card size and type.
  for(const trim of [0,4,8,12]){
    slide.style.setProperty('--hitos-gap-trim',trim+'px');
    if(slide.scrollHeight<=slide.clientHeight+1) break;
  }
}
window.addEventListener('resize',()=>requestAnimationFrame(fitHitosSlide));
if(document.fonts) document.fonts.ready.then(()=>requestAnimationFrame(fitHitosSlide));
let activeHitoKey=null;
function renderHito(key){
  if(!hitoData[key]||key===activeHitoKey) return;
  activeHitoKey=key;
  document.querySelectorAll('.hitoBtn').forEach(button=>{
    const selected=button.dataset.hito===key;
    button.classList.toggle('active',selected);
    button.setAttribute('aria-pressed',String(selected));
  });
  fillHitoPanel(document.getElementById('hitoDetail'),key);
}
document.querySelectorAll('.hitoBtn').forEach(btn=>btn.addEventListener('click',()=>renderHito(btn.dataset.hito)));
renderHito('enlaces');
let activePairKey=null;
function renderPair(key){
  if(key===activePairKey)return;
  activePairKey=key;
  document.querySelectorAll('.correspondenceChoice').forEach(button=>{const selected=button.dataset.pair===key;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});
  document.querySelectorAll('.correspondenceAnswer').forEach(cell=>cell.classList.toggle('selected',cell.dataset.pairAnswer===key));
  document.querySelectorAll('.pairStory').forEach(story=>{const selected=story.dataset.pairStory===key;story.classList.toggle('selected',selected);story.setAttribute('aria-hidden',String(!selected));story.inert=!selected;});
}
document.querySelectorAll('.correspondenceChoice').forEach(button=>button.addEventListener('click',()=>renderPair(button.dataset.pair)));
renderPair('devices');
const curriculumDialog=document.getElementById('curriculumDialog');
const exploreCurriculum=document.getElementById('exploreCurriculum');
exploreCurriculum.addEventListener('click',()=>curriculumDialog.showModal());
document.getElementById('closeCurriculum').addEventListener('click',()=>curriculumDialog.close());
curriculumDialog.addEventListener('close',()=>exploreCurriculum.focus({preventScroll:true}));
curriculumDialog.addEventListener('click',event=>{if(event.target!==curriculumDialog)return;const rect=curriculumDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)curriculumDialog.close();});
// Keep presentation shortcuts inactive while the curricular dialog has focus.
document.addEventListener('keydown',event=>{if(!curriculumDialog.open)return;if(['ArrowLeft','ArrowRight','Escape'].includes(event.key)){event.stopImmediatePropagation();if(event.key==='Escape'){event.preventDefault();curriculumDialog.close();}}},true);

const studyResultsDialog=document.getElementById('studyResultsDialog');
const openStudyResults=document.getElementById('openStudyResults');
const studyTabs=[...document.querySelectorAll('.studyViewTabs [role="tab"]')];
function selectStudyView(index){studyTabs.forEach((button,i)=>{const active=i===index;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;const panel=document.getElementById(button.getAttribute('aria-controls'));panel.classList.toggle('isActive',active);panel.setAttribute('aria-hidden',String(!active));panel.inert=!active;});}
studyTabs.forEach((button,index)=>{button.addEventListener('click',()=>selectStudyView(index));button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();event.stopPropagation();const target=event.key==='Home'?0:event.key==='End'?studyTabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+studyTabs.length)%studyTabs.length;selectStudyView(target);studyTabs[target].focus();});});
openStudyResults.addEventListener('click',()=>{selectStudyView(0);studyResultsDialog.showModal();});
document.getElementById('closeStudyResults').addEventListener('click',()=>studyResultsDialog.close());
studyResultsDialog.addEventListener('close',()=>openStudyResults.focus({preventScroll:true}));
studyResultsDialog.addEventListener('click',event=>{if(event.target!==studyResultsDialog)return;const rect=studyResultsDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)studyResultsDialog.close();});
// Preserve tab keyboard interaction and stop slide navigation behind this dialog.
studyResultsDialog.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight'].includes(event.key))event.stopPropagation();});
document.addEventListener('keydown',event=>{if(studyResultsDialog.open&&event.key==='Escape'){event.stopImmediatePropagation();event.preventDefault();studyResultsDialog.close();}},true);

const startBtn=document.getElementById('coverStart'); if(startBtn){startBtn.addEventListener('click',()=>showSlide(1));}
showSlide(currentSlide);
