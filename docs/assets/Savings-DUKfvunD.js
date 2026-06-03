import{H as Ba,N as Da,F as t,y as ta,G as o,E as a,g as ra,o as M,x as d,C as E,B as Ma,h as la,q as oa,t as Ia,s as ia,n as D,u as da,i as Fa,D as Ka}from"./index-ClFMH9K_.js";function Pa(){const c=[],l=new Date;for(let m=0;m<24;m++){const g=new Date(l.getFullYear(),l.getMonth()+m,1),u=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`;c.push({val:u,label:g.toLocaleDateString("id-ID",{month:"long",year:"numeric"})})}return c}const Ra=Pa(),ca=Ka();function $a(){const{user:c}=Ba(),l=Da(),[m,g]=t.useState([]),[u,w]=t.useState([]),[ma,ua]=t.useState([]),[pa,G]=t.useState(!0),[v,ga]=t.useState("aktif"),[O,I]=t.useState(!1),[i,S]=t.useState({name:"",amount:"",targetMonth:ta(),notes:""}),[H,L]=t.useState(!1),[xa,Y]=t.useState(null),[x,C]=t.useState(null),[j,F]=t.useState("gaji"),[y,J]=t.useState(""),[U,X]=t.useState(""),[Q,V]=t.useState(ca),[z,N]=t.useState(!1),[K,P]=t.useState(!1),[k,R]=t.useState({name:"",amount:""}),[Z,aa]=t.useState(!1),[ha,ea]=t.useState(null),[p,T]=t.useState(null),[h,q]=t.useState(""),[b,$]=t.useState("setor"),[_,na]=t.useState(!1);t.useEffect(()=>{ba()},[]);const ba=async()=>{G(!0);const[e,n,r]=await Promise.all([o.from("plans").select("*").eq("user_id",c.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0}),o.from("savings").select("*").eq("user_id",c.id).order("name"),o.from("categories").select("*").eq("user_id",c.id).order("name")]);g(e.data||[]),w(n.data||[]);const s=r.data||[];ua(s),s.length>0&&X(s[0].id),(n.data||[]).length>0&&J(n.data[0].id),G(!1)},fa=async()=>{const{data:e}=await o.from("plans").select("*").eq("user_id",c.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0});g(e||[])},va=async()=>{const{data:e}=await o.from("savings").select("*").eq("user_id",c.id).order("name");w(e||[])},ja=async()=>{if(!k.name.trim())return;aa(!0);const{error:e}=await o.from("savings").insert({user_id:c.id,name:k.name.trim(),current_amount:parseFloat(k.amount)||0});e?l("Gagal menyimpan","error"):(l("Kantong ditambahkan","success"),R({name:"",amount:""}),P(!1),va()),aa(!1)},ya=async e=>{ea(e);const{error:n}=await o.from("savings").delete().eq("id",e);n||(w(r=>r.filter(s=>s.id!==e)),l("Kantong dihapus","success")),ea(null)},Na=async()=>{if(!p||!h)return;na(!0);const e=parseFloat(h)||0,n=b==="setor"?Number(p.current_amount)+e:Math.max(0,Number(p.current_amount)-e),{error:r}=await o.from("savings").update({current_amount:n}).eq("id",p.id);r?l("Gagal update","error"):(w(s=>s.map(f=>f.id===p.id?{...f,current_amount:n}:f)),l(b==="setor"?"Berhasil setor":"Berhasil tarik","success"),T(null),q("")),na(!1)},ka=async()=>{if(!i.name.trim()||!i.amount||!i.targetMonth)return;L(!0);const{error:e}=await o.from("plans").insert({user_id:c.id,name:i.name.trim(),amount:parseFloat(i.amount),target_month:i.targetMonth,notes:i.notes.trim(),done:!1});e?l("Gagal menyimpan","error"):(l("Rencana ditambahkan","success"),S({name:"",amount:"",targetMonth:ta(),notes:""}),I(!1),fa()),L(!1)},wa=e=>{if(e.done){o.from("plans").update({done:!1}).eq("id",e.id).then(({error:n})=>{if(n){l(n.message,"error");return}g(r=>r.map(s=>s.id===e.id?{...s,done:!1}:s)),l("Ditandai aktif kembali","success")});return}C(e),F("gaji"),V(ca)},Sa=async()=>{if(!x)return;N(!0);const e=x;if(j==="tabungan"){const r=u.find(W=>W.id===y);if(!r){l("Pilih tabungan dulu","error"),N(!1);return}const s=Math.max(0,Number(r.current_amount)-Number(e.amount)),{error:f}=await o.from("savings").update({current_amount:s}).eq("id",y);if(f){l("Gagal update tabungan","error"),N(!1);return}w(W=>W.map(A=>A.id===y?{...A,current_amount:s}:A))}else{const{error:r}=await o.from("transactions").insert({user_id:c.id,category_id:U||null,amount:Number(e.amount),date:Q,description:`Beli: ${e.name}`,type:"expense"});if(r){l("Gagal catat transaksi","error"),N(!1);return}}const{error:n}=await o.from("plans").update({done:!0}).eq("id",e.id);if(n){l(n.message,"error"),N(!1);return}g(r=>r.map(s=>s.id===e.id?{...s,done:!0}:s)),l("Rencana selesai dicatat ✓","success"),C(null),N(!1)},Ca=async e=>{Y(e);const{error:n}=await o.from("plans").delete().eq("id",e);n||(g(r=>r.filter(s=>s.id!==e)),l("Rencana dihapus","success")),Y(null)},za=m.filter(e=>v==="aktif"?!e.done:v==="selesai"?e.done:!0),B={};za.forEach(e=>{B[e.target_month]||(B[e.target_month]=[]),B[e.target_month].push(e)});const sa=Object.keys(B).sort(),Ta=m.filter(e=>!e.done).reduce((e,n)=>e+Number(n.amount),0),_a=m.filter(e=>e.done).reduce((e,n)=>e+Number(n.amount),0);return a.jsx(a.Fragment,{children:a.jsxs("div",{className:"animate-in",children:[a.jsxs("div",{className:"flex-between",style:{alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:20},children:[a.jsxs("div",{className:"page-header-banner",style:{flex:1,marginBottom:0},children:[a.jsx("div",{className:"page-header-icon",style:{background:"rgba(251,191,36,0.1)",color:"var(--warning)"},children:a.jsx(ra,{size:18})}),a.jsxs("div",{children:[a.jsx("h1",{className:"page-header-title",children:"Rencana"}),a.jsx("p",{className:"page-header-sub",children:"Catat apa saja yang ingin dibeli, berapa, dan kapan"})]})]}),a.jsx("button",{className:"btn btn-primary",style:{flexShrink:0,gap:6},onClick:()=>I(e=>!e),children:O?"✕ Tutup":a.jsxs(a.Fragment,{children:[a.jsx(M,{size:13})," Tambah Rencana"]})})]}),a.jsxs("div",{className:"plans-stat-bar",style:{marginBottom:20},children:[a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Total Rencana"}),a.jsxs("span",{className:"plans-stat-val tabular",children:[m.length," item"]})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Belum terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-warning",children:d(Ta)})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Sudah terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-success",children:d(_a)})]})]}),O&&a.jsxs("div",{className:"card plans-form-card animate-in",style:{marginBottom:20},children:[a.jsx("p",{className:"plans-form-title",children:"Tambah Rencana Baru"}),a.jsxs("div",{className:"plans-form-grid",children:[a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsx("label",{className:"form-label",children:"Nama barang / kebutuhan"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"contoh: Beli laptop, Kondangan Budi...",value:i.name,onChange:e=>S(n=>({...n,name:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Estimasi harga"}),a.jsx(E,{value:i.amount,onChange:e=>S(n=>({...n,amount:e}))})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Target bulan"}),a.jsx("select",{className:"form-select",value:i.targetMonth,onChange:e=>S(n=>({...n,targetMonth:e.target.value})),children:Ra.map(e=>a.jsx("option",{value:e.val,children:e.label},e.val))})]}),a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsxs("label",{className:"form-label",children:["Catatan ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),a.jsx("input",{className:"form-input",type:"text",placeholder:"detail tambahan...",value:i.notes,onChange:e=>S(n=>({...n,notes:e.target.value}))})]})]}),a.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>I(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",onClick:ka,disabled:!i.name.trim()||!i.amount||H,children:H?"Menyimpan...":"+ Simpan Rencana"})]})]}),a.jsx("div",{className:"plans-filter-tabs",style:{marginBottom:20},children:["aktif","selesai","semua"].map(e=>a.jsx("button",{className:`plans-filter-btn ${v===e?"active":""}`,onClick:()=>ga(e),children:e==="aktif"?`Aktif (${m.filter(n=>!n.done).length})`:e==="selesai"?`Selesai (${m.filter(n=>n.done).length})`:"Semua"},e))}),pa?a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(3)].map((e,n)=>a.jsx("div",{className:"skeleton",style:{height:76,borderRadius:"var(--radius)"}},n))}):sa.length===0?a.jsxs("div",{className:"empty-state",children:[a.jsx("div",{className:"empty-state-icon",children:a.jsx(ra,{size:22})}),a.jsx("strong",{children:v==="aktif"?"Belum ada rencana aktif":v==="selesai"?"Belum ada rencana selesai":"Belum ada rencana"}),a.jsx("p",{children:v==="aktif"?'Tekan "+ Tambah Rencana" untuk mulai mencatat.':"Selesaikan rencana dengan menekan tombol ✓."})]}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:24},children:sa.map(e=>{const n=B[e],r=n.reduce((s,f)=>s+Number(f.amount),0);return a.jsxs("div",{children:[a.jsxs("div",{className:"plans-month-header",children:[a.jsx("span",{className:"plans-month-label",children:Ma(e)}),a.jsx("span",{className:"plans-month-total tabular",children:d(r)})]}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:n.map(s=>a.jsxs("div",{className:`plan-card ${s.done?"plan-card-done":""}`,children:[a.jsx("div",{className:"plan-card-icon",children:s.done?a.jsx(la,{size:15}):a.jsx(oa,{size:16})}),a.jsxs("div",{className:"plan-card-body",children:[a.jsx("div",{className:"plan-card-name",children:s.name}),s.notes&&a.jsx("div",{className:"plan-card-notes",children:s.notes})]}),a.jsxs("div",{className:"plan-card-right",children:[a.jsx("span",{className:"plan-card-amount tabular",children:d(s.amount)}),a.jsxs("div",{className:"plan-card-actions",children:[a.jsx("button",{className:`plan-action-btn ${s.done?"plan-action-undo":"plan-action-done"}`,onClick:()=>wa(s),title:s.done?"Tandai aktif":"Tandai selesai",children:s.done?a.jsx(Ia,{size:12}):a.jsx(la,{size:12})}),a.jsx("button",{className:"plan-action-btn plan-action-del",onClick:()=>Ca(s.id),disabled:xa===s.id,title:"Hapus",children:a.jsx(ia,{size:12})})]})]})]},s.id))})]},e)})}),a.jsxs("div",{style:{marginTop:40},children:[a.jsxs("div",{className:"flex-between",style:{marginBottom:16,alignItems:"center"},children:[a.jsxs("div",{children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsx("div",{style:{width:32,height:32,borderRadius:8,background:"rgba(52,211,153,0.1)",color:"var(--success)",display:"flex",alignItems:"center",justifyContent:"center"},children:a.jsx(D,{size:16})}),a.jsx("h2",{style:{fontSize:"1rem",fontWeight:800,color:"var(--text-primary)",margin:0},children:"Kantong Tabungan"})]}),a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",margin:"3px 0 0"},children:["Total: ",a.jsx("span",{className:"tabular",style:{color:"var(--success)",fontWeight:700},children:d(u.reduce((e,n)=>e+Number(n.current_amount||0),0))})]})]}),a.jsx("button",{className:"btn btn-secondary",style:{fontSize:"0.78rem",gap:5},onClick:()=>P(e=>!e),children:K?"✕ Tutup":a.jsxs(a.Fragment,{children:[a.jsx(M,{size:12})," Tambah Kantong"]})})]}),K&&a.jsxs("div",{className:"card plans-form-card animate-in",style:{marginBottom:16,borderColor:"var(--success)"},children:[a.jsx("p",{className:"plans-form-title",children:"Kantong Baru"}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Nama kantong"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"contoh: Dana Darurat, Liburan...",value:k.name,onChange:e=>R(n=>({...n,name:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsxs("label",{className:"form-label",children:["Saldo awal ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),a.jsx(E,{value:k.amount,onChange:e=>R(n=>({...n,amount:e}))})]})]}),a.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>P(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",onClick:ja,disabled:!k.name.trim()||Z,children:Z?"Menyimpan...":"+ Simpan"})]})]}),u.length===0&&!K?a.jsxs("div",{className:"empty-state",style:{padding:"32px 20px"},children:[a.jsx("div",{className:"empty-state-icon",children:a.jsx(D,{size:22})}),a.jsx("strong",{children:"Belum ada kantong tabungan"}),a.jsx("p",{children:"Buat kantong untuk memisahkan dana berdasarkan tujuan."})]}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:u.map(e=>a.jsxs("div",{className:"plan-card",children:[a.jsx("div",{className:"plan-card-icon",style:{background:"rgba(52,211,153,0.12)",borderColor:"rgba(52,211,153,0.3)",color:"var(--success)"},children:a.jsx(D,{size:16})}),a.jsx("div",{className:"plan-card-body",children:a.jsx("div",{className:"plan-card-name",children:e.name})}),a.jsxs("div",{className:"plan-card-right",children:[a.jsx("span",{className:"plan-card-amount tabular",style:{color:e.current_amount>0?"var(--success)":"var(--text-muted)"},children:d(e.current_amount||0)}),a.jsxs("div",{className:"plan-card-actions",children:[a.jsx("button",{className:"plan-action-btn",style:{width:"auto",padding:"0 8px",fontSize:"0.7rem",gap:3},onClick:()=>{T(e),q(""),$("setor")},title:"Setor / Tarik",children:a.jsx(M,{size:12})}),a.jsx("button",{className:"plan-action-btn plan-action-del",onClick:()=>ya(e.id),disabled:ha===e.id,title:"Hapus",children:a.jsx(ia,{size:12})})]})]})]},e.id))})]}),p&&a.jsx("div",{className:"modal-overlay",onClick:()=>!_&&T(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:p.name}),a.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>T(null),disabled:_,children:a.jsx(da,{size:16})})]}),a.jsxs("div",{className:"done-plan-info",style:{marginBottom:16},children:[a.jsx("div",{className:"done-plan-icon",children:a.jsx(D,{size:18})}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:"Saldo saat ini"}),a.jsx("div",{className:"done-plan-amount tabular",style:{color:"var(--success)",fontWeight:700,fontSize:"1rem"},children:d(p.current_amount||0)})]})]}),a.jsxs("div",{className:"done-source-toggle",style:{marginBottom:16},children:[a.jsxs("button",{type:"button",className:`done-src-btn ${b==="setor"?"active":""}`,onClick:()=>$("setor"),children:[a.jsx("span",{className:"done-src-icon",children:a.jsx(M,{size:16})}),a.jsx("span",{className:"done-src-label",children:"Setor"}),a.jsx("span",{className:"done-src-sub",children:"Tambah saldo"})]}),a.jsxs("button",{type:"button",className:`done-src-btn ${b==="tarik"?"active":""}`,onClick:()=>$("tarik"),children:[a.jsx("span",{className:"done-src-icon",style:{fontSize:"1.2rem",fontWeight:700},children:"−"}),a.jsx("span",{className:"done-src-label",children:"Tarik"}),a.jsx("span",{className:"done-src-sub",children:"Kurangi saldo"})]})]}),a.jsxs("div",{className:"form-group",style:{margin:"0 0 16px"},children:[a.jsx("label",{className:"form-label",children:"Jumlah"}),a.jsx(E,{value:h,onChange:q})]}),h>0&&a.jsxs("div",{className:"done-preview-box",style:{marginBottom:16},children:[a.jsxs("span",{children:["Saldo setelah ",b==="setor"?"setor":"tarik"]}),a.jsx("span",{className:"tabular",style:{fontWeight:700,color:"var(--success)"},children:d(b==="setor"?Number(p.current_amount)+parseFloat(h):Math.max(0,Number(p.current_amount)-parseFloat(h)))})]}),a.jsxs("div",{className:"flex gap-8",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>T(null),disabled:_,children:"Batal"}),a.jsx("button",{type:"button",className:"btn btn-primary",style:{flex:1},onClick:Na,disabled:!h||_,children:_?"Menyimpan...":b==="setor"?"+ Setor":"− Tarik"})]})]})}),x&&a.jsx("div",{className:"modal-overlay",onClick:()=>!z&&C(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:"Tandai Selesai"}),a.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>C(null),disabled:z,children:a.jsx(da,{size:16})})]}),a.jsxs("div",{className:"done-plan-info",children:[a.jsx("div",{className:"done-plan-icon",children:a.jsx(oa,{size:18})}),a.jsxs("div",{children:[a.jsx("div",{className:"done-plan-name",children:x.name}),a.jsx("div",{className:"done-plan-amount tabular",children:d(x.amount)})]})]}),a.jsx("p",{className:"done-modal-q",children:"Dari mana uangnya?"}),a.jsxs("div",{className:"done-source-toggle",children:[a.jsxs("button",{type:"button",className:`done-src-btn ${j==="gaji"?"active":""}`,onClick:()=>F("gaji"),children:[a.jsx("span",{className:"done-src-icon",children:a.jsx(Fa,{size:16})}),a.jsx("span",{className:"done-src-label",children:"Potongan Gaji"}),a.jsx("span",{className:"done-src-sub",children:"Dicatat sebagai pengeluaran"})]}),a.jsxs("button",{type:"button",className:`done-src-btn ${j==="tabungan"?"active":""}`,onClick:()=>F("tabungan"),children:[a.jsx("span",{className:"done-src-icon",children:a.jsx(D,{size:16})}),a.jsx("span",{className:"done-src-label",children:"Dari Tabungan"}),a.jsx("span",{className:"done-src-sub",children:"Kurangi saldo tabungan"})]})]}),j==="gaji"&&a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Kategori pengeluaran"}),a.jsxs("select",{className:"form-select",value:U,onChange:e=>X(e.target.value),children:[a.jsx("option",{value:"",children:"— Tanpa kategori —"}),ma.map(e=>a.jsx("option",{value:e.id,children:e.name},e.id))]})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Tanggal transaksi"}),a.jsx("input",{className:"form-input",type:"date",value:Q,onChange:e=>V(e.target.value)})]}),a.jsxs("div",{className:"done-preview-box",children:[a.jsx("span",{children:"Pengeluaran dicatat sebesar"}),a.jsx("span",{className:"tabular",style:{color:"var(--danger)",fontWeight:700},children:d(x.amount)})]})]}),j==="tabungan"&&a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:u.length===0?a.jsx("p",{style:{fontSize:"0.8rem",color:"var(--text-muted)"},children:"Belum ada tabungan. Buat dulu di menu lain."}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Pilih tabungan"}),a.jsx("select",{className:"form-select",value:y,onChange:e=>J(e.target.value),children:u.map(e=>a.jsxs("option",{value:e.id,children:[e.name," — ",d(e.current_amount)]},e.id))})]}),y&&(()=>{const e=u.find(s=>s.id===y),n=Math.max(0,Number((e==null?void 0:e.current_amount)||0)-Number(x.amount)),r=Number((e==null?void 0:e.current_amount)||0)>=Number(x.amount);return a.jsxs("div",{className:`done-preview-box ${r?"":"done-preview-warn"}`,children:[a.jsx("span",{children:"Saldo setelah dikurangi"}),a.jsx("span",{className:"tabular",style:{color:r?"var(--success)":"var(--danger)",fontWeight:700},children:d(n)})]})})()]})}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>C(null),disabled:z,children:"Batal"}),a.jsx("button",{type:"button",className:"btn btn-primary",style:{flex:1},onClick:Sa,disabled:z||j==="tabungan"&&u.length===0,children:z?"Menyimpan...":"✓ Tandai Selesai"})]})]})}),a.jsx("style",{children:`
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
          .plans-stat-bar { gap: 0; padding: 10px 14px; flex-wrap: nowrap; }
          .plans-stat { padding: 0 10px; }
          .plans-stat:first-child { padding-left: 0; }
          .plans-stat:last-child { padding-right: 0; }
          .plans-stat-val { font-size: 0.8rem; }
          .plans-stat-label { font-size: 0.6rem; }
          .plans-form-grid { grid-template-columns: 1fr; }
          .plans-form-grid .form-group[style*="span 2"] { grid-column: span 1; }
          .plan-card { padding: 12px; gap: 8px; }
          .plan-card-amount { font-size: 0.8rem; }
          .plan-card-body { flex: 1; min-width: 0; }
          .plan-card-actions { gap: 6px; }
        }
        @media (max-width: 400px) {
          .plans-stat-bar { flex-wrap: wrap; gap: 8px; }
          .plans-stat-divider { display: none; }
          .plans-stat { padding: 0; flex: 1 1 auto; }
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
      `})]})})}export{$a as default};
