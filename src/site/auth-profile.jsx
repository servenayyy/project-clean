// site/auth-profile.jsx — Login, Register, ProfilePanel

const { useState } = React;

function InputField({ label, type='text', placeholder, value, onChange, error }) {
  return (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:'block',fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',color:'#1F1F1F',marginBottom:6 }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{ width:'100%',border:`1px solid ${error?'#ef4444':'#EAE4DC'}`,background:'#FAF8F4',padding:'11px 14px',fontFamily:"'Inter',sans-serif",fontSize:13,outline:'none',color:'#1F1F1F',boxSizing:'border-box',transition:'border-color .2s' }}
        onFocus={e=>e.target.style.borderColor='#B89565'}
        onBlur={e=>e.target.style.borderColor=error?'#ef4444':'#EAE4DC'}
      />
      {error && <p style={{ fontSize:11,color:'#ef4444',marginTop:4 }}>{error}</p>}
    </div>
  );
}

function AuthCard({ children, title, subtitle }) {
  return (
    <div style={{ background:'#FAF8F4',minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px' }}>
      <div style={{ width:'100%',maxWidth:440,background:'#fff',padding:'44px 40px',boxShadow:'0 4px 24px rgba(0,0,0,.06)',border:'1px solid #EAE4DC' }}>
        <div style={{ textAlign:'center',marginBottom:32 }}>
          <h1 style={{ fontFamily:"'Poppins',sans-serif",fontSize:22,fontWeight:600,color:'#1F1F1F',margin:'0 0 8px' }}>{title}</h1>
          {subtitle && <p style={{ fontSize:13,color:'#6F6A64',lineHeight:1.6 }}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

function LoginPage({ onNavigate, onLogin }) {
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!email || !email.includes('@')) e.email = 'Geçerli bir e-posta giriniz.';
    if (!pass || pass.length < 6)        e.pass  = 'Şifre en az 6 karakter olmalıdır.';
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ email, name: 'Kullanıcı' });
      onNavigate('profile');
    }, 900);
  }

  return (
    <AuthCard title="Giriş Yap" subtitle="Hesabınıza giriş yaparak alışverişe devam edin.">
      <form onSubmit={handleSubmit}>
        <InputField label="E-posta" type="email" placeholder="ornek@eposta.com" value={email} onChange={e=>setEmail(e.target.value)} error={errors.email}/>
        <InputField label="Şifre" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} error={errors.pass}/>
        <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:24,marginTop:-10 }}>
          <button type="button" style={{ background:'none',border:'none',fontSize:12,color:'#B89565',cursor:'pointer',fontFamily:"'Inter',sans-serif",textDecoration:'underline',textUnderlineOffset:2 }}>Şifremi Unuttum</button>
        </div>
        <button type="submit" disabled={loading} style={{ width:'100%',background:'#1F1F1F',border:'none',padding:'14px 0',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:'#fff',cursor:'pointer',opacity:loading?.7:1,transition:'opacity .2s' }}>
          {loading ? 'Giriş Yapılıyor…' : 'Giriş Yap'}
        </button>
      </form>
      <div style={{ marginTop:24,textAlign:'center',fontSize:13,color:'#6F6A64' }}>
        Hesabınız yok mu?{' '}
        <button onClick={()=>onNavigate('register')} style={{ background:'none',border:'none',color:'#B89565',cursor:'pointer',fontSize:13,fontFamily:"'Inter',sans-serif",fontWeight:600,textDecoration:'underline',textUnderlineOffset:2 }}>Üye Ol</button>
      </div>
      <div style={{ margin:'24px 0',display:'flex',alignItems:'center',gap:12 }}>
        <div style={{ flex:1,height:1,background:'#EAE4DC' }}/>
        <span style={{ fontSize:11,color:'#6F6A64',fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em' }}>Demo</span>
        <div style={{ flex:1,height:1,background:'#EAE4DC' }}/>
      </div>
      <p style={{ fontSize:11,color:'#6F6A64',textAlign:'center',lineHeight:1.6 }}>Demo için herhangi bir e-posta ve 6+ karakterli şifre girebilirsiniz.</p>
    </AuthCard>
  );
}

