import{u as _,b as w,r as c,j as e,s as b}from"./index-DVikC9Cf.js";import{g as S,f as y}from"./formatCurrency-CwSiFA8N.js";const K=["🍜","🚗","🛍️","🎮","💊","📱","✈️","📚","🏠","⚡","💰","🎓","🏋️","🎬","☕","🍔","🎁","💇","🐾","🌱"],M=["#f59e0b","#3b82f6","#ec4899","#8b5cf6","#10b981","#ef4444","#f97316","#06b6d4","#84cc16","#a855f7"];function F({onSuccess:o,onClose:d,editData:r}){const{user:j}=_(),p=w(),[x,h]=c.useState(!1),[i,m]=c.useState({name:"",budget_limit:"",color:"#6366f1",icon:"💰",...r}),n=async s=>{if(s.preventDefault(),!!i.name){h(!0);try{const t={user_id:j.id,name:i.name,budget_limit:parseFloat(i.budget_limit)||0,color:i.color,icon:i.icon};r!=null&&r.id?(await b.from("categories").update(t).eq("id",r.id),p("Kategori diperbarui","success")):(await b.from("categories").insert(t),p("Kategori ditambahkan","success")),o==null||o(),d==null||d()}catch(t){p(t.message,"error")}finally{h(!1)}}};return e.jsxs("form",{onSubmit:n,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama Kategori"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Makan & Minum",value:i.name,onChange:s=>m(t=>({...t,name:s.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Batas Budget (Rp)"}),e.jsx("input",{className:"form-input",type:"number",placeholder:"0",value:i.budget_limit,onChange:s=>m(t=>({...t,budget_limit:s.target.value})),min:"0"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Icon"}),e.jsx("div",{className:"icon-grid",children:K.map(s=>e.jsx("button",{type:"button",className:`icon-btn ${i.icon===s?"selected":""}`,onClick:()=>m(t=>({...t,icon:s})),children:s},s))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Warna"}),e.jsx("div",{className:"color-grid",children:M.map(s=>e.jsx("button",{type:"button",className:`color-btn ${i.color===s?"selected":""}`,style:{background:s},onClick:()=>m(t=>({...t,color:s}))},s))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:d,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{flex:1},disabled:x,children:x?"Menyimpan...":r!=null&&r.id?"Perbarui":"Simpan"})]}),e.jsx("style",{children:`
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
      `})]})}function E(){const{user:o}=_(),d=w(),[r,j]=c.useState([]),[p,x]=c.useState({}),[h,i]=c.useState(!0),[m,n]=c.useState(!1),[s,t]=c.useState(null),k=S();c.useEffect(()=>{N()},[]);const N=async()=>{i(!0);const a=`${k}-01`,l=`${k}-31`,[g,u]=await Promise.all([b.from("categories").select("*").eq("user_id",o.id).order("name"),b.from("transactions").select("category_id, amount, type").eq("user_id",o.id).eq("type","expense").gte("date",a).lte("date",l)]),v={};(u.data||[]).forEach(f=>{f.category_id&&(v[f.category_id]=(v[f.category_id]||0)+Number(f.amount))}),j(g.data||[]),x(v),i(!1)},C=async a=>{confirm("Hapus kategori ini? Transaksi terkait tidak akan terhapus.")&&(await b.from("categories").delete().eq("id",a),d("Kategori dihapus","success"),N())};return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-16",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Kategori"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[r.length," kategori aktif"]})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{t(null),n(!0)},children:"+ Tambah"})]}),h?e.jsx("div",{className:"grid-3",children:[...Array(6)].map((a,l)=>e.jsx("div",{className:"skeleton",style:{height:120}},l))}):r.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"◈"}),e.jsx("strong",{children:"Belum ada kategori"}),e.jsx("p",{children:"Buat kategori untuk mulai tracking budget kamu"}),e.jsx("button",{className:"btn btn-primary mt-16",onClick:()=>n(!0),children:"Buat Kategori"})]})}):e.jsx("div",{className:"grid-3",children:r.map(a=>{const l=p[a.id]||0,g=a.budget_limit>0?Math.min(l/a.budget_limit*100,100):0,u=a.budget_limit>0&&l>a.budget_limit;return e.jsxs("div",{className:"cat-card",children:[e.jsxs("div",{className:"cat-card-header",children:[e.jsx("div",{className:"cat-icon-wrap",style:{background:`${a.color}22`,color:a.color},children:e.jsx("span",{children:a.icon})}),e.jsxs("div",{className:"cat-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{t(a),n(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm text-danger",onClick:()=>C(a.id),children:"✕"})]})]}),e.jsx("div",{className:"cat-name",children:a.name}),a.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cat-amounts",children:[e.jsx("span",{className:u?"text-danger":"text-primary",children:y(l)}),e.jsxs("span",{className:"text-muted text-xs",children:["/ ",y(a.budget_limit)]})]}),e.jsx("div",{className:"progress-bar mt-8",children:e.jsx("div",{className:"progress-fill",style:{width:`${g}%`,background:u?"var(--danger)":a.color}})}),e.jsxs("div",{className:"flex-between mt-8",children:[e.jsxs("span",{className:"text-xs text-muted",children:[g.toFixed(0),"% terpakai"]}),u&&e.jsx("span",{className:"badge badge-danger",children:"Overbudget"}),!u&&g>=80&&e.jsx("span",{className:"badge badge-warning",children:"Hampir habis"})]})]}):e.jsxs("div",{className:"text-sm text-muted mt-8",children:["Terpakai: ",y(l),e.jsx("div",{className:"text-xs mt-4",children:"Tidak ada batas budget"})]})]},a.id)})}),m&&e.jsx("div",{className:"modal-overlay",onClick:()=>n(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:s!=null&&s.id?"Edit Kategori":"Tambah Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>n(!1),children:"✕"})]}),e.jsx(F,{editData:s,onSuccess:N,onClose:()=>n(!1)})]})}),e.jsx("style",{children:`
        .cat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          transition: all 0.2s;
        }
        .cat-card:hover { border-color: var(--border-light); transform: translateY(-1px); }
        .cat-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .cat-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        .cat-actions { display: flex; gap: 4px; opacity: 0; transition: opacity 0.15s; }
        .cat-card:hover .cat-actions { opacity: 1; }
        .cat-name { font-weight: 500; font-size: 0.95rem; margin-bottom: 4px; }
        .cat-amounts { display: flex; align-items: baseline; gap: 6px; margin-top: 8px; }
      `})]})}export{E as default};
