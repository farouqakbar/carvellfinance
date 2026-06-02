import{G as k,M as w,E as p,F as m,D as e,b as C,d as T,C as _,B as h,x as F}from"./index-Bwuw86n0.js";import{i as P,a as q}from"./ConfirmModal-B_OsTFaJ.js";function I({onSuccess:d,onClose:c,editData:s,month:i}){const{user:g}=k(),u=w(),[x,f]=p.useState([]),[y,b]=p.useState(!1),v=()=>s!=null&&s.date?s.date:i?i===F()?h():`${i}-01`:h(),[r,o]=p.useState({amount:"",category_id:"",date:v(),description:"",type:"expense",...s});p.useEffect(()=>{j()},[i]);const j=async()=>{if(!i){f([]);return}const{data:a}=await m.from("categories").select("*").eq("user_id",g.id).eq("month",i).order("name");f((a||[]).filter(t=>!P(t)&&!q(t)))},N=async a=>{if(a.preventDefault(),!(!r.amount||!r.date)){b(!0);try{const t={user_id:g.id,amount:parseFloat(r.amount),category_id:r.category_id||null,date:r.date,description:r.description,type:r.type};s!=null&&s.id?(await m.from("transactions").update(t).eq("id",s.id),u("Transaksi diperbarui","success")):(await m.from("transactions").insert(t),u("Transaksi ditambahkan","success")),d==null||d(),c==null||c()}catch(t){u(t.message,"error")}finally{b(!1)}}},l=r.type==="expense";return e.jsxs("form",{onSubmit:N,children:[e.jsxs("div",{className:"tf-type-row",children:[e.jsxs("button",{type:"button",className:`tf-type-btn ${l?"active":""}`,"data-type":"expense",onClick:()=>o(a=>({...a,type:"expense"})),children:[e.jsx("span",{className:"tf-type-icon",children:e.jsx(C,{size:14})})," Pengeluaran"]}),e.jsxs("button",{type:"button",className:`tf-type-btn ${l?"":"active"}`,"data-type":"income",onClick:()=>o(a=>({...a,type:"income"})),children:[e.jsx("span",{className:"tf-type-icon",children:e.jsx(T,{size:14})})," Pemasukan"]})]}),e.jsx(_,{variant:"large",value:r.amount,onChange:a=>o(t=>({...t,amount:a})),inputColor:l?"var(--danger)":"var(--success)",autoFocus:!0,style:{marginBottom:18}}),e.jsx("input",{type:"hidden",value:r.amount,required:!0}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Kategori"}),e.jsxs("select",{className:"form-select",value:r.category_id,onChange:a=>o(t=>({...t,category_id:a.target.value})),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),(()=>{const a=x.filter(n=>n.is_monthly),t=x.filter(n=>!n.is_monthly);return e.jsxs(e.Fragment,{children:[a.length>0&&e.jsx("optgroup",{label:"Pengeluaran Rutin",children:a.map(n=>e.jsx("option",{value:n.id,children:n.name},n.id))}),t.length>0&&e.jsx("optgroup",{label:"Kategori Lainnya",children:t.map(n=>e.jsx("option",{value:n.id,children:n.name},n.id))})]})})()]})]}),e.jsxs("div",{className:"tf-row-2",children:[e.jsxs("div",{className:"form-group",style:{flex:1},children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:r.date,onChange:a=>o(t=>({...t,date:a.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",style:{flex:2},children:[e.jsxs("label",{className:"form-label",children:["Deskripsi ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0,fontWeight:500},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Keterangan...",value:r.description,onChange:a=>o(t=>({...t,description:a.target.value}))})]})]}),e.jsxs("div",{className:"flex gap-8",style:{marginTop:20},children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:c,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block",style:{flex:1,background:l?"var(--danger)":"var(--success)",boxShadow:l?"0 4px 14px rgba(248,113,113,0.3)":"0 4px 14px rgba(52,211,153,0.3)"},disabled:y,children:y?"Menyimpan...":s!=null&&s.id?"Perbarui":l?"Catat Pengeluaran":"Catat Pemasukan"})]}),e.jsx("style",{children:`
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
        .tf-type-icon { display: flex; align-items: center; }

        .tf-row-2 {
          display: flex;
          gap: 10px;
        }
        @media (max-width: 480px) {
          .tf-row-2 { flex-direction: column; gap: 0; }
        }
      `})]})}export{I as T};
