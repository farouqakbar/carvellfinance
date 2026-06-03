import{H as w,N as k,F as p,G as m,E as e,b as C,d as T,C as _,D as h,y as F}from"./index-Dk5OhnG-.js";import{i as P,a as q}from"./ConfirmModal-DTKwzRLI.js";function M({onSuccess:d,onClose:c,editData:n,month:o}){const{user:g}=w(),u=k(),[f,x]=p.useState([]),[y,b]=p.useState(!1),v=()=>n!=null&&n.date?n.date:o?o===F()?h():`${o}-01`:h(),[s,i]=p.useState({amount:"",category_id:"",date:v(),description:"",type:"expense",...n});p.useEffect(()=>{j()},[o]);const j=async()=>{if(!o){x([]);return}const{data:a}=await m.from("categories").select("*").eq("user_id",g.id).eq("month",o).order("name");x((a||[]).filter(t=>!P(t)&&!q(t)))},N=async a=>{if(a.preventDefault(),!(!s.amount||!s.date)){b(!0);try{const t={user_id:g.id,amount:parseFloat(s.amount),category_id:s.category_id||null,date:s.date,description:s.description,type:s.type};if(n!=null&&n.id){const{error:r}=await m.from("transactions").update(t).eq("id",n.id);if(r)throw r;u("Transaksi diperbarui","success")}else{const{error:r}=await m.from("transactions").insert(t);if(r)throw r;u("Transaksi ditambahkan","success")}d==null||d(),c==null||c()}catch(t){u(t.message,"error")}finally{b(!1)}}},l=s.type==="expense";return e.jsxs("form",{onSubmit:N,children:[e.jsxs("div",{className:"tf-type-row",children:[e.jsxs("button",{type:"button",className:`tf-type-btn ${l?"active":""}`,"data-type":"expense",onClick:()=>i(a=>({...a,type:"expense"})),children:[e.jsx("span",{className:"tf-type-icon",children:e.jsx(C,{size:14})})," Pengeluaran"]}),e.jsxs("button",{type:"button",className:`tf-type-btn ${l?"":"active"}`,"data-type":"income",onClick:()=>i(a=>({...a,type:"income"})),children:[e.jsx("span",{className:"tf-type-icon",children:e.jsx(T,{size:14})})," Pemasukan"]})]}),e.jsx(_,{variant:"large",value:s.amount,onChange:a=>i(t=>({...t,amount:a})),inputColor:l?"var(--danger)":"var(--success)",autoFocus:!0,style:{marginBottom:18}}),e.jsx("input",{type:"hidden",value:s.amount,required:!0}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Kategori"}),e.jsxs("select",{className:"form-select",value:s.category_id,onChange:a=>i(t=>({...t,category_id:a.target.value})),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),(()=>{const a=f.filter(r=>r.is_monthly),t=f.filter(r=>!r.is_monthly);return e.jsxs(e.Fragment,{children:[a.length>0&&e.jsx("optgroup",{label:"Pengeluaran Rutin",children:a.map(r=>e.jsx("option",{value:r.id,children:r.name},r.id))}),t.length>0&&e.jsx("optgroup",{label:"Kategori Lainnya",children:t.map(r=>e.jsx("option",{value:r.id,children:r.name},r.id))})]})})()]})]}),e.jsxs("div",{className:"tf-row-2",children:[e.jsxs("div",{className:"form-group",style:{flex:1},children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:s.date,onChange:a=>i(t=>({...t,date:a.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",style:{flex:2},children:[e.jsxs("label",{className:"form-label",children:["Deskripsi ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0,fontWeight:500},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Keterangan...",value:s.description,onChange:a=>i(t=>({...t,description:a.target.value}))})]})]}),e.jsxs("div",{className:"flex gap-8",style:{marginTop:20},children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:c,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block",style:{flex:1,background:l?"var(--danger)":"var(--success)",boxShadow:l?"0 4px 14px rgba(248,113,113,0.3)":"0 4px 14px rgba(52,211,153,0.3)"},disabled:y,children:y?"Menyimpan...":n!=null&&n.id?"Perbarui":l?"Catat Pengeluaran":"Catat Pemasukan"})]}),e.jsx("style",{children:`
        .tf-type-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 20px;
        }
        .tf-type-btn {
          padding: 10px 12px;
          min-height: 44px;
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
        .tf-type-icon { display: flex; align-items: center; }

        .tf-row-2 {
          display: flex;
          gap: 10px;
        }
        @media (max-width: 480px) {
          .tf-row-2 { flex-direction: column; gap: 0; }
        }
      `})]})}export{M as T};
