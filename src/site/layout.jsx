// site/layout.jsx — Header, NavBar, Footer, CartDrawer, DrawerMenu

const { useState, useEffect } = React;

/* ── Shared icon helpers ── */
function Icon({ d, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {Array.isArray(d) ? d.map((p,i) => <path key={i} d={p}/>) : <path d={d}/>}
    </svg>
  );
}
const ICONS = {
  menu:   ['M3 6h18','M3 12h18','M3 18h18'],
  search: ['M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0','M21 21l-4.35-4.35'],
  user:   ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2','M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8'],
  heart:  ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'],
  bag:    ['M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z','M3 6h18','M16 10a4 4 0 01-8 0'],
  x:      ['M18 6L6 18','M6 6l12 12'],
  trash:  ['M3 6h18','M19 6l-1 14H6L5 6','M10 11v6','M14 11v6','M9 6V4h6v2'],
  plus:   ['M12 5v14','M5 12h14'],
  minus:  ['M5 12h14'],
  arrow:  ['M5 12h14','M12 5l7 7-7 7'],
  chevR:  ['M9 18l6-6-6-6'],
  chevL:  ['M15 18l-6-6 6-6'],
  chevD:  ['M6 9l6 6 6-6'],
};
function Ico({ name, size=20, style }) {
  const d = ICONS[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      {(Array.isArray(d)?d:[d]).map((p,i)=><path key={i} d={p}/>)}
    </svg>
  );
}

