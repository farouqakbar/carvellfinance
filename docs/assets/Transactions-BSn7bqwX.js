import{H as te,K as ae,N as se,M as re,F as o,y as I,E as e,L as ne,B as ie,j as oe,o as ce,A as le,G as y,m as R,x as N,d as de,b as me,k as pe,s as ue,u as ge}from"./index-Dk5OhnG-.js";import{T as he}from"./TransactionForm-CpXabEMI.js";import{C as xe}from"./ConfirmModal-DTKwzRLI.js";function fe(l){const[x,u]=l.split("-").map(Number),g=new Date(x,u-2,1);return`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`}function be(l){const[x,u]=l.split("-").map(Number),g=new Date(x,u,1);return`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`}function Ne(){const{user:l}=te(),{setHeader:x}=ae(),u=se(),[g,P]=re(),[d,A]=o.useState(()=>g.get("month")||I()),[T,B]=o.useState([]),[w,H]=o.useState([]),[k,q]=o.useState(0),[G,z]=o.useState(!0),[K,f]=o.useState(!1),[j,_]=o.useState(null),[M,C]=o.useState(null),[c,v]=o.useState({category:"",type:"",search:""}),E=d===I(),F=!!l.recording_start_month&&d<=l.recording_start_month,L=t=>{A(t),P({month:t})};o.useEffect(()=>{S()},[d]),o.useEffect(()=>(x(e.jsxs(e.Fragment,{children:[e.jsxs(ne,{to:`/dashboard?month=${d}`,className:"topbar-back-btn",children:["‹ ",e.jsx("span",{className:"back-label",children:"Dashboard"})]}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>L(fe(d)),disabled:F,children:"‹"}),e.jsx("span",{className:"month-label-text",children:ie(d)}),e.jsx("button",{className:"month-btn",onClick:()=>L(be(d)),disabled:E,children:"›"})]}),e.jsxs("div",{className:"topbar-actions",children:[e.jsxs("button",{className:"btn btn-secondary btn-sm btn-csv",style:{height:34,gap:5},onClick:O,children:[e.jsx(oe,{size:13})," CSV"]}),e.jsxs("button",{className:"btn btn-primary btn-sm",style:{height:34,gap:5},onClick:()=>{_(null),f(!0)},children:[e.jsx(ce,{size:13})," Transaksi"]})]})]})),()=>x(null)),[d,E,F]);const S=async()=>{z(!0);const t=`${d}-01`,a=le(d),r=l.recording_start_month;let s=y.from("transactions").select("amount, type").eq("user_id",l.id).lte("date",a);r&&(s=s.gte("date",`${r}-01`));let n=y.from("category_budgets").select("budget_limit, category_id").eq("user_id",l.id).lte("month",d);r&&(n=n.gte("month",r));const[i,m,J,W]=await Promise.all([y.from("transactions").select("*, categories(name, color, icon)").eq("user_id",l.id).gte("date",t).lte("date",a).order("date",{ascending:!1}).order("created_at",{ascending:!1}),y.from("categories").select("*").eq("user_id",l.id).order("name"),s,n]),$=m.data||[],Z=(J.data||[]).reduce((b,p)=>b+(p.type==="income"?Number(p.amount):-Number(p.amount)),0)+(l.saldo_awal||0),ee=(W.data||[]).filter(b=>$.find(p=>p.id===b.category_id&&p.is_mandatory)).reduce((b,p)=>b+Number(p.budget_limit),0);B(i.data||[]),H($),q(Z-ee),z(!1)},U=async()=>{const{error:t}=await y.from("transactions").delete().eq("id",M);if(t){u(t.message,"error");return}u("Transaksi dihapus","success"),C(null),S()},O=()=>{const t=[["Tanggal","Tipe","Kategori","Deskripsi","Nominal"]];h.forEach(i=>{var m;t.push([i.date,i.type,((m=i.categories)==null?void 0:m.name)||"",i.description||"",i.amount])});const a=t.map(i=>i.map(m=>`"${m}"`).join(",")).join(`
`),r=new Blob(["\uFEFF"+a],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(r),n=document.createElement("a");n.href=s,n.download="transaksi-cashvell.csv",n.click(),URL.revokeObjectURL(s),u("CSV diunduh","success")},h=o.useMemo(()=>T.filter(t=>{var a,r,s;if(c.category&&t.category_id!==c.category||c.type&&t.type!==c.type)return!1;if(c.search){const n=c.search.toLowerCase(),i=(a=t.description)==null?void 0:a.toLowerCase().includes(n),m=(s=(r=t.categories)==null?void 0:r.name)==null?void 0:s.toLowerCase().includes(n);if(!i&&!m)return!1}return!0}),[T,c]),Q=o.useMemo(()=>{const t={};return h.forEach(a=>{t[a.date]||(t[a.date]=[]),t[a.date].push(a)}),Object.entries(t).sort(([a],[r])=>r.localeCompare(a))},[h]),V=o.useMemo(()=>{const t=w.find(r=>r.name==="Pemasukan Bulanan"),a=h.reduce((r,s)=>{const n=t&&s.category_id===t.id&&s.type==="income";return s.type==="expense"?r.expense+=Number(s.amount):n?r.gaji+=Number(s.amount):r.nonGajiIncome+=Number(s.amount),r},{gaji:0,expense:0,nonGajiIncome:0});return a.pengeluaran=Math.max(0,a.expense-a.nonGajiIncome),a.saldo=a.gaji-a.pengeluaran,a},[h,w]),D=c.category||c.type||c.search,Y=t=>{const a=new Date(t+"T00:00:00"),r=new Date,s=new Date(r);return s.setDate(r.getDate()-1),a.toDateString()===r.toDateString()?"Hari ini":a.toDateString()===s.toDateString()?"Kemarin":a.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})},X=t=>t.reduce((a,r)=>r.type==="expense"?a-Number(r.amount):a+Number(r.amount),0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"page-header-banner",children:[e.jsx("div",{className:"page-header-icon",children:e.jsx(R,{size:18})}),e.jsxs("div",{children:[e.jsx("h1",{className:"page-header-title",children:"Transaksi"}),e.jsx("p",{className:"page-header-sub",children:"Riwayat pemasukan & pengeluaran"})]})]}),e.jsxs("div",{className:"tx-filter-bar mb-16",children:[e.jsx("input",{className:"form-input",type:"text",placeholder:"Cari transaksi...",value:c.search,onChange:t=>v(a=>({...a,search:t.target.value})),style:{flex:2}}),e.jsxs("select",{className:"form-select",value:c.category,onChange:t=>v(a=>({...a,category:t.target.value})),style:{flex:1},children:[e.jsx("option",{value:"",children:"Semua Kategori"}),w.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),e.jsx("div",{className:"type-filter-btns",children:[["","Semua"],["expense","↓ Keluar"],["income","↑ Masuk"]].map(([t,a])=>e.jsx("button",{className:`type-filter-btn ${c.type===t?"active":""}`,onClick:()=>v(r=>({...r,type:t})),children:a},t))}),D&&e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>v({category:"",type:"",search:""}),children:"Reset"})]}),h.length>0&&e.jsxs("div",{className:"tx-summary-strip mb-16",children:[e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Total Saldo"}),e.jsxs("span",{className:`tss-val tabular ${k>=0?"text-success":"text-danger"}`,children:[k>=0?"+":"",N(Math.abs(k))]})]}),e.jsx("div",{className:"tss-divider"}),e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Pengeluaran"}),e.jsxs("span",{className:"tss-val text-danger tabular",children:["-",N(V.pengeluaran)]})]})]}),G?e.jsx("div",{className:"card",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(5)].map((t,a)=>e.jsx("div",{className:"skeleton",style:{height:52}},a))})}):h.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(R,{size:22})}),e.jsx("strong",{children:D?"Tidak ada yang cocok":"Belum ada transaksi"}),e.jsx("p",{children:D?"Coba ubah atau reset filter":'Tap "+ Transaksi" untuk mulai mencatat'})]})}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:Q.map(([t,a])=>{const r=X(a);return e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-header",children:[e.jsx("span",{className:"tx-group-date",children:Y(t)}),e.jsxs("span",{className:`tx-group-total tabular ${r>=0?"text-success":"text-danger"}`,children:[r>=0?"+":"",N(r)]})]}),e.jsx("div",{className:"card",style:{padding:0,overflow:"hidden"},children:a.map((s,n)=>{var i;return e.jsxs("div",{className:`tx-row-item ${n<a.length-1?"bordered":""}`,children:[e.jsx("div",{className:"tri-icon",style:{background:s.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:s.type==="income"?"var(--success)":"var(--danger)"},children:s.type==="income"?e.jsx(de,{size:14}):e.jsx(me,{size:14})}),e.jsxs("div",{className:"tri-info",children:[e.jsx("span",{className:"tri-desc",children:s.description||((i=s.categories)==null?void 0:i.name)||"Transaksi"}),s.categories&&e.jsx("span",{className:"tri-cat",style:{color:s.categories.color},children:s.categories.name})]}),e.jsxs("div",{className:"tri-right",children:[e.jsxs("span",{className:`tri-amount tabular ${s.type==="income"?"text-success":"text-danger"}`,children:[s.type==="income"?"+":"−",N(s.amount)]}),e.jsxs("div",{className:"tri-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm icon-btn",onClick:()=>{_(s),f(!0)},title:"Edit",children:e.jsx(pe,{size:13})}),e.jsx("button",{className:"btn btn-ghost btn-sm icon-btn",style:{color:"var(--danger)"},onClick:()=>C(s.id),title:"Hapus",children:e.jsx(ue,{size:13})})]})]})]},s.id)})})]},t)})}),e.jsx("style",{children:`
        .icon-btn { padding: 5px 6px !important; }

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
          /* Filter bar lebih compact — search + select sejajar, type filter di bawah */
          .tx-filter-bar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .tx-filter-bar .form-input { grid-column: span 2; }
          .tx-filter-bar .form-select { grid-column: span 1; }
          .type-filter-btns { grid-column: span 1; width: 100%; }
          .tx-filter-bar .btn-ghost { grid-column: span 2; }
        }

        @media (max-width: 400px) {
          .tx-filter-bar { grid-template-columns: 1fr; }
          .tx-filter-bar .form-input,
          .tx-filter-bar .form-select,
          .type-filter-btns,
          .tx-filter-bar .btn-ghost { grid-column: span 1; }
          .type-filter-btns { width: 100%; }
          .tx-summary-strip { padding: 8px 10px; }
          .tss-val { font-size: 0.75rem; }
          .tss-label { font-size: 0.6rem; }
          .tri-amount { font-size: 0.8rem; }
          .tri-icon { width: 32px; height: 32px; }
          .tx-row-item { padding: 10px 12px; gap: 10px; }
        }
      `})]}),M&&e.jsx(xe,{title:"Hapus Transaksi",message:"Transaksi ini akan dihapus permanen dan tidak bisa dikembalikan.",confirmLabel:"Hapus",onConfirm:U,onCancel:()=>C(null)}),K&&e.jsx("div",{className:"modal-overlay",onClick:()=>f(!1),children:e.jsxs("div",{className:"modal",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:j!=null&&j.id?"Edit Transaksi":"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>f(!1),children:e.jsx(ge,{size:16})})]}),e.jsx(he,{month:d,editData:j,onSuccess:S,onClose:()=>f(!1)})]})})]})}export{Ne as default};
