import{u as S,b as F,r as c,s as u,j as e}from"./index-DVikC9Cf.js";import{f as v}from"./formatCurrency-CwSiFA8N.js";function L({onSuccess:p,onClose:d,editData:o}){const{user:f}=S(),h=F(),[N,k]=c.useState([]),[g,b]=c.useState(!1),[n,l]=c.useState({amount:"",category_id:"",date:new Date().toISOString().split("T")[0],description:"",type:"expense",...o});c.useEffect(()=>{j()},[]);const j=async()=>{const{data:s}=await u.from("categories").select("*").eq("user_id",f.id);k(s||[])},r=async s=>{if(s.preventDefault(),!(!n.amount||!n.date)){b(!0);try{const i={user_id:f.id,amount:parseFloat(n.amount),category_id:n.category_id||null,date:n.date,description:n.description,type:n.type};o!=null&&o.id?(await u.from("transactions").update(i).eq("id",o.id),h("Transaksi diperbarui","success")):(await u.from("transactions").insert(i),h("Transaksi ditambahkan","success")),p==null||p(),d==null||d()}catch(i){h(i.message,"error")}finally{b(!1)}}};return e.jsxs("form",{onSubmit:r,children:[e.jsxs("div",{className:"type-toggle",children:[e.jsx("button",{type:"button",className:`type-btn ${n.type==="expense"?"active-expense":""}`,onClick:()=>l(s=>({...s,type:"expense"})),children:"↓ Pengeluaran"}),e.jsx("button",{type:"button",className:`type-btn ${n.type==="income"?"active-income":""}`,onClick:()=>l(s=>({...s,type:"income"})),children:"↑ Pemasukan"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nominal"}),e.jsx("input",{className:"form-input",type:"number",placeholder:"0",value:n.amount,onChange:s=>l(i=>({...i,amount:s.target.value})),required:!0,min:"0"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Kategori"}),e.jsxs("select",{className:"form-select",value:n.category_id,onChange:s=>l(i=>({...i,category_id:s.target.value})),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),N.map(s=>e.jsxs("option",{value:s.id,children:[s.icon," ",s.name]},s.id))]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:n.date,onChange:s=>l(i=>({...i,date:s.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Deskripsi"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Keterangan transaksi...",value:n.description,onChange:s=>l(i=>({...i,description:s.target.value}))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:d,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{flex:1},disabled:g,children:g?"Menyimpan...":o!=null&&o.id?"Perbarui":"Simpan"})]}),e.jsx("style",{children:`
        .type-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 20px;
          background: var(--bg-input);
          padding: 4px;
          border-radius: var(--radius-sm);
        }
        .type-btn {
          padding: 8px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: transparent;
          transition: all 0.15s;
        }
        .type-btn.active-expense {
          background: var(--bg-card);
          color: var(--danger);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .type-btn.active-income {
          background: var(--bg-card);
          color: var(--success);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
      `})]})}function K(){const{user:p}=S(),d=F(),[o,f]=c.useState([]),[h,N]=c.useState([]),[k,g]=c.useState(!0),[b,n]=c.useState(!1),[l,j]=c.useState(null),[r,s]=c.useState({category:"",type:"",search:"",dateFrom:"",dateTo:""});c.useEffect(()=>{i()},[]);const i=async()=>{g(!0);const[a,t]=await Promise.all([u.from("transactions").select("*, categories(name, color, icon)").eq("user_id",p.id).order("date",{ascending:!1}),u.from("categories").select("*").eq("user_id",p.id)]);f(a.data||[]),N(t.data||[]),g(!1)},_=async a=>{confirm("Hapus transaksi ini?")&&(await u.from("transactions").delete().eq("id",a),d("Transaksi dihapus","success"),i())},E=()=>{const a=[["Tanggal","Tipe","Kategori","Deskripsi","Nominal"]];x.forEach(m=>{var w;a.push([m.date,m.type,((w=m.categories)==null?void 0:w.name)||"",m.description||"",m.amount])});const t=a.map(m=>m.join(",")).join(`
`),P=new Blob([t],{type:"text/csv"}),T=URL.createObjectURL(P),C=document.createElement("a");C.href=T,C.download="transaksi-finora.csv",C.click(),URL.revokeObjectURL(T),d("File CSV diunduh","success")},x=o.filter(a=>{var t;return!(r.category&&a.category_id!==r.category||r.type&&a.type!==r.type||r.search&&!((t=a.description)!=null&&t.toLowerCase().includes(r.search.toLowerCase()))||r.dateFrom&&a.date<r.dateFrom||r.dateTo&&a.date>r.dateTo)}),y=x.reduce((a,t)=>(t.type==="expense"?a.expense+=Number(t.amount):a.income+=Number(t.amount),a),{expense:0,income:0});return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-16",style:{flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Transaksi"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[x.length," transaksi ditemukan"]})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:E,children:"↓ CSV"}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{j(null),n(!0)},children:"+ Tambah"})]})]}),e.jsxs("div",{className:"card mb-16",children:[e.jsxs("div",{className:"filter-grid",children:[e.jsx("input",{className:"form-input",type:"text",placeholder:"Cari deskripsi...",value:r.search,onChange:a=>s(t=>({...t,search:a.target.value}))}),e.jsxs("select",{className:"form-select",value:r.category,onChange:a=>s(t=>({...t,category:a.target.value})),children:[e.jsx("option",{value:"",children:"Semua Kategori"}),h.map(a=>e.jsxs("option",{value:a.id,children:[a.icon," ",a.name]},a.id))]}),e.jsxs("select",{className:"form-select",value:r.type,onChange:a=>s(t=>({...t,type:a.target.value})),children:[e.jsx("option",{value:"",children:"Semua Tipe"}),e.jsx("option",{value:"expense",children:"Pengeluaran"}),e.jsx("option",{value:"income",children:"Pemasukan"})]}),e.jsx("input",{className:"form-input",type:"date",value:r.dateFrom,onChange:a=>s(t=>({...t,dateFrom:a.target.value})),title:"Dari tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:r.dateTo,onChange:a=>s(t=>({...t,dateTo:a.target.value})),title:"Sampai tanggal"}),e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>s({category:"",type:"",search:"",dateFrom:"",dateTo:""}),children:"Reset"})]}),e.jsxs("div",{className:"filter-summary",children:[e.jsxs("span",{className:"text-success",children:["Pemasukan: ",v(y.income)]}),e.jsxs("span",{className:"text-danger",children:["Pengeluaran: ",v(y.expense)]}),e.jsxs("span",{className:"font-medium",children:["Selisih: ",v(y.income-y.expense)]})]})]}),e.jsx("div",{className:"card",children:k?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[...Array(5)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:48}},t))}):x.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"↕"}),e.jsx("strong",{children:"Tidak ada transaksi"}),e.jsx("p",{children:"Coba ubah filter atau tambah transaksi baru"})]}):e.jsx("div",{className:"table-wrap",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tanggal"}),e.jsx("th",{children:"Kategori"}),e.jsx("th",{children:"Deskripsi"}),e.jsx("th",{children:"Tipe"}),e.jsx("th",{style:{textAlign:"right"},children:"Nominal"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:x.map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:"text-secondary text-sm",children:a.date}),e.jsx("td",{children:a.categories?e.jsxs("span",{className:"cat-chip",style:{background:`${a.categories.color}22`,color:a.categories.color},children:[a.categories.icon," ",a.categories.name]}):e.jsx("span",{className:"text-muted text-xs",children:"—"})}),e.jsx("td",{className:"text-sm",children:a.description||e.jsx("span",{className:"text-muted",children:"—"})}),e.jsx("td",{children:e.jsx("span",{className:`badge ${a.type==="income"?"badge-success":"badge-danger"}`,children:a.type==="income"?"↑ Masuk":"↓ Keluar"})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("span",{className:`font-medium ${a.type==="income"?"text-success":"text-danger"}`,children:[a.type==="income"?"+":"-",v(a.amount)]})}),e.jsx("td",{children:e.jsxs("div",{className:"flex gap-8",style:{justifyContent:"flex-end"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{j(a),n(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm text-danger",onClick:()=>_(a.id),children:"✕"})]})})]},a.id))})]})})}),b&&e.jsx("div",{className:"modal-overlay",onClick:()=>n(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:l!=null&&l.id?"Edit Transaksi":"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>n(!1),children:"✕"})]}),e.jsx(L,{editData:l,onSuccess:i,onClose:()=>n(!1)})]})}),e.jsx("style",{children:`
        .filter-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
          gap: 8px;
          align-items: center;
          margin-bottom: 12px;
        }
        @media (max-width: 1024px) {
          .filter-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .filter-grid { grid-template-columns: 1fr; }
        }
        .filter-summary {
          display: flex;
          gap: 20px;
          font-size: 0.85rem;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }
        .cat-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 500;
        }
      `})]})}export{K as default};
