
const K='epaV4';
const blank={settings:{club:"Les Enthousiastes du Passé Automobile",city:"Mulhouse",welcome:"Rouler ensemble, partager notre passion.",accent:"#b08a42"},members:[],routes:[]};
function data(){try{return JSON.parse(localStorage.getItem(K))||structuredClone(blank)}catch{return structuredClone(blank)}}
function save(d){localStorage.setItem(K,JSON.stringify(d))}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function readImg(input,cb){const f=input.files[0];if(!f)return;const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(f)}
function current(){return JSON.parse(sessionStorage.epaSession||'null')}
function setSession(x){sessionStorage.epaSession=JSON.stringify(x)}
function logout(){sessionStorage.removeItem('epaSession');location.href='index.html'}
function isAdmin(){let s=current();return !!(s&&s.admin)}
function guard(admin=false){let s=current();if(!s){location.href='acces.html';return false}if(admin&&!s.admin){location.href='espace.html';return false}return true}
function nav(active,admin=false){let items=[['index.html','Accueil'],['espace.html','Mon espace'],['balades.html','Balades'],['roadbook.html','Road-book']];if(admin)items.push(['admin.html','⚙️ Administration']);return items.map(x=>`<a class="${x[0]==active?'active':''}" href="${x[0]}">${x[1]}</a>`).join('')}
function shell(title,active,body,admin=false){return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="style.css"><title>${esc(title)}</title></head><body><header><img src="logo-club.jpg"><div><div class="brand">Les Enthousiastes du Passé Automobile</div><div class="sub">Mulhouse · espace sécurisé</div></div></header><main><nav class="nav">${nav(active,admin)}${current()?'<a href="#" onclick="logout()">Déconnexion</a>':''}</nav>${body}<footer>Les Enthousiastes du Passé Automobile · Mulhouse</footer></main></body></html>`}