function RegisterPage({ onNavigate, onLogin }) {
  const [form, setForm] = useState({ name:'', surname:'', email:'', pass:'', pass2:'' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function set(k){ return e => setForm(f=>({...f,[k]:e.target.value})); }

  function validate() {
    const e={};
    if (!form.name)                        e.name='Ad gereklidir.';
    if (!form.surname)                     e.surname='Soyad gereklidir.';
    if (!form.email||!form.email.includes('@')) e.email='Geçerli e-posta giriniz.';
    if (!form.pass||form.pass.length<6)    e.pass='Şifre en az 6 karakter.';
    if (form.pass!==form.pass2)            e.pass2='Şifreler eşleşmiyor.';
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e=validate();
    if(Object.keys(e).length){setErrors(e);return;}
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      onLogin({email:form.email,name:form.name+' '+form.surname});
      onNavigate('profile');
    },900);
  }

  return (
    <AuthCard title="Üye Ol" subtitle="Yeni bir hesap oluşturun.">
      <form onSubmit={handleSubmit}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:0 }}>
          <InputField label="Ad" placeholder="Adınız" value={form.name} onChange={set('name')} error={errors.name}/>
          <InputField label="Soyad" placeholder="Soyadınız" value={form.surname} onChange={set('surname')} error={errors.surname}/>
        </div>
        <InputField label="E-posta" type="email" placeholder="ornek@eposta.com" value={form.email} onChange={set('email')} error={errors.email}/>
        <InputField label="Şifre" type="password" placeholder="En az 6 karakter" value={form.pass} onChange={set('pass')} error={errors.pass}/>
        <InputField label="Şifre Tekrar" type="password" placeholder="Şifrenizi tekrar giriniz" value={form.pass2} onChange={set('pass2')} error={errors.pass2}/>
        <button type="submit" disabled={loading} style={{ width:'100%',background:'#B89565',border:'none',padding:'14px 0',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:'#fff',cursor:'pointer',opacity:loading?.7:1,transition:'opacity .2s',marginTop:4 }}>
          {loading ? 'Hesap Oluşturuluyor…' : 'Üye Ol'}
        </button>
      </form>
      <div style={{ marginTop:24,textAlign:'center',fontSize:13,color:'#6F6A64' }}>
        Zaten hesabınız var mı?{' '}
        <button onClick={()=>onNavigate('login')} style={{ background:'none',border:'none',color:'#B89565',cursor:'pointer',fontSize:13,fontFamily:"'Inter',sans-serif",fontWeight:600,textDecoration:'underline',textUnderlineOffset:2 }}>Giriş Yap</button>
      </div>
    </AuthCard>
  );
}

const MOCK_ORDERS = [
  { id:'GT-2026-00341', date:'14 Nisan 2026', status:'Teslim Edildi', total:1125, items:['Seramik Kaplama Tencere Seti — 5 Parça'] },
  { id:'GT-2026-00289', date:'28 Mart 2026',  status:'Kargoda',       total:490,  items:['Bambu Saplı Çatal Bıçak Takımı — 24\'lü'] },
  { id:'GT-2026-00201', date:'5 Mart 2026',   status:'Teslim Edildi', total:320,  items:['El Dökümü Aromali Mum Koleksiyonu — 3\'lü'] },
];

