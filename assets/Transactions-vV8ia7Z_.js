import{u as _,e as q,r as o,s as b,j as e}from"./index-c2mpNFJK.js";import{f as u}from"./formatCurrency-CwSiFA8N.js";import{T as K}from"./TransactionForm-C7OWbPeC.js";import"./CurrencyInput-CwsRT8b1.js";function O(){const{user:y}=_(),v=q(),[j,C]=o.useState([]),[T,D]=o.useState([]),[S,N]=o.useState(!0),[z,p]=o.useState(!1),[x,w]=o.useState(null),[i,h]=o.useState({category:"",type:"",search:""});o.useEffect(()=>{f()},[]);const f=async()=>{N(!0);const[s,t]=await Promise.all([b.from("transactions").select("*, categories(name, color, icon)").eq("user_id",y.id).order("date",{ascending:!1}).order("created_at",{ascending:!1}),b.from("categories").select("*").eq("user_id",y.id).order("name")]);C(s.data||[]),D(t.data||[]),N(!1)},E=async s=>{confirm("Hapus transaksi ini?")&&(await b.from("transactions").delete().eq("id",s),v("Transaksi dihapus","success"),f())},L=()=>{const s=[["Tanggal","Tipe","Kategori","Deskripsi","Nominal"]];l.forEach(n=>{var c;s.push([n.date,n.type,((c=n.categories)==null?void 0:c.name)||"",n.description||"",n.amount])});const t=s.map(n=>n.map(c=>`"${c}"`).join(",")).join(`
`),r=new Blob(["\uFEFF"+t],{type:"text/csv;charset=utf-8"}),a=URL.createObjectURL(r),m=document.createElement("a");m.href=a,m.download="transaksi-cashvell.csv",m.click(),URL.revokeObjectURL(a),v("CSV diunduh","success")},l=o.useMemo(()=>j.filter(s=>{var t,r,a;if(i.category&&s.category_id!==i.category||i.type&&s.type!==i.type)return!1;if(i.search){const m=i.search.toLowerCase(),n=(t=s.description)==null?void 0:t.toLowerCase().includes(m),c=(a=(r=s.categories)==null?void 0:r.name)==null?void 0:a.toLowerCase().includes(m);if(!n&&!c)return!1}return!0}),[j,i]),F=o.useMemo(()=>{const s={};return l.forEach(t=>{s[t.date]||(s[t.date]=[]),s[t.date].push(t)}),Object.entries(s).sort(([t],[r])=>r.localeCompare(t))},[l]),d=o.useMemo(()=>l.reduce((s,t)=>(t.type==="expense"?s.expense+=Number(t.amount):s.income+=Number(t.amount),s),{expense:0,income:0}),[l]),g=i.category||i.type||i.search,R=s=>{const t=new Date(s+"T00:00:00"),r=new Date,a=new Date(r);return a.setDate(r.getDate()-1),t.toDateString()===r.toDateString()?"Hari ini":t.toDateString()===a.toDateString()?"Kemarin":t.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})},$=s=>s.reduce((t,r)=>r.type==="expense"?t-Number(r.amount):t+Number(r.amount),0);return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-16",style:{flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Transaksi"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[l.length," transaksi",g&&" (filter aktif)"]})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:L,children:"↓ CSV"}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{w(null),p(!0)},children:"+ Tambah"})]})]}),e.jsxs("div",{className:"tx-filter-bar mb-16",children:[e.jsx("input",{className:"form-input",type:"text",placeholder:"Cari transaksi...",value:i.search,onChange:s=>h(t=>({...t,search:s.target.value})),style:{flex:2}}),e.jsxs("select",{className:"form-select",value:i.category,onChange:s=>h(t=>({...t,category:s.target.value})),style:{flex:1},children:[e.jsx("option",{value:"",children:"Semua Kategori"}),T.map(s=>e.jsxs("option",{value:s.id,children:[s.icon," ",s.name]},s.id))]}),e.jsx("div",{className:"type-filter-btns",children:[["","Semua"],["expense","↓ Keluar"],["income","↑ Masuk"]].map(([s,t])=>e.jsx("button",{className:`type-filter-btn ${i.type===s?"active":""}`,onClick:()=>h(r=>({...r,type:s})),children:t},s))}),g&&e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>h({category:"",type:"",search:""}),children:"Reset"})]}),l.length>0&&e.jsxs("div",{className:"tx-summary-strip mb-16",children:[e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Pemasukan"}),e.jsxs("span",{className:"tss-val text-success tabular",children:["+",u(d.income)]})]}),e.jsx("div",{className:"tss-divider"}),e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Pengeluaran"}),e.jsxs("span",{className:"tss-val text-danger tabular",children:["-",u(d.expense)]})]}),e.jsx("div",{className:"tss-divider"}),e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Selisih"}),e.jsxs("span",{className:`tss-val tabular ${d.income-d.expense>=0?"text-success":"text-danger"}`,children:[d.income-d.expense>=0?"+":"",u(d.income-d.expense)]})]})]}),S?e.jsx("div",{className:"card",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(5)].map((s,t)=>e.jsx("div",{className:"skeleton",style:{height:52}},t))})}):l.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"↕"}),e.jsx("strong",{children:g?"Tidak ada yang cocok":"Belum ada transaksi"}),e.jsx("p",{children:g?"Coba ubah atau reset filter":'Tap "+ Tambah" untuk mulai mencatat'})]})}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:F.map(([s,t])=>{const r=$(t);return e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-header",children:[e.jsx("span",{className:"tx-group-date",children:R(s)}),e.jsxs("span",{className:`tx-group-total tabular ${r>=0?"text-success":"text-danger"}`,children:[r>=0?"+":"",u(r)]})]}),e.jsx("div",{className:"card",style:{padding:0,overflow:"hidden"},children:t.map((a,m)=>{var n,c,k;return e.jsxs("div",{className:`tx-row-item ${m<t.length-1?"bordered":""}`,children:[e.jsx("div",{className:"tri-icon",style:{background:(n=a.categories)!=null&&n.color?`${a.categories.color}18`:"var(--bg-input)"},children:((c=a.categories)==null?void 0:c.icon)||(a.type==="income"?"↑":"↓")}),e.jsxs("div",{className:"tri-info",children:[e.jsx("span",{className:"tri-desc",children:a.description||((k=a.categories)==null?void 0:k.name)||"Transaksi"}),a.categories&&e.jsx("span",{className:"tri-cat",style:{color:a.categories.color},children:a.categories.name})]}),e.jsxs("div",{className:"tri-right",children:[e.jsxs("span",{className:`tri-amount tabular ${a.type==="income"?"text-success":"text-danger"}`,children:[a.type==="income"?"+":"-",u(a.amount)]}),e.jsxs("div",{className:"tri-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{w(a),p(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>E(a.id),children:"✕"})]})]})]},a.id)})})]},s)})}),z&&e.jsx("div",{className:"modal-overlay",onClick:()=>p(!1),children:e.jsxs("div",{className:"modal",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:x!=null&&x.id?"Edit Transaksi":"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>p(!1),children:"✕"})]}),e.jsx(K,{editData:x,onSuccess:f,onClose:()=>p(!1)})]})}),e.jsx("style",{children:`
        .tx-filter-bar {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .type-filter-btns {
          display: flex;
          gap: 3px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 3px;
          flex-shrink: 0;
        }
        .type-filter-btn {
          padding: 5px 11px;
          border: none;
          border-radius: 4px;
          background: transparent;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .type-filter-btn.active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        .tx-summary-strip {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 20px;
          gap: 0;
        }
        .tss-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .tss-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .tss-val {
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .tss-divider {
          width: 1px;
          height: 28px;
          background: var(--border);
          flex-shrink: 0;
        }

        .tx-group-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
          margin-bottom: 6px;
        }
        .tx-group-date {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tx-group-total {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .tx-row-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 18px;
          transition: background 0.1s;
        }
        .tx-row-item:hover { background: var(--bg-input); }
        .tx-row-item.bordered { border-bottom: 1px solid var(--border); }

        .tri-icon {
          width: 36px; height: 36px;
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.95rem;
          flex-shrink: 0;
        }
        .tri-info { flex: 1; min-width: 0; }
        .tri-desc {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }
        .tri-cat {
          font-size: 0.68rem;
          font-weight: 600;
          opacity: 0.8;
        }
        .tri-right {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .tri-amount {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .tri-actions {
          display: flex;
          gap: 0;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .tx-row-item:hover .tri-actions { opacity: 1; }

        @media (max-width: 768px) {
          .tx-filter-bar { flex-direction: column; align-items: stretch; }
          .tx-filter-bar .form-input,
          .tx-filter-bar .form-select { width: 100%; flex: none; }
          .type-filter-btns { width: 100%; justify-content: stretch; }
          .type-filter-btn { flex: 1; }
          .tri-actions { opacity: 1; }
          .tx-summary-strip { padding: 10px 14px; }
          .tss-val { font-size: 0.8rem; }
          .tx-row-item { padding: 12px 14px; }
          .tx-group-date { font-size: 0.68rem; }
        }

        @media (max-width: 400px) {
          .tx-summary-strip { display: none; }
          .tri-amount { font-size: 0.8rem; }
        }
      `})]})}export{O as default};
