const wait=(ms=180)=>new Promise(r=>setTimeout(r,ms));
const seed={
 packages:[
  {id:1,name:'Nguyễn Cường iOS',token:'pk_live_NCIO_8F2A',keys:18,status:'active',created:'2026-08-12',devices:12,version:'2.0'},
  {id:2,name:'ChatGPTDeveloper',token:'pk_live_CGPT_2C91',keys:11,status:'active',created:'2026-09-01',devices:7,version:'1.4'},
  {id:3,name:'Internal Tools',token:'pk_test_INTERNAL_77A1',keys:4,status:'paused',created:'2026-09-05',devices:3,version:'1.0'}
 ],
 keys:Array.from({length:33},(_,i)=>({id:i+1,value:`NC-${String(100000+i).slice(-6)}-${String(7000+i).slice(-4)}`,packageId:i<18?1:i<29?2:3,status:i%8===0?'expired':i%11===0?'paused':'active',expires:`2026-${String((i%9)+9).padStart(2,'0')}-28`,uses:i*7+12,device:i%4===0?'iPad':i%3===0?'iPhone 15 Pro':'iPhone 13',created:`2026-09-${String((i%12)+1).padStart(2,'0')}`})),
 settings:{theme:'dark',accent:'#ff3d91',density:'comfortable',displayName:'Developer',notifications:true,autoRefresh:true,compactTables:false}
};
function read(){const raw=localStorage.getItem('nc-auth-db');if(!raw){localStorage.setItem('nc-auth-db',JSON.stringify(seed));return structuredClone(seed)}return JSON.parse(raw)}
function write(db){localStorage.setItem('nc-auth-db',JSON.stringify(db));return db}
const id=()=>Date.now()+Math.floor(Math.random()*999);
export const api={
 async dashboard(){await wait();const db=read();return {packages:db.packages,keys:db.keys,stats:{packages:db.packages.length,totalKeys:db.keys.length,active:db.keys.filter(k=>k.status==='active').length,requests:12538,devices:new Set(db.keys.map(k=>k.device)).size}}},
 async listPackages(){await wait();return read().packages},
 async createPackage(data){await wait();const db=read();const p={id:id(),name:data.name.trim(),token:`pk_live_${Math.random().toString(36).slice(2,8).toUpperCase()}_${Math.floor(10+Math.random()*89)}`,keys:0,status:'active',created:new Date().toISOString().slice(0,10),devices:0,version:data.version||'1.0'};db.packages.unshift(p);write(db);return p},
 async updatePackage(id,data){await wait();const db=read();const p=db.packages.find(x=>x.id===id);if(p)Object.assign(p,data);write(db);return p},
 async deletePackage(id){await wait();const db=read();db.packages=db.packages.filter(p=>p.id!==id);db.keys=db.keys.filter(k=>k.packageId!==id);write(db);return true},
 async listKeys(){await wait();return read().keys},
 async createKey(data){await wait();const db=read();const k={id:id(),value:`NC-${Math.floor(100000+Math.random()*899999)}-${Math.floor(1000+Math.random()*8999)}`,status:'active',uses:0,device:'Chưa kích hoạt',created:new Date().toISOString().slice(0,10),packageId:Number(data.packageId),expires:data.expires,notes:data.notes||''};db.keys.unshift(k);const p=db.packages.find(x=>x.id===k.packageId);if(p)p.keys++;write(db);return k},
 async updateKey(id,data){await wait();const db=read();const k=db.keys.find(x=>x.id===id);if(k)Object.assign(k,data);write(db);return k},
 async deleteKey(id){await wait();const db=read();const k=db.keys.find(x=>x.id===id);if(k){const p=db.packages.find(x=>x.id===k.packageId);if(p)p.keys=Math.max(0,p.keys-1)}db.keys=db.keys.filter(k=>k.id!==id);write(db);return true},
 async getSettings(){await wait();return read().settings},
 async saveSettings(settings){await wait();const db=read();db.settings={...db.settings,...settings};write(db);return db.settings},
 async reset(){await wait();localStorage.removeItem('nc-auth-db');localStorage.removeItem('display-name');return true},
 async exportData(){await wait();return read()}
};
