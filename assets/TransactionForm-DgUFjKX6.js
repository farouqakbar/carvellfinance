import{u as v,e as h,r as l,s as d,j as e}from"./index-Cs9p8C--.js";import{C as j}from"./CurrencyInput-DB8vOIPh.js";function w({onSuccess:c,onClose:i,editData:r}){const{user:u}=v(),p=h(),[f,g]=l.useState([]),[m,x]=l.useState(!1),[t,n]=l.useState({amount:"",category_id:"",date:new Date().toISOString().split("T")[0],description:"",type:"expense",...r});l.useEffect(()=>{y()},[]);const y=async()=>{const{data:a}=await d.from("categories").select("*").eq("user_id",u.id).order("name");g(a||[])},b=async a=>{if(a.preventDefault(),!(!t.amount||!t.date)){x(!0);try{const s={user_id:u.id,amount:parseFloat(t.amount),category_id:t.category_id||null,date:t.date,description:t.description,type:t.type};r!=null&&r.id?(await d.from("transactions").update(s).eq("id",r.id),p("Transaksi diperbarui","success")):(await d.from("transactions").insert(s),p("Transaksi ditambahkan","success")),c==null||c(),i==null||i()}catch(s){p(s.message,"error")}finally{x(!1)}}},o=t.type==="expense";return e.jsxs("form",{onSubmit:b,children:[e.jsxs("div",{className:"tf-type-row",children:[e.jsxs("button",{type:"button",className:`tf-type-btn ${o?"active":""}`,"data-type":"expense",onClick:()=>n(a=>({...a,type:"expense"})),children:[e.jsx("span",{className:"tf-type-icon",children:"↓"})," Pengeluaran"]}),e.jsxs("button",{type:"button",className:`tf-type-btn ${o?"":"active"}`,"data-type":"income",onClick:()=>n(a=>({...a,type:"income"})),children:[e.jsx("span",{className:"tf-type-icon",children:"↑"})," Pemasukan"]})]}),e.jsx(j,{variant:"large",value:t.amount,onChange:a=>n(s=>({...s,amount:a})),inputColor:o?"var(--danger)":"var(--success)",autoFocus:!0,style:{marginBottom:18}}),e.jsx("input",{type:"hidden",value:t.amount,required:!0}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Kategori"}),e.jsxs("select",{className:"form-select",value:t.category_id,onChange:a=>n(s=>({...s,category_id:a.target.value})),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),f.map(a=>e.jsxs("option",{value:a.id,children:[a.icon," ",a.name]},a.id))]})]}),e.jsxs("div",{className:"tf-row-2",children:[e.jsxs("div",{className:"form-group",style:{flex:1},children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:t.date,onChange:a=>n(s=>({...s,date:a.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",style:{flex:2},children:[e.jsxs("label",{className:"form-label",children:["Deskripsi ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0,fontWeight:500},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Keterangan...",value:t.description,onChange:a=>n(s=>({...s,description:a.target.value}))})]})]}),e.jsxs("div",{className:"flex gap-8",style:{marginTop:20},children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:i,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block",style:{flex:1,background:o?"var(--danger)":"var(--success)",boxShadow:o?"0 4px 14px rgba(248,113,113,0.3)":"0 4px 14px rgba(52,211,153,0.3)"},disabled:m,children:m?"Menyimpan...":r!=null&&r.id?"Perbarui":o?"Catat Pengeluaran":"Catat Pemasukan"})]}),e.jsx("style",{children:`
        .tf-type-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 20px;
        }
        .tf-type-btn {
          padding: 10px 12px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-input);
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          letter-spacing: -0.01em;
        }
        .tf-type-btn:active { transform: scale(0.97); }
        .tf-type-btn.active[data-type="expense"] {
          background: var(--danger-dim);
          border-color: var(--danger);
          color: var(--danger);
        }
        .tf-type-btn.active[data-type="income"] {
          background: var(--success-dim);
          border-color: var(--success);
          color: var(--success);
        }
        .tf-type-icon { font-size: 0.9rem; }

        .tf-row-2 {
          display: flex;
          gap: 10px;
        }
        @media (max-width: 480px) {
          .tf-row-2 { flex-direction: column; gap: 0; }
        }
      `})]})}export{w as T};
