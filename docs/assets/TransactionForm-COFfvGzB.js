import{u as f,d as h,r as o,s as d,j as e}from"./index-DL4V_OUY.js";function j({onSuccess:l,onClose:i,editData:r}){const{user:p}=f(),c=h(),[g,b]=o.useState([]),[u,m]=o.useState(!1),[t,n]=o.useState({amount:"",category_id:"",date:new Date().toISOString().split("T")[0],description:"",type:"expense",...r});o.useEffect(()=>{x()},[]);const x=async()=>{const{data:a}=await d.from("categories").select("*").eq("user_id",p.id);b(a||[])},y=async a=>{if(a.preventDefault(),!(!t.amount||!t.date)){m(!0);try{const s={user_id:p.id,amount:parseFloat(t.amount),category_id:t.category_id||null,date:t.date,description:t.description,type:t.type};r!=null&&r.id?(await d.from("transactions").update(s).eq("id",r.id),c("Transaksi diperbarui","success")):(await d.from("transactions").insert(s),c("Transaksi ditambahkan","success")),l==null||l(),i==null||i()}catch(s){c(s.message,"error")}finally{m(!1)}}};return e.jsxs("form",{onSubmit:y,children:[e.jsxs("div",{className:"type-toggle",children:[e.jsx("button",{type:"button",className:`type-btn ${t.type==="expense"?"active-expense":""}`,onClick:()=>n(a=>({...a,type:"expense"})),children:"↓ Pengeluaran"}),e.jsx("button",{type:"button",className:`type-btn ${t.type==="income"?"active-income":""}`,onClick:()=>n(a=>({...a,type:"income"})),children:"↑ Pemasukan"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nominal"}),e.jsx("input",{className:"form-input",type:"number",placeholder:"0",value:t.amount,onChange:a=>n(s=>({...s,amount:a.target.value})),required:!0,min:"0"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Kategori"}),e.jsxs("select",{className:"form-select",value:t.category_id,onChange:a=>n(s=>({...s,category_id:a.target.value})),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),g.map(a=>e.jsxs("option",{value:a.id,children:[a.icon," ",a.name]},a.id))]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:t.date,onChange:a=>n(s=>({...s,date:a.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Deskripsi"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Keterangan transaksi...",value:t.description,onChange:a=>n(s=>({...s,description:a.target.value}))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:i,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{flex:1},disabled:u,children:u?"Menyimpan...":r!=null&&r.id?"Perbarui":"Simpan"})]}),e.jsx("style",{children:`
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
      `})]})}export{j as T};
