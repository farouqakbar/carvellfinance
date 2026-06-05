import{G as re,J as ne,M as ie,K as oe,E as n,x as q,D as e,L as le,A as ce,n as de,z as me,F as f,l as B,w as b,d as ue,b as I,j as pe,r as ge,t as xe}from"./index-BelV6TJL.js";import{T as he}from"./TransactionForm-h3mc3SaF.js";import{C as fe}from"./ConfirmModal-CFZUxajK.js";function be(o){const[g,x]=o.split("-").map(Number),u=new Date(g,x-2,1);return`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`}function ye(o){const[g,x]=o.split("-").map(Number),u=new Date(g,x,1);return`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`}function ke(){const{user:o}=re(),{setHeader:g}=ne(),x=ie(),[u,A]=oe(),[l,R]=n.useState(()=>u.get("month")||q()),[p,H]=n.useState([]),[y,K]=n.useState([]),[je,W]=n.useState(0),[G,D]=n.useState(!0),[Q,j]=n.useState(!1),[N,T]=n.useState(null),[z,w]=n.useState(null),[i,k]=n.useState({category:"",type:"",search:""}),M=l===q(),$=!!o.recording_start_month&&l<=o.recording_start_month,E=a=>{R(a),A({month:a})};n.useEffect(()=>{_()},[l]),n.useEffect(()=>(g(e.jsxs(e.Fragment,{children:[e.jsxs(le,{to:`/dashboard?month=${l}`,className:"topbar-back-btn",children:["‹ ",e.jsx("span",{className:"back-label",children:"Dashboard"})]}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>E(be(l)),disabled:$,children:"‹"}),e.jsx("span",{className:"month-label-text",children:ce(l)}),e.jsx("button",{className:"month-btn",onClick:()=>E(ye(l)),disabled:M,children:"›"})]}),e.jsx("div",{className:"topbar-actions",children:e.jsxs("button",{className:"btn btn-primary btn-sm",style:{height:34,gap:5},onClick:()=>{T(null),j(!0)},children:[e.jsx(de,{size:13})," Transaksi"]})})]})),()=>g(null)),[l,M,$]);const _=async()=>{D(!0);const a=`${l}-01`,t=me(l),s=o.recording_start_month;let r=f.from("transactions").select("amount, type").eq("user_id",o.id).lte("date",t);s&&(r=r.gte("date",`${s}-01`));let d=f.from("category_budgets").select("budget_limit, category_id").eq("user_id",o.id).lte("month",l);s&&(d=d.gte("month",s));const[h,S,V,Z,ee]=await Promise.all([f.from("transactions").select("*, categories(name, color, icon)").eq("user_id",o.id).gte("date",a).lte("date",t).order("date",{ascending:!1}).order("created_at",{ascending:!1}),f.from("categories").select("*").eq("user_id",o.id).is("month",null).order("name"),r,d,f.from("category_budgets").select("budget_limit, category_id").eq("user_id",o.id).eq("month",l)]),L=S.data||[],C={};(ee.data||[]).forEach(c=>{C[c.category_id]=Number(c.budget_limit)});const te=L.map(c=>({...c,budget_limit:C[c.id]!==void 0?C[c.id]:c.budget_limit||0})),ae=(V.data||[]).reduce((c,m)=>c+(m.type==="income"?Number(m.amount):-Number(m.amount)),0)+(o.saldo_awal||0),se=(Z.data||[]).filter(c=>L.find(m=>m.id===c.category_id&&m.is_mandatory)).reduce((c,m)=>c+Number(m.budget_limit),0);H(h.data||[]),K(te),W(ae-se),D(!1)},Y=async()=>{const{error:a}=await f.from("transactions").delete().eq("id",z);if(a){x(a.message,"error");return}x("Transaksi dihapus","success"),w(null),_()},v=n.useMemo(()=>p.filter(a=>{var t,s,r;if(i.category&&a.category_id!==i.category||i.type&&a.type!==i.type)return!1;if(i.search){const d=i.search.toLowerCase(),h=(t=a.description)==null?void 0:t.toLowerCase().includes(d),S=(r=(s=a.categories)==null?void 0:s.name)==null?void 0:r.toLowerCase().includes(d);if(!h&&!S)return!1}return!0}),[p,i]),J=n.useMemo(()=>{const a={};return v.forEach(t=>{a[t.date]||(a[t.date]=[]),a[t.date].push(t)}),Object.entries(a).sort(([t],[s])=>s.localeCompare(t))},[v]);n.useMemo(()=>v.reduce((a,t)=>(t.type==="expense"?a.expense+=Number(t.amount):a.income+=Number(t.amount),a),{expense:0,income:0}),[v]);const F=n.useMemo(()=>p.reduce((a,t)=>(t.type==="expense"?a.expense+=Number(t.amount):a.income+=Number(t.amount),a),{expense:0,income:0}),[p]),O=n.useMemo(()=>{const a=y.find(t=>t.name==="Pemasukan Bulanan");return p.filter(t=>t.type==="income"&&t.category_id===(a==null?void 0:a.id)).reduce((t,s)=>t+Number(s.amount),0)},[p,y]),P=i.category||i.type||i.search,U=a=>{const t=new Date(a+"T00:00:00"),s=new Date,r=new Date(s);return r.setDate(s.getDate()-1),t.toDateString()===s.toDateString()?"Hari ini":t.toDateString()===r.toDateString()?"Kemarin":t.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})},X=a=>a.reduce((t,s)=>s.type==="expense"?t-Number(s.amount):t+Number(s.amount),0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"page-header-banner",children:[e.jsx("div",{className:"page-header-icon",children:e.jsx(B,{size:18})}),e.jsxs("div",{children:[e.jsx("h1",{className:"page-header-title",children:"Transaksi"}),e.jsx("p",{className:"page-header-sub",children:"Riwayat pemasukan & pengeluaran"})]})]}),p.length>0&&(()=>{const a=y.filter(r=>r.is_mandatory).reduce((r,d)=>r+Number(d.budget_limit||0),0),t=F.income-F.expense-a,s=O-t;return e.jsxs("div",{className:"tx-summary-strip mb-16",children:[e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Total Saldo"}),e.jsxs("span",{className:`tss-val tabular ${t>=0?"text-success":"text-danger"}`,children:[t>=0?"+":"-",b(Math.abs(t))]})]}),e.jsx("div",{className:"tss-divider"}),e.jsxs("div",{className:"tss-item",children:[e.jsx("span",{className:"tss-label",children:"Total Pengeluaran"}),e.jsxs("span",{className:"tss-val text-danger tabular",children:["-",b(Math.max(0,s))]})]})]})})(),e.jsxs("div",{className:"tx-filter-bar mb-16",children:[e.jsx("input",{className:"form-input",type:"text",placeholder:"Cari transaksi...",value:i.search,onChange:a=>k(t=>({...t,search:a.target.value})),style:{flex:2}}),e.jsxs("select",{className:"form-select",value:i.category,onChange:a=>k(t=>({...t,category:a.target.value})),style:{flex:1},children:[e.jsx("option",{value:"",children:"Semua Kategori"}),y.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]}),e.jsx("div",{className:"type-filter-btns",children:[["","Semua"],["expense","↓ Keluar"],["income","↑ Masuk"]].map(([a,t])=>e.jsx("button",{className:`type-filter-btn ${i.type===a?"active":""}`,onClick:()=>k(s=>({...s,type:a})),children:t},a))})]}),G?e.jsx("div",{className:"card",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(5)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:52}},t))})}):v.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(B,{size:22})}),e.jsx("strong",{children:P?"Tidak ada yang cocok":"Belum ada transaksi"}),e.jsx("p",{children:P?"Coba ubah atau reset filter":'Tap "+ Transaksi" untuk mulai mencatat'})]})}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[J.map(([a,t])=>{const s=X(t);return e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-header",children:[e.jsx("span",{className:"tx-group-date",children:U(a)}),e.jsxs("span",{className:`tx-group-total tabular ${s>=0?"text-success":"text-danger"}`,children:[s>=0?"+":"",b(s)]})]}),e.jsx("div",{className:"card",style:{padding:0,overflow:"hidden"},children:t.map((r,d)=>{var h;return e.jsxs("div",{className:`tx-row-item ${d<t.length-1?"bordered":""}`,children:[e.jsx("div",{className:"tri-icon",style:{background:r.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:r.type==="income"?"var(--success)":"var(--danger)"},children:r.type==="income"?e.jsx(ue,{size:14}):e.jsx(I,{size:14})}),e.jsxs("div",{className:"tri-info",children:[e.jsx("span",{className:"tri-desc",children:r.description||((h=r.categories)==null?void 0:h.name)||"Transaksi"}),r.categories&&e.jsx("span",{className:"tri-cat",style:{color:r.categories.color},children:r.categories.name})]}),e.jsxs("div",{className:"tri-right",children:[e.jsxs("span",{className:`tri-amount tabular ${r.type==="income"?"text-success":"text-danger"}`,children:[r.type==="income"?"+":"−",b(r.amount)]}),e.jsxs("div",{className:"tri-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm icon-btn",onClick:()=>{T(r),j(!0)},title:"Edit",children:e.jsx(pe,{size:13})}),e.jsx("button",{className:"btn btn-ghost btn-sm icon-btn",style:{color:"var(--danger)"},onClick:()=>w(r.id),title:"Hapus",children:e.jsx(ge,{size:13})})]})]})]},r.id)})})]},a)}),(!i.type||i.type==="expense")&&(()=>{const a=y.filter(t=>t.is_mandatory&&Number(t.budget_limit)>0);return a.length?e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-header",children:[e.jsx("span",{className:"tx-group-date",children:"Pengeluaran Wajib"}),e.jsxs("span",{className:"tx-group-total tabular text-danger",children:["−",b(a.reduce((t,s)=>t+Number(s.budget_limit),0))]})]}),e.jsx("div",{className:"card",style:{padding:0,overflow:"hidden"},children:a.map((t,s)=>e.jsxs("div",{className:`tx-row-item ${s<a.length-1?"bordered":""}`,children:[e.jsx("div",{className:"tri-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(I,{size:14})}),e.jsxs("div",{className:"tri-info",children:[e.jsx("span",{className:"tri-desc",children:t.name}),e.jsx("span",{className:"tri-cat",style:{color:"var(--danger)"},children:"Wajib · langsung dipotong"})]}),e.jsx("div",{className:"tri-right",children:e.jsxs("span",{className:"tri-amount tabular text-danger",children:["−",b(t.budget_limit)]})})]},t.id))})]}):null})()]}),e.jsx("style",{children:`
        .icon-btn { padding: 5px 6px !important; }

        .tx-filter-bar {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .type-filter-btns {
          display: flex; gap: 3px;
          background: var(--bg-glass);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 3px; flex-shrink: 0;
        }
        .type-filter-btn {
          padding: 5px 12px; border: none; border-radius: 5px;
          background: transparent; color: var(--text-muted);
          font-family: var(--font-sans); font-size: 0.76rem; font-weight: 600;
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .type-filter-btn.active {
          background: var(--gradient-accent); color: #fff;
          box-shadow: var(--glow-sm);
        }

        .tx-summary-strip {
          display: flex; align-items: center;
          background: var(--bg-card);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-lg);
          padding: 14px 22px; gap: 0;
          box-shadow: var(--shadow);
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
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; transition: background 0.15s;
          border-radius: 10px; margin: 1px 2px;
        }
        .tx-row-item:hover { background: rgba(99,102,241,0.05); }
        .tx-row-item.bordered { border-bottom: 1px solid rgba(99,102,241,0.06); border-radius: 0; margin: 0; }
        .tx-row-item.bordered:last-child { border-bottom: none; }

        .tri-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
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
      `})]}),z&&e.jsx(fe,{title:"Hapus Transaksi",message:"Transaksi ini akan dihapus permanen dan tidak bisa dikembalikan.",confirmLabel:"Hapus",onConfirm:Y,onCancel:()=>w(null)}),Q&&e.jsx("div",{className:"modal-overlay",onClick:()=>j(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:N!=null&&N.id?"Edit Transaksi":"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>j(!1),children:e.jsx(xe,{size:16})})]}),e.jsx(he,{month:l,editData:N,onSuccess:_,onClose:()=>j(!1)})]})})]})}export{ke as default};
