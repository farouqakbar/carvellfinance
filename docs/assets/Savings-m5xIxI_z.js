import{F as Fe,K as Ee,D as r,w as ce,E as c,B as e,f as de,v as d,m as $,c as R,z as pe,a as me,q as ue,r as $e,g as xe,s as G,C as ge,o as Be,h as We,l as Ae,A as qe}from"./index-oPF2CX6W.js";function Re(){const p=[],o=new Date;for(let x=0;x<60;x++){const v=new Date(o.getFullYear(),o.getMonth()+x,1),b=`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}`;p.push({val:b,label:v.toLocaleDateString("id-ID",{month:"long",year:"numeric"})})}return p}const Ge=Re(),B=qe();function Le(){const{user:p}=Fe(),o=Ee(),[x,v]=r.useState("plan"),[b,k]=r.useState([]),[C,O]=r.useState([]),[L,he]=r.useState([]),[H,K]=r.useState(!0),[j,be]=r.useState("aktif"),[fe,S]=r.useState(!1),[m,z]=r.useState({name:"",amount:"",targetMonth:ce(),notes:""}),[Y,U]=r.useState(!1),[ve,J]=r.useState(null),[g,T]=r.useState(null),[y,W]=r.useState("gaji"),[f,X]=r.useState(""),[Q,V]=r.useState(""),[M,Z]=r.useState(B),[_,N]=r.useState(!1),[w,A]=r.useState([]),[je,P]=r.useState(!1),[i,h]=r.useState({title:"",type:"expense",amount:"",date:B,notes:"",category_id:""}),[ee,ae]=r.useState(!1),[ye,ne]=r.useState(null);r.useEffect(()=>{Ne()},[]);const Ne=async()=>{K(!0);const[a,n,l,s]=await Promise.all([c.from("plans").select("*").eq("user_id",p.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0}),c.from("savings").select("*").eq("user_id",p.id).order("name"),c.from("categories").select("*").eq("user_id",p.id).is("month",null).order("name"),c.from("plan_events").select("*").eq("user_id",p.id).order("date",{ascending:!0})]);k(a.data||[]),O(n.data||[]);const t=l.data||[];he(t),t.length>0&&V(t[0].id),(n.data||[]).length>0&&X(n.data[0].id),A(s.data||[]),K(!1)},we=async()=>{const{data:a}=await c.from("plans").select("*").eq("user_id",p.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0});k(a||[])},ke=async()=>{const{data:a}=await c.from("plan_events").select("*").eq("user_id",p.id).order("date",{ascending:!0});A(a||[])},Ce=async()=>{if(!m.name.trim()||!m.amount||!m.targetMonth)return;U(!0);const{error:a}=await c.from("plans").insert({user_id:p.id,name:m.name.trim(),amount:parseFloat(m.amount),target_month:m.targetMonth,notes:m.notes.trim(),done:!1});a?o("Gagal menyimpan","error"):(o("Wishlist ditambahkan","success"),z({name:"",amount:"",targetMonth:ce(),notes:""}),S(!1),we()),U(!1)},Se=a=>{if(a.done){c.from("plans").update({done:!1}).eq("id",a.id).then(({error:n})=>{if(n){o(n.message,"error");return}k(l=>l.map(s=>s.id===a.id?{...s,done:!1}:s)),o("Ditandai aktif kembali","success")});return}T(a),W("gaji"),Z(B)},ze=async()=>{if(!g)return;N(!0);const a=g;if(y==="tabungan"){const l=C.find(u=>u.id===f);if(!l){o("Pilih tabungan dulu","error"),N(!1);return}const s=Math.max(0,Number(l.current_amount)-Number(a.amount)),{error:t}=await c.from("savings").update({current_amount:s}).eq("id",f);if(t){o("Gagal update tabungan","error"),N(!1);return}O(u=>u.map(E=>E.id===f?{...E,current_amount:s}:E)),await c.from("savings_ledger").insert({user_id:p.id,savings_id:f,amount:-Number(a.amount),month:M.substring(0,7),date:M})}else{const{error:l}=await c.from("transactions").insert({user_id:p.id,category_id:Q||null,amount:Number(a.amount),date:M,description:`Beli: ${a.name}`,type:"expense"});if(l){o("Gagal catat transaksi","error"),N(!1);return}}const{error:n}=await c.from("plans").update({done:!0}).eq("id",a.id);if(n){o(n.message,"error"),N(!1);return}k(l=>l.map(s=>s.id===a.id?{...s,done:!0}:s)),o("Wishlist selesai dicatat ✓","success"),T(null),N(!1)},Te=async a=>{J(a);const{error:n}=await c.from("plans").delete().eq("id",a);n||(k(l=>l.filter(s=>s.id!==a)),o("Wishlist dihapus","success")),J(null)},_e=async()=>{if(!i.title.trim()||!i.amount||!i.date)return;ae(!0);const{error:a}=await c.from("plan_events").insert({user_id:p.id,title:i.title.trim(),type:i.type,amount:parseFloat(i.amount),date:i.date,notes:i.notes.trim(),category_id:i.category_id||null});a?o("Gagal menyimpan","error"):(o("Plan event ditambahkan","success"),h({title:"",type:"expense",amount:"",date:B,notes:"",category_id:""}),P(!1),ke()),ae(!1)},Pe=async a=>{ne(a);const{error:n}=await c.from("plan_events").delete().eq("id",a);n||(A(l=>l.filter(s=>s.id!==a)),o("Event dihapus","success")),ne(null)},De=b.filter(a=>j==="aktif"?!a.done:j==="selesai"?a.done:!0),D={};De.forEach(a=>{D[a.target_month]||(D[a.target_month]=[]),D[a.target_month].push(a)});const se=Object.keys(D).sort(),te=b.filter(a=>!a.done).reduce((a,n)=>a+Number(n.amount),0),Ie=b.filter(a=>a.done).reduce((a,n)=>a+Number(n.amount),0),F=b.filter(a=>!a.done).length,le=b.filter(a=>a.done).length,I={};w.forEach(a=>{const n=a.date.slice(0,7);I[n]||(I[n]=[]),I[n].push(a)});const re=Object.keys(I).sort(),ie=w.filter(a=>a.type==="income").reduce((a,n)=>a+Number(n.amount),0),oe=w.filter(a=>a.type==="expense").reduce((a,n)=>a+Number(n.amount),0),q=ie-oe;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"animate-in pln-page",children:[e.jsxs("div",{className:"pln-page-header",children:[e.jsx("div",{className:"pln-page-icon",children:e.jsx(de,{size:16})}),e.jsxs("div",{children:[e.jsx("h1",{className:"pln-page-title",children:"Plan & Wishlist"}),e.jsx("p",{className:"pln-page-sub",children:"Rencanakan cashflow dan catat keinginan pembelian"})]})]}),e.jsxs("div",{className:"pln-tab-bar",children:[e.jsxs("button",{className:`pln-tab-btn${x==="plan"?" active":""}`,onClick:()=>v("plan"),children:["Plan",w.length>0&&e.jsx("span",{className:"pln-tab-badge",children:w.length})]}),e.jsxs("button",{className:`pln-tab-btn${x==="wishlist"?" active":""}`,onClick:()=>v("wishlist"),children:["Wishlist",F>0&&e.jsx("span",{className:"pln-tab-badge",children:F})]})]}),x==="plan"&&e.jsxs("div",{className:"pln-tab-content",children:[e.jsxs("div",{className:"pln-stats-strip",children:[e.jsxs("div",{className:"pln-stat",children:[e.jsx("span",{className:"pln-stat-label",children:"Pemasukan"}),e.jsxs("span",{className:"pln-stat-val tabular",style:{color:"var(--success)"},children:["+",d(ie)]})]}),e.jsx("div",{className:"pln-stat-divider"}),e.jsxs("div",{className:"pln-stat",children:[e.jsx("span",{className:"pln-stat-label",children:"Pengeluaran"}),e.jsxs("span",{className:"pln-stat-val tabular",style:{color:"var(--danger)"},children:["−",d(oe)]})]}),e.jsx("div",{className:"pln-stat-divider"}),e.jsxs("div",{className:"pln-stat",children:[e.jsx("span",{className:"pln-stat-label",children:"Net"}),e.jsxs("span",{className:"pln-stat-val tabular",style:{color:q>=0?"var(--success)":"var(--danger)"},children:[q>=0?"+":"−",d(Math.abs(q))]})]})]}),e.jsxs("div",{className:"pln-filter-row",children:[e.jsxs("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:[w.length," event terjadwal"]}),e.jsx("button",{className:"pln-add-btn",onClick:()=>P(!0),title:"Tambah Plan Event",children:e.jsx($,{size:11})})]}),H?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:1},children:[...Array(4)].map((a,n)=>e.jsx("div",{className:"skeleton",style:{height:50,borderRadius:0,opacity:1-n*.18}},n))}):re.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(R,{size:22,style:{opacity:.4}})}),e.jsx("strong",{children:"Belum ada plan event"}),e.jsx("p",{children:"Tekan + untuk tambah pemasukan atau pengeluaran yang akan datang."})]}):e.jsx("div",{className:"pln-sections",children:re.map(a=>{const n=I[a],l=n.filter(t=>t.type==="income").reduce((t,u)=>t+Number(u.amount),0),s=n.filter(t=>t.type==="expense").reduce((t,u)=>t+Number(u.amount),0);return e.jsxs("div",{className:"pln-section",children:[e.jsx("div",{className:"pln-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"pln-section-label",children:pe(a)}),e.jsxs("span",{className:"pln-section-sub",children:[n.length," event",l>0&&e.jsxs("span",{style:{color:"var(--success)",marginLeft:6},children:["+",d(l)]}),s>0&&e.jsxs("span",{style:{color:"var(--danger)",marginLeft:6},children:["−",d(s)]})]})]})}),e.jsx("div",{className:"pln-table-body",children:n.map(t=>{const u=t.type==="income",Me=new Date(t.date+"T00:00:00").toLocaleDateString("id-ID",{weekday:"short",day:"numeric",month:"short"});return e.jsxs("div",{className:"pln-event-row",children:[e.jsx("div",{className:`pln-event-icon${u?" income":" expense"}`,children:u?e.jsx(R,{size:11}):e.jsx(me,{size:11})}),e.jsxs("div",{className:"pln-row-info",children:[e.jsx("span",{className:"pln-row-name",children:t.title}),e.jsxs("span",{className:"pln-row-notes",children:[Me,t.notes?` · ${t.notes}`:""]})]}),e.jsxs("span",{className:`pln-row-amount tabular${u?" pln-income":" pln-expense"}`,children:[u?"+":"−",d(t.amount)]}),e.jsx("div",{className:"pln-row-actions",children:e.jsx("button",{className:"pln-act pln-act-del",onClick:()=>Pe(t.id),disabled:ye===t.id,title:"Hapus",children:e.jsx(ue,{size:12})})})]},t.id)})})]},a)})})]}),x==="wishlist"&&e.jsxs("div",{className:"pln-tab-content",children:[e.jsxs("div",{className:"pln-stats-strip",children:[e.jsxs("div",{className:"pln-stat",children:[e.jsx("span",{className:"pln-stat-label",children:"Belum Terbeli"}),e.jsx("span",{className:"pln-stat-val tabular",style:{color:te>0?"var(--warning)":"var(--text-primary)"},children:d(te)})]}),e.jsx("div",{className:"pln-stat-divider"}),e.jsxs("div",{className:"pln-stat",children:[e.jsx("span",{className:"pln-stat-label",children:"Aktif"}),e.jsxs("span",{className:"pln-stat-val",children:[F," item"]})]}),e.jsx("div",{className:"pln-stat-divider"}),e.jsxs("div",{className:"pln-stat",children:[e.jsx("span",{className:"pln-stat-label",children:"Sudah Terbeli"}),e.jsx("span",{className:"pln-stat-val tabular",style:{color:le>0?"var(--success)":"var(--text-primary)"},children:d(Ie)})]})]}),e.jsxs("div",{className:"pln-filter-row",children:[e.jsx("div",{className:"pln-filter-tabs",children:["aktif","selesai","semua"].map(a=>e.jsx("button",{className:`pln-filter-btn ${j===a?"active":""}`,onClick:()=>be(a),children:a==="aktif"?`Aktif (${F})`:a==="selesai"?`Selesai (${le})`:"Semua"},a))}),e.jsx("button",{className:"pln-add-btn",onClick:()=>S(!0),title:"Tambah Wishlist",children:e.jsx($,{size:11})})]}),H?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:1},children:[...Array(4)].map((a,n)=>e.jsx("div",{className:"skeleton",style:{height:50,borderRadius:0,opacity:1-n*.18}},n))}):se.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(de,{size:22})}),e.jsx("strong",{children:j==="aktif"?"Belum ada wishlist aktif":j==="selesai"?"Belum ada wishlist selesai":"Belum ada wishlist"}),e.jsx("p",{children:j==="aktif"?"Tekan + untuk mulai mencatat.":"Tandai selesai dengan menekan tombol ✓."})]}):e.jsx("div",{className:"pln-sections",children:se.map(a=>{const n=D[a],l=n.reduce((s,t)=>s+Number(t.amount),0);return e.jsxs("div",{className:"pln-section",children:[e.jsx("div",{className:"pln-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"pln-section-label",children:pe(a)}),e.jsxs("span",{className:"pln-section-sub",children:[n.length," item · ",d(l)]})]})}),e.jsx("div",{className:"pln-table-body",children:n.map(s=>e.jsxs("div",{className:`pln-row${s.done?" pln-row-done":""}`,children:[e.jsxs("div",{className:"pln-row-info",children:[e.jsx("span",{className:"pln-row-name",children:s.name}),s.notes&&e.jsx("span",{className:"pln-row-notes",children:s.notes})]}),e.jsx("span",{className:"pln-row-amount tabular",children:d(s.amount)}),e.jsxs("div",{className:"pln-row-actions",children:[e.jsx("button",{className:`pln-act ${s.done?"pln-act-undo":"pln-act-done"}`,onClick:()=>Se(s),title:s.done?"Tandai aktif":"Tandai selesai",children:s.done?e.jsx($e,{size:12}):e.jsx(xe,{size:12})}),e.jsx("button",{className:"pln-act pln-act-del",onClick:()=>Te(s.id),disabled:ve===s.id,title:"Hapus",children:e.jsx(ue,{size:12})})]})]},s.id))})]},a)})})]}),je&&e.jsx("div",{className:"modal-overlay",onClick:()=>P(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Plan Event"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>P(!1),children:e.jsx(G,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tipe event"}),e.jsxs("div",{className:"pln-src-toggle",children:[e.jsxs("button",{type:"button",className:`pln-src-btn${i.type==="income"?" active":""}`,onClick:()=>h(a=>({...a,type:"income",category_id:""})),children:[e.jsx("span",{className:"pln-src-icon",style:{color:"var(--success)"},children:e.jsx(R,{size:15})}),e.jsx("span",{className:"pln-src-label",children:"Pemasukan"}),e.jsx("span",{className:"pln-src-sub",children:"Gaji, bonus, transfer masuk"})]}),e.jsxs("button",{type:"button",className:`pln-src-btn${i.type==="expense"?" active":""}`,onClick:()=>h(a=>({...a,type:"expense",category_id:""})),children:[e.jsx("span",{className:"pln-src-icon",style:{color:"var(--danger)"},children:e.jsx(me,{size:15})}),e.jsx("span",{className:"pln-src-label",children:"Pengeluaran"}),e.jsx("span",{className:"pln-src-sub",children:"Tagihan, cicilan, belanja"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Kategori"," ",e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),e.jsxs("select",{className:"form-select",value:i.category_id,onChange:a=>h(n=>({...n,category_id:a.target.value})),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),L.filter((a,n,l)=>l.findIndex(s=>s.name===a.name)===n).map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Judul / Deskripsi"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"cth: Gaji masuk, Tagihan listrik, Cicilan HP...",value:i.title,onChange:a=>h(n=>({...n,title:a.target.value})),autoFocus:!0})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Nominal"}),e.jsx(ge,{value:i.amount,onChange:a=>h(n=>({...n,amount:a}))})]}),e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:i.date,onChange:a=>h(n=>({...n,date:a.target.value}))})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan"," ",e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"text",placeholder:"detail tambahan...",value:i.notes,onChange:a=>h(n=>({...n,notes:a.target.value}))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>P(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:_e,disabled:!i.title.trim()||!i.amount||!i.date||ee,children:ee?"Menyimpan...":e.jsxs(e.Fragment,{children:[e.jsx($,{size:13})," Simpan"]})})]})]})}),fe&&e.jsx("div",{className:"modal-overlay",onClick:()=>S(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Wishlist"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>S(!1),children:e.jsx(G,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama barang / kebutuhan"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"contoh: Beli laptop, Kondangan Budi...",value:m.name,onChange:a=>z(n=>({...n,name:a.target.value})),autoFocus:!0})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Estimasi harga"}),e.jsx(ge,{value:m.amount,onChange:a=>z(n=>({...n,amount:a}))})]}),e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Target bulan"}),e.jsx("select",{className:"form-select",value:m.targetMonth,onChange:a=>z(n=>({...n,targetMonth:a.target.value})),children:Ge.map(a=>e.jsx("option",{value:a.val,children:a.label},a.val))})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan"," ",e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"text",placeholder:"kegunaan, detail, dll...",value:m.notes,onChange:a=>z(n=>({...n,notes:a.target.value}))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>S(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:Ce,disabled:!m.name.trim()||!m.amount||Y,children:Y?"Menyimpan...":e.jsxs(e.Fragment,{children:[e.jsx($,{size:13})," Simpan"]})})]})]})}),g&&e.jsx("div",{className:"modal-overlay",onClick:()=>!_&&T(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tandai Selesai"}),e.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>T(null),disabled:_,children:e.jsx(G,{size:16})})]}),e.jsxs("div",{className:"pln-done-info",children:[e.jsx("div",{className:"pln-done-icon",children:e.jsx(Be,{size:16})}),e.jsxs("div",{children:[e.jsx("div",{className:"pln-done-name",children:g.name}),e.jsx("div",{className:"pln-done-amount tabular",children:d(g.amount)})]})]}),e.jsx("p",{className:"pln-done-q",children:"Dari mana uangnya?"}),e.jsxs("div",{className:"pln-src-toggle",children:[e.jsxs("button",{type:"button",className:`pln-src-btn${y==="gaji"?" active":""}`,onClick:()=>W("gaji"),children:[e.jsx("span",{className:"pln-src-icon",children:e.jsx(We,{size:15})}),e.jsx("span",{className:"pln-src-label",children:"Potongan Gaji"}),e.jsx("span",{className:"pln-src-sub",children:"Dicatat sebagai pengeluaran"})]}),e.jsxs("button",{type:"button",className:`pln-src-btn${y==="tabungan"?" active":""}`,onClick:()=>W("tabungan"),children:[e.jsx("span",{className:"pln-src-icon",children:e.jsx(Ae,{size:15})}),e.jsx("span",{className:"pln-src-label",children:"Dari Tabungan"}),e.jsx("span",{className:"pln-src-sub",children:"Kurangi saldo tabungan"})]})]}),y==="gaji"&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:[e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Kategori pengeluaran"}),e.jsxs("select",{className:"form-select",value:Q,onChange:a=>V(a.target.value),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),L.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]})]}),e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Tanggal transaksi"}),e.jsx("input",{className:"form-input",type:"date",value:M,onChange:a=>Z(a.target.value)})]}),e.jsxs("div",{className:"pln-preview",children:[e.jsx("span",{children:"Pengeluaran dicatat sebesar"}),e.jsx("span",{className:"tabular",style:{color:"var(--danger)",fontWeight:700},children:d(g.amount)})]})]}),y==="tabungan"&&e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:C.length===0?e.jsx("p",{style:{fontSize:"0.8rem",color:"var(--text-muted)"},children:"Belum ada tabungan."}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Pilih tabungan"}),e.jsx("select",{className:"form-select",value:f,onChange:a=>X(a.target.value),children:C.map(a=>e.jsxs("option",{value:a.id,children:[a.name," — ",d(a.current_amount)]},a.id))})]}),f&&(()=>{const a=C.find(s=>s.id===f),n=Math.max(0,Number((a==null?void 0:a.current_amount)||0)-Number(g.amount)),l=Number((a==null?void 0:a.current_amount)||0)>=Number(g.amount);return e.jsxs("div",{className:`pln-preview${l?"":" pln-preview-warn"}`,children:[e.jsx("span",{children:"Saldo setelah dikurangi"}),e.jsx("span",{className:"tabular",style:{color:l?"var(--success)":"var(--danger)",fontWeight:700},children:d(n)})]})})()]})}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>T(null),disabled:_,children:"Batal"}),e.jsx("button",{type:"button",className:"btn btn-primary",style:{flex:1},onClick:ze,disabled:_||y==="tabungan"&&C.length===0,children:_?"Menyimpan...":e.jsxs(e.Fragment,{children:[e.jsx(xe,{size:13})," Tandai Selesai"]})})]})]})}),e.jsx("style",{children:`
          .pln-page { padding-bottom: 56px; }

          /* ── Page Header ────────────────── */
          .pln-page-header {
            display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
          }
          .pln-page-icon {
            width: 36px; height: 36px; border-radius: 9px;
            background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.2);
            color: var(--warning); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          }
          .pln-page-title {
            font-size: 1.1rem; font-weight: 800; letter-spacing: -0.025em;
            color: var(--text-primary); margin: 0; line-height: 1.2;
          }
          .pln-page-sub { font-size: 0.72rem; color: var(--text-muted); margin: 2px 0 0; }

          /* ── Tab Bar ────────────────────── */
          .pln-tab-bar {
            display: flex; gap: 2px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 10px; padding: 3px;
            margin-bottom: 20px;
          }
          [data-theme="light"] .pln-tab-bar {
            background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.08);
          }
          .pln-tab-btn {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
            padding: 7px 12px; border-radius: 7px;
            border: none; background: transparent;
            color: var(--text-muted); font-size: 0.8125rem; font-weight: 700;
            font-family: var(--font-sans); letter-spacing: -0.01em;
            cursor: pointer; transition: all 0.15s;
          }
          .pln-tab-btn:hover { color: var(--text-secondary); }
          .pln-tab-btn.active {
            background: rgba(255,255,255,0.09); color: var(--text-primary);
          }
          [data-theme="light"] .pln-tab-btn.active {
            background: #fff; color: var(--accent);
            box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          }
          .pln-tab-badge {
            font-size: 0.6rem; font-weight: 800;
            background: var(--accent); color: #fff;
            border-radius: 99px; padding: 1px 6px; line-height: 1.4;
          }

          .pln-tab-content { display: flex; flex-direction: column; }

          /* ── Stats Strip ────────────────── */
          .pln-stats-strip {
            display: flex; background: var(--bg-card);
            border: 1px solid var(--border); border-radius: var(--radius-lg);
            overflow: hidden; margin-bottom: 20px;
          }
          .pln-stat {
            flex: 1; display: flex; flex-direction: column; gap: 5px; padding: 16px 20px;
          }
          .pln-stat-divider { width: 1px; background: var(--border); flex-shrink: 0; margin: 12px 0; }
          .pln-stat-label {
            font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.1em;
            color: var(--text-muted); font-weight: 700;
          }
          .pln-stat-val {
            font-size: 1.05rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary);
          }

          /* ── Filter Row ─────────────────── */
          .pln-filter-row {
            display: flex; align-items: center; justify-content: space-between;
            gap: 8px; margin-bottom: 16px;
          }
          .pln-filter-tabs { display: flex; gap: 6px; }
          .pln-filter-btn {
            background: none; border: 1px solid var(--border); border-radius: 99px;
            padding: 5px 14px; font-family: var(--font-sans); font-size: 0.75rem;
            font-weight: 600; color: var(--text-muted); cursor: pointer; transition: all 0.15s;
          }
          .pln-filter-btn:hover { color: var(--text-primary); border-color: var(--border-light); }
          .pln-filter-btn.active { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }
          .pln-add-btn {
            width: 28px; height: 28px; border-radius: 7px;
            background: transparent; border: 1px solid var(--border);
            color: var(--text-muted); cursor: pointer;
            display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0;
          }
          .pln-add-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }

          /* ── Sections ───────────────────── */
          .pln-sections { display: flex; flex-direction: column; gap: 28px; }
          .pln-section-head {
            display: flex; justify-content: space-between; align-items: center;
            padding-bottom: 10px; border-bottom: 1px solid var(--border); margin-bottom: 2px;
          }
          .pln-section-label {
            display: block; font-size: 0.62rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary);
          }
          .pln-section-sub {
            display: block; font-size: 0.7rem; color: var(--text-muted);
            font-weight: 500; margin-top: 2px;
          }

          /* ── Wishlist rows ──────────────── */
          .pln-table-body { display: flex; flex-direction: column; }
          .pln-row {
            display: grid; grid-template-columns: 1fr 160px 60px;
            align-items: center; min-height: 50px; padding: 0 4px;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            position: relative; transition: background 0.12s;
          }
          .pln-row::before {
            content: ''; position: absolute; left: 0; top: 0; bottom: 0;
            width: 2px; border-radius: 1px; background: var(--accent);
            opacity: 0; transition: opacity 0.12s;
          }
          .pln-row:hover { background: rgba(255,255,255,0.02); }
          .pln-row:hover::before { opacity: 1; }
          .pln-row:last-child { border-bottom: none; }
          .pln-row-done { opacity: 0.48; }
          .pln-row-done::before { background: var(--success); opacity: 1; }
          .pln-row-done .pln-row-name { text-decoration: line-through; color: var(--text-muted); }
          .pln-row-info {
            display: flex; flex-direction: column; gap: 1px; padding: 10px 0 10px 8px; min-width: 0;
          }
          .pln-row-name {
            font-size: 0.875rem; font-weight: 600; color: var(--text-primary);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          .pln-row-notes {
            font-size: 0.65rem; color: var(--text-muted);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          .pln-row-amount {
            font-size: 0.875rem; font-weight: 700; letter-spacing: -0.02em;
            color: var(--text-primary); text-align: right; padding-right: 8px;
          }
          .pln-row-actions {
            display: flex; gap: 4px; justify-content: flex-end;
            opacity: 0; transition: opacity 0.15s;
          }
          .pln-row:hover .pln-row-actions { opacity: 1; }

          /* ── Plan event rows ────────────── */
          .pln-event-row {
            display: grid; grid-template-columns: 28px 1fr 140px 44px;
            align-items: center; min-height: 50px; padding: 0 4px;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            transition: background 0.12s;
          }
          .pln-event-row:hover { background: rgba(255,255,255,0.02); }
          .pln-event-row:last-child { border-bottom: none; }
          .pln-event-row:hover .pln-row-actions { opacity: 1; }
          .pln-event-icon {
            width: 22px; height: 22px; border-radius: 5px;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          }
          .pln-event-icon.income { background: rgba(52,211,153,0.12); color: var(--success); }
          .pln-event-icon.expense { background: rgba(248,113,113,0.12); color: var(--danger); }
          .pln-income { color: var(--success) !important; }
          .pln-expense { color: var(--danger) !important; }

          /* ── Action buttons ─────────────── */
          .pln-act {
            width: 26px; height: 26px; border-radius: 5px; border: none;
            background: transparent; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: var(--text-muted); transition: all 0.12s;
          }
          .pln-act-done:hover { background: var(--success-dim); color: var(--success); }
          .pln-act-undo:hover { background: var(--warning-dim); color: var(--warning); }
          .pln-act-del:hover  { background: var(--danger-dim);  color: var(--danger);  }
          .pln-act:disabled { opacity: 0.3; cursor: not-allowed; }

          /* ── Done Modal ─────────────────── */
          .pln-done-info {
            display: flex; align-items: center; gap: 10px;
            background: var(--bg-input); border: 1px solid var(--border);
            border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 16px;
          }
          .pln-done-icon {
            width: 32px; height: 32px; border-radius: var(--radius-sm);
            background: var(--bg-card); border: 1px solid var(--border);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; color: var(--text-secondary);
          }
          .pln-done-name { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); }
          .pln-done-amount { font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px; }
          .pln-done-q {
            font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
            letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 10px;
          }
          .pln-src-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
          .pln-src-btn {
            display: flex; flex-direction: column; align-items: flex-start;
            gap: 2px; padding: 12px 14px;
            background: var(--bg-input); border: 1.5px solid var(--border);
            border-radius: var(--radius-sm); cursor: pointer; text-align: left;
            transition: all 0.15s; font-family: var(--font-sans);
          }
          .pln-src-btn:hover { border-color: var(--border-light); }
          .pln-src-btn.active { border-color: var(--accent); background: var(--accent-dim); }
          .pln-src-icon { color: var(--text-secondary); margin-bottom: 2px; }
          .pln-src-label { font-size: 0.8rem; font-weight: 700; color: var(--text-primary); }
          .pln-src-btn.active .pln-src-label { color: var(--accent); }
          .pln-src-sub { font-size: 0.62rem; color: var(--text-muted); }
          .pln-preview {
            display: flex; justify-content: space-between; align-items: center;
            background: var(--bg-input); border: 1px solid var(--border);
            border-radius: var(--radius-sm); padding: 10px 14px;
            font-size: 0.8rem; color: var(--text-secondary); font-weight: 500;
          }
          .pln-preview-warn { border-color: rgba(248,113,113,0.4); background: var(--danger-dim); }

          /* ── Mobile ─────────────────────── */
          @media (max-width: 640px) {
            .pln-stat { padding: 12px; }
            .pln-stat-val { font-size: 0.82rem; }
            .pln-stat-label { font-size: 0.55rem; }
            .pln-row { grid-template-columns: 1fr auto auto; gap: 0 6px; }
            .pln-event-row { grid-template-columns: 22px 1fr auto auto; gap: 0 6px; }
            .pln-row-amount { font-size: 0.82rem; padding-right: 0; }
            .pln-row-actions { opacity: 1; }
          }
        `})]})})}export{Le as default};
