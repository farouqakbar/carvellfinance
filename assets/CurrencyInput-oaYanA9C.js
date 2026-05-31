import{r as f,j as r}from"./index-DGLiPZED.js";function h({value:d="",onChange:t,placeholder:m="0",autoFocus:i,variant:u="default",style:n,disabled:o}){const a=f.useRef(null),c=String(d||"").replace(/\D/g,""),s=c?Number(c).toLocaleString("id-ID"):"",l=e=>{const x=e.target.value.replace(/\D/g,"");t==null||t(x)},p=()=>{var e;return(e=a.current)==null?void 0:e.focus()};return u==="large"?r.jsxs("div",{className:"ci-large-wrap",onClick:p,style:n,children:[r.jsx("span",{className:"ci-large-prefix",children:"Rp"}),r.jsx("input",{ref:a,type:"text",inputMode:"numeric",pattern:"[0-9.]*",className:"ci-large-input",value:s,onChange:l,placeholder:"0",autoFocus:i,disabled:o}),r.jsx("style",{children:`
          .ci-large-wrap {
            display: flex;
            align-items: center;
            gap: 4px;
            background: var(--bg-input);
            border: 1.5px solid var(--border-light);
            border-radius: var(--radius-sm);
            padding: 0 16px;
            cursor: text;
            transition: border-color 0.15s, box-shadow 0.15s;
          }
          .ci-large-wrap:focus-within {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px var(--accent-dim);
          }
          .ci-large-prefix {
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-muted);
            flex-shrink: 0;
            user-select: none;
          }
          .ci-large-input {
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
            color: var(--text-primary);
          }
          .ci-large-input::placeholder { color: var(--border-light); }
        `})]}):r.jsxs("div",{className:"ci-wrap",onClick:p,style:n,children:[r.jsx("span",{className:"ci-prefix",children:"Rp"}),r.jsx("input",{ref:a,type:"text",inputMode:"numeric",pattern:"[0-9.]*",className:"ci-input",value:s,onChange:l,placeholder:"0",autoFocus:i,disabled:o}),r.jsx("style",{children:`
        .ci-wrap {
          display: flex;
          align-items: center;
          gap: 2px;
          width: 100%;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0 13px;
          cursor: text;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ci-wrap:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-dim);
        }
        .ci-prefix {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          flex-shrink: 0;
          user-select: none;
        }
        .ci-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.01em;
          padding: 9px 6px;
          outline: none;
          width: 100%;
          min-width: 0;
          color: var(--text-primary);
        }
        .ci-input::placeholder { color: var(--text-muted); opacity: 0.5; }
      `})]})}export{h as C};