/* ── Header ── */
function Header({ cartCount, onCartOpen, onMenuOpen, onNavigate }) {
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (q.trim()) { onNavigate('search', { q: q.trim() }); setQ(''); setSearchOpen(false); }
  }

  return (
    <header style={{ position:'sticky',top:0,zIndex:40,borderBottom:'1px solid #EAE4DC',background:'rgba(255,255,255,0.96)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)' }}>
      <div style={{ maxWidth:1280,margin:'0 auto',display:'flex',alignItems:'center',gap:20,padding:'13px 20px' }}>
        {/* Menu + Logo */}
        <div style={{ display:'flex',alignItems:'center',gap:14,flexShrink:0 }}>
          <button onClick={onMenuOpen} style={iconBtnSt} aria-label="Menü">
            <Ico name="menu" size={22}/>
            <span style={{ fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',color:'#6F6A64' }}>Menu</span>
          </button>
          <button onClick={()=>onNavigate('home')} style={{ background:'none',border:'none',cursor:'pointer',fontFamily:"'Poppins',sans-serif",fontSize:27,fontWeight:700,letterSpacing:'.12em',color:'#1F1F1F',padding:0,lineHeight:1 }}>
            GARİP
          </button>
        </div>
        {/* Search */}
        <form onSubmit={submit} style={{ flex:1,display:'flex',border:'1px solid #EAE4DC',background:'#FAF8F4',minWidth:0 }}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ürün, kategori veya marka ara…"
            style={{ flex:1,border:'none',background:'transparent',padding:'9px 14px',fontFamily:"'Inter',sans-serif",fontSize:12,outline:'none',color:'#1F1F1F',minWidth:0 }}/>
          <button type="submit" style={{ border:'none',borderLeft:'1px solid #EAE4DC',background:'none',padding:'0 13px',color:'#6F6A64',cursor:'pointer',flexShrink:0 }}>
            <Ico name="search" size={15}/>
          </button>
        </form>
        {/* Icons */}
        <div style={{ display:'flex',alignItems:'center',gap:2,flexShrink:0 }}>
          <button onClick={()=>onNavigate('profile')} style={iconBtnSt}><Ico name="user" size={20}/></button>
          <button style={iconBtnSt}><Ico name="heart" size={20}/></button>
          <button onClick={onCartOpen} style={{ ...iconBtnSt,position:'relative' }}>
            <Ico name="bag" size={20}/>
            {cartCount>0 && <span style={{ position:'absolute',top:2,right:2,background:'#B89565',color:'#fff',fontSize:9,fontWeight:700,padding:'1px 4px',minWidth:16,textAlign:'center',lineHeight:'14px' }}>{cartCount>99?'99+':cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
const iconBtnSt = { width:38,height:38,display:'flex',alignItems:'center',justifyContent:'center',background:'none',border:'none',cursor:'pointer',color:'#1F1F1F',fontFamily:"'Inter',sans-serif",gap:6,flexShrink:0 };

/* ── NavBar ── */
function NavBar({ activeCategorySlug, onNavigate }) {
  const all = [{ slug:null,name:'★ Tüm Ürünler' }, ...CATEGORIES];
  return (
    <nav style={{ background:'#fff',borderBottom:'1px solid #EAE4DC' }}>
      <div style={{ maxWidth:1280,margin:'0 auto',padding:'0 20px',display:'flex',alignItems:'center',height:44,overflowX:'auto',scrollbarWidth:'none' }}>
        {all.map(cat=>{
          const active = cat.slug===activeCategorySlug || (cat.slug===null && activeCategorySlug===null);
          return (
            <button key={cat.slug??'all'} onClick={()=>onNavigate(cat.slug?'category':'home',{slug:cat.slug})}
              style={{ display:'inline-flex',alignItems:'center',height:44,padding:'0 14px',fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',color:'#1F1F1F',background:'none',border:'none',borderBottom:`2px solid ${active?'#B89565':'transparent'}`,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0,fontFamily:"'Inter',sans-serif" }}>
              {cat.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ── Footer ── */
function Footer({ onNavigate }) {
  return (
    <footer style={{ borderTop:'1px solid #EAE4DC',background:'#fff' }}>
      <div style={{ maxWidth:1280,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:40,padding:'48px 20px' }}>
        <div>
          <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:18,fontWeight:500,color:'#1F1F1F',marginBottom:12 }}>Garip Ticaret</p>
          <p style={{ fontSize:12,lineHeight:1.7,color:'#6F6A64' }}>Türkiye'nin seçkin ev ve mutfak ürünleri mağazası. Özenle seçilmiş koleksiyonlar, güvenli alışveriş ve hızlı teslimat.</p>
        </div>
        {[
          { t:'Kurumsal',          links:['Hakkımızda','İletişim','Mağazalar','Kariyer'] },
          { t:'Müşteri Hizmetleri',links:['İade ve Değişim','Kargo Bilgisi','Sık Sorulan Sorular','Garanti'] },
        ].map(col=>(
          <div key={col.t}>
            <p style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:'#1F1F1F',marginBottom:14 }}>{col.t}</p>
            <ul style={{ display:'flex',flexDirection:'column',gap:9,listStyle:'none',padding:0,margin:0 }}>
              {col.links.map(l=><li key={l}><a href="#" onClick={e=>e.preventDefault()} style={{ fontSize:12,color:'#6F6A64',textDecoration:'none' }}>{l}</a></li>)}
            </ul>
          </div>
        ))}
        <div>
          <p style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:'#1F1F1F',marginBottom:14 }}>Bülten</p>
          <p style={{ fontSize:12,color:'#6F6A64',marginBottom:14,lineHeight:1.6 }}>Yeni koleksiyon ve kampanyalardan haberdar olun.</p>
          <form onSubmit={e=>e.preventDefault()} style={{ display:'flex',border:'1px solid #EAE4DC' }}>
            <input type="email" placeholder="E-posta adresiniz" style={{ flex:1,border:'none',background:'#FAF8F4',padding:'9px 12px',fontFamily:"'Inter',sans-serif",fontSize:12,outline:'none',color:'#1F1F1F',minWidth:0 }}/>
            <button type="submit" style={{ background:'#1F1F1F',border:'none',padding:'0 14px',fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',color:'#fff',cursor:'pointer',whiteSpace:'nowrap' }}>Kayıt</button>
          </form>
        </div>
      </div>
      <div style={{ borderTop:'1px solid #EAE4DC',padding:'13px 20px',textAlign:'center',fontSize:11,color:'#6F6A64' }}>
        © {new Date().getFullYear()} Garip Ticaret. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

/* ── CartDrawer ── */
function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQty }) {
  useEffect(()=>{
    function k(e){ if(e.key==='Escape'&&isOpen) onClose(); }
    window.addEventListener('keydown',k);
    return ()=>window.removeEventListener('keydown',k);
  },[isOpen,onClose]);

  const total = items.reduce((s,i)=>s+(i.product.discountPrice??i.product.price)*i.qty,0);
  const totalQty = items.reduce((s,i)=>s+i.qty,0);

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed',inset:0,zIndex:50,background:'rgba(0,0,0,.55)',backdropFilter:'blur(4px)',opacity:isOpen?1:0,pointerEvents:isOpen?'auto':'none',transition:'opacity .35s' }}/>
      <aside role="dialog" aria-modal="true" style={{ position:'fixed',inset:'0 0 0 auto',zIndex:51,width:'100%',maxWidth:430,background:'#fff',display:'flex',flexDirection:'column',boxShadow:'0 25px 50px -12px rgba(0,0,0,.25)',transform:isOpen?'translateX(0)':'translateX(100%)',transition:'transform .45s cubic-bezier(.2,.8,.2,1)' }}>
        {/* header */}
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #EAE4DC',padding:'17px 24px',flexShrink:0 }}>
          <div style={{ display:'flex',alignItems:'center',gap:10 }}>
            <Ico name="bag" size={22}/>
            <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:17,fontWeight:600,color:'#1F1F1F',margin:0 }}>Sepetim ({totalQty})</h2>
          </div>
          <button onClick={onClose} style={{ width:36,height:36,borderRadius:'50%',background:'#FAF8F4',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#6F6A64' }}><Ico name="x" size={16}/></button>
        </div>
        {/* items */}
        <div style={{ flex:1,overflowY:'auto',padding:'16px 24px' }}>
          {items.length===0?(
            <div style={{ height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'64px 0' }}>
              <Ico name="bag" size={52} style={{ color:'#EAE4DC' }}/>
              <h3 style={{ marginTop:18,fontFamily:"'Poppins',sans-serif",fontSize:18,fontWeight:500,color:'#1F1F1F' }}>Sepetiniz Boş</h3>
              <p style={{ marginTop:8,fontSize:12,color:'#6F6A64',lineHeight:1.65,maxWidth:240 }}>Garip Ticaret koleksiyonlarını keşfetmek için alışverişe başlayın.</p>
              <button onClick={onClose} style={{ marginTop:24,border:'1px solid #1F1F1F',padding:'10px 28px',background:'none',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.12em',color:'#1F1F1F',cursor:'pointer' }}>Alışverişe Başla</button>
            </div>
          ):(
            <div style={{ display:'flex',flexDirection:'column',gap:22 }}>
              {items.map(item=>{
                const price = item.product.discountPrice??item.product.price;
                return (
                  <div key={item.product.id} style={{ display:'flex',gap:14 }}>
                    <div style={{ width:84,height:104,borderRadius:4,overflow:'hidden',background:'#FAF8F4',flexShrink:0 }}>
                      <img src={item.product.image} alt={item.product.name} style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
                    </div>
                    <div style={{ flex:1,display:'flex',flexDirection:'column',padding:'2px 0',minWidth:0 }}>
                      <div style={{ display:'flex',justifyContent:'space-between',gap:8,alignItems:'flex-start' }}>
                        <div style={{ minWidth:0 }}>
                          <p style={{ fontSize:9,fontWeight:600,textTransform:'uppercase',letterSpacing:'.15em',color:'#6F6A64',marginBottom:4 }}>{item.product.category}</p>
                          <p style={{ fontSize:12,fontWeight:500,lineHeight:1.4,color:'#1F1F1F',overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical' }}>{item.product.name}</p>
                        </div>
                        <button onClick={()=>onRemove(item.product.id)} style={{ background:'none',border:'none',cursor:'pointer',color:'#bbb',padding:2,flexShrink:0 }}><Ico name="trash" size={13}/></button>
                      </div>
                      <div style={{ marginTop:'auto',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                        <div style={{ display:'flex',alignItems:'center',border:'1px solid #EAE4DC',padding:'3px 8px',gap:10 }}>
                          <button onClick={()=>onUpdateQty(item.product.id,item.qty-1)} disabled={item.qty<=1} style={{ background:'none',border:'none',cursor:'pointer',color:'#1F1F1F',padding:2,opacity:item.qty<=1?.4:1 }}><Ico name="minus" size={11}/></button>
                          <span style={{ fontSize:13,fontWeight:500,width:18,textAlign:'center' }}>{item.qty}</span>
                          <button onClick={()=>onUpdateQty(item.product.id,item.qty+1)} style={{ background:'none',border:'none',cursor:'pointer',color:'#1F1F1F',padding:2 }}><Ico name="plus" size={11}/></button>
                        </div>
                        <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:15,fontWeight:500,color:'#B89565' }}>{fmt(price*item.qty)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* footer */}
        {items.length>0 && (
          <div style={{ borderTop:'1px solid #EAE4DC',background:'#FAF8F4',padding:24,flexShrink:0 }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6 }}>
              <span style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em' }}>Ara Toplam</span>
              <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:22,fontWeight:600,color:'#1F1F1F' }}>{fmt(total)}</span>
            </div>
            <p style={{ fontSize:11,color:'#6F6A64',marginBottom:18 }}>Kargo ve vergiler ödeme adımında eklenecektir.</p>
            <button style={{ width:'100%',background:'#B89565',border:'none',padding:'14px 0',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8 }}>
              Satın Almaya Devam Et <Ico name="arrow" size={16}/>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

/* ── DrawerMenu ── */
function DrawerMenu({ isOpen, onClose, onNavigate }) {
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed',inset:0,zIndex:60,background:'rgba(0,0,0,.3)',backdropFilter:'blur(3px)',opacity:isOpen?1:0,pointerEvents:isOpen?'auto':'none',transition:'opacity .3s' }}/>
      <aside style={{ position:'fixed',left:0,top:0,zIndex:70,width:340,height:'100%',background:'#fff',overflowY:'auto',display:'flex',flexDirection:'column',boxShadow:'0 25px 50px -12px rgba(0,0,0,.2)',transform:isOpen?'translateX(0)':'translateX(-100%)',transition:'transform .38s cubic-bezier(.25,1,.5,1)' }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #EAE4DC',padding:'17px 24px',flexShrink:0 }}>
          <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:17,fontWeight:700,letterSpacing:'.1em',color:'#1F1F1F' }}>MENU</span>
          <button onClick={onClose} style={{ width:36,height:36,borderRadius:'50%',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#6F6A64' }}><Ico name="x" size={18}/></button>
        </div>
        <nav style={{ flex:1,padding:'8px 24px 32px' }}>
          <ul style={{ listStyle:'none',padding:0,margin:0 }}>
            <li>
              <button onClick={()=>{onNavigate('home');onClose();}} style={menuItemSt}>★ Ana Sayfa</button>
            </li>
            {CATEGORIES.map(cat=>(
              <li key={cat.slug}>
                <button onClick={()=>{onNavigate('category',{slug:cat.slug});onClose();}} style={{ ...menuItemSt,display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%' }}>
                  <span>{cat.name}</span>
                  <Ico name="chevR" size={16} style={{ color:'#6F6A64' }}/>
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop:24,paddingTop:24,borderTop:'1px solid #EAE4DC' }}>
            <button onClick={()=>{onNavigate('login');onClose();}} style={{ display:'block',width:'100%',padding:'12px 0',fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',background:'#1F1F1F',color:'#fff',border:'none',cursor:'pointer',marginBottom:10 }}>Giriş Yap</button>
            <button onClick={()=>{onNavigate('register');onClose();}} style={{ display:'block',width:'100%',padding:'11px 0',fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',background:'none',color:'#1F1F1F',border:'1px solid #EAE4DC',cursor:'pointer' }}>Üye Ol</button>
          </div>
        </nav>
      </aside>
    </>
  );
}
const menuItemSt = { display:'block',width:'100%',padding:'14px 0',borderBottom:'1px solid #EAE4DC',fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,textTransform:'uppercase',letterSpacing:'.05em',color:'#1F1F1F',background:'none',border:'none',borderBottom:'1px solid #EAE4DC',cursor:'pointer',textAlign:'left' };

Object.assign(window, { Header, NavBar, Footer, CartDrawer, DrawerMenu, Ico, ICONS, iconBtnSt });
