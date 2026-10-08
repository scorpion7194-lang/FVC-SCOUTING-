const C='scout-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com'){
    e.respondWith(fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(C).then(x=>x.put(r,c))}return res})
      .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('./'):undefined))));
  }
});
