import{u as b,e as g,r as m,j as e,s as p}from"./index-DcUY-y5T.js";import{C as x}from"./CurrencyInput-BsMot5eS.js";const h=["🍜","🚗","🛍️","🎮","💊","📱","✈️","📚","🏠","⚡","💰","🎓","🏋️","🎬","☕","🍔","🎁","💇","🐾","🌱"],v=["#6366f1","#3b82f6","#06b6d4","#10b981","#84cc16","#f59e0b","#f97316","#ef4444","#ec4899","#a855f7"];function w({onSuccess:i,onClose:n,editData:s}){const{user:u}=b(),c=g(),[l,d]=m.useState(!1),[r,o]=m.useState({name:"",budget_limit:"",color:"#6366f1",icon:"💰",...s}),f=async a=>{if(a.preventDefault(),!!r.name){d(!0);try{const t={user_id:u.id,name:r.name,budget_limit:parseFloat(r.budget_limit)||0,color:r.color,icon:r.icon};s!=null&&s.id?(await p.from("categories").update(t).eq("id",s.id),c("Kategori diperbarui","success")):(await p.from("categories").insert(t),c("Kategori ditambahkan","success")),i==null||i(),n==null||n()}catch(t){c(t.message,"error")}finally{d(!1)}}};return e.jsxs("form",{onSubmit:f,children:[e.jsxs("div",{className:"cf-preview",children:[e.jsx("div",{className:"cf-preview-icon",style:{background:`${r.color}18`,color:r.color},children:r.icon}),e.jsxs("div",{className:"cf-preview-info",children:[e.jsx("span",{className:"cf-preview-name",children:r.name||"Nama kategori"}),r.budget_limit&&e.jsxs("span",{className:"cf-preview-budget",children:["Budget: Rp ",Number(r.budget_limit).toLocaleString("id-ID"),"/bulan"]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama Kategori"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Makan, Transportasi, Hiburan...",value:r.name,onChange:a=>o(t=>({...t,name:a.target.value})),required:!0,autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Budget per Bulan ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0,fontWeight:500},children:"(opsional, 0 = tanpa batas)"})]}),e.jsx(x,{value:r.budget_limit,onChange:a=>o(t=>({...t,budget_limit:a}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Icon"}),e.jsx("div",{className:"cf-icon-grid",children:h.map(a=>e.jsx("button",{type:"button",className:`cf-icon-btn ${r.icon===a?"active":""}`,style:r.icon===a?{borderColor:r.color,background:`${r.color}15`}:{},onClick:()=>o(t=>({...t,icon:a})),children:a},a))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Warna"}),e.jsx("div",{className:"cf-color-grid",children:v.map(a=>e.jsx("button",{type:"button",className:`cf-color-btn ${r.color===a?"active":""}`,style:{background:a},onClick:()=>o(t=>({...t,color:a})),title:a},a))})]}),e.jsxs("div",{className:"flex gap-8",style:{marginTop:20},children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:n,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{flex:1},disabled:l,children:l?"Menyimpan...":s!=null&&s.id?"Perbarui":"Buat Kategori"})]}),e.jsx("style",{children:`
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
      `})]})}const y=["Orang Tua","Tabungan Bulanan","Investasi"],k=i=>y.includes(i.name);export{w as C,k as i};
