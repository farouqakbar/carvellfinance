import{u as v,e as j,r as i,s as d,j as e}from"./index-DsF0qlhL.js";function w({onSuccess:l,onClose:c,editData:n}){const{user:u}=v(),p=j(),m=i.useRef(null),[x,b]=i.useState([]),[f,g]=i.useState(!1),[a,s]=i.useState({amount:"",category_id:"",date:new Date().toISOString().split("T")[0],description:"",type:"expense",...n});i.useEffect(()=>{y(),setTimeout(()=>{var t;return(t=m.current)==null?void 0:t.focus()},80)},[]);const y=async()=>{const{data:t}=await d.from("categories").select("*").eq("user_id",u.id).order("name");b(t||[])},h=async t=>{if(t.preventDefault(),!(!a.amount||!a.date)){g(!0);try{const r={user_id:u.id,amount:parseFloat(a.amount),category_id:a.category_id||null,date:a.date,description:a.description,type:a.type};n!=null&&n.id?(await d.from("transactions").update(r).eq("id",n.id),p("Transaksi diperbarui","success")):(await d.from("transactions").insert(r),p("Transaksi ditambahkan","success")),l==null||l(),c==null||c()}catch(r){p(r.message,"error")}finally{g(!1)}}},o=a.type==="expense";return e.jsxs("form",{onSubmit:h,children:[e.jsxs("div",{className:"tf-type-row",children:[e.jsxs("button",{type:"button",className:`tf-type-btn ${o?"active":""}`,"data-type":"expense",onClick:()=>s(t=>({...t,type:"expense"})),children:[e.jsx("span",{className:"tf-type-icon",children:"↓"})," Pengeluaran"]}),e.jsxs("button",{type:"button",className:`tf-type-btn ${o?"":"active"}`,"data-type":"income",onClick:()=>s(t=>({...t,type:"income"})),children:[e.jsx("span",{className:"tf-type-icon",children:"↑"})," Pemasukan"]})]}),e.jsxs("div",{className:"tf-amount-group",children:[e.jsx("span",{className:"tf-currency",children:"Rp"}),e.jsx("input",{ref:m,className:"tf-amount-input",type:"number",placeholder:"0",value:a.amount,onChange:t=>s(r=>({...r,amount:t.target.value})),required:!0,min:"1",style:{color:o?"var(--danger)":"var(--success)"}})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Kategori"}),e.jsxs("select",{className:"form-select",value:a.category_id,onChange:t=>s(r=>({...r,category_id:t.target.value})),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),x.map(t=>e.jsxs("option",{value:t.id,children:[t.icon," ",t.name]},t.id))]})]}),e.jsxs("div",{className:"tf-row-2",children:[e.jsxs("div",{className:"form-group",style:{flex:1},children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:a.date,onChange:t=>s(r=>({...r,date:t.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",style:{flex:2},children:[e.jsxs("label",{className:"form-label",children:["Deskripsi ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0,fontWeight:500},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Keterangan...",value:a.description,onChange:t=>s(r=>({...r,description:t.target.value}))})]})]}),e.jsxs("div",{className:"flex gap-8",style:{marginTop:20},children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:c,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block",style:{flex:1,background:o?"var(--danger)":"var(--success)",boxShadow:o?"0 4px 14px rgba(248,113,113,0.3)":"0 4px 14px rgba(52,211,153,0.3)"},disabled:f,children:f?"Menyimpan...":n!=null&&n.id?"Perbarui":o?"Catat Pengeluaran":"Catat Pemasukan"})]}),e.jsx("style",{children:`
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

        .tf-amount-group {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-input);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-sm);
          padding: 0 16px;
          margin-bottom: 18px;
          transition: border-color 0.15s;
        }
        .tf-amount-group:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-dim);
        }
        .tf-currency {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-muted);
          flex-shrink: 0;
          padding-right: 4px;
        }
        .tf-amount-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
          padding: 14px 0;
          outline: none;
          width: 100%;
          min-width: 0;
        }
        .tf-amount-input::placeholder { color: var(--border-light); }
        .tf-amount-input::-webkit-inner-spin-button,
        .tf-amount-input::-webkit-outer-spin-button { -webkit-appearance: none; }

        .tf-row-2 {
          display: flex;
          gap: 10px;
        }
        @media (max-width: 480px) {
          .tf-row-2 { flex-direction: column; gap: 0; }
        }
      `})]})}export{w as T};
