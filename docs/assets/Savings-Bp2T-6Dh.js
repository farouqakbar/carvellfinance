import{G as Ta,M as _a,E as t,x as sa,F as o,D as a,g as ta,o as M,w as c,C as A,A as Ba,h as ra,q as la,t as Da,s as oa,n as D,i as Ma,B as Fa}from"./index-Bwuw86n0.js";function Ia(){const d=[],l=new Date;for(let m=0;m<24;m++){const g=new Date(l.getFullYear(),l.getMonth()+m,1),u=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`;d.push({val:u,label:g.toLocaleDateString("id-ID",{month:"long",year:"numeric"})})}return d}const Ka=Ia(),ia=Fa();function Ra(){const{user:d}=Ta(),l=_a(),[m,g]=t.useState([]),[u,k]=t.useState([]),[ca,da]=t.useState([]),[ma,G]=t.useState(!0),[v,ua]=t.useState("aktif"),[E,F]=t.useState(!1),[i,w]=t.useState({name:"",amount:"",targetMonth:sa(),notes:""}),[O,L]=t.useState(!1),[pa,H]=t.useState(null),[h,S]=t.useState(null),[j,I]=t.useState("gaji"),[y,Y]=t.useState(""),[J,U]=t.useState(""),[Q,V]=t.useState(ia),[C,z]=t.useState(!1),[K,P]=t.useState(!1),[N,R]=t.useState({name:"",amount:""}),[X,Z]=t.useState(!1),[ga,aa]=t.useState(null),[p,T]=t.useState(null),[b,q]=t.useState(""),[f,$]=t.useState("setor"),[_,ea]=t.useState(!1);t.useEffect(()=>{xa()},[]);const xa=async()=>{G(!0);const[e,n,r]=await Promise.all([o.from("plans").select("*").eq("user_id",d.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0}),o.from("savings").select("*").eq("user_id",d.id).order("name"),o.from("categories").select("*").eq("user_id",d.id).order("name")]);g(e.data||[]),k(n.data||[]);const s=r.data||[];da(s),s.length>0&&U(s[0].id),(n.data||[]).length>0&&Y(n.data[0].id),G(!1)},ha=async()=>{const{data:e}=await o.from("plans").select("*").eq("user_id",d.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0});g(e||[])},ba=async()=>{const{data:e}=await o.from("savings").select("*").eq("user_id",d.id).order("name");k(e||[])},fa=async()=>{if(!N.name.trim())return;Z(!0);const{error:e}=await o.from("savings").insert({user_id:d.id,name:N.name.trim(),current_amount:parseFloat(N.amount)||0});e?l("Gagal menyimpan","error"):(l("Kantong ditambahkan","success"),R({name:"",amount:""}),P(!1),ba()),Z(!1)},va=async e=>{aa(e);const{error:n}=await o.from("savings").delete().eq("id",e);n||(k(r=>r.filter(s=>s.id!==e)),l("Kantong dihapus","success")),aa(null)},ja=async()=>{if(!p||!b)return;ea(!0);const e=parseFloat(b)||0,n=f==="setor"?Number(p.current_amount)+e:Math.max(0,Number(p.current_amount)-e),{error:r}=await o.from("savings").update({current_amount:n}).eq("id",p.id);r?l("Gagal update","error"):(k(s=>s.map(x=>x.id===p.id?{...x,current_amount:n}:x)),l(f==="setor"?"Berhasil setor":"Berhasil tarik","success"),T(null),q("")),ea(!1)},ya=async()=>{if(!i.name.trim()||!i.amount||!i.targetMonth)return;L(!0);const{error:e}=await o.from("plans").insert({user_id:d.id,name:i.name.trim(),amount:parseFloat(i.amount),target_month:i.targetMonth,notes:i.notes.trim(),done:!1});e?l("Gagal menyimpan","error"):(l("Rencana ditambahkan","success"),w({name:"",amount:"",targetMonth:sa(),notes:""}),F(!1),ha()),L(!1)},Na=e=>{if(e.done){o.from("plans").update({done:!1}).eq("id",e.id).then(({error:n})=>{n||(g(r=>r.map(s=>s.id===e.id?{...s,done:!1}:s)),l("Ditandai aktif kembali","success"))});return}S(e),I("gaji"),V(ia)},ka=async()=>{if(!h)return;z(!0);const e=h;if(j==="tabungan"){const n=u.find(x=>x.id===y);if(!n){l("Pilih tabungan dulu","error"),z(!1);return}const r=Math.max(0,Number(n.current_amount)-Number(e.amount)),{error:s}=await o.from("savings").update({current_amount:r}).eq("id",y);if(s){l("Gagal update tabungan","error"),z(!1);return}k(x=>x.map(W=>W.id===y?{...W,current_amount:r}:W))}else{const{error:n}=await o.from("transactions").insert({user_id:d.id,category_id:J||null,amount:Number(e.amount),date:Q,description:`Beli: ${e.name}`,type:"expense"});if(n){l("Gagal catat transaksi","error"),z(!1);return}}await o.from("plans").update({done:!0}).eq("id",e.id),g(n=>n.map(r=>r.id===e.id?{...r,done:!0}:r)),l("Rencana selesai dicatat ✓","success"),S(null),z(!1)},wa=async e=>{H(e);const{error:n}=await o.from("plans").delete().eq("id",e);n||(g(r=>r.filter(s=>s.id!==e)),l("Rencana dihapus","success")),H(null)},Sa=m.filter(e=>v==="aktif"?!e.done:v==="selesai"?e.done:!0),B={};Sa.forEach(e=>{B[e.target_month]||(B[e.target_month]=[]),B[e.target_month].push(e)});const na=Object.keys(B).sort(),Ca=m.filter(e=>!e.done).reduce((e,n)=>e+Number(n.amount),0),za=m.filter(e=>e.done).reduce((e,n)=>e+Number(n.amount),0);return a.jsx(a.Fragment,{children:a.jsxs("div",{className:"animate-in",children:[a.jsxs("div",{className:"flex-between",style:{alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:20},children:[a.jsxs("div",{className:"page-header-banner",style:{flex:1,marginBottom:0},children:[a.jsx("div",{className:"page-header-icon",style:{background:"rgba(251,191,36,0.1)",color:"var(--warning)"},children:a.jsx(ta,{size:18})}),a.jsxs("div",{children:[a.jsx("h1",{className:"page-header-title",children:"Rencana"}),a.jsx("p",{className:"page-header-sub",children:"Catat apa saja yang ingin dibeli, berapa, dan kapan"})]})]}),a.jsx("button",{className:"btn btn-primary",style:{flexShrink:0,gap:6},onClick:()=>F(e=>!e),children:E?"✕ Tutup":a.jsxs(a.Fragment,{children:[a.jsx(M,{size:13})," Tambah Rencana"]})})]}),a.jsxs("div",{className:"plans-stat-bar",style:{marginBottom:20},children:[a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Total Rencana"}),a.jsxs("span",{className:"plans-stat-val tabular",children:[m.length," item"]})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Belum terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-warning",children:c(Ca)})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Sudah terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-success",children:c(za)})]})]}),E&&a.jsxs("div",{className:"card plans-form-card animate-in",style:{marginBottom:20},children:[a.jsx("p",{className:"plans-form-title",children:"Tambah Rencana Baru"}),a.jsxs("div",{className:"plans-form-grid",children:[a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsx("label",{className:"form-label",children:"Nama barang / kebutuhan"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"contoh: Beli laptop, Kondangan Budi...",value:i.name,onChange:e=>w(n=>({...n,name:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Estimasi harga"}),a.jsx(A,{value:i.amount,onChange:e=>w(n=>({...n,amount:e}))})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Target bulan"}),a.jsx("select",{className:"form-select",value:i.targetMonth,onChange:e=>w(n=>({...n,targetMonth:e.target.value})),children:Ka.map(e=>a.jsx("option",{value:e.val,children:e.label},e.val))})]}),a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsxs("label",{className:"form-label",children:["Catatan ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),a.jsx("input",{className:"form-input",type:"text",placeholder:"detail tambahan...",value:i.notes,onChange:e=>w(n=>({...n,notes:e.target.value}))})]})]}),a.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>F(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",onClick:ya,disabled:!i.name.trim()||!i.amount||O,children:O?"Menyimpan...":"+ Simpan Rencana"})]})]}),a.jsx("div",{className:"plans-filter-tabs",style:{marginBottom:20},children:["aktif","selesai","semua"].map(e=>a.jsx("button",{className:`plans-filter-btn ${v===e?"active":""}`,onClick:()=>ua(e),children:e==="aktif"?`Aktif (${m.filter(n=>!n.done).length})`:e==="selesai"?`Selesai (${m.filter(n=>n.done).length})`:"Semua"},e))}),ma?a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(3)].map((e,n)=>a.jsx("div",{className:"skeleton",style:{height:76,borderRadius:"var(--radius)"}},n))}):na.length===0?a.jsxs("div",{className:"empty-state",children:[a.jsx("div",{className:"empty-state-icon",children:a.jsx(ta,{size:22})}),a.jsx("strong",{children:v==="aktif"?"Belum ada rencana aktif":v==="selesai"?"Belum ada rencana selesai":"Belum ada rencana"}),a.jsx("p",{children:v==="aktif"?'Tekan "+ Tambah Rencana" untuk mulai mencatat.':"Selesaikan rencana dengan menekan tombol ✓."})]}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:24},children:na.map(e=>{const n=B[e],r=n.reduce((s,x)=>s+Number(x.amount),0);return a.jsxs("div",{children:[a.jsxs("div",{className:"plans-month-header",children:[a.jsx("span",{className:"plans-month-label",children:Ba(e)}),a.jsx("span",{className:"plans-month-total tabular",children:c(r)})]}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:n.map(s=>a.jsxs("div",{className:`plan-card ${s.done?"plan-card-done":""}`,children:[a.jsx("div",{className:"plan-card-icon",children:s.done?a.jsx(ra,{size:15}):a.jsx(la,{size:16})}),a.jsxs("div",{className:"plan-card-body",children:[a.jsx("div",{className:"plan-card-name",children:s.name}),s.notes&&a.jsx("div",{className:"plan-card-notes",children:s.notes})]}),a.jsxs("div",{className:"plan-card-right",children:[a.jsx("span",{className:"plan-card-amount tabular",children:c(s.amount)}),a.jsxs("div",{className:"plan-card-actions",children:[a.jsx("button",{className:`plan-action-btn ${s.done?"plan-action-undo":"plan-action-done"}`,onClick:()=>Na(s),title:s.done?"Tandai aktif":"Tandai selesai",children:s.done?a.jsx(Da,{size:12}):a.jsx(ra,{size:12})}),a.jsx("button",{className:"plan-action-btn plan-action-del",onClick:()=>wa(s.id),disabled:pa===s.id,title:"Hapus",children:a.jsx(oa,{size:12})})]})]})]},s.id))})]},e)})}),a.jsxs("div",{style:{marginTop:40},children:[a.jsxs("div",{className:"flex-between",style:{marginBottom:16,alignItems:"center"},children:[a.jsxs("div",{children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsx("div",{style:{width:32,height:32,borderRadius:8,background:"rgba(52,211,153,0.1)",color:"var(--success)",display:"flex",alignItems:"center",justifyContent:"center"},children:a.jsx(D,{size:16})}),a.jsx("h2",{style:{fontSize:"1rem",fontWeight:800,color:"var(--text-primary)",margin:0},children:"Kantong Tabungan"})]}),a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",margin:"3px 0 0"},children:["Total: ",a.jsx("span",{className:"tabular",style:{color:"var(--success)",fontWeight:700},children:c(u.reduce((e,n)=>e+Number(n.current_amount||0),0))})]})]}),a.jsx("button",{className:"btn btn-secondary",style:{fontSize:"0.78rem",gap:5},onClick:()=>P(e=>!e),children:K?"✕ Tutup":a.jsxs(a.Fragment,{children:[a.jsx(M,{size:12})," Tambah Kantong"]})})]}),K&&a.jsxs("div",{className:"card plans-form-card animate-in",style:{marginBottom:16,borderColor:"var(--success)"},children:[a.jsx("p",{className:"plans-form-title",children:"Kantong Baru"}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Nama kantong"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"contoh: Dana Darurat, Liburan...",value:N.name,onChange:e=>R(n=>({...n,name:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsxs("label",{className:"form-label",children:["Saldo awal ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),a.jsx(A,{value:N.amount,onChange:e=>R(n=>({...n,amount:e}))})]})]}),a.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>P(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",onClick:fa,disabled:!N.name.trim()||X,children:X?"Menyimpan...":"+ Simpan"})]})]}),u.length===0&&!K?a.jsxs("div",{className:"empty-state",style:{padding:"32px 20px"},children:[a.jsx("div",{className:"empty-state-icon",children:a.jsx(D,{size:22})}),a.jsx("strong",{children:"Belum ada kantong tabungan"}),a.jsx("p",{children:"Buat kantong untuk memisahkan dana berdasarkan tujuan."})]}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:u.map(e=>a.jsxs("div",{className:"plan-card",children:[a.jsx("div",{className:"plan-card-icon",style:{background:"rgba(52,211,153,0.12)",borderColor:"rgba(52,211,153,0.3)",color:"var(--success)"},children:a.jsx(D,{size:16})}),a.jsx("div",{className:"plan-card-body",children:a.jsx("div",{className:"plan-card-name",children:e.name})}),a.jsxs("div",{className:"plan-card-right",children:[a.jsx("span",{className:"plan-card-amount tabular",style:{color:e.current_amount>0?"var(--success)":"var(--text-muted)"},children:c(e.current_amount||0)}),a.jsxs("div",{className:"plan-card-actions",children:[a.jsx("button",{className:"plan-action-btn",style:{width:"auto",padding:"0 8px",fontSize:"0.7rem",gap:3},onClick:()=>{T(e),q(""),$("setor")},title:"Setor / Tarik",children:a.jsx(M,{size:12})}),a.jsx("button",{className:"plan-action-btn plan-action-del",onClick:()=>va(e.id),disabled:ga===e.id,title:"Hapus",children:a.jsx(oa,{size:12})})]})]})]},e.id))})]}),p&&a.jsx("div",{className:"modal-overlay",onClick:()=>!_&&T(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:p.name}),a.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>T(null),disabled:_,children:"✕"})]}),a.jsxs("div",{className:"done-plan-info",style:{marginBottom:16},children:[a.jsx("div",{className:"done-plan-icon",children:a.jsx(D,{size:18})}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:"Saldo saat ini"}),a.jsx("div",{className:"done-plan-amount tabular",style:{color:"var(--success)",fontWeight:700,fontSize:"1rem"},children:c(p.current_amount||0)})]})]}),a.jsxs("div",{className:"done-source-toggle",style:{marginBottom:16},children:[a.jsxs("button",{type:"button",className:`done-src-btn ${f==="setor"?"active":""}`,onClick:()=>$("setor"),children:[a.jsx("span",{className:"done-src-icon",children:a.jsx(M,{size:16})}),a.jsx("span",{className:"done-src-label",children:"Setor"}),a.jsx("span",{className:"done-src-sub",children:"Tambah saldo"})]}),a.jsxs("button",{type:"button",className:`done-src-btn ${f==="tarik"?"active":""}`,onClick:()=>$("tarik"),children:[a.jsx("span",{className:"done-src-icon",style:{fontSize:"1.2rem",fontWeight:700},children:"−"}),a.jsx("span",{className:"done-src-label",children:"Tarik"}),a.jsx("span",{className:"done-src-sub",children:"Kurangi saldo"})]})]}),a.jsxs("div",{className:"form-group",style:{margin:"0 0 16px"},children:[a.jsx("label",{className:"form-label",children:"Jumlah"}),a.jsx(A,{value:b,onChange:q})]}),b>0&&a.jsxs("div",{className:"done-preview-box",style:{marginBottom:16},children:[a.jsxs("span",{children:["Saldo setelah ",f==="setor"?"setor":"tarik"]}),a.jsx("span",{className:"tabular",style:{fontWeight:700,color:"var(--success)"},children:c(f==="setor"?Number(p.current_amount)+parseFloat(b):Math.max(0,Number(p.current_amount)-parseFloat(b)))})]}),a.jsxs("div",{className:"flex gap-8",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>T(null),disabled:_,children:"Batal"}),a.jsx("button",{type:"button",className:"btn btn-primary",style:{flex:1},onClick:ja,disabled:!b||_,children:_?"Menyimpan...":f==="setor"?"+ Setor":"− Tarik"})]})]})}),h&&a.jsx("div",{className:"modal-overlay",onClick:()=>!C&&S(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:"Tandai Selesai"}),a.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>S(null),disabled:C,children:"✕"})]}),a.jsxs("div",{className:"done-plan-info",children:[a.jsx("div",{className:"done-plan-icon",children:a.jsx(la,{size:18})}),a.jsxs("div",{children:[a.jsx("div",{className:"done-plan-name",children:h.name}),a.jsx("div",{className:"done-plan-amount tabular",children:c(h.amount)})]})]}),a.jsx("p",{className:"done-modal-q",children:"Dari mana uangnya?"}),a.jsxs("div",{className:"done-source-toggle",children:[a.jsxs("button",{type:"button",className:`done-src-btn ${j==="gaji"?"active":""}`,onClick:()=>I("gaji"),children:[a.jsx("span",{className:"done-src-icon",children:a.jsx(Ma,{size:16})}),a.jsx("span",{className:"done-src-label",children:"Potongan Gaji"}),a.jsx("span",{className:"done-src-sub",children:"Dicatat sebagai pengeluaran"})]}),a.jsxs("button",{type:"button",className:`done-src-btn ${j==="tabungan"?"active":""}`,onClick:()=>I("tabungan"),children:[a.jsx("span",{className:"done-src-icon",children:a.jsx(D,{size:16})}),a.jsx("span",{className:"done-src-label",children:"Dari Tabungan"}),a.jsx("span",{className:"done-src-sub",children:"Kurangi saldo tabungan"})]})]}),j==="gaji"&&a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Kategori pengeluaran"}),a.jsxs("select",{className:"form-select",value:J,onChange:e=>U(e.target.value),children:[a.jsx("option",{value:"",children:"— Tanpa kategori —"}),ca.map(e=>a.jsx("option",{value:e.id,children:e.name},e.id))]})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Tanggal transaksi"}),a.jsx("input",{className:"form-input",type:"date",value:Q,onChange:e=>V(e.target.value)})]}),a.jsxs("div",{className:"done-preview-box",children:[a.jsx("span",{children:"Pengeluaran dicatat sebesar"}),a.jsx("span",{className:"tabular",style:{color:"var(--danger)",fontWeight:700},children:c(h.amount)})]})]}),j==="tabungan"&&a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:u.length===0?a.jsx("p",{style:{fontSize:"0.8rem",color:"var(--text-muted)"},children:"Belum ada tabungan. Buat dulu di menu lain."}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Pilih tabungan"}),a.jsx("select",{className:"form-select",value:y,onChange:e=>Y(e.target.value),children:u.map(e=>a.jsxs("option",{value:e.id,children:[e.name," — ",c(e.current_amount)]},e.id))})]}),y&&(()=>{const e=u.find(s=>s.id===y),n=Math.max(0,Number((e==null?void 0:e.current_amount)||0)-Number(h.amount)),r=Number((e==null?void 0:e.current_amount)||0)>=Number(h.amount);return a.jsxs("div",{className:`done-preview-box ${r?"":"done-preview-warn"}`,children:[a.jsx("span",{children:"Saldo setelah dikurangi"}),a.jsx("span",{className:"tabular",style:{color:r?"var(--success)":"var(--danger)",fontWeight:700},children:c(n)})]})})()]})}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>S(null),disabled:C,children:"Batal"}),a.jsx("button",{type:"button",className:"btn btn-primary",style:{flex:1},onClick:ka,disabled:C||j==="tabungan"&&u.length===0,children:C?"Menyimpan...":"✓ Tandai Selesai"})]})]})}),a.jsx("style",{children:`
        .plans-stat-bar {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 14px 20px;
          gap: 0;
          flex-wrap: wrap;
        }
        .plans-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 0 20px;
          flex: 1;
          min-width: 100px;
        }
        .plans-stat:first-child { padding-left: 0; }
        .plans-stat:last-child { padding-right: 0; }
        .plans-stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border);
          flex-shrink: 0;
        }
        .plans-stat-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .plans-stat-val {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
        }

        .plans-form-card { border-color: var(--accent); }
        .plans-form-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .plans-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .plans-filter-tabs {
          display: flex;
          gap: 6px;
        }
        .plans-filter-btn {
          background: none;
          border: 1px solid var(--border);
          border-radius: 99px;
          padding: 5px 14px;
          font-family: var(--font-sans);
          font-size: 0.775rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s;
        }
        .plans-filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-light);
        }
        .plans-filter-btn.active {
          background: var(--accent-dim);
          border-color: var(--accent);
          color: var(--accent);
        }

        .plans-month-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          padding: 0 2px;
        }
        .plans-month-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }
        .plans-month-total {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .plan-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 14px 16px;
          transition: border-color 0.15s, background 0.15s;
        }
        .plan-card:hover { border-color: var(--border-light); background: var(--bg-card-hover); }
        .plan-card-done {
          opacity: 0.55;
        }
        .plan-card-done .plan-card-name {
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .plan-card-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--bg-input);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          color: var(--text-secondary);
        }
        .plan-card-done .plan-card-icon {
          background: var(--success-dim);
          border-color: var(--success);
          color: var(--success);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .plan-card-body {
          flex: 1;
          min-width: 0;
        }
        .plan-card-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .plan-card-notes {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .plan-card-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .plan-card-amount {
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .plan-card-actions {
          display: flex;
          gap: 4px;
        }
        .plan-action-btn {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: none;
          cursor: pointer;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          color: var(--text-muted);
          font-family: var(--font-sans);
        }
        .plan-action-done:hover { background: var(--success-dim); border-color: var(--success); color: var(--success); }
        .plan-action-undo:hover { background: var(--warning-dim); border-color: var(--warning); color: var(--warning); }
        .plan-action-del:hover { background: var(--danger-dim); border-color: var(--danger); color: var(--danger); }
        .plan-action-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        @media (max-width: 640px) {
          .plans-stat-bar { gap: 6px; padding: 12px 14px; }
          .plans-stat { padding: 0 8px; }
          .plans-stat-val { font-size: 0.875rem; }
          .plans-form-grid { grid-template-columns: 1fr; }
          .plans-form-grid .form-group[style*="span 2"] { grid-column: span 1; }
          .plan-card { padding: 12px; gap: 8px; flex-wrap: wrap; }
          .plan-card-amount { display: block; font-size: 0.8rem; }
          .plan-card-body { flex: 1; min-width: 140px; }
          .plan-card-right { width: 100%; justify-content: space-between; }
          .plan-card-actions { gap: 6px; }
        }

        /* ── Done modal ──────────────────────── */
        .done-plan-info {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          margin-bottom: 16px;
        }
        .done-plan-icon {
          width: 36px; height: 36px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .done-plan-name {
          font-size: 0.875rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: 2px;
        }
        .done-plan-amount { font-size: 0.8rem; color: var(--text-secondary); }

        .done-modal-q {
          font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.07em; color: var(--text-muted); margin-bottom: 10px;
        }

        .done-source-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .done-src-btn {
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 3px; padding: 12px 14px;
          background: var(--bg-input);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer; text-align: left;
          transition: all 0.15s;
          font-family: var(--font-sans);
        }
        .done-src-btn:hover { border-color: var(--border-light); background: var(--bg-card-hover); }
        .done-src-btn.active {
          border-color: var(--accent);
          background: var(--accent-dim);
        }
        .done-src-icon { font-size: 1.1rem; margin-bottom: 2px; }
        .done-src-label {
          font-size: 0.8rem; font-weight: 700;
          color: var(--text-primary); line-height: 1.2;
        }
        .done-src-sub {
          font-size: 0.65rem; color: var(--text-muted);
          font-weight: 500; line-height: 1.3;
        }
        .done-src-btn.active .done-src-label { color: var(--accent); }

        .done-preview-box {
          display: flex; justify-content: space-between; align-items: center;
          background: var(--bg-input); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 10px 14px;
          font-size: 0.8rem; color: var(--text-secondary); font-weight: 500;
        }
        .done-preview-warn { border-color: rgba(248,113,113,0.4); background: var(--danger-dim); }
      `})]})})}export{Ra as default};
