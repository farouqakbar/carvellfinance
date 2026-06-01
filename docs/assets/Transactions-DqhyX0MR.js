import{u as O,i as B,h as V,r as o,g as F,s as C,j as e,d as L,f as v}from"./index-vMXtwoXZ.js";import{T as Y}from"./TransactionForm-zBsJvjoJ.js";import{C as J}from"./ConfirmModal-pcyNqYX5.js";function Q(u){const[h,g]=u.split("-").map(Number),p=new Date(h,g-2,1);return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`}function W(u){const[h,g]=u.split("-").map(Number),p=new Date(h,g,1);return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`}function te(){const{user:u}=O(),h=B(),[g,p]=V(),[d,E]=o.useState(()=>g.get("month")||F()),[S,R]=o.useState([]),[N,G]=o.useState([]),[P,D]=o.useState(!0),[_,x]=o.useState(!1),[f,T]=o.useState(null),[z,w]=o.useState(null),[n,b]=o.useState({category:"",type:"",search:""}),q=d===F(),M=t=>{E(t),p({month:t})};o.useEffect(()=>{k()},[d]);const k=async()=>{D(!0);const t=`${d}-01`,a=`${d}-31`,[r,s]=await Promise.all([C.from("transactions").select("*, categories(name, color, icon)").eq("user_id",u.id).gte("date",t).lte("date",a).order("date",{ascending:!1}).order("created_at",{ascending:!1}),C.from("categories").select("*").eq("user_id",u.id).order("name")]);R(r.data||[]),G(s.data||[]),D(!1)},I=async()=>{await C.from("transactions").delete().eq("id",z),h("Transaksi dihapus","success"),w(null),k()},K=()=>{const t=[["Tanggal","Tipe","Kategori","Deskripsi","Nominal"]];m.forEach(i=>{var c;t.push([i.date,i.type,((c=i.categories)==null?void 0:c.name)||"",i.description||"",i.amount])});const a=t.map(i=>i.map(c=>`"${c}"`).join(",")).join(`
`),r=new Blob(["\uFEFF"+a],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(r),l=document.createElement("a");l.href=s,l.download="transaksi-cashvell.csv",l.click(),URL.revokeObjectURL(s),h("CSV diunduh","success")},m=o.useMemo(()=>S.filter(t=>{var a,r,s;if(n.category&&t.category_id!==n.category||n.type&&t.type!==n.type)return!1;if(n.search){const l=n.search.toLowerCase(),i=(a=t.description)==null?void 0:a.toLowerCase().includes(l),c=(s=(r=t.categories)==null?void 0:r.name)==null?void 0:s.toLowerCase().includes(l);if(!i&&!c)return!1}return!0}),[S,n]),U=o.useMemo(()=>{const t={};return m.forEach(a=>{t[a.date]||(t[a.date]=[]),t[a.date].push(a)}),Object.entries(t).sort(([a],[r])=>r.localeCompare(a))},[m]),y=o.useMemo(()=>{const t=N.find(r=>r.name==="Gaji"),a=m.reduce((r,s)=>(t&&s.category_id===t.id&&s.type==="income"?r.gaji+=Number(s.amount):s.type==="expense"?r.expense+=Number(s.amount):r.nonGajiIncome+=Number(s.amount),r),{gaji:0,expense:0,nonGajiIncome:0});return a.pengeluaran=Math.max(0,a.expense-a.nonGajiIncome),a.saldo=a.gaji-a.pengeluaran,a},[m,N]),j=n.category||n.type||n.search,A=t=>{const a=new Date(t+"T00:00:00"),r=new Date,s=new Date(r);return s.setDate(r.getDate()-1),a.toDateString()===r.toDateString()?"Hari ini":a.toDateString()===s.toDateString()?"Kemarin":a.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})},H=t=>t.reduce((a,r)=>r.type==="expense"?a-Number(r.amount):a+Number(r.amount),0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"tx-page-header mb-16",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Transaksi"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[m.length," transaksi ",L(d),j?" (filter aktif)":""]})]}),e.jsxs("div",{className:"tx-header-right",children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>M(Q(d)),children:"‹"}),e.jsx("span",{className:"month-label-sm",children:L(d)}),e.jsx("button",{className:"month-btn",onClick:()=>M(W(d)),disabled:q,children:"›"})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:K,children:"↓ CSV"}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{T(null),x(!0)},children:"+ Tambah"})]})]})]}),e.jsxs("div",{className:"tx-filter-bar mb-16",children:[e.jsx("input",{className:"form-input",type:"text",placeholder:"Cari transaksi...",value:n.search,onChange:t=>b(a=>({...a,search:t.target.value})),style:{flex:2}}),e.jsxs("select",{className:"form-select",value:n.category,onChange:t=>b(a=>({...a,category:t.target.value})),style:{flex:1},children:[e.jsx("option",{value:"",children:"Semua Kategori"}),N.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),e.jsx("div",{className:"type-filter-btns",children:[["","Semua"],["expense","↓ Keluar"],["income","↑ Masuk"]].map(([t,a])=>e.jsx("button",{className:`type-filter-btn ${n.type===t?"active":""}`,onClick:()=>b(r=>({...r,type:t})),children:a},t))}),j&&e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>b({category:"",type:"",search:""}),children:"Reset"})]}),m.length>0&&e.jsxs("div",{className:"tx-summary-strip mb-16",children:[e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Total Saldo"}),e.jsxs("span",{className:`tss-val tabular ${y.saldo>=0?"text-success":"text-danger"}`,children:[y.saldo>=0?"+":"",v(y.saldo)]})]}),e.jsx("div",{className:"tss-divider"}),e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Pengeluaran"}),e.jsxs("span",{className:"tss-val text-danger tabular",children:["-",v(y.pengeluaran)]})]})]}),P?e.jsx("div",{className:"card",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(5)].map((t,a)=>e.jsx("div",{className:"skeleton",style:{height:52}},a))})}):m.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"↕"}),e.jsx("strong",{children:j?"Tidak ada yang cocok":"Belum ada transaksi"}),e.jsx("p",{children:j?"Coba ubah atau reset filter":'Tap "+ Tambah" untuk mulai mencatat'})]})}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:U.map(([t,a])=>{const r=H(a);return e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-header",children:[e.jsx("span",{className:"tx-group-date",children:A(t)}),e.jsxs("span",{className:`tx-group-total tabular ${r>=0?"text-success":"text-danger"}`,children:[r>=0?"+":"",v(r)]})]}),e.jsx("div",{className:"card",style:{padding:0,overflow:"hidden"},children:a.map((s,l)=>{var i,c,$;return e.jsxs("div",{className:`tx-row-item ${l<a.length-1?"bordered":""}`,children:[e.jsx("div",{className:"tri-icon",style:{background:(i=s.categories)!=null&&i.color?`${s.categories.color}18`:"var(--bg-input)"},children:((c=s.categories)==null?void 0:c.icon)||(s.type==="income"?"↑":"↓")}),e.jsxs("div",{className:"tri-info",children:[e.jsx("span",{className:"tri-desc",children:s.description||(($=s.categories)==null?void 0:$.name)||"Transaksi"}),s.categories&&e.jsx("span",{className:"tri-cat",style:{color:s.categories.color},children:s.categories.name})]}),e.jsxs("div",{className:"tri-right",children:[e.jsxs("span",{className:`tri-amount tabular ${s.type==="income"?"text-success":"text-danger"}`,children:[s.type==="income"?"+":"-",v(s.amount)]}),e.jsxs("div",{className:"tri-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{T(s),x(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>w(s.id),children:"✕"})]})]})]},s.id)})})]},t)})}),e.jsx("style",{children:`
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
      `})]}),z&&e.jsx(J,{title:"Hapus Transaksi",message:"Transaksi ini akan dihapus permanen dan tidak bisa dikembalikan.",confirmLabel:"Hapus",onConfirm:I,onCancel:()=>w(null)}),_&&e.jsx("div",{className:"modal-overlay",onClick:()=>x(!1),children:e.jsxs("div",{className:"modal",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:f!=null&&f.id?"Edit Transaksi":"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>x(!1),children:"✕"})]}),e.jsx(Y,{editData:f,onSuccess:k,onClose:()=>x(!1)})]})})]})}export{te as default};
