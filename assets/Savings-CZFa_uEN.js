import{u as $,e as P,r as l,s as g,j as a}from"./index-DqBo56Sd.js";import{g as S,f as x,a as E}from"./formatCurrency-CwSiFA8N.js";import{C as I}from"./CurrencyInput-C9ToQ92s.js";function A(){const c=[],i=new Date;for(let r=0;r<24;r++){const o=new Date(i.getFullYear(),i.getMonth()+r,1),h=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`;c.push({val:h,label:o.toLocaleDateString("id-ID",{month:"long",year:"numeric"})})}return c}const O=A();function W(){const{user:c}=$(),i=P(),[r,o]=l.useState([]),[h,b]=l.useState(!0),[d,C]=l.useState("aktif"),[v,f]=l.useState(!1),[s,m]=l.useState({name:"",amount:"",targetMonth:S(),notes:""}),[j,y]=l.useState(!1),[T,N]=l.useState(null);l.useEffect(()=>{k()},[]);const k=async()=>{b(!0);const{data:e}=await g.from("plans").select("*").eq("user_id",c.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0});o(e||[]),b(!1)},M=async()=>{if(!s.name.trim()||!s.amount||!s.targetMonth)return;y(!0);const{error:e}=await g.from("plans").insert({user_id:c.id,name:s.name.trim(),amount:parseFloat(s.amount),target_month:s.targetMonth,notes:s.notes.trim(),done:!1});e?i("Gagal menyimpan","error"):(i("Rencana ditambahkan","success"),m({name:"",amount:"",targetMonth:S(),notes:""}),f(!1),k()),y(!1)},z=async e=>{const{error:t}=await g.from("plans").update({done:!e.done}).eq("id",e.id);t||(o(u=>u.map(n=>n.id===e.id?{...n,done:!n.done}:n)),i(e.done?"Ditandai aktif":"Ditandai selesai","success"))},D=async e=>{N(e);const{error:t}=await g.from("plans").delete().eq("id",e);t||(o(u=>u.filter(n=>n.id!==e)),i("Rencana dihapus","success")),N(null)},R=r.filter(e=>d==="aktif"?!e.done:d==="selesai"?e.done:!0),p={};R.forEach(e=>{p[e.target_month]||(p[e.target_month]=[]),p[e.target_month].push(e)});const w=Object.keys(p).sort(),_=r.filter(e=>!e.done).reduce((e,t)=>e+Number(t.amount),0),B=r.filter(e=>e.done).reduce((e,t)=>e+Number(t.amount),0);return a.jsxs("div",{className:"animate-in",children:[a.jsxs("div",{className:"flex-between mb-20",style:{alignItems:"flex-start",flexWrap:"wrap",gap:12},children:[a.jsxs("div",{children:[a.jsx("h1",{className:"page-title",children:"Rencana"}),a.jsx("p",{className:"page-subtitle",style:{margin:0},children:"Catat apa saja yang ingin dibeli, berapa, dan kapan"})]}),a.jsx("button",{className:"btn btn-primary",onClick:()=>f(e=>!e),children:v?"✕ Tutup":"+ Tambah Rencana"})]}),a.jsxs("div",{className:"plans-stat-bar mb-20",children:[a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Total Rencana"}),a.jsxs("span",{className:"plans-stat-val tabular",children:[r.length," item"]})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Belum terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-warning",children:x(_)})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Sudah terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-success",children:x(B)})]})]}),v&&a.jsxs("div",{className:"card plans-form-card mb-20 animate-in",children:[a.jsx("p",{className:"plans-form-title",children:"Tambah Rencana Baru"}),a.jsxs("div",{className:"plans-form-grid",children:[a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsx("label",{className:"form-label",children:"Nama barang / kebutuhan"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"contoh: Beli laptop, Kondangan Budi...",value:s.name,onChange:e=>m(t=>({...t,name:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Estimasi harga"}),a.jsx(I,{value:s.amount,onChange:e=>m(t=>({...t,amount:e}))})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Target bulan"}),a.jsx("select",{className:"form-select",value:s.targetMonth,onChange:e=>m(t=>({...t,targetMonth:e.target.value})),children:O.map(e=>a.jsx("option",{value:e.val,children:e.label},e.val))})]}),a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsxs("label",{className:"form-label",children:["Catatan ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),a.jsx("input",{className:"form-input",type:"text",placeholder:"detail tambahan...",value:s.notes,onChange:e=>m(t=>({...t,notes:e.target.value}))})]})]}),a.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>f(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",onClick:M,disabled:!s.name.trim()||!s.amount||j,children:j?"Menyimpan...":"+ Simpan Rencana"})]})]}),a.jsx("div",{className:"plans-filter-tabs mb-20",children:["aktif","selesai","semua"].map(e=>a.jsx("button",{className:`plans-filter-btn ${d===e?"active":""}`,onClick:()=>C(e),children:e==="aktif"?`Aktif (${r.filter(t=>!t.done).length})`:e==="selesai"?`Selesai (${r.filter(t=>t.done).length})`:"Semua"},e))}),h?a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(3)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:76,borderRadius:"var(--radius)"}},t))}):w.length===0?a.jsxs("div",{className:"empty-state",children:[a.jsx("div",{className:"empty-state-icon",children:"📋"}),a.jsx("strong",{children:d==="aktif"?"Belum ada rencana aktif":d==="selesai"?"Belum ada rencana selesai":"Belum ada rencana"}),a.jsx("p",{children:d==="aktif"?'Tekan "+ Tambah Rencana" untuk mulai mencatat.':"Selesaikan rencana dengan menekan tombol ✓."})]}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:24},children:w.map(e=>{const t=p[e],u=t.reduce((n,F)=>n+Number(F.amount),0);return a.jsxs("div",{children:[a.jsxs("div",{className:"plans-month-header",children:[a.jsx("span",{className:"plans-month-label",children:E(e)}),a.jsx("span",{className:"plans-month-total tabular",children:x(u)})]}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:t.map(n=>a.jsxs("div",{className:`plan-card ${n.done?"plan-card-done":""}`,children:[a.jsx("div",{className:"plan-card-icon",children:n.done?"✓":"🛒"}),a.jsxs("div",{className:"plan-card-body",children:[a.jsx("div",{className:"plan-card-name",children:n.name}),n.notes&&a.jsx("div",{className:"plan-card-notes",children:n.notes})]}),a.jsxs("div",{className:"plan-card-right",children:[a.jsx("span",{className:"plan-card-amount tabular",children:x(n.amount)}),a.jsxs("div",{className:"plan-card-actions",children:[a.jsx("button",{className:`plan-action-btn ${n.done?"plan-action-undo":"plan-action-done"}`,onClick:()=>z(n),title:n.done?"Tandai aktif":"Tandai selesai",children:n.done?"↩":"✓"}),a.jsx("button",{className:"plan-action-btn plan-action-del",onClick:()=>D(n.id),disabled:T===n.id,title:"Hapus",children:"✕"})]})]})]},n.id))})]},e)})}),a.jsx("style",{children:`
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
      `})]})}export{W as default};
