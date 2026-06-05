import{G as ia,M as oa,E as r,x as G,F as d,D as a,g as O,w as u,C as da,n as W,t as K,A as ca,h as D,p as L,s as ma,r as pa,i as ua,m as ga,B as xa}from"./index-CasCzvCu.js";function ha(){const c=[],l=new Date;for(let o=0;o<24;o++){const m=new Date(l.getFullYear(),l.getMonth()+o,1),g=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`;c.push({val:g,label:m.toLocaleDateString("id-ID",{month:"long",year:"numeric"})})}return c}const fa=ha(),Y=xa();function va(){const{user:c}=ia(),l=oa(),[o,m]=r.useState([]),[g,T]=r.useState([]),[H,U]=r.useState([]),[X,_]=r.useState(!0),[x,J]=r.useState("aktif"),[B,k]=r.useState(!1),[i,v]=r.useState({name:"",amount:"",targetMonth:G(),notes:""}),[M,I]=r.useState(!1),[Q,F]=r.useState(null),[p,j]=r.useState(null),[h,w]=r.useState("gaji"),[f,P]=r.useState(""),[R,$]=r.useState(""),[q,A]=r.useState(Y),[y,b]=r.useState(!1);r.useEffect(()=>{V()},[]);const V=async()=>{_(!0);const[e,n,t]=await Promise.all([d.from("plans").select("*").eq("user_id",c.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0}),d.from("savings").select("*").eq("user_id",c.id).order("name"),d.from("categories").select("*").eq("user_id",c.id).order("name")]);m(e.data||[]),T(n.data||[]);const s=t.data||[];U(s),s.length>0&&$(s[0].id),(n.data||[]).length>0&&P(n.data[0].id),_(!1)},Z=async()=>{const{data:e}=await d.from("plans").select("*").eq("user_id",c.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0});m(e||[])},aa=async()=>{if(!i.name.trim()||!i.amount||!i.targetMonth)return;I(!0);const{error:e}=await d.from("plans").insert({user_id:c.id,name:i.name.trim(),amount:parseFloat(i.amount),target_month:i.targetMonth,notes:i.notes.trim(),done:!1});e?l("Gagal menyimpan","error"):(l("Rencana ditambahkan","success"),v({name:"",amount:"",targetMonth:G(),notes:""}),k(!1),Z()),I(!1)},ea=e=>{if(e.done){d.from("plans").update({done:!1}).eq("id",e.id).then(({error:n})=>{if(n){l(n.message,"error");return}m(t=>t.map(s=>s.id===e.id?{...s,done:!1}:s)),l("Ditandai aktif kembali","success")});return}j(e),w("gaji"),A(Y)},na=async()=>{if(!p)return;b(!0);const e=p;if(h==="tabungan"){const t=g.find(S=>S.id===f);if(!t){l("Pilih tabungan dulu","error"),b(!1);return}const s=Math.max(0,Number(t.current_amount)-Number(e.amount)),{error:z}=await d.from("savings").update({current_amount:s}).eq("id",f);if(z){l("Gagal update tabungan","error"),b(!1);return}T(S=>S.map(C=>C.id===f?{...C,current_amount:s}:C))}else{const{error:t}=await d.from("transactions").insert({user_id:c.id,category_id:R||null,amount:Number(e.amount),date:q,description:`Beli: ${e.name}`,type:"expense"});if(t){l("Gagal catat transaksi","error"),b(!1);return}}const{error:n}=await d.from("plans").update({done:!0}).eq("id",e.id);if(n){l(n.message,"error"),b(!1);return}m(t=>t.map(s=>s.id===e.id?{...s,done:!0}:s)),l("Rencana selesai dicatat ✓","success"),j(null),b(!1)},sa=async e=>{F(e);const{error:n}=await d.from("plans").delete().eq("id",e);n||(m(t=>t.filter(s=>s.id!==e)),l("Rencana dihapus","success")),F(null)},ta=o.filter(e=>x==="aktif"?!e.done:x==="selesai"?e.done:!0),N={};ta.forEach(e=>{N[e.target_month]||(N[e.target_month]=[]),N[e.target_month].push(e)});const E=Object.keys(N).sort(),ra=o.filter(e=>!e.done).reduce((e,n)=>e+Number(n.amount),0),la=o.filter(e=>e.done).reduce((e,n)=>e+Number(n.amount),0);return a.jsx(a.Fragment,{children:a.jsxs("div",{className:"animate-in",children:[a.jsxs("div",{className:"page-header-banner",style:{marginBottom:20},children:[a.jsx("div",{className:"page-header-icon",style:{background:"rgba(251,191,36,0.1)",color:"var(--warning)"},children:a.jsx(O,{size:18})}),a.jsxs("div",{children:[a.jsx("h1",{className:"page-header-title",children:"Rencana"}),a.jsx("p",{className:"page-header-sub",children:"Catat apa saja yang ingin dibeli, berapa, dan kapan"})]})]}),a.jsxs("div",{className:"plans-stat-bar",style:{marginBottom:20},children:[a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Total Rencana"}),a.jsxs("span",{className:"plans-stat-val tabular",children:[o.length," item"]})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Belum terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-warning",children:u(ra)})]}),a.jsx("div",{className:"plans-stat-divider"}),a.jsxs("div",{className:"plans-stat",children:[a.jsx("span",{className:"plans-stat-label",children:"Sudah terbeli"}),a.jsx("span",{className:"plans-stat-val tabular text-success",children:u(la)})]})]}),B&&a.jsxs("div",{className:"card plans-form-card animate-in",style:{marginBottom:20},children:[a.jsx("p",{className:"plans-form-title",children:"Tambah Rencana Baru"}),a.jsxs("div",{className:"plans-form-grid",children:[a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsx("label",{className:"form-label",children:"Nama barang / kebutuhan"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"contoh: Beli laptop, Kondangan Budi...",value:i.name,onChange:e=>v(n=>({...n,name:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Estimasi harga"}),a.jsx(da,{value:i.amount,onChange:e=>v(n=>({...n,amount:e}))})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Target bulan"}),a.jsx("select",{className:"form-select",value:i.targetMonth,onChange:e=>v(n=>({...n,targetMonth:e.target.value})),children:fa.map(e=>a.jsx("option",{value:e.val,children:e.label},e.val))})]}),a.jsxs("div",{className:"form-group",style:{margin:0,gridColumn:"span 2"},children:[a.jsxs("label",{className:"form-label",children:["Catatan ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),a.jsx("input",{className:"form-input",type:"text",placeholder:"detail tambahan...",value:i.notes,onChange:e=>v(n=>({...n,notes:e.target.value}))})]})]}),a.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>k(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",onClick:aa,disabled:!i.name.trim()||!i.amount||M,children:M?"Menyimpan...":a.jsxs(a.Fragment,{children:[a.jsx(W,{size:13})," Simpan Rencana"]})})]})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:20},children:[a.jsx("div",{className:"plans-filter-tabs",children:["aktif","selesai","semua"].map(e=>a.jsx("button",{className:`plans-filter-btn ${x===e?"active":""}`,onClick:()=>J(e),children:e==="aktif"?`Aktif (${o.filter(n=>!n.done).length})`:e==="selesai"?`Selesai (${o.filter(n=>n.done).length})`:"Semua"},e))}),a.jsx("button",{className:"btn btn-primary btn-sm",style:{flexShrink:0,gap:6},onClick:()=>k(e=>!e),children:B?a.jsxs(a.Fragment,{children:[a.jsx(K,{size:13})," Tutup"]}):a.jsxs(a.Fragment,{children:[a.jsx(W,{size:13})," Tambah Rencana"]})})]}),X?a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(3)].map((e,n)=>a.jsx("div",{className:"skeleton",style:{height:76,borderRadius:"var(--radius)"}},n))}):E.length===0?a.jsxs("div",{className:"empty-state",children:[a.jsx("div",{className:"empty-state-icon",children:a.jsx(O,{size:22})}),a.jsx("strong",{children:x==="aktif"?"Belum ada rencana aktif":x==="selesai"?"Belum ada rencana selesai":"Belum ada rencana"}),a.jsx("p",{children:x==="aktif"?'Tekan "+ Tambah Rencana" untuk mulai mencatat.':"Selesaikan rencana dengan menekan tombol ✓."})]}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:24},children:E.map(e=>{const n=N[e],t=n.reduce((s,z)=>s+Number(z.amount),0);return a.jsxs("div",{children:[a.jsxs("div",{className:"plans-month-header",children:[a.jsx("span",{className:"plans-month-label",children:ca(e)}),a.jsx("span",{className:"plans-month-total tabular",children:u(t)})]}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:n.map(s=>a.jsxs("div",{className:`plan-card ${s.done?"plan-card-done":""}`,children:[a.jsx("div",{className:"plan-card-icon",children:s.done?a.jsx(D,{size:15}):a.jsx(L,{size:16})}),a.jsxs("div",{className:"plan-card-body",children:[a.jsx("div",{className:"plan-card-name",children:s.name}),s.notes&&a.jsx("div",{className:"plan-card-notes",children:s.notes})]}),a.jsxs("div",{className:"plan-card-right",children:[a.jsx("span",{className:"plan-card-amount tabular",children:u(s.amount)}),a.jsxs("div",{className:"plan-card-actions",children:[a.jsx("button",{className:`plan-action-btn ${s.done?"plan-action-undo":"plan-action-done"}`,onClick:()=>ea(s),title:s.done?"Tandai aktif":"Tandai selesai",children:s.done?a.jsx(ma,{size:12}):a.jsx(D,{size:12})}),a.jsx("button",{className:"plan-action-btn plan-action-del",onClick:()=>sa(s.id),disabled:Q===s.id,title:"Hapus",children:a.jsx(pa,{size:12})})]})]})]},s.id))})]},e)})}),p&&a.jsx("div",{className:"modal-overlay",onClick:()=>!y&&j(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:"Tandai Selesai"}),a.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>j(null),disabled:y,children:a.jsx(K,{size:16})})]}),a.jsxs("div",{className:"done-plan-info",children:[a.jsx("div",{className:"done-plan-icon",children:a.jsx(L,{size:18})}),a.jsxs("div",{children:[a.jsx("div",{className:"done-plan-name",children:p.name}),a.jsx("div",{className:"done-plan-amount tabular",children:u(p.amount)})]})]}),a.jsx("p",{className:"done-modal-q",children:"Dari mana uangnya?"}),a.jsxs("div",{className:"done-source-toggle",children:[a.jsxs("button",{type:"button",className:`done-src-btn ${h==="gaji"?"active":""}`,onClick:()=>w("gaji"),children:[a.jsx("span",{className:"done-src-icon",children:a.jsx(ua,{size:16})}),a.jsx("span",{className:"done-src-label",children:"Potongan Gaji"}),a.jsx("span",{className:"done-src-sub",children:"Dicatat sebagai pengeluaran"})]}),a.jsxs("button",{type:"button",className:`done-src-btn ${h==="tabungan"?"active":""}`,onClick:()=>w("tabungan"),children:[a.jsx("span",{className:"done-src-icon",children:a.jsx(ga,{size:16})}),a.jsx("span",{className:"done-src-label",children:"Dari Tabungan"}),a.jsx("span",{className:"done-src-sub",children:"Kurangi saldo tabungan"})]})]}),h==="gaji"&&a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Kategori pengeluaran"}),a.jsxs("select",{className:"form-select",value:R,onChange:e=>$(e.target.value),children:[a.jsx("option",{value:"",children:"— Tanpa kategori —"}),H.map(e=>a.jsx("option",{value:e.id,children:e.name},e.id))]})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Tanggal transaksi"}),a.jsx("input",{className:"form-input",type:"date",value:q,onChange:e=>A(e.target.value)})]}),a.jsxs("div",{className:"done-preview-box",children:[a.jsx("span",{children:"Pengeluaran dicatat sebesar"}),a.jsx("span",{className:"tabular",style:{color:"var(--danger)",fontWeight:700},children:u(p.amount)})]})]}),h==="tabungan"&&a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:g.length===0?a.jsx("p",{style:{fontSize:"0.8rem",color:"var(--text-muted)"},children:"Belum ada tabungan. Buat dulu di menu lain."}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Pilih tabungan"}),a.jsx("select",{className:"form-select",value:f,onChange:e=>P(e.target.value),children:g.map(e=>a.jsxs("option",{value:e.id,children:[e.name," — ",u(e.current_amount)]},e.id))})]}),f&&(()=>{const e=g.find(s=>s.id===f),n=Math.max(0,Number((e==null?void 0:e.current_amount)||0)-Number(p.amount)),t=Number((e==null?void 0:e.current_amount)||0)>=Number(p.amount);return a.jsxs("div",{className:`done-preview-box ${t?"":"done-preview-warn"}`,children:[a.jsx("span",{children:"Saldo setelah dikurangi"}),a.jsx("span",{className:"tabular",style:{color:t?"var(--success)":"var(--danger)",fontWeight:700},children:u(n)})]})})()]})}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>j(null),disabled:y,children:"Batal"}),a.jsx("button",{type:"button",className:"btn btn-primary",style:{flex:1},onClick:na,disabled:y||h==="tabungan"&&g.length===0,children:y?"Menyimpan...":a.jsxs(a.Fragment,{children:[a.jsx(D,{size:13})," Tandai Selesai"]})})]})]})}),a.jsx("style",{children:`
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
      `})]})})}export{va as default};
