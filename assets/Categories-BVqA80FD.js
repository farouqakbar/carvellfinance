import{u as _,e as C,r as d,j as e,s as j}from"./index-CU0wrSkr.js";import{g as T,f}from"./formatCurrency-CwSiFA8N.js";const M=["🍜","🚗","🛍️","🎮","💊","📱","✈️","📚","🏠","⚡","💰","🎓","🏋️","🎬","☕","🍔","🎁","💇","🐾","🌱"],B=["#f59e0b","#3b82f6","#ec4899","#8b5cf6","#10b981","#ef4444","#f97316","#06b6d4","#84cc16","#a855f7"];function K({onSuccess:m,onClose:p,editData:r}){const{user:k}=_(),u=C(),[y,N]=d.useState(!1),[i,g]=d.useState({name:"",budget_limit:"",color:"#6366f1",icon:"💰",...r}),o=async t=>{if(t.preventDefault(),!!i.name){N(!0);try{const s={user_id:k.id,name:i.name,budget_limit:parseFloat(i.budget_limit)||0,color:i.color,icon:i.icon};r!=null&&r.id?(await j.from("categories").update(s).eq("id",r.id),u("Kategori diperbarui","success")):(await j.from("categories").insert(s),u("Kategori ditambahkan","success")),m==null||m(),p==null||p()}catch(s){u(s.message,"error")}finally{N(!1)}}};return e.jsxs("form",{onSubmit:o,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama Kategori"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Makan & Minum",value:i.name,onChange:t=>g(s=>({...s,name:t.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Batas Budget (Rp)"}),e.jsx("input",{className:"form-input",type:"number",placeholder:"0",value:i.budget_limit,onChange:t=>g(s=>({...s,budget_limit:t.target.value})),min:"0"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Icon"}),e.jsx("div",{className:"icon-grid",children:M.map(t=>e.jsx("button",{type:"button",className:`icon-btn ${i.icon===t?"selected":""}`,onClick:()=>g(s=>({...s,icon:t})),children:t},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Warna"}),e.jsx("div",{className:"color-grid",children:B.map(t=>e.jsx("button",{type:"button",className:`color-btn ${i.color===t?"selected":""}`,style:{background:t},onClick:()=>g(s=>({...s,color:t}))},t))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:p,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{flex:1},disabled:y,children:y?"Menyimpan...":r!=null&&r.id?"Perbarui":"Simpan"})]}),e.jsx("style",{children:`
        .icon-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 4px;
        }
        .icon-btn {
          background: var(--bg-input);
          border: 2px solid transparent;
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.15s;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-btn:hover { border-color: var(--border-light); }
        .icon-btn.selected { border-color: var(--accent); background: var(--accent-dim); }

        .color-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .color-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.15s;
          outline-offset: 2px;
        }
        .color-btn:hover { transform: scale(1.1); }
        .color-btn.selected { outline: 2px solid var(--text-primary); }
      `})]})}function q(){const{user:m}=_(),p=C(),[r,k]=d.useState([]),[u,y]=d.useState({}),[N,i]=d.useState(!0),[g,o]=d.useState(!1),[t,s]=d.useState(null),S=T();d.useEffect(()=>{w()},[]);const w=async()=>{i(!0);const a=`${S}-01`,n=`${S}-31`,[l,x]=await Promise.all([j.from("categories").select("*").eq("user_id",m.id).order("name"),j.from("transactions").select("category_id, amount, type").eq("user_id",m.id).eq("type","expense").gte("date",a).lte("date",n)]),b={};(x.data||[]).forEach(h=>{h.category_id&&(b[h.category_id]=(b[h.category_id]||0)+Number(h.amount))}),k(l.data||[]),y(b),i(!1)},z=async a=>{confirm("Hapus kategori ini? Transaksi terkait tidak akan terhapus.")&&(await j.from("categories").delete().eq("id",a),p("Kategori dihapus","success"),w())},c=r.reduce((a,n)=>a+Number(n.budget_limit||0),0),v=r.reduce((a,n)=>a+(u[n.id]||0),0);return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-16",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Kategori"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[r.length," kategori",c>0&&` · Budget ${f(c)}/bulan`]})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{s(null),o(!0)},children:"+ Tambah"})]}),c>0&&e.jsxs("div",{className:"card mb-20",children:[e.jsxs("div",{className:"flex-between mb-10",children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:600,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.06em"},children:"Total pengeluaran bulan ini"}),e.jsxs("span",{style:{fontSize:"0.78rem",fontWeight:700,color:v>c?"var(--danger)":"var(--text-secondary)"},children:[f(v)," / ",f(c)]})]}),e.jsx("div",{className:"progress-bar",style:{height:7},children:e.jsx("div",{className:"progress-fill",style:{width:`${Math.min(v/c*100,100)}%`,background:v>c?"var(--danger)":v/c>.8?"var(--warning)":"var(--accent)"}})})]}),N?e.jsx("div",{className:"cat-grid",children:[...Array(6)].map((a,n)=>e.jsx("div",{className:"skeleton",style:{height:130}},n))}):r.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"◈"}),e.jsx("strong",{children:"Belum ada kategori"}),e.jsx("p",{children:"Buat kategori untuk mulai tracking pengeluaran per pos"}),e.jsx("button",{className:"btn btn-primary mt-16",onClick:()=>o(!0),children:"Buat Kategori Pertama"})]})}):e.jsx("div",{className:"cat-grid",children:r.map(a=>{const n=u[a.id]||0,l=a.budget_limit>0?n/a.budget_limit*100:null,x=l!==null&&l>100,b=l!==null&&l>=80&&!x,h=x?"var(--danger)":b?"var(--warning)":a.color;return e.jsxs("div",{className:"cat-card",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsx("div",{className:"cat-icon-wrap",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsxs("div",{className:"cat-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{s(a),o(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>z(a.id),children:"✕"})]})]}),e.jsx("div",{className:"cat-name",children:a.name}),a.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cat-amounts",children:[e.jsx("span",{className:"cat-spent tabular",style:{color:x?"var(--danger)":"var(--text-primary)"},children:f(n)}),e.jsxs("span",{className:"cat-limit tabular",children:["/ ",f(a.budget_limit)]})]}),e.jsx("div",{className:"progress-bar mt-10",style:{height:5},children:e.jsx("div",{className:"progress-fill",style:{width:`${Math.min(l,100)}%`,background:h}})}),e.jsxs("div",{className:"flex-between mt-8",children:[e.jsxs("span",{style:{fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:600},children:[l==null?void 0:l.toFixed(0),"%"]}),x&&e.jsx("span",{className:"badge badge-danger",children:"Overbudget"}),b&&e.jsx("span",{className:"badge badge-warning",children:"Hampir habis"})]})]}):e.jsxs("div",{style:{marginTop:10},children:[e.jsx("span",{className:"cat-spent tabular",children:f(n)}),e.jsx("span",{style:{fontSize:"0.7rem",color:"var(--text-muted)",marginLeft:6},children:"bulan ini"}),e.jsx("div",{style:{marginTop:6},children:e.jsx("span",{style:{fontSize:"0.68rem",color:"var(--text-muted)",fontWeight:600,letterSpacing:"0.04em",textTransform:"uppercase"},children:"Tanpa limit"})})]})]},a.id)})}),g&&e.jsx("div",{className:"modal-overlay",onClick:()=>o(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:t!=null&&t.id?"Edit Kategori":"Tambah Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>o(!1),children:"✕"})]}),e.jsx(K,{editData:t,onSuccess:w,onClose:()=>o(!1)})]})}),e.jsx("style",{children:`
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
      `})]})}export{q as default};
