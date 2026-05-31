import{u as A,e as W,r as m,j as e,s as v}from"./index-CwObcRqV.js";import{g as J,f as d}from"./formatCurrency-CwSiFA8N.js";import{C as R}from"./CurrencyInput-CSTDPJBB.js";import{i as T}from"./mandatoryCategories-BLLVk51K.js";const Q=["🍜","🚗","🛍️","🎮","💊","📱","✈️","📚","🏠","⚡","💰","🎓","🏋️","🎬","☕","🍔","🎁","💇","🐾","🌱"],V=["#6366f1","#3b82f6","#06b6d4","#10b981","#84cc16","#f59e0b","#f97316","#ef4444","#ec4899","#a855f7"];function X({onSuccess:h,onClose:b,editData:c}){const{user:S}=A(),y=W(),[N,s]=m.useState(!1),[r,f]=m.useState({name:"",budget_limit:"",color:"#6366f1",icon:"💰",...c}),w=async n=>{if(n.preventDefault(),!!r.name){s(!0);try{const i={user_id:S.id,name:r.name,budget_limit:parseFloat(r.budget_limit)||0,color:r.color,icon:r.icon};c!=null&&c.id?(await v.from("categories").update(i).eq("id",c.id),y("Kategori diperbarui","success")):(await v.from("categories").insert(i),y("Kategori ditambahkan","success")),h==null||h(),b==null||b()}catch(i){y(i.message,"error")}finally{s(!1)}}};return e.jsxs("form",{onSubmit:w,children:[e.jsxs("div",{className:"cf-preview",children:[e.jsx("div",{className:"cf-preview-icon",style:{background:`${r.color}18`,color:r.color},children:r.icon}),e.jsxs("div",{className:"cf-preview-info",children:[e.jsx("span",{className:"cf-preview-name",children:r.name||"Nama kategori"}),r.budget_limit&&e.jsxs("span",{className:"cf-preview-budget",children:["Budget: Rp ",Number(r.budget_limit).toLocaleString("id-ID"),"/bulan"]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama Kategori"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Makan, Transportasi, Hiburan...",value:r.name,onChange:n=>f(i=>({...i,name:n.target.value})),required:!0,autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Budget per Bulan ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0,fontWeight:500},children:"(opsional, 0 = tanpa batas)"})]}),e.jsx(R,{value:r.budget_limit,onChange:n=>f(i=>({...i,budget_limit:n}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Icon"}),e.jsx("div",{className:"cf-icon-grid",children:Q.map(n=>e.jsx("button",{type:"button",className:`cf-icon-btn ${r.icon===n?"active":""}`,style:r.icon===n?{borderColor:r.color,background:`${r.color}15`}:{},onClick:()=>f(i=>({...i,icon:n})),children:n},n))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Warna"}),e.jsx("div",{className:"cf-color-grid",children:V.map(n=>e.jsx("button",{type:"button",className:`cf-color-btn ${r.color===n?"active":""}`,style:{background:n},onClick:()=>f(i=>({...i,color:n})),title:n},n))})]}),e.jsxs("div",{className:"flex gap-8",style:{marginTop:20},children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:b,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{flex:1},disabled:N,children:N?"Menyimpan...":c!=null&&c.id?"Perbarui":"Buat Kategori"})]}),e.jsx("style",{children:`
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
      `})]})}const F=15;function te(){const{user:h}=A(),b=W(),[c,S]=m.useState([]),[y,N]=m.useState({}),[s,r]=m.useState(0),[f,w]=m.useState(!0),[n,i]=m.useState(!1),[k,P]=m.useState(null),[p,j]=m.useState(null),_=J();m.useEffect(()=>{C()},[]);const C=async()=>{var g;w(!0);const a=`${_}-01`,t=`${_}-31`,[o,l,z]=await Promise.all([v.from("categories").select("*").eq("user_id",h.id).order("name"),v.from("transactions").select("category_id, amount").eq("user_id",h.id).eq("type","expense").gte("date",a).lte("date",t),v.from("salaries").select("amount").eq("user_id",h.id).eq("month",_).maybeSingle()]),u={};(l.data||[]).forEach(x=>{x.category_id&&(u[x.category_id]=(u[x.category_id]||0)+Number(x.amount))}),S(o.data||[]),N(u),r(Number(((g=z.data)==null?void 0:g.amount)||0)),w(!1)},L=async a=>{confirm("Hapus kategori ini?")&&(await v.from("categories").delete().eq("id",a),b("Kategori dihapus","success"),C())},I=a=>{const t=String(Math.round(a.budget_limit||0)),o=s>0&&a.budget_limit>0?(a.budget_limit/s*100).toFixed(1):"";j({id:a.id,nominal:t,pct:o})},O=a=>{const t=parseFloat(a)||0,o=s>0&&t>0?(t/s*100).toFixed(1):"";j(l=>({...l,nominal:a,pct:o}))},$=a=>{const t=parseFloat(a)||0,o=s>0&&t>0?String(Math.round(t/100*s)):"";j(l=>({...l,pct:a,nominal:o}))},H=async()=>{const a=parseFloat(p.nominal)||0;await v.from("categories").update({budget_limit:a}).eq("id",p.id),b("Budget disimpan","success"),j(null),C()},E=c.filter(a=>T(a)),K=c.filter(a=>!T(a)),G=c.reduce((a,t)=>a+Number(t.budget_limit||0),0),U=Object.values(y).reduce((a,t)=>a+t,0),q=(a,t)=>{const o=y[a.id]||0,l=Number(a.budget_limit||0),z=l>0?Math.min(o/l*100,100):0,u=l>0?o/l*100:0,g=u>100,x=!g&&u>=100,B=!g&&u>=80&&u<100,Y=g?"var(--danger)":x?"var(--success)":B?"var(--warning)":a.color,M=s>0&&l>0?(l/s*100).toFixed(0):null;return e.jsxs("div",{className:`cat-card ${t?"cat-mandatory":""}`,style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:`${a.color}20`,color:a.color},children:a.icon}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-name",children:a.name}),t&&e.jsx("span",{className:"cat-mandatory-badge",children:"Wajib"})]})]}),e.jsxs("div",{className:"cat-card-actions",children:[!t&&e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{P(a),i(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>I(a),style:{fontSize:"0.72rem",whiteSpace:"nowrap"},children:l>0?"Set":"+ Budget"}),!t&&e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>L(a.id),children:"✕"})]})]}),l>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cat-amounts",children:[e.jsx("span",{className:"cat-spent tabular",style:{color:g?"var(--danger)":"var(--text-primary)"},children:d(o)}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsxs("span",{className:"cat-budget tabular",children:["/ ",d(l)]}),M&&e.jsxs("span",{className:"cat-pct-label",children:[M,"% gaji"]})]})]}),e.jsx("div",{className:"progress-bar",style:{height:6},children:e.jsx("div",{className:"progress-fill",style:{width:`${z}%`,background:Y}})}),e.jsxs("div",{className:"cat-status-row",children:[g&&e.jsxs("span",{className:"badge badge-danger",style:{fontSize:"0.6rem"},children:["Over ",d(o-l)]}),x&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem"},children:"Penuh"}),B&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem"},children:"Hampir"}),!g&&!x&&!B&&e.jsxs("span",{className:"cat-sisa",children:["Sisa ",d(l-o)]})]})]}):e.jsxs("div",{className:"cat-no-budget",children:[e.jsx("span",{children:"Belum ada budget"}),s>0&&e.jsxs("span",{className:"cat-no-budget-hint",children:["Default: ",d(Math.round(s*F/100))," (",F,"% gaji)"]})]})]},a.id)};return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-24",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Kategori"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[d(U)," dari ",d(G)," budget bulan ini"]})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{P(null),i(!0)},children:"+ Kategori"})]}),e.jsxs("div",{className:"cat-section mb-24",children:[e.jsx("div",{className:"cat-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"cat-section-title",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"cat-section-sub",children:s>0?`${d(E.reduce((a,t)=>a+Number(t.budget_limit||0),0))} dari gaji ${d(s)} — langsung dipotong`:"Atur gaji di Dashboard untuk lihat persentase"})]})}),f?e.jsx("div",{className:"cat-grid",children:[...Array(3)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:140}},t))}):e.jsx("div",{className:"cat-grid",children:E.map(a=>q(a,!0))})]}),e.jsxs("div",{className:"cat-section",children:[e.jsx("div",{className:"cat-section-head",children:e.jsx("span",{className:"cat-section-title",children:"Kategori Lainnya"})}),f?e.jsx("div",{className:"cat-grid",children:[...Array(2)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:140}},t))}):K.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",style:{padding:"20px 0"},children:[e.jsx("div",{className:"empty-state-icon",children:"◈"}),e.jsx("strong",{children:"Belum ada kategori lain"}),e.jsx("p",{children:"Tambah kategori pengeluaran sesuai kebutuhanmu"})]})}):e.jsx("div",{className:"cat-grid",children:K.map(a=>q(a,!1))})]}),n&&e.jsx("div",{className:"modal-overlay",onClick:()=>i(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:k!=null&&k.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>i(!1),children:"✕"})]}),e.jsx(X,{editData:k,onSuccess:()=>{C(),i(!1)},onClose:()=>i(!1)})]})}),p&&(()=>{const a=c.find(t=>t.id===p.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>j(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Budget — ",a==null?void 0:a.name]}),s>0&&e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Gaji: ",d(s)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>j(null),children:"✕"})]}),s>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(F),value:p.pct,onChange:t=>$(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),p.pct&&s>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",d(Math.round(parseFloat(p.pct)/100*s))]})]}),!p.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>$(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(R,{value:p.nominal,onChange:O,autoFocus:!s})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>j(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:H,children:"Simpan"})]})]})})})(),e.jsx("style",{children:`
        .cat-section { }
        .cat-section-head { margin-bottom: 12px; }
        .cat-section-title {
          font-size: 0.8125rem; font-weight: 700; color: var(--text-primary);
          letter-spacing: -0.01em; display: block;
        }
        .cat-section-sub {
          font-size: 0.72rem; color: var(--text-muted); font-weight: 500; margin-top: 2px; display: block;
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }

        .cat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 18px;
          display: flex; flex-direction: column; gap: 10px;
          border-top: 3px solid var(--cat-color);
        }
        .cat-mandatory { background: color-mix(in srgb, var(--cat-color) 5%, var(--bg-card)); }

        .cat-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .cat-card-left { display: flex; align-items: center; gap: 10px; }
        .cat-icon {
          width: 34px; height: 34px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .cat-name { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; display: block; }
        .cat-mandatory-badge {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--text-muted); font-weight: 700; margin-top: 2px; display: block;
        }
        .cat-card-actions { display: flex; gap: 2px; flex-shrink: 0; }

        .cat-amounts { display: flex; justify-content: space-between; align-items: baseline; }
        .cat-spent { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.025em; }
        .cat-budget { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
        .cat-pct-label { font-size: 0.65rem; color: var(--accent); font-weight: 600; display: block; text-align: right; margin-top: 2px; }

        .cat-status-row { display: flex; align-items: center; gap: 6px; }
        .cat-sisa { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }

        .cat-no-budget {
          padding: 4px 0; display: flex; flex-direction: column; gap: 3px;
        }
        .cat-no-budget span:first-child { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
        .cat-no-budget-hint { font-size: 0.7rem; color: var(--accent); font-weight: 600; }

        @media (max-width: 640px) {
          .cat-grid { grid-template-columns: 1fr; }
        }
      `})]})}export{te as default};
