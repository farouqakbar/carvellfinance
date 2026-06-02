import{u as ee,i as te,h as ae,r as l,g as F,s as y,j as e,L as se,d as re,f as w}from"./index-8D83QUkP.js";import{T as ne}from"./TransactionForm-LeoT8Cfk.js";import{C as ie}from"./ConfirmModal-73dFZhFq.js";function oe(c){const[x,h]=c.split("-").map(Number),u=new Date(x,h-2,1);return`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`}function le(c){const[x,h]=c.split("-").map(Number),u=new Date(x,h,1);return`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`}function pe(){const{user:c}=ee(),x=te(),[h,u]=ae(),[d,R]=l.useState(()=>h.get("month")||F()),[T,E]=l.useState([]),[k,q]=l.useState([]),[N,G]=l.useState(0),[P,z]=l.useState(!0),[B,f]=l.useState(!1),[v,M]=l.useState(null),[_,S]=l.useState(null),[o,j]=l.useState({category:"",type:"",search:""}),I=d===F(),L=t=>{R(t),u({month:t})};l.useEffect(()=>{C()},[d]);const C=async()=>{z(!0);const t=`${d}-01`,[a,r]=d.split("-").map(Number),s=new Date(a,r,0).toISOString().split("T")[0],i=c.recording_start_month;let n=y.from("transactions").select("amount, type").eq("user_id",c.id).lte("date",s);i&&(n=n.gte("date",`${i}-01`));let m=y.from("category_budgets").select("budget_limit, category_id").eq("user_id",c.id).lte("month",d);i&&(m=m.gte("month",i));const[V,Y,J,W]=await Promise.all([y.from("transactions").select("*, categories(name, color, icon)").eq("user_id",c.id).gte("date",t).lte("date",s).order("date",{ascending:!1}).order("created_at",{ascending:!1}),y.from("categories").select("*").eq("user_id",c.id).order("name"),n,m]),$=Y.data||[],X=(J.data||[]).reduce((b,p)=>b+(p.type==="income"?Number(p.amount):-Number(p.amount)),0)+(c.saldo_awal||0),Z=(W.data||[]).filter(b=>$.find(p=>p.id===b.category_id&&p.is_mandatory)).reduce((b,p)=>b+Number(p.budget_limit),0);E(V.data||[]),q($),G(X-Z),z(!1)},K=async()=>{await y.from("transactions").delete().eq("id",_),x("Transaksi dihapus","success"),S(null),C()},O=()=>{const t=[["Tanggal","Tipe","Kategori","Deskripsi","Nominal"]];g.forEach(n=>{var m;t.push([n.date,n.type,((m=n.categories)==null?void 0:m.name)||"",n.description||"",n.amount])});const a=t.map(n=>n.map(m=>`"${m}"`).join(",")).join(`
`),r=new Blob(["\uFEFF"+a],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download="transaksi-cashvell.csv",i.click(),URL.revokeObjectURL(s),x("CSV diunduh","success")},g=l.useMemo(()=>T.filter(t=>{var a,r,s;if(o.category&&t.category_id!==o.category||o.type&&t.type!==o.type)return!1;if(o.search){const i=o.search.toLowerCase(),n=(a=t.description)==null?void 0:a.toLowerCase().includes(i),m=(s=(r=t.categories)==null?void 0:r.name)==null?void 0:s.toLowerCase().includes(i);if(!n&&!m)return!1}return!0}),[T,o]),U=l.useMemo(()=>{const t={};return g.forEach(a=>{t[a.date]||(t[a.date]=[]),t[a.date].push(a)}),Object.entries(t).sort(([a],[r])=>r.localeCompare(a))},[g]),A=l.useMemo(()=>{const t=k.find(r=>r.name==="Gaji"),a=g.reduce((r,s)=>{const i=t&&s.category_id===t.id&&s.type==="income";return s.type==="expense"?r.expense+=Number(s.amount):i?r.gaji+=Number(s.amount):r.nonGajiIncome+=Number(s.amount),r},{gaji:0,expense:0,nonGajiIncome:0});return a.pengeluaran=Math.max(0,a.expense-a.nonGajiIncome),a.saldo=a.gaji-a.pengeluaran,a},[g,k]),D=o.category||o.type||o.search,H=t=>{const a=new Date(t+"T00:00:00"),r=new Date,s=new Date(r);return s.setDate(r.getDate()-1),a.toDateString()===r.toDateString()?"Hari ini":a.toDateString()===s.toDateString()?"Kemarin":a.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})},Q=t=>t.reduce((a,r)=>r.type==="expense"?a-Number(r.amount):a+Number(r.amount),0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"dash-header",children:[e.jsx(se,{to:`/dashboard?month=${d}`,className:"back-btn",children:"‹ Dashboard"}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>L(oe(d)),children:"‹"}),e.jsx("span",{className:"month-label-text",children:re(d)}),e.jsx("button",{className:"month-btn",onClick:()=>L(le(d)),disabled:I,children:"›"})]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("button",{className:"btn btn-secondary btn-sm",style:{fontSize:"0.78rem",height:34},onClick:O,children:"↓ CSV"}),e.jsx("button",{className:"btn btn-primary btn-sm",style:{fontSize:"0.78rem",height:34},onClick:()=>{M(null),f(!0)},children:"+ Transaksi"})]})]}),e.jsxs("div",{className:"tx-page-header",children:[e.jsx("div",{className:"tx-page-icon",children:"↕"}),e.jsxs("div",{children:[e.jsx("h1",{className:"tx-page-title",children:"Transaksi"}),e.jsx("p",{className:"tx-page-sub",children:"Riwayat pemasukan & pengeluaran"})]})]}),e.jsxs("div",{className:"tx-filter-bar mb-16",children:[e.jsx("input",{className:"form-input",type:"text",placeholder:"Cari transaksi...",value:o.search,onChange:t=>j(a=>({...a,search:t.target.value})),style:{flex:2}}),e.jsxs("select",{className:"form-select",value:o.category,onChange:t=>j(a=>({...a,category:t.target.value})),style:{flex:1},children:[e.jsx("option",{value:"",children:"Semua Kategori"}),k.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),e.jsx("div",{className:"type-filter-btns",children:[["","Semua"],["expense","↓ Keluar"],["income","↑ Masuk"]].map(([t,a])=>e.jsx("button",{className:`type-filter-btn ${o.type===t?"active":""}`,onClick:()=>j(r=>({...r,type:t})),children:a},t))}),D&&e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>j({category:"",type:"",search:""}),children:"Reset"})]}),g.length>0&&e.jsxs("div",{className:"tx-summary-strip mb-16",children:[e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Total Saldo"}),e.jsxs("span",{className:`tss-val tabular ${N>=0?"text-success":"text-danger"}`,children:[N>=0?"+":"",w(Math.abs(N))]})]}),e.jsx("div",{className:"tss-divider"}),e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Pengeluaran"}),e.jsxs("span",{className:"tss-val text-danger tabular",children:["-",w(A.pengeluaran)]})]})]}),P?e.jsx("div",{className:"card",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(5)].map((t,a)=>e.jsx("div",{className:"skeleton",style:{height:52}},a))})}):g.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"↕"}),e.jsx("strong",{children:D?"Tidak ada yang cocok":"Belum ada transaksi"}),e.jsx("p",{children:D?"Coba ubah atau reset filter":'Tap "+ Tambah" untuk mulai mencatat'})]})}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:U.map(([t,a])=>{const r=Q(a);return e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-header",children:[e.jsx("span",{className:"tx-group-date",children:H(t)}),e.jsxs("span",{className:`tx-group-total tabular ${r>=0?"text-success":"text-danger"}`,children:[r>=0?"+":"",w(r)]})]}),e.jsx("div",{className:"card",style:{padding:0,overflow:"hidden"},children:a.map((s,i)=>{var n;return e.jsxs("div",{className:`tx-row-item ${i<a.length-1?"bordered":""}`,children:[e.jsx("div",{className:"tri-icon",style:{background:s.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:s.type==="income"?"var(--success)":"var(--danger)"},children:s.type==="income"?"↑":"↓"}),e.jsxs("div",{className:"tri-info",children:[e.jsx("span",{className:"tri-desc",children:s.description||((n=s.categories)==null?void 0:n.name)||"Transaksi"}),s.categories&&e.jsx("span",{className:"tri-cat",style:{color:s.categories.color},children:s.categories.name})]}),e.jsxs("div",{className:"tri-right",children:[e.jsxs("span",{className:`tri-amount tabular ${s.type==="income"?"text-success":"text-danger"}`,children:[s.type==="income"?"+":"−",w(s.amount)]}),e.jsxs("div",{className:"tri-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{M(s),f(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>S(s.id),children:"✕"})]})]})]},s.id)})})]},t)})}),e.jsx("style",{children:`
        .tx-page-header {
          display: flex; align-items: center; gap: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          border-radius: var(--radius-lg);
          padding: 16px 20px;
          margin-bottom: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
        .tx-page-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--accent-dim); color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0;
        }
        .tx-page-title {
          font-size: 1.1rem; font-weight: 800; letter-spacing: -0.03em;
          color: var(--text-primary); line-height: 1; margin: 0 0 4px;
        }
        .tx-page-sub {
          font-size: 0.72rem; color: var(--text-muted); font-weight: 500; margin: 0;
        }
        .back-btn {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.75rem; font-weight: 600;
          color: var(--text-muted); text-decoration: none;
          padding: 5px 10px; transition: all 0.15s;
          width: fit-content; justify-self: start;
          font-family: var(--font-sans);
          letter-spacing: -0.01em;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .back-btn:hover { color: var(--text-primary); background: var(--bg-input); box-shadow: none; }
        .dash-header {
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; gap: 10px;
          position: sticky; top: 0; z-index: 100;
          background: var(--bg-sticky); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          padding: 10px 0; margin-bottom: 10px;
        }
        .dash-header > :last-child { display: flex; justify-content: flex-end; gap: 6px; }
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
      `})]}),_&&e.jsx(ie,{title:"Hapus Transaksi",message:"Transaksi ini akan dihapus permanen dan tidak bisa dikembalikan.",confirmLabel:"Hapus",onConfirm:K,onCancel:()=>S(null)}),B&&e.jsx("div",{className:"modal-overlay",onClick:()=>f(!1),children:e.jsxs("div",{className:"modal",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:v!=null&&v.id?"Edit Transaksi":"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>f(!1),children:"✕"})]}),e.jsx(ne,{month:d,editData:v,onSuccess:C,onClose:()=>f(!1)})]})})]})}export{pe as default};
