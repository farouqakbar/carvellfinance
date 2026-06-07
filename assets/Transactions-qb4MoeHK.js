import{F as re,H as ne,K as oe,J as ie,D as n,w as P,E as p,B as e,L as ce,z as le,m as de,y as me,v as b,k as pe,c as xe,a as I,i as ue,q as ge,s as he}from"./index-oPF2CX6W.js";import{T as fe}from"./TransactionForm--b4_-i8P.js";import{a as be,C as ye}from"./ConfirmModal-D_dUlnsF.js";function je(o){const[h,f]=o.split("-").map(Number),x=new Date(h,f-2,1);return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`}function ve(o){const[h,f]=o.split("-").map(Number),x=new Date(h,f,1);return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`}function _e(){const{user:o}=re(),{setHeader:h}=ne(),f=oe(),[x,B]=ie(),[c,A]=n.useState(()=>x.get("month")||P()),[u,H]=n.useState([]),[v,R]=n.useState([]),[N,K]=n.useState(0),[G,z]=n.useState(!0),[O,y]=n.useState(!1),[w,T]=n.useState(null),[E,_]=n.useState(null),[i,S]=n.useState({category:"",type:"",search:""}),L=c===P(),F=!!o.recording_start_month&&c<=o.recording_start_month,$=t=>{A(t),B({month:t})};n.useEffect(()=>{k()},[c]);const g=n.useRef(null);n.useEffect(()=>{g.current=k}),n.useEffect(()=>{const t=p.channel(`tx-realtime-${o.id}`).on("postgres_changes",{event:"*",schema:"public",table:"transactions",filter:`user_id=eq.${o.id}`},()=>{var s;(s=g.current)==null||s.call(g)}).subscribe(),a=()=>{var s;return(s=g.current)==null?void 0:s.call(g)};return window.addEventListener("focus",a),()=>{p.removeChannel(t),window.removeEventListener("focus",a)}},[o.id]),n.useEffect(()=>(h(e.jsxs(e.Fragment,{children:[e.jsxs(ce,{to:`/dashboard?month=${c}`,className:"topbar-back-btn",children:["‹ ",e.jsx("span",{className:"back-label",children:"Dashboard"})]}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>$(je(c)),disabled:F,children:"‹"}),e.jsx("span",{className:"month-label-text",children:le(c)}),e.jsx("button",{className:"month-btn",onClick:()=>$(ve(c)),disabled:L,children:"›"})]}),e.jsx("div",{className:"topbar-actions",children:e.jsxs("button",{className:"btn btn-primary btn-sm",style:{height:34,gap:5},onClick:()=>{T(null),y(!0)},children:[e.jsx(de,{size:13})," Transaksi"]})})]})),()=>h(null)),[c,L,F]);const k=async()=>{z(!0);const t=`${c}-01`,a=me(c),s=o.recording_start_month;let r=p.from("transactions").select("amount, type").eq("user_id",o.id).lte("date",a);s&&(r=r.gte("date",`${s}-01`));let d=p.from("category_budgets").select("budget_limit, category_id, categories(is_mandatory)").eq("user_id",o.id).lte("month",c);s&&(d=d.gte("month",s));const[C,D,X,V,Z]=await Promise.all([p.from("transactions").select("*, categories(name, color, icon)").eq("user_id",o.id).gte("date",t).lte("date",a).order("date",{ascending:!1}).order("created_at",{ascending:!1}),p.from("categories").select("*").eq("user_id",o.id).is("month",null).order("name"),r,d,p.from("category_budgets").select("budget_limit, category_id").eq("user_id",o.id).eq("month",c)]),ee=D.data||[],M={};(Z.data||[]).forEach(l=>{M[l.category_id]=Number(l.budget_limit)});const te=ee.map(l=>({...l,budget_limit:M[l.id]!==void 0?M[l.id]:l.budget_limit||0})),ae=(X.data||[]).reduce((l,m)=>l+(m.type==="income"?Number(m.amount):-Number(m.amount)),0)+(o.saldo_awal||0),se=(V.data||[]).filter(l=>{var m;return((m=l.categories)==null?void 0:m.is_mandatory)===!0}).reduce((l,m)=>l+Number(m.budget_limit),0);H(C.data||[]),R(te),K(ae-se),z(!1)},W=async()=>{const{error:t}=await p.from("transactions").delete().eq("id",E);if(t){f(t.message,"error");return}f("Transaksi dihapus","success"),_(null),k()},j=n.useMemo(()=>u.filter(t=>{var a,s,r;if(i.category&&t.category_id!==i.category||i.type&&t.type!==i.type)return!1;if(i.search){const d=i.search.toLowerCase(),C=(a=t.description)==null?void 0:a.toLowerCase().includes(d),D=(r=(s=t.categories)==null?void 0:s.name)==null?void 0:r.toLowerCase().includes(d);if(!C&&!D)return!1}return!0}),[u,i]),Q=n.useMemo(()=>{const t={};return j.forEach(a=>{t[a.date]||(t[a.date]=[]),t[a.date].push(a)}),Object.entries(t).sort(([a],[s])=>s.localeCompare(a))},[j]);n.useMemo(()=>j.reduce((t,a)=>(a.type==="expense"?t.expense+=Number(a.amount):t.income+=Number(a.amount),t),{expense:0,income:0}),[j]),n.useMemo(()=>u.reduce((t,a)=>(a.type==="expense"?t.expense+=Number(a.amount):t.income+=Number(a.amount),t),{expense:0,income:0}),[u]);const U=n.useMemo(()=>{const t=v.find(a=>be(a));return u.filter(a=>a.type==="income"&&a.category_id===(t==null?void 0:t.id)).reduce((a,s)=>a+Number(s.amount),0)},[u,v]),q=i.category||i.type||i.search,Y=t=>{const a=new Date(t+"T00:00:00"),s=new Date,r=new Date(s);return r.setDate(s.getDate()-1),a.toDateString()===s.toDateString()?"Hari ini":a.toDateString()===r.toDateString()?"Kemarin":a.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})},J=t=>t.reduce((a,s)=>s.type==="expense"?a-Number(s.amount):a+Number(s.amount),0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in tx-page",children:[u.length>0&&(()=>{const t=U-N;return e.jsxs("div",{className:"tx-stats",children:[e.jsxs("div",{className:"tx-stat",children:[e.jsx("span",{className:"tx-stat-label",children:"TOTAL SALDO"}),e.jsxs("span",{className:"tx-stat-val tabular",style:{color:N>=0?"#34d399":"#f87171"},children:[N>=0?"+":"−",b(Math.abs(N))]})]}),e.jsx("div",{className:"tx-stat-sep"}),e.jsxs("div",{className:"tx-stat",children:[e.jsx("span",{className:"tx-stat-label",children:"PENGELUARAN"}),e.jsxs("span",{className:"tx-stat-val tabular",style:{color:"#f87171"},children:["−",b(Math.max(0,t))]})]})]})})(),e.jsxs("div",{className:"tx-filter",children:[e.jsx("input",{className:"form-input tx-search",type:"text",placeholder:"Cari transaksi...",value:i.search,onChange:t=>S(a=>({...a,search:t.target.value}))}),e.jsxs("select",{className:"form-select tx-cat-select",value:i.category,onChange:t=>S(a=>({...a,category:t.target.value})),children:[e.jsx("option",{value:"",children:"Semua Kategori"}),v.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),e.jsx("div",{className:"tx-type-toggle",children:[["","Semua"],["expense","Keluar"],["income","Masuk"]].map(([t,a])=>e.jsx("button",{className:`tx-type-btn${i.type===t?" active":""}`,onClick:()=>S(s=>({...s,type:t})),children:a},t))})]}),G?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[...Array(6)].map((t,a)=>e.jsx("div",{className:"skeleton",style:{height:52}},a))}):j.length===0?e.jsxs("div",{className:"tx-empty",children:[e.jsx(pe,{size:20}),e.jsx("span",{children:q?"Tidak ada yang cocok":"Belum ada transaksi"}),e.jsx("p",{children:q?"Coba ubah atau reset filter":"Tambah transaksi pertamamu"})]}):e.jsxs("div",{className:"tx-list",children:[Q.map(([t,a])=>{const s=J(a);return e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-head",children:[e.jsx("span",{className:"tx-group-date",children:Y(t)}),e.jsxs("span",{className:`tx-group-total tabular${s>=0?"":" neg"}`,children:[s>=0?"+":"",b(s)]})]}),e.jsx("div",{className:"tx-group-rows",children:a.map(r=>{var d;return e.jsxs("div",{className:"tx-row",style:{"--tc":r.type==="income"?"#34d399":"#f87171"},children:[e.jsx("div",{className:"tx-icon",style:{background:r.type==="income"?"rgba(52,211,153,0.1)":"rgba(248,113,113,0.1)",color:r.type==="income"?"#34d399":"#f87171"},children:r.type==="income"?e.jsx(xe,{size:13}):e.jsx(I,{size:13})}),e.jsxs("div",{className:"tx-info",children:[e.jsx("span",{className:"tx-desc",children:r.description||((d=r.categories)==null?void 0:d.name)||"Transaksi"}),r.categories&&e.jsx("span",{className:"tx-cat",style:{color:r.categories.color||"var(--text-muted)"},children:r.categories.name})]}),e.jsxs("span",{className:`tx-amount tabular${r.type==="income"?" inc":" exp"}`,children:[r.type==="income"?"+":"−",b(r.amount)]}),e.jsxs("div",{className:"tx-actions",children:[e.jsx("button",{className:"tx-act-btn",onClick:()=>{T(r),y(!0)},title:"Edit",children:e.jsx(ue,{size:11})}),e.jsx("button",{className:"tx-act-btn danger",onClick:()=>_(r.id),title:"Hapus",children:e.jsx(ge,{size:11})})]})]},r.id)})})]},t)}),(!i.type||i.type==="expense")&&(()=>{const t=v.filter(a=>a.is_mandatory&&Number(a.budget_limit)>0);return t.length?e.jsxs("div",{className:"tx-group",children:[e.jsxs("div",{className:"tx-group-head",children:[e.jsx("span",{className:"tx-group-date",children:"Pengeluaran Wajib"}),e.jsxs("span",{className:"tx-group-total tabular neg",children:["−",b(t.reduce((a,s)=>a+Number(s.budget_limit),0))]})]}),e.jsx("div",{className:"tx-group-rows",children:t.map(a=>e.jsxs("div",{className:"tx-row",style:{"--tc":"#f87171"},children:[e.jsx("div",{className:"tx-icon",style:{background:"rgba(248,113,113,0.1)",color:"#f87171"},children:e.jsx(I,{size:13})}),e.jsxs("div",{className:"tx-info",children:[e.jsx("span",{className:"tx-desc",children:a.name}),e.jsx("span",{className:"tx-cat",style:{color:"#f87171"},children:"Wajib · langsung dipotong"})]}),e.jsxs("span",{className:"tx-amount tabular exp",children:["−",b(a.budget_limit)]})]},a.id))})]}):null})()]}),e.jsx("style",{children:`
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
      `})]}),E&&e.jsx(ye,{title:"Hapus Transaksi",message:"Transaksi ini akan dihapus permanen dan tidak bisa dikembalikan.",confirmLabel:"Hapus",onConfirm:W,onCancel:()=>_(null)}),O&&e.jsx("div",{className:"modal-overlay",onClick:()=>y(!1),children:e.jsxs("div",{className:"modal",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:w!=null&&w.id?"Edit Transaksi":"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>y(!1),children:e.jsx(he,{size:16})})]}),e.jsx(fe,{month:c,editData:w,onSuccess:k,onClose:()=>y(!1)})]})})]})}export{_e as default};
