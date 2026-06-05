import{G as b,H as k,E as s,D as e,u as c,k as w,q as v,m as j,f as y}from"./index-CasCzvCu.js";function z(){const{signIn:m,signUp:u}=b(),x=k(),[r,f]=s.useState("login"),[n,o]=s.useState({username:"",password:"",confirmPassword:""}),[l,t]=s.useState(""),[d,g]=s.useState(!1),h=async a=>{if(a.preventDefault(),t(""),r==="register"){if(n.username.length<3)return t("Username minimal 3 karakter");if(!/^[a-zA-Z0-9_]+$/.test(n.username))return t("Username hanya boleh huruf, angka, dan underscore");if(n.password.length<6)return t("Password minimal 6 karakter");if(n.password!==n.confirmPassword)return t("Password tidak cocok")}g(!0);try{r==="login"?await m(n.username,n.password):await u(n.username,n.password),x("/dashboard")}catch(i){t(i.message)}finally{g(!1)}},p=a=>{f(a),t(""),o({username:"",password:"",confirmPassword:""})};return e.jsxs("div",{className:"login-root",children:[e.jsx("div",{className:"login-panel",children:e.jsxs("div",{className:"login-panel-inner",children:[e.jsx(c,{dark:!0,size:"lg",id:"login-logo"}),e.jsxs("div",{className:"login-hero",children:[e.jsxs("h1",{className:"login-headline",children:["Kendali penuh",e.jsx("br",{}),"atas keuanganmu."]}),e.jsx("p",{className:"login-sub-text",children:"Catat pemasukan dan pengeluaran, pantau budget per kategori, dan capai target tabungan — dalam satu dashboard yang ringkas."})]}),e.jsx("ul",{className:"login-features",children:[{Icon:w,text:"Dashboard keuangan per bulan"},{Icon:v,text:"Budget per kategori + alert overbudget"},{Icon:j,text:"Target tabungan dengan progress"},{Icon:y,text:"Laporan bulanan dengan grafik tren"}].map(a=>e.jsxs("li",{className:"login-feature-item",children:[e.jsx("span",{className:"login-feature-icon",children:e.jsx(a.Icon,{size:15})}),e.jsx("span",{children:a.text})]},a.text))}),e.jsx("div",{className:"login-grid-dots","aria-hidden":!0})]})}),e.jsx("div",{className:"login-form-panel",children:e.jsxs("div",{className:"login-form-wrap",children:[e.jsx("div",{className:"login-mobile-logo",children:e.jsx(c,{dark:!1,size:"md",id:"login-mobile-logo"})}),e.jsxs("div",{className:"login-form-header",children:[e.jsx("h2",{className:"login-form-title",children:r==="login"?"Selamat datang":"Buat akun"}),e.jsx("p",{className:"login-form-sub",children:r==="login"?"Masuk dengan username dan password kamu":"Pilih username dan password"})]}),e.jsxs("form",{onSubmit:h,className:"login-form",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsxs("div",{className:"input-prefix-wrap",children:[e.jsx("span",{className:"input-prefix-char",children:"@"}),e.jsx("input",{className:"form-input input-has-prefix",type:"text",placeholder:"username_kamu",value:n.username,onChange:a=>o(i=>({...i,username:a.target.value.toLowerCase().replace(/\s/g,"")})),required:!0,autoComplete:"username",autoFocus:!0})]}),r==="register"&&e.jsx("p",{className:"form-hint",children:"Huruf, angka, underscore. Min. 3 karakter."})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx("input",{className:"form-input",type:"password",placeholder:r==="register"?"Minimal 6 karakter":"••••••••",value:n.password,onChange:a=>o(i=>({...i,password:a.target.value})),required:!0,autoComplete:r==="login"?"current-password":"new-password"})]}),r==="register"&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Konfirmasi Password"}),e.jsx("input",{className:"form-input",type:"password",placeholder:"Ulangi password",value:n.confirmPassword,onChange:a=>o(i=>({...i,confirmPassword:a.target.value})),required:!0,autoComplete:"new-password"})]}),l&&e.jsx("div",{className:"auth-error",children:l}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block login-submit-btn",disabled:d,children:d?"Memproses...":r==="login"?"Masuk":"Buat Akun"})]}),e.jsx("p",{className:"login-switch",children:r==="login"?e.jsxs(e.Fragment,{children:["Belum punya akun? ",e.jsx("button",{type:"button",onClick:()=>p("register"),children:"Daftar"})]}):e.jsxs(e.Fragment,{children:["Sudah punya akun? ",e.jsx("button",{type:"button",onClick:()=>p("login"),children:"Masuk"})]})})]})}),e.jsx("style",{children:`
        .login-root {
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 55% 45%;
          background: var(--bg);
        }

        /* Left panel — glass aurora */
        .login-panel {
          background: linear-gradient(145deg, rgba(6,6,16,0.96) 0%, rgba(10,8,24,0.98) 100%);
          border-right: 1px solid rgba(99,102,241,0.15);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }
        /* Aurora blobs inside panel */
        .login-panel::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 65%);
          filter: blur(40px);
          pointer-events: none;
          animation: aurora-drift-1 18s ease-in-out infinite;
        }
        .login-panel::after {
          content: '';
          position: absolute;
          bottom: -100px; right: -80px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 65%);
          filter: blur(50px);
          pointer-events: none;
          animation: aurora-drift-2 24s ease-in-out infinite;
        }
        .login-panel-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 44px 48px; width: 100%;
        }

        .login-hero { flex:1; display:flex; flex-direction:column; justify-content:center; padding: 48px 0; }
        .login-headline {
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 800; letter-spacing: -0.045em; line-height: 1.08;
          margin-bottom: 18px;
          background: linear-gradient(135deg, #fff 30%, rgba(167,139,250,0.9) 65%, rgba(99,102,241,0.85) 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .login-headline {
          background: linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4f46e5 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .login-sub-text {
          font-size: 0.95rem; line-height: 1.7;
          color: rgba(160, 160, 200, 0.60); max-width: 360px;
        }
        [data-theme="light"] .login-sub-text { color: var(--text-secondary); }

        .login-features { list-style:none; display:flex; flex-direction:column; gap:12px; }
        .login-feature-item {
          display: flex; align-items: center; gap: 12px;
          color: rgba(160, 160, 200, 0.55); font-size: 0.85rem; font-weight: 500;
        }
        [data-theme="light"] .login-feature-item { color: var(--text-secondary); }
        .login-feature-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.20);
          display: flex; align-items: center; justify-content: center;
          color: #a78bfa; flex-shrink: 0;
        }

        /* Dot grid */
        .login-grid-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.35; pointer-events: none;
          mask-image: radial-gradient(ellipse at 70% 30%, black 10%, transparent 65%);
          -webkit-mask-image: radial-gradient(ellipse at 70% 30%, black 10%, transparent 65%);
        }

        /* Right panel — glass form */
        .login-form-panel {
          display: flex; align-items: center; justify-content: center;
          padding: 48px 40px;
          background: rgba(8,8,20,0.5);
          backdrop-filter: blur(8px);
        }
        [data-theme="light"] .login-form-panel { background: rgba(240,240,248,0.7); }
        .login-form-wrap { width: 100%; max-width: 380px; }

        .login-mobile-logo { display: none; margin-bottom: 32px; }

        .login-form-header { margin-bottom: 32px; }
        .login-form-title {
          font-size: 1.75rem; font-weight: 800; letter-spacing: -0.04em;
          color: var(--text-primary); margin-bottom: 8px;
        }
        .login-form-sub { font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; }

        .login-form { display: flex; flex-direction: column; gap: 0; }

        .input-prefix-wrap { position: relative; }
        .input-prefix-char {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          color: var(--accent); font-size: 0.9rem; font-weight: 700;
          pointer-events: none; z-index: 1;
        }
        .input-has-prefix { padding-left: 30px !important; }

        .form-hint { font-size: 0.7rem; color: var(--text-muted); margin-top: 5px; font-weight: 500; }

        .auth-error {
          background: var(--danger-dim); color: var(--danger);
          border: 1px solid rgba(248,113,113,0.25);
          border-radius: var(--radius-sm); padding: 10px 14px;
          font-size: 0.8rem; font-weight: 500; margin-bottom: 14px;
          backdrop-filter: var(--glass-blur);
        }

        .login-submit-btn {
          padding: 13px; font-size: 0.9rem;
          border-radius: var(--radius-sm); margin-top: 6px;
          letter-spacing: -0.01em; font-weight: 700;
        }

        .login-switch {
          text-align: center; margin-top: 22px;
          font-size: 0.82rem; color: var(--text-muted); font-weight: 500;
        }
        .login-switch button {
          background: none; border: none; color: var(--accent);
          cursor: pointer; font-family: var(--font-sans);
          font-size: 0.82rem; font-weight: 700; padding: 0;
          margin-left: 4px; transition: all 0.15s;
        }
        .login-switch button:hover { opacity: 0.8; text-decoration: underline; }

        @media (max-width: 768px) {
          .login-root { grid-template-columns: 1fr; }
          .login-panel { display: none; }
          .login-form-panel { padding: 32px 20px; align-items: flex-start; padding-top: 56px; background: transparent; }
          .login-mobile-logo { display: block; }
        }
      `})]})}export{z as default};
