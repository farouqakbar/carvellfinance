import{u as S,e as _,r as d,j as e,s as j}from"./index-B8dk8sQh.js";import{g as T,f as h}from"./formatCurrency-CwSiFA8N.js";import{C as B}from"./CurrencyInput-ojjVV91O.js";const $=["🍜","🚗","🛍️","🎮","💊","📱","✈️","📚","🏠","⚡","💰","🎓","🏋️","🎬","☕","🍔","🎁","💇","🐾","🌱"],K=["#6366f1","#3b82f6","#06b6d4","#10b981","#84cc16","#f59e0b","#f97316","#ef4444","#ec4899","#a855f7"];function F({onSuccess:m,onClose:p,editData:i}){const{user:w}=S(),g=_(),[y,N]=d.useState(!1),[r,u]=d.useState({name:"",budget_limit:"",color:"#6366f1",icon:"💰",...i}),l=async t=>{if(t.preventDefault(),!!r.name){N(!0);try{const s={user_id:w.id,name:r.name,budget_limit:parseFloat(r.budget_limit)||0,color:r.color,icon:r.icon};i!=null&&i.id?(await j.from("categories").update(s).eq("id",i.id),g("Kategori diperbarui","success")):(await j.from("categories").insert(s),g("Kategori ditambahkan","success")),m==null||m(),p==null||p()}catch(s){g(s.message,"error")}finally{N(!1)}}};return e.jsxs("form",{onSubmit:l,children:[e.jsxs("div",{className:"cf-preview",children:[e.jsx("div",{className:"cf-preview-icon",style:{background:`${r.color}18`,color:r.color},children:r.icon}),e.jsxs("div",{className:"cf-preview-info",children:[e.jsx("span",{className:"cf-preview-name",children:r.name||"Nama kategori"}),r.budget_limit&&e.jsxs("span",{className:"cf-preview-budget",children:["Budget: Rp ",Number(r.budget_limit).toLocaleString("id-ID"),"/bulan"]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama Kategori"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Makan, Transportasi, Hiburan...",value:r.name,onChange:t=>u(s=>({...s,name:t.target.value})),required:!0,autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Budget per Bulan ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0,fontWeight:500},children:"(opsional, 0 = tanpa batas)"})]}),e.jsx(B,{value:r.budget_limit,onChange:t=>u(s=>({...s,budget_limit:t}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Icon"}),e.jsx("div",{className:"cf-icon-grid",children:$.map(t=>e.jsx("button",{type:"button",className:`cf-icon-btn ${r.icon===t?"active":""}`,style:r.icon===t?{borderColor:r.color,background:`${r.color}15`}:{},onClick:()=>u(s=>({...s,icon:t})),children:t},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Warna"}),e.jsx("div",{className:"cf-color-grid",children:K.map(t=>e.jsx("button",{type:"button",className:`cf-color-btn ${r.color===t?"active":""}`,style:{background:t},onClick:()=>u(s=>({...s,color:t})),title:t},t))})]}),e.jsxs("div",{className:"flex gap-8",style:{marginTop:20},children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:p,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{flex:1},disabled:y,children:y?"Menyimpan...":i!=null&&i.id?"Perbarui":"Buat Kategori"})]}),e.jsx("style",{children:`
        .cf-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-bottom: 20px;
        }
        .cf-preview-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .cf-preview-info { display: flex; flex-direction: column; gap: 2px; }
        .cf-preview-name {
          font-size: 0.875rem; font-weight: 700;
          color: var(--text-primary); letter-spacing: -0.01em;
        }
        .cf-preview-budget { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; }

        .cf-icon-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 4px;
        }
        .cf-icon-btn {
          background: var(--bg-input);
          border: 1.5px solid transparent;
          border-radius: 7px;
          padding: 5px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.12s;
          aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center;
        }
        .cf-icon-btn:hover { border-color: var(--border-light); transform: scale(1.1); }
        .cf-icon-btn:active { transform: scale(0.95); }
        .cf-icon-btn.active { border-width: 1.5px; }

        .cf-color-grid {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .cf-color-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2.5px solid transparent;
          cursor: pointer;
          transition: all 0.12s;
          outline: none;
          position: relative;
        }
        .cf-color-btn:hover { transform: scale(1.15); }
        .cf-color-btn:active { transform: scale(0.95); }
        .cf-color-btn.active {
          box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px currentColor;
          transform: scale(1.1);
        }

        @media (max-width: 480px) {
          .cf-icon-grid { grid-template-columns: repeat(8, 1fr); }
        }
      `})]})}function E(){const{user:m}=S(),p=_(),[i,w]=d.useState([]),[g,y]=d.useState({}),[N,r]=d.useState(!0),[u,l]=d.useState(!1),[t,s]=d.useState(null),C=T();d.useEffect(()=>{k()},[]);const k=async()=>{r(!0);const a=`${C}-01`,n=`${C}-31`,[o,x]=await Promise.all([j.from("categories").select("*").eq("user_id",m.id).order("name"),j.from("transactions").select("category_id, amount, type").eq("user_id",m.id).eq("type","expense").gte("date",a).lte("date",n)]),b={};(x.data||[]).forEach(f=>{f.category_id&&(b[f.category_id]=(b[f.category_id]||0)+Number(f.amount))}),w(o.data||[]),y(b),r(!1)},z=async a=>{confirm("Hapus kategori ini? Transaksi terkait tidak akan terhapus.")&&(await j.from("categories").delete().eq("id",a),p("Kategori dihapus","success"),k())},c=i.reduce((a,n)=>a+Number(n.budget_limit||0),0),v=i.reduce((a,n)=>a+(g[n.id]||0),0);return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-16",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Kategori"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[i.length," kategori",c>0&&` · Budget ${h(c)}/bulan`]})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{s(null),l(!0)},children:"+ Tambah"})]}),c>0&&e.jsxs("div",{className:"card mb-20",children:[e.jsxs("div",{className:"flex-between mb-10",children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:600,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.06em"},children:"Total pengeluaran bulan ini"}),e.jsxs("span",{style:{fontSize:"0.78rem",fontWeight:700,color:v>c?"var(--danger)":"var(--text-secondary)"},children:[h(v)," / ",h(c)]})]}),e.jsx("div",{className:"progress-bar",style:{height:7},children:e.jsx("div",{className:"progress-fill",style:{width:`${Math.min(v/c*100,100)}%`,background:v>c?"var(--danger)":v/c>.8?"var(--warning)":"var(--accent)"}})})]}),N?e.jsx("div",{className:"cat-grid",children:[...Array(6)].map((a,n)=>e.jsx("div",{className:"skeleton",style:{height:130}},n))}):i.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"◈"}),e.jsx("strong",{children:"Belum ada kategori"}),e.jsx("p",{children:"Buat kategori untuk mulai tracking pengeluaran per pos"}),e.jsx("button",{className:"btn btn-primary mt-16",onClick:()=>l(!0),children:"Buat Kategori Pertama"})]})}):e.jsx("div",{className:"cat-grid",children:i.map(a=>{const n=g[a.id]||0,o=a.budget_limit>0?n/a.budget_limit*100:null,x=o!==null&&o>100,b=o!==null&&o>=80&&!x,f=x?"var(--danger)":b?"var(--warning)":a.color;return e.jsxs("div",{className:"cat-card",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsx("div",{className:"cat-icon-wrap",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsxs("div",{className:"cat-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{s(a),l(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>z(a.id),children:"✕"})]})]}),e.jsx("div",{className:"cat-name",children:a.name}),a.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cat-amounts",children:[e.jsx("span",{className:"cat-spent tabular",style:{color:x?"var(--danger)":"var(--text-primary)"},children:h(n)}),e.jsxs("span",{className:"cat-limit tabular",children:["/ ",h(a.budget_limit)]})]}),e.jsx("div",{className:"progress-bar mt-10",style:{height:5},children:e.jsx("div",{className:"progress-fill",style:{width:`${Math.min(o,100)}%`,background:f}})}),e.jsxs("div",{className:"flex-between mt-8",children:[e.jsxs("span",{style:{fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:600},children:[o==null?void 0:o.toFixed(0),"%"]}),x&&e.jsx("span",{className:"badge badge-danger",children:"Overbudget"}),b&&e.jsx("span",{className:"badge badge-warning",children:"Hampir habis"})]})]}):e.jsxs("div",{style:{marginTop:10},children:[e.jsx("span",{className:"cat-spent tabular",children:h(n)}),e.jsx("span",{style:{fontSize:"0.7rem",color:"var(--text-muted)",marginLeft:6},children:"bulan ini"}),e.jsx("div",{style:{marginTop:6},children:e.jsx("span",{style:{fontSize:"0.68rem",color:"var(--text-muted)",fontWeight:600,letterSpacing:"0.04em",textTransform:"uppercase"},children:"Tanpa limit"})})]})]},a.id)})}),u&&e.jsx("div",{className:"modal-overlay",onClick:()=>l(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:t!=null&&t.id?"Edit Kategori":"Tambah Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>l(!1),children:"✕"})]}),e.jsx(F,{editData:t,onSuccess:k,onClose:()=>l(!1)})]})}),e.jsx("style",{children:`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .cat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 18px;
          transition: border-color 0.2s, transform 0.15s;
          position: relative;
        }
        .cat-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--cat-color);
          border-radius: var(--radius-lg) 0 0 var(--radius-lg);
          opacity: 0.8;
        }
        .cat-card:hover { border-color: var(--border-light); transform: translateY(-1px); }
        .cat-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .cat-icon-wrap {
          width: 36px; height: 36px;
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
        }
        .cat-actions { display: flex; gap: 2px; opacity: 0; transition: opacity 0.15s; }
        .cat-card:hover .cat-actions { opacity: 1; }
        .cat-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          margin-bottom: 2px;
        }
        .cat-amounts { display: flex; align-items: baseline; gap: 4px; margin-top: 8px; }
        .cat-spent { font-size: 1rem; font-weight: 800; letter-spacing: -0.02em; }
        .cat-limit { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; }

        @media (max-width: 768px) {
          .cat-actions { opacity: 1; }
          .cat-card { padding: 14px; }
        }
        @media (max-width: 640px) {
          .cat-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
        @media (max-width: 380px) {
          .cat-grid { grid-template-columns: 1fr; }
        }
      `})]})}export{E as default};
