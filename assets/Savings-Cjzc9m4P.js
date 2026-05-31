import{u as ea,e as na,r,s as d,j as a}from"./index-CohJMNge.js";import{g as A,f as u,a as ta}from"./formatCurrency-CwSiFA8N.js";import{C as sa}from"./CurrencyInput-lPopDiig.js";function ra(){const c=[],o=new Date;for(let i=0;i<24;i++){const m=new Date(o.getFullYear(),o.getMonth()+i,1),g=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`;c.push({val:g,label:m.toLocaleDateString("id-ID",{month:"long",year:"numeric"})})}return c}const la=ra(),O=new Date().toISOString().split("T")[0];function ca(){const{user:c}=ea(),o=na(),[i,m]=r.useState([]),[g,D]=r.useState([]),[E,W]=r.useState([]),[G,T]=r.useState(!0),[x,K]=r.useState("aktif"),[_,w]=r.useState(!1),[l,b]=r.useState({name:"",amount:"",targetMonth:A(),notes:""}),[z,M]=r.useState(!1),[L,B]=r.useState(null),[p,v]=r.useState(null),[h,S]=r.useState("gaji"),[f,R]=r.useState(""),[P,$]=r.useState(""),[q,I]=r.useState(O),[j,y]=r.useState(!1);r.useEffect(()=>{Y()},[]);const Y=async()=>{T(!0);const[e,n,s]=await Promise.all([d.from("plans").select("*").eq("user_id",c.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0}),d.from("savings").select("*").eq("user_id",c.id).order("name"),d.from("categories").select("*").eq("user_id",c.id).order("name")]);m(e.data||[]),D(n.data||[]);const t=s.data||[];W(t),t.length>0&&$(t[0].id),(n.data||[]).length>0&&R(n.data[0].id),T(!1)},H=async()=>{const{data:e}=await d.from("plans").select("*").eq("user_id",c.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0});m(e||[])},J=async()=>{if(!l.name.trim()||!l.amount||!l.targetMonth)return;M(!0);const{error:e}=await d.from("plans").insert({user_id:c.id,name:l.name.trim(),amount:parseFloat(l.amount),target_month:l.targetMonth,notes:l.notes.trim(),done:!1});e?o("Gagal menyimpan","error"):(o("Rencana ditambahkan","success"),b({name:"",amount:"",targetMonth:A(),notes:""}),w(!1),H()),M(!1)},Q=e=>{if(e.done){d.from("plans").update({done:!1}).eq("id",e.id).then(({error:n})=>{n||(m(s=>s.map(t=>t.id===e.id?{...t,done:!1}:t)),o("Ditandai aktif kembali","success"))});return}v(e),S("gaji"),I(O)},U=async()=>{if(!p)return;y(!0);const e=p;if(h==="tabungan"){const n=g.find(k=>k.id===f);if(!n){o("Pilih tabungan dulu","error"),y(!1);return}const s=Math.max(0,Number(n.current_amount)-Number(e.amount)),{error:t}=await d.from("savings").update({current_amount:s}).eq("id",f);if(t){o("Gagal update tabungan","error"),y(!1);return}D(k=>k.map(C=>C.id===f?{...C,current_amount:s}:C))}else{const{error:n}=await d.from("transactions").insert({user_id:c.id,category_id:P||null,amount:Number(e.amount),date:q,description:`Beli: ${e.name}`,type:"expense"});if(n){o("Gagal catat transaksi","error"),y(!1);return}}await d.from("plans").update({done:!0}).eq("id",e.id),m(n=>n.map(s=>s.id===e.id?{...s,done:!0}:s)),o("Rencana selesai dicatat ✓","success"),v(null),y(!1)},V=async e=>{B(e);const{error:n}=await d.from("plans").delete().eq("id",e);n||(m(s=>s.filter(t=>t.id!==e)),o("Rencana dihapus","success")),B(null)},X=i.filter(e=>x==="aktif"?!e.done:x==="selesai"?e.done:!0),N={};X.forEach(e=>{N[e.target_month]||(N[e.target_month]=[]),N[e.target_month].push(e)});const F=Object.keys(N).sort(),Z=i.filter(e=>!e.done).reduce((e,n)=>e+Number(n.amount),0),aa=i.filter(e=>e.done).reduce((e,n)=>e+Number(n.amount),0);return a.jsxs("div",{className:"animate-in",children:[a.jsxs("div",{className:"flex-between",style:{alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:20},children:[a.jsxs("div",{children:[a.jsx("h1",{className:"page-title",children:"Rencana"}),a.jsx("p",{className:"page-subtitle",style:{marginBottom:0},children:"Catat apa saja yang ingin dibeli, berapa, dan kapan"})]}),a.jsx("button",{className:"btn btn-primary",onClick:()=>w(e=>!e),children:_?"✕ Tutup":"+ Tambah Rencana"})]}),a.jsxs("div",{className:"plans-stat-bar",style:{marginBottom:20},children:[a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Total Rencana"}),a.jsxs("span",{className:"plans-stat-val tabular",children:[i.length," item"]})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Belum terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-warning",children:u(Z)})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Sudah terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-success",children:u(aa)})]})]}),_&&a.jsxs("div",{className:"card plans-form-card animate-in",style:{marginBottom:20},children:[a.jsx("p",{className:"plans-form-title",children:"Tambah Rencana Baru"}),a.jsxs("div",{className:"plans-form-grid",children:[a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsx("label",{className:"form-label",children:"Nama barang / kebutuhan"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"contoh: Beli laptop, Kondangan Budi...",value:l.name,onChange:e=>b(n=>({...n,name:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Estimasi harga"}),a.jsx(sa,{value:l.amount,onChange:e=>b(n=>({...n,amount:e}))})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Target bulan"}),a.jsx("select",{className:"form-select",value:l.targetMonth,onChange:e=>b(n=>({...n,targetMonth:e.target.value})),children:la.map(e=>a.jsx("option",{value:e.val,children:e.label},e.val))})]}),a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsxs("label",{className:"form-label",children:["Catatan ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),a.jsx("input",{className:"form-input",type:"text",placeholder:"detail tambahan...",value:l.notes,onChange:e=>b(n=>({...n,notes:e.target.value}))})]})]}),a.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>w(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",onClick:J,disabled:!l.name.trim()||!l.amount||z,children:z?"Menyimpan...":"+ Simpan Rencana"})]})]}),a.jsx("div",{className:"plans-filter-tabs",style:{marginBottom:20},children:["aktif","selesai","semua"].map(e=>a.jsx("button",{className:`plans-filter-btn ${x===e?"active":""}`,onClick:()=>K(e),children:e==="aktif"?`Aktif (${i.filter(n=>!n.done).length})`:e==="selesai"?`Selesai (${i.filter(n=>n.done).length})`:"Semua"},e))}),G?a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(3)].map((e,n)=>a.jsx("div",{className:"skeleton",style:{height:76,borderRadius:"var(--radius)"}},n))}):F.length===0?a.jsxs("div",{className:"empty-state",children:[a.jsx("div",{className:"empty-state-icon",children:"📋"}),a.jsx("strong",{children:x==="aktif"?"Belum ada rencana aktif":x==="selesai"?"Belum ada rencana selesai":"Belum ada rencana"}),a.jsx("p",{children:x==="aktif"?'Tekan "+ Tambah Rencana" untuk mulai mencatat.':"Selesaikan rencana dengan menekan tombol ✓."})]}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:24},children:F.map(e=>{const n=N[e],s=n.reduce((t,k)=>t+Number(k.amount),0);return a.jsxs("div",{children:[a.jsxs("div",{className:"plans-month-header",children:[a.jsx("span",{className:"plans-month-label",children:ta(e)}),a.jsx("span",{className:"plans-month-total tabular",children:u(s)})]}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:n.map(t=>a.jsxs("div",{className:`plan-card ${t.done?"plan-card-done":""}`,children:[a.jsx("div",{className:"plan-card-icon",children:t.done?"✓":"🛒"}),a.jsxs("div",{className:"plan-card-body",children:[a.jsx("div",{className:"plan-card-name",children:t.name}),t.notes&&a.jsx("div",{className:"plan-card-notes",children:t.notes})]}),a.jsxs("div",{className:"plan-card-right",children:[a.jsx("span",{className:"plan-card-amount tabular",children:u(t.amount)}),a.jsxs("div",{className:"plan-card-actions",children:[a.jsx("button",{className:`plan-action-btn ${t.done?"plan-action-undo":"plan-action-done"}`,onClick:()=>Q(t),title:t.done?"Tandai aktif":"Tandai selesai",children:t.done?"↩":"✓"}),a.jsx("button",{className:"plan-action-btn plan-action-del",onClick:()=>V(t.id),disabled:L===t.id,title:"Hapus",children:"✕"})]})]})]},t.id))})]},e)})}),p&&a.jsx("div",{className:"modal-overlay",onClick:()=>!j&&v(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:"Tandai Selesai"}),a.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>v(null),disabled:j,children:"✕"})]}),a.jsxs("div",{className:"done-plan-info",children:[a.jsx("div",{className:"done-plan-icon",children:"🛒"}),a.jsxs("div",{children:[a.jsx("div",{className:"done-plan-name",children:p.name}),a.jsx("div",{className:"done-plan-amount tabular",children:u(p.amount)})]})]}),a.jsx("p",{className:"done-modal-q",children:"Dari mana uangnya?"}),a.jsxs("div",{className:"done-source-toggle",children:[a.jsxs("button",{type:"button",className:`done-src-btn ${h==="gaji"?"active":""}`,onClick:()=>S("gaji"),children:[a.jsx("span",{className:"done-src-icon",children:"💳"}),a.jsx("span",{className:"done-src-label",children:"Potongan Gaji"}),a.jsx("span",{className:"done-src-sub",children:"Dicatat sebagai pengeluaran"})]}),a.jsxs("button",{type:"button",className:`done-src-btn ${h==="tabungan"?"active":""}`,onClick:()=>S("tabungan"),children:[a.jsx("span",{className:"done-src-icon",children:"🏦"}),a.jsx("span",{className:"done-src-label",children:"Dari Tabungan"}),a.jsx("span",{className:"done-src-sub",children:"Kurangi saldo tabungan"})]})]}),h==="gaji"&&a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Kategori pengeluaran"}),a.jsxs("select",{className:"form-select",value:P,onChange:e=>$(e.target.value),children:[a.jsx("option",{value:"",children:"— Tanpa kategori —"}),E.map(e=>a.jsxs("option",{value:e.id,children:[e.icon," ",e.name]},e.id))]})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Tanggal transaksi"}),a.jsx("input",{className:"form-input",type:"date",value:q,onChange:e=>I(e.target.value)})]}),a.jsxs("div",{className:"done-preview-box",children:[a.jsx("span",{children:"Pengeluaran dicatat sebesar"}),a.jsx("span",{className:"tabular",style:{color:"var(--danger)",fontWeight:700},children:u(p.amount)})]})]}),h==="tabungan"&&a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:g.length===0?a.jsx("p",{style:{fontSize:"0.8rem",color:"var(--text-muted)"},children:"Belum ada tabungan. Buat dulu di menu lain."}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Pilih tabungan"}),a.jsx("select",{className:"form-select",value:f,onChange:e=>R(e.target.value),children:g.map(e=>a.jsxs("option",{value:e.id,children:[e.name," — ",u(e.current_amount)]},e.id))})]}),f&&(()=>{const e=g.find(t=>t.id===f),n=Math.max(0,Number((e==null?void 0:e.current_amount)||0)-Number(p.amount)),s=Number((e==null?void 0:e.current_amount)||0)>=Number(p.amount);return a.jsxs("div",{className:`done-preview-box ${s?"":"done-preview-warn"}`,children:[a.jsx("span",{children:"Saldo setelah dikurangi"}),a.jsx("span",{className:"tabular",style:{color:s?"var(--success)":"var(--danger)",fontWeight:700},children:u(n)})]})})()]})}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>v(null),disabled:j,children:"Batal"}),a.jsx("button",{type:"button",className:"btn btn-primary",style:{flex:1},onClick:U,disabled:j||h==="tabungan"&&g.length===0,children:j?"Menyimpan...":"✓ Tandai Selesai"})]})]})}),a.jsx("style",{children:`
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
          .plans-stat-bar { gap: 8px; padding: 12px 14px; }
          .plans-stat { padding: 0 10px; }
          .plans-form-grid { grid-template-columns: 1fr; }
          .plans-form-grid .form-group[style*="span 2"] { grid-column: span 1; }
          .plan-card { padding: 12px 12px; gap: 10px; }
          .plan-card-amount { display: none; }
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
      `})]})}export{ca as default};
