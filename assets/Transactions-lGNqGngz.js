import{u as V,e as Y,d as G,r as o,s as k,j as e}from"./index-DbuWL6HM.js";import{g as $,a as F,f as b}from"./formatCurrency-CwSiFA8N.js";import{T as I}from"./TransactionForm-4Yh7ZRHt.js";import{C as J}from"./ConfirmModal-D2zuxh3g.js";import"./CurrencyInput-T6nBwGnO.js";function Q(h){const[x,g]=h.split("-").map(Number),u=new Date(x,g-2,1);return`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`}function W(h){const[x,g]=h.split("-").map(Number),u=new Date(x,g,1);return`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`}function ae(){const{user:h}=V(),x=Y(),[g,u]=G(),[c,L]=o.useState(()=>g.get("month")||$()),[C,E]=o.useState([]),[R,P]=o.useState([]),[_,S]=o.useState(!0),[q,f]=o.useState(!1),[y,D]=o.useState(null),[T,N]=o.useState(null),[n,v]=o.useState({category:"",type:"",search:""}),K=c===$(),z=t=>{L(t),u({month:t})};o.useEffect(()=>{w()},[c]);const w=async()=>{S(!0);const t=`${c}-01`,s=`${c}-31`,[r,a]=await Promise.all([k.from("transactions").select("*, categories(name, color, icon)").eq("user_id",h.id).gte("date",t).lte("date",s).order("date",{ascending:!1}).order("created_at",{ascending:!1}),k.from("categories").select("*").eq("user_id",h.id).order("name")]);E(r.data||[]),P(a.data||[]),S(!1)},U=async()=>{await k.from("transactions").delete().eq("id",T),x("Transaksi dihapus","success"),N(null),w()},A=()=>{const t=[["Tanggal","Tipe","Kategori","Deskripsi","Nominal"]];d.forEach(i=>{var l;t.push([i.date,i.type,((l=i.categories)==null?void 0:l.name)||"",i.description||"",i.amount])});const s=t.map(i=>i.map(l=>`"${l}"`).join(",")).join(`
`),r=new Blob(["\uFEFF"+s],{type:"text/csv;charset=utf-8"}),a=URL.createObjectURL(r),p=document.createElement("a");p.href=a,p.download="transaksi-cashvell.csv",p.click(),URL.revokeObjectURL(a),x("CSV diunduh","success")},d=o.useMemo(()=>C.filter(t=>{var s,r,a;if(n.category&&t.category_id!==n.category||n.type&&t.type!==n.type)return!1;if(n.search){const p=n.search.toLowerCase(),i=(s=t.description)==null?void 0:s.toLowerCase().includes(p),l=(a=(r=t.categories)==null?void 0:r.name)==null?void 0:a.toLowerCase().includes(p);if(!i&&!l)return!1}return!0}),[C,n]),H=o.useMemo(()=>{const t={};return d.forEach(s=>{t[s.date]||(t[s.date]=[]),t[s.date].push(s)}),Object.entries(t).sort(([s],[r])=>r.localeCompare(s))},[d]),m=o.useMemo(()=>d.reduce((t,s)=>(s.type==="expense"?t.expense+=Number(s.amount):t.income+=Number(s.amount),t),{expense:0,income:0}),[d]),j=n.category||n.type||n.search,O=t=>{const s=new Date(t+"T00:00:00"),r=new Date,a=new Date(r);return a.setDate(r.getDate()-1),s.toDateString()===r.toDateString()?"Hari ini":s.toDateString()===a.toDateString()?"Kemarin":s.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})},B=t=>t.reduce((s,r)=>r.type==="expense"?s-Number(r.amount):s+Number(r.amount),0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"tx-page-header mb-16",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Transaksi"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[d.length," transaksi ",F(c),j?" (filter aktif)":""]})]}),e.jsxs("div",{className:"tx-header-right",children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>z(Q(c)),children:"‹"}),e.jsx("span",{className:"month-label-sm",children:F(c)}),e.jsx("button",{className:"month-btn",onClick:()=>z(W(c)),disabled:K,children:"›"})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:A,children:"↓ CSV"}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{D(null),f(!0)},children:"+ Tambah"})]})]})]}),e.jsxs("div",{className:"tx-filter-bar mb-16",children:[e.jsx("input",{className:"form-input",type:"text",placeholder:"Cari transaksi...",value:n.search,onChange:t=>v(s=>({...s,search:t.target.value})),style:{flex:2}}),e.jsxs("select",{className:"form-select",value:n.category,onChange:t=>v(s=>({...s,category:t.target.value})),style:{flex:1},children:[e.jsx("option",{value:"",children:"Semua Kategori"}),R.map(t=>e.jsxs("option",{value:t.id,children:[t.icon," ",t.name]},t.id))]}),e.jsx("div",{className:"type-filter-btns",children:[["","Semua"],["expense","↓ Keluar"],["income","↑ Masuk"]].map(([t,s])=>e.jsx("button",{className:`type-filter-btn ${n.type===t?"active":""}`,onClick:()=>v(r=>({...r,type:t})),children:s},t))}),j&&e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>v({category:"",type:"",search:""}),children:"Reset"})]}),d.length>0&&e.jsxs("div",{className:"tx-summary-strip mb-16",children:[e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Pemasukan"}),e.jsxs("span",{className:"tss-val text-success tabular",children:["+",b(m.income)]})]}),e.jsx("div",{className:"tss-divider"}),e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Pengeluaran"}),e.jsxs("span",{className:"tss-val text-danger tabular",children:["-",b(m.expense)]})]}),e.jsx("div",{className:"tss-divider"}),e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Selisih"}),e.jsxs("span",{className:`tss-val tabular ${m.income-m.expense>=0?"text-success":"text-danger"}`,children:[m.income-m.expense>=0?"+":"",b(m.income-m.expense)]})]})]}),_?e.jsx("div",{className:"card",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(5)].map((t,s)=>e.jsx("div",{className:"skeleton",style:{height:52}},s))})}):d.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"↕"}),e.jsx("strong",{children:j?"Tidak ada yang cocok":"Belum ada transaksi"}),e.jsx("p",{children:j?"Coba ubah atau reset filter":'Tap "+ Tambah" untuk mulai mencatat'})]})}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:H.map(([t,s])=>{const r=B(s);return e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-header",children:[e.jsx("span",{className:"tx-group-date",children:O(t)}),e.jsxs("span",{className:`tx-group-total tabular ${r>=0?"text-success":"text-danger"}`,children:[r>=0?"+":"",b(r)]})]}),e.jsx("div",{className:"card",style:{padding:0,overflow:"hidden"},children:s.map((a,p)=>{var i,l,M;return e.jsxs("div",{className:`tx-row-item ${p<s.length-1?"bordered":""}`,children:[e.jsx("div",{className:"tri-icon",style:{background:(i=a.categories)!=null&&i.color?`${a.categories.color}18`:"var(--bg-input)"},children:((l=a.categories)==null?void 0:l.icon)||(a.type==="income"?"↑":"↓")}),e.jsxs("div",{className:"tri-info",children:[e.jsx("span",{className:"tri-desc",children:a.description||((M=a.categories)==null?void 0:M.name)||"Transaksi"}),a.categories&&e.jsx("span",{className:"tri-cat",style:{color:a.categories.color},children:a.categories.name})]}),e.jsxs("div",{className:"tri-right",children:[e.jsxs("span",{className:`tri-amount tabular ${a.type==="income"?"text-success":"text-danger"}`,children:[a.type==="income"?"+":"-",b(a.amount)]}),e.jsxs("div",{className:"tri-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{D(a),f(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>N(a.id),children:"✕"})]})]})]},a.id)})})]},t)})}),e.jsx("style",{children:`
        .tx-page-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
        .tx-header-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .month-nav-group { display: flex; align-items: center; gap: 2px; }
        .month-btn {
          width: 28px; height: 28px; border: none; background: none; color: var(--text-muted);
          font-size: 1.1rem; cursor: pointer; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-sans); transition: all 0.15s;
        }
        .month-btn:hover { background: var(--bg-input); color: var(--text-primary); }
        .month-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .month-label-sm { font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); padding: 0 6px; white-space: nowrap; }

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
          .tx-summary-strip { padding: 8px 10px; }
          .tss-val { font-size: 0.75rem; }
          .tss-label { font-size: 0.6rem; }
          .tri-amount { font-size: 0.8rem; }
        }
      `})]}),T&&e.jsx(J,{title:"Hapus Transaksi",message:"Transaksi ini akan dihapus permanen dan tidak bisa dikembalikan.",confirmLabel:"Hapus",onConfirm:U,onCancel:()=>N(null)}),q&&e.jsx("div",{className:"modal-overlay",onClick:()=>f(!1),children:e.jsxs("div",{className:"modal",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:y!=null&&y.id?"Edit Transaksi":"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>f(!1),children:"✕"})]}),e.jsx(I,{editData:y,onSuccess:w,onClose:()=>f(!1)})]})})]})}export{ae as default};
