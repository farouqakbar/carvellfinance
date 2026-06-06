import{F as se,H as re,K as ne,J as oe,D as n,w as $,B as e,L as ie,z as le,m as ce,y as de,E as h,v as f,k as me,c as pe,a as q,i as xe,q as ue,s as ge}from"./index-D7c8ubOf.js";import{T as he}from"./TransactionForm-Cn0XU1qy.js";import{a as fe,C as be}from"./ConfirmModal-CcnL_Q86.js";function ye(i){const[u,g]=i.split("-").map(Number),p=new Date(u,g-2,1);return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`}function je(i){const[u,g]=i.split("-").map(Number),p=new Date(u,g,1);return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`}function _e(){const{user:i}=se(),{setHeader:u}=re(),g=ne(),[p,I]=oe(),[l,B]=n.useState(()=>p.get("month")||$()),[x,R]=n.useState([]),[b,H]=n.useState([]),[ve,K]=n.useState(0),[G,D]=n.useState(!0),[O,y]=n.useState(!1),[v,M]=n.useState(null),[z,N]=n.useState(null),[o,w]=n.useState({category:"",type:"",search:""}),T=l===$(),E=!!i.recording_start_month&&l<=i.recording_start_month,L=a=>{B(a),I({month:a})};n.useEffect(()=>{k()},[l]),n.useEffect(()=>(u(e.jsxs(e.Fragment,{children:[e.jsxs(ie,{to:`/dashboard?month=${l}`,className:"topbar-back-btn",children:["‹ ",e.jsx("span",{className:"back-label",children:"Dashboard"})]}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>L(ye(l)),disabled:E,children:"‹"}),e.jsx("span",{className:"month-label-text",children:le(l)}),e.jsx("button",{className:"month-btn",onClick:()=>L(je(l)),disabled:T,children:"›"})]}),e.jsx("div",{className:"topbar-actions",children:e.jsxs("button",{className:"btn btn-primary btn-sm",style:{height:34,gap:5},onClick:()=>{M(null),y(!0)},children:[e.jsx(ce,{size:13})," Transaksi"]})})]})),()=>u(null)),[l,T,E]);const k=async()=>{D(!0);const a=`${l}-01`,t=de(l),s=i.recording_start_month;let r=h.from("transactions").select("amount, type").eq("user_id",i.id).lte("date",t);s&&(r=r.gte("date",`${s}-01`));let d=h.from("category_budgets").select("budget_limit, category_id").eq("user_id",i.id).lte("month",l);s&&(d=d.gte("month",s));const[_,S,X,V,Z]=await Promise.all([h.from("transactions").select("*, categories(name, color, icon)").eq("user_id",i.id).gte("date",a).lte("date",t).order("date",{ascending:!1}).order("created_at",{ascending:!1}),h.from("categories").select("*").eq("user_id",i.id).is("month",null).order("name"),r,d,h.from("category_budgets").select("budget_limit, category_id").eq("user_id",i.id).eq("month",l)]),P=S.data||[],C={};(Z.data||[]).forEach(c=>{C[c.category_id]=Number(c.budget_limit)});const ee=P.map(c=>({...c,budget_limit:C[c.id]!==void 0?C[c.id]:c.budget_limit||0})),te=(X.data||[]).reduce((c,m)=>c+(m.type==="income"?Number(m.amount):-Number(m.amount)),0)+(i.saldo_awal||0),ae=(V.data||[]).filter(c=>P.find(m=>m.id===c.category_id&&m.is_mandatory)).reduce((c,m)=>c+Number(m.budget_limit),0);R(_.data||[]),H(ee),K(te-ae),D(!1)},W=async()=>{const{error:a}=await h.from("transactions").delete().eq("id",z);if(a){g(a.message,"error");return}g("Transaksi dihapus","success"),N(null),k()},j=n.useMemo(()=>x.filter(a=>{var t,s,r;if(o.category&&a.category_id!==o.category||o.type&&a.type!==o.type)return!1;if(o.search){const d=o.search.toLowerCase(),_=(t=a.description)==null?void 0:t.toLowerCase().includes(d),S=(r=(s=a.categories)==null?void 0:s.name)==null?void 0:r.toLowerCase().includes(d);if(!_&&!S)return!1}return!0}),[x,o]),Q=n.useMemo(()=>{const a={};return j.forEach(t=>{a[t.date]||(a[t.date]=[]),a[t.date].push(t)}),Object.entries(a).sort(([t],[s])=>s.localeCompare(t))},[j]);n.useMemo(()=>j.reduce((a,t)=>(t.type==="expense"?a.expense+=Number(t.amount):a.income+=Number(t.amount),a),{expense:0,income:0}),[j]);const F=n.useMemo(()=>x.reduce((a,t)=>(t.type==="expense"?a.expense+=Number(t.amount):a.income+=Number(t.amount),a),{expense:0,income:0}),[x]),U=n.useMemo(()=>{const a=b.find(t=>fe(t));return x.filter(t=>t.type==="income"&&t.category_id===(a==null?void 0:a.id)).reduce((t,s)=>t+Number(s.amount),0)},[x,b]),A=o.category||o.type||o.search,Y=a=>{const t=new Date(a+"T00:00:00"),s=new Date,r=new Date(s);return r.setDate(s.getDate()-1),t.toDateString()===s.toDateString()?"Hari ini":t.toDateString()===r.toDateString()?"Kemarin":t.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})},J=a=>a.reduce((t,s)=>s.type==="expense"?t-Number(s.amount):t+Number(s.amount),0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in tx-page",children:[x.length>0&&(()=>{const a=b.filter(r=>r.is_mandatory).reduce((r,d)=>r+Number(d.budget_limit||0),0),t=F.income-F.expense-a,s=U-t;return e.jsxs("div",{className:"tx-stats",children:[e.jsxs("div",{className:"tx-stat",children:[e.jsx("span",{className:"tx-stat-label",children:"TOTAL SALDO"}),e.jsxs("span",{className:"tx-stat-val tabular",style:{color:t>=0?"#34d399":"#f87171"},children:[t>=0?"+":"−",f(Math.abs(t))]})]}),e.jsx("div",{className:"tx-stat-sep"}),e.jsxs("div",{className:"tx-stat",children:[e.jsx("span",{className:"tx-stat-label",children:"PENGELUARAN"}),e.jsxs("span",{className:"tx-stat-val tabular",style:{color:"#f87171"},children:["−",f(Math.max(0,s))]})]})]})})(),e.jsxs("div",{className:"tx-filter",children:[e.jsx("input",{className:"form-input tx-search",type:"text",placeholder:"Cari transaksi...",value:o.search,onChange:a=>w(t=>({...t,search:a.target.value}))}),e.jsxs("select",{className:"form-select tx-cat-select",value:o.category,onChange:a=>w(t=>({...t,category:a.target.value})),children:[e.jsx("option",{value:"",children:"Semua Kategori"}),b.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]}),e.jsx("div",{className:"tx-type-toggle",children:[["","Semua"],["expense","Keluar"],["income","Masuk"]].map(([a,t])=>e.jsx("button",{className:`tx-type-btn${o.type===a?" active":""}`,onClick:()=>w(s=>({...s,type:a})),children:t},a))})]}),G?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[...Array(6)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:52}},t))}):j.length===0?e.jsxs("div",{className:"tx-empty",children:[e.jsx(me,{size:20}),e.jsx("span",{children:A?"Tidak ada yang cocok":"Belum ada transaksi"}),e.jsx("p",{children:A?"Coba ubah atau reset filter":"Tambah transaksi pertamamu"})]}):e.jsxs("div",{className:"tx-list",children:[Q.map(([a,t])=>{const s=J(t);return e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-head",children:[e.jsx("span",{className:"tx-group-date",children:Y(a)}),e.jsxs("span",{className:`tx-group-total tabular${s>=0?"":" neg"}`,children:[s>=0?"+":"",f(s)]})]}),e.jsx("div",{className:"tx-group-rows",children:t.map(r=>{var d;return e.jsxs("div",{className:"tx-row",style:{"--tc":r.type==="income"?"#34d399":"#f87171"},children:[e.jsx("div",{className:"tx-icon",style:{background:r.type==="income"?"rgba(52,211,153,0.1)":"rgba(248,113,113,0.1)",color:r.type==="income"?"#34d399":"#f87171"},children:r.type==="income"?e.jsx(pe,{size:13}):e.jsx(q,{size:13})}),e.jsxs("div",{className:"tx-info",children:[e.jsx("span",{className:"tx-desc",children:r.description||((d=r.categories)==null?void 0:d.name)||"Transaksi"}),r.categories&&e.jsx("span",{className:"tx-cat",style:{color:r.categories.color||"var(--text-muted)"},children:r.categories.name})]}),e.jsxs("span",{className:`tx-amount tabular${r.type==="income"?" inc":" exp"}`,children:[r.type==="income"?"+":"−",f(r.amount)]}),e.jsxs("div",{className:"tx-actions",children:[e.jsx("button",{className:"tx-act-btn",onClick:()=>{M(r),y(!0)},title:"Edit",children:e.jsx(xe,{size:11})}),e.jsx("button",{className:"tx-act-btn danger",onClick:()=>N(r.id),title:"Hapus",children:e.jsx(ue,{size:11})})]})]},r.id)})})]},a)}),(!o.type||o.type==="expense")&&(()=>{const a=b.filter(t=>t.is_mandatory&&Number(t.budget_limit)>0);return a.length?e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-head",children:[e.jsx("span",{className:"tx-group-date",children:"Pengeluaran Wajib"}),e.jsxs("span",{className:"tx-group-total tabular neg",children:["−",f(a.reduce((t,s)=>t+Number(s.budget_limit),0))]})]}),e.jsx("div",{className:"tx-group-rows",children:a.map(t=>e.jsxs("div",{className:"tx-row",style:{"--tc":"#f87171"},children:[e.jsx("div",{className:"tx-icon",style:{background:"rgba(248,113,113,0.1)",color:"#f87171"},children:e.jsx(q,{size:13})}),e.jsxs("div",{className:"tx-info",children:[e.jsx("span",{className:"tx-desc",children:t.name}),e.jsx("span",{className:"tx-cat",style:{color:"#f87171"},children:"Wajib · langsung dipotong"})]}),e.jsxs("span",{className:"tx-amount tabular exp",children:["−",f(t.budget_limit)]})]},t.id))})]}):null})()]}),e.jsx("style",{children:`
        .tx-page { display: flex; flex-direction: column; gap: 16px; padding-bottom: 48px; }

        /* Stats */
        .tx-stats {
          display: flex;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .tx-stat {
          flex: 1; padding: 12px 18px;
          display: flex; flex-direction: column; gap: 3px;
        }
        .tx-stat-sep { width: 1px; background: var(--border); flex-shrink: 0; margin: 8px 0; }
        .tx-stat-label {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-muted);
        }
        .tx-stat-val {
          font-size: 0.95rem; font-weight: 800; letter-spacing: -0.03em;
        }

        /* Filter — satu baris di desktop, 2 baris di mobile */
        .tx-filter {
          display: flex; gap: 8px; align-items: center; flex-wrap: nowrap;
        }
        .tx-search { flex: 2; min-width: 0; }
        .tx-cat-select { flex: 1; min-width: 0; }

        .tx-type-toggle {
          display: flex; gap: 2px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px; padding: 3px; flex-shrink: 0;
        }
        [data-theme="light"] .tx-type-toggle { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.08); }
        .tx-type-btn {
          padding: 5px 12px; border-radius: 5px; border: none;
          background: transparent; color: var(--text-muted);
          font-family: var(--font-sans); font-size: 0.72rem; font-weight: 700;
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .tx-type-btn:hover { color: var(--text-secondary); }
        .tx-type-btn.active { background: rgba(255,255,255,0.09); color: var(--text-primary); }
        [data-theme="light"] .tx-type-btn.active { background: #fff; color: var(--accent); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

        /* Groups */
        .tx-list { display: flex; flex-direction: column; gap: 24px; }
        .tx-group { display: flex; flex-direction: column; }

        .tx-group-head {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }
        .tx-group-date {
          font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-muted);
        }
        .tx-group-total { font-size: 0.78rem; font-weight: 700; letter-spacing: -0.01em; color: #34d399; }
        .tx-group-total.neg { color: #f87171; }

        /* Rows */
        .tx-group-rows { }
        .tx-row {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 4px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          position: relative; transition: background 0.12s;
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-row::before {
          content: ''; position: absolute;
          left: 0; top: 8px; bottom: 8px; width: 2px;
          background: var(--tc); border-radius: 2px;
          opacity: 0; transition: opacity 0.15s;
        }
        .tx-row:hover { background: rgba(255,255,255,0.02); }
        .tx-row:hover::before { opacity: 0.8; }

        .tx-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .tx-info { flex: 1; min-width: 0; }
        .tx-desc {
          display: block; font-size: 0.8125rem; font-weight: 600;
          color: var(--text-primary); letter-spacing: -0.01em;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .tx-cat { font-size: 0.6rem; font-weight: 600; display: block; margin-top: 1px; opacity: 0.85; }
        .tx-amount { font-size: 0.875rem; font-weight: 700; letter-spacing: -0.02em; flex-shrink: 0; }
        .tx-amount.inc { color: #34d399; }
        .tx-amount.exp { color: #f87171; }

        .tx-actions { display: flex; gap: 1px; opacity: 0; transition: opacity 0.15s; flex-shrink: 0; }
        .tx-row:hover .tx-actions { opacity: 1; }
        .tx-act-btn {
          width: 26px; height: 26px; border-radius: 5px;
          background: transparent; border: none; color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.12s;
        }
        .tx-act-btn:hover { background: rgba(255,255,255,0.07); color: var(--text-primary); }
        .tx-act-btn.danger:hover { background: rgba(248,113,113,0.1); color: #f87171; }

        /* Empty */
        .tx-empty {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 48px 0; color: var(--text-muted);
          font-size: 0.82rem; font-weight: 600;
        }
        .tx-empty p { font-size: 0.72rem; font-weight: 400; margin: 0; }

        /* Mobile */
        @media (max-width: 640px) {
          .tx-stat { padding: 10px 14px; }
          .tx-stat-val { font-size: 0.88rem; }
          .tx-actions { opacity: 1; }
          .tx-row { padding: 11px 2px; gap: 10px; }
          .tx-amount { font-size: 0.82rem; }
          .tx-type-btn { padding: 5px 8px; font-size: 0.68rem; }
          /* Mobile: filter jadi 2 baris */
          .tx-filter { flex-wrap: wrap; }
          .tx-search { flex: 1 1 100%; }
          .tx-cat-select { flex: 1; }
          .tx-type-toggle { flex-shrink: 0; }
        }
        @media (max-width: 380px) {
          .tx-stat-val { font-size: 0.82rem; }
          .tx-stat-label { font-size: 0.52rem; }
          .tx-icon { width: 28px; height: 28px; }
        }
      `})]}),z&&e.jsx(be,{title:"Hapus Transaksi",message:"Transaksi ini akan dihapus permanen dan tidak bisa dikembalikan.",confirmLabel:"Hapus",onConfirm:W,onCancel:()=>N(null)}),O&&e.jsx("div",{className:"modal-overlay",onClick:()=>y(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:v!=null&&v.id?"Edit Transaksi":"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>y(!1),children:e.jsx(ge,{size:16})})]}),e.jsx(he,{month:l,editData:v,onSuccess:k,onClose:()=>y(!1)})]})})]})}export{_e as default};
