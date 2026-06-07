import{F as _,K as P,D as p,E as u,B as e,a as q,c as F,C as E,A as v,w as A}from"./index-BoHQ-D--.js";import{b as I,i as K,a as M}from"./ConfirmModal-Du2QdYNL.js";function z({onSuccess:m,onClose:d,editData:n,month:i}){const{user:f}=_(),g=P(),[x,j]=p.useState([]),[y,b]=p.useState(!1),w=()=>n!=null&&n.date?n.date:i?i===A()?v():`${i}-01`:v(),[s,l]=p.useState({amount:"",category_id:"",date:w(),description:"",type:"expense",...n});p.useEffect(()=>{N()},[i]);const N=async()=>{const[t,r]=await Promise.all([u.from("categories").select("*").eq("user_id",f.id).is("month",null),i?u.from("categories").select("*").eq("user_id",f.id).eq("month",i):Promise.resolve({data:[]})]),a=[...(t.data||[]).filter(o=>I(o)),...r.data||[]].sort((o,T)=>o.name.localeCompare(T.name)),h=new Set,C=a.filter(o=>h.has(o.name)?!1:(h.add(o.name),!0));j(C.filter(o=>!K(o)&&!M(o)))},k=async t=>{if(t.preventDefault(),!(!s.amount||!s.date)){b(!0);try{const r={user_id:f.id,amount:parseFloat(s.amount),category_id:s.category_id||null,date:s.date,description:s.description,type:s.type};if(n!=null&&n.id){const{error:a}=await u.from("transactions").update(r).eq("id",n.id);if(a)throw a;g("Transaksi diperbarui","success")}else{const{error:a}=await u.from("transactions").insert(r);if(a)throw a;g("Transaksi ditambahkan","success")}m==null||m(),d==null||d()}catch(r){g(r.message,"error")}finally{b(!1)}}},c=s.type==="expense";return e.jsxs("form",{onSubmit:k,children:[e.jsxs("div",{className:"tf-type-row",children:[e.jsxs("button",{type:"button",className:`tf-type-btn ${c?"active":""}`,"data-type":"expense",onClick:()=>l(t=>({...t,type:"expense"})),children:[e.jsx("span",{className:"tf-type-icon",children:e.jsx(q,{size:14})})," Pengeluaran"]}),e.jsxs("button",{type:"button",className:`tf-type-btn ${c?"":"active"}`,"data-type":"income",onClick:()=>l(t=>({...t,type:"income"})),children:[e.jsx("span",{className:"tf-type-icon",children:e.jsx(F,{size:14})})," Pemasukan"]})]}),e.jsx(E,{variant:"large",value:s.amount,onChange:t=>l(r=>({...r,amount:t})),inputColor:c?"var(--danger)":"var(--success)",autoFocus:!0,style:{marginBottom:18}}),e.jsx("input",{type:"hidden",value:s.amount,required:!0}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Kategori"}),e.jsxs("select",{className:"form-select",value:s.category_id,onChange:t=>l(r=>({...r,category_id:t.target.value})),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),(()=>{const t=x.filter(a=>a.is_monthly),r=x.filter(a=>!a.is_monthly);return e.jsxs(e.Fragment,{children:[t.length>0&&e.jsx("optgroup",{label:"Pengeluaran Rutin",children:t.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))}),r.length>0&&e.jsx("optgroup",{label:"Kategori Lainnya",children:r.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))})]})})()]})]}),e.jsxs("div",{className:"tf-row-2",children:[e.jsxs("div",{className:"form-group",style:{flex:1},children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:s.date,onChange:t=>l(r=>({...r,date:t.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",style:{flex:2},children:[e.jsxs("label",{className:"form-label",children:["Deskripsi ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0,fontWeight:500},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Keterangan...",value:s.description,onChange:t=>l(r=>({...r,description:t.target.value}))})]})]}),e.jsxs("div",{className:"flex gap-8",style:{marginTop:20},children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:d,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block",style:{flex:1,background:c?"var(--danger)":"var(--success)",boxShadow:c?"0 4px 14px rgba(248,113,113,0.3)":"0 4px 14px rgba(52,211,153,0.3)"},disabled:y,children:y?"Menyimpan...":n!=null&&n.id?"Perbarui":c?"Catat Pengeluaran":"Catat Pemasukan"})]}),e.jsx("style",{children:`
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
      `})]})}export{z as T};