function StatusBadge({ status }) {
  const colors = { 'Teslim Edildi':{ bg:'#d1fae5',color:'#065f46' }, 'Kargoda':{ bg:'#fef3c7',color:'#92400e' }, 'Hazırlanıyor':{ bg:'#e0e7ff',color:'#3730a3' } };
  const c = colors[status]||{ bg:'#F3F4F6',color:'#374151' };
  return <span style={{ background:c.bg,color:c.color,fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',padding:'4px 10px',borderRadius:9999 }}>{status}</span>;
}

function ProfilePage({ user, onLogout, onNavigate }) {
  const [tab, setTab] = useState('orders');
  const [form, setForm] = useState({ name:user?.name||'', email:user?.email||'', phone:'', city:'İstanbul', address:'' });

  function setF(k){ return e=>setForm(f=>({...f,[k]:e.target.value})); }

  return (
    <div style={{ background:'#FAF8F4',minHeight:'80vh',padding:'40px 20px' }}>
      <div style={{ maxWidth:960,margin:'0 auto' }}>
        {/* Header */}
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:32 }}>
          <div style={{ display:'flex',alignItems:'center',gap:16 }}>
            <div style={{ width:52,height:52,borderRadius:'50%',background:'#1F1F1F',display:'flex',alignItems:'center',justifyContent:'center',color:'#B89565',fontFamily:"'Poppins',sans-serif",fontSize:20,fontWeight:700,flexShrink:0 }}>
              {(user?.name||'K')[0].toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontFamily:"'Poppins',sans-serif",fontSize:20,fontWeight:600,color:'#1F1F1F',margin:'0 0 2px' }}>Merhaba, {user?.name||'Kullanıcı'}</h1>
              <p style={{ fontSize:12,color:'#6F6A64',margin:0 }}>{user?.email||''}</p>
            </div>
          </div>
          <button onClick={()=>{onLogout();onNavigate('home');}} style={{ border:'1px solid #EAE4DC',background:'none',padding:'8px 20px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',color:'#6F6A64',cursor:'pointer' }}>Çıkış Yap</button>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'200px 1fr',gap:28 }}>
          {/* Sidebar */}
          <div style={{ background:'#fff',border:'1px solid #EAE4DC',padding:'8px 0',height:'fit-content' }}>
            {[{k:'orders',label:'Siparişlerim'},{k:'account',label:'Hesap Bilgileri'},{k:'address',label:'Adres Defterim'},{k:'favorites',label:'Favorilerim'}].map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k)} style={{ display:'block',width:'100%',padding:'12px 20px',border:'none',borderLeft:`3px solid ${tab===t.k?'#B89565':'transparent'}`,background:tab===t.k?'#FAF8F4':'none',fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:tab===t.k?'#B89565':'#6F6A64',cursor:'pointer',textAlign:'left',textTransform:'uppercase',letterSpacing:'.06em' }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {tab==='orders' && (
              <div>
                <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:17,fontWeight:600,color:'#1F1F1F',marginBottom:18 }}>Siparişlerim</h2>
                <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                  {MOCK_ORDERS.map(o=>(
                    <div key={o.id} style={{ background:'#fff',border:'1px solid #EAE4DC',padding:'18px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16 }}>
                      <div>
                        <p style={{ fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#6F6A64',marginBottom:4 }}>{o.date}</p>
                        <p style={{ fontSize:13,fontWeight:600,color:'#1F1F1F',marginBottom:4 }}>{o.id}</p>
                        <p style={{ fontSize:12,color:'#6F6A64' }}>{o.items.join(', ')}</p>
                      </div>
                      <div style={{ display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8,flexShrink:0 }}>
                        <StatusBadge status={o.status}/>
                        <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:16,fontWeight:600,color:'#B89565',margin:0 }}>{fmt(o.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab==='account' && (
              <div>
                <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:17,fontWeight:600,color:'#1F1F1F',marginBottom:18 }}>Hesap Bilgileri</h2>
                <div style={{ background:'#fff',border:'1px solid #EAE4DC',padding:'28px' }}>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
                    <InputField label="Ad Soyad" value={form.name} onChange={setF('name')}/>
                    <InputField label="E-posta" type="email" value={form.email} onChange={setF('email')}/>
                    <InputField label="Telefon" placeholder="+90 5XX XXX XX XX" value={form.phone} onChange={setF('phone')}/>
                    <InputField label="Şehir" value={form.city} onChange={setF('city')}/>
                  </div>
                  <button style={{ marginTop:8,background:'#B89565',border:'none',padding:'12px 32px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#fff',cursor:'pointer' }}>Kaydet</button>
                </div>
              </div>
            )}
            {tab==='address' && (
              <div>
                <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:17,fontWeight:600,color:'#1F1F1F',marginBottom:18 }}>Adres Defterim</h2>
                <div style={{ background:'#fff',border:'1px solid #EAE4DC',padding:'28px' }}>
                  <InputField label="Tam Adres" placeholder="Mahalle, sokak, daire no…" value={form.address} onChange={setF('address')}/>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
                    <InputField label="İlçe" placeholder="İlçeniz" value="" onChange={()=>{}}/>
                    <InputField label="Şehir" value={form.city} onChange={setF('city')}/>
                    <InputField label="Posta Kodu" placeholder="34XXX" value="" onChange={()=>{}}/>
                  </div>
                  <button style={{ marginTop:8,background:'#B89565',border:'none',padding:'12px 32px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#fff',cursor:'pointer' }}>Kaydet</button>
                </div>
              </div>
            )}
            {tab==='favorites' && (
              <div>
                <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:17,fontWeight:600,color:'#1F1F1F',marginBottom:18 }}>Favorilerim</h2>
                <div style={{ background:'#fff',border:'1px solid #EAE4DC',padding:'48px',textAlign:'center' }}>
                  <p style={{ fontSize:13,color:'#6F6A64' }}>Henüz favori ürün eklemediniz.</p>
                  <button onClick={()=>onNavigate('home')} style={{ marginTop:16,background:'#1F1F1F',border:'none',padding:'11px 28px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#fff',cursor:'pointer' }}>Alışverişe Başla</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginPage, RegisterPage, ProfilePage });
