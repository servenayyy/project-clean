// site/home-page.jsx

const { useState, useEffect, useRef } = React;

const HERO = [
  { title:'El Yapımı Seramik ve Ahşap Dokunuşlar', sub:'Mutfak ve sofranıza sıcaklık katan doğal malzemeler, sınırlı stok kampanyasıyla bu hafta Garip Ticaret\'te.', cta:'Kampanyayı İncele', ctaSlug:'mutfak', image:'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1600&auto=format&fit=crop' },
  { title:'Sofrada Zamansız Zarafet', sub:'Porselen ve cam ürünlerde seçili koleksiyonlarda özel fiyatlar. Hediye paketi ve ücretsiz kargo ayrıcalığı.', cta:'Sofra Koleksiyonu', ctaSlug:'sofra', image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop' },
  { title:'Premium Ev Kokusu & Dekor', sub:'Doğal esanslar ve minimalist objelerle evinize derinlik katın. Stoklar tükenmeden keşfedin.', cta:'Dekoru Keşfet', ctaSlug:'dekor', image:'https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=1600&auto=format&fit=crop' },
];

const FEATURES = [
  { icon:'🚚', label:'Ücretsiz Kargo', sub:'500₺ ve üzeri siparişlerde' },
  { icon:'↩', label:'Kolay İade', sub:'30 gün içinde ücretsiz iade' },
  { icon:'🔒', label:'Güvenli Ödeme', sub:'256-bit SSL şifreleme' },
  { icon:'🎁', label:'Hediye Paketi', sub:'Ücretsiz özel paketleme' },
];

function HeroBanner({ onNavigate }) {
  const [slide, setSlide] = useState(0);
  const [hov, setHov] = useState(false);
  const timerRef = useRef(null);
  const s = HERO[slide];

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(v => (v+1)%HERO.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  function go(dir) {
    clearInterval(timerRef.current);
    setSlide(v => dir==='prev' ? (v===0?HERO.length-1:v-1) : (v===HERO.length-1?0:v+1));
    timerRef.current = setInterval(() => setSlide(v => (v+1)%HERO.length), 5000);
  }

  return (
    <section onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ position:'relative', height:520, overflow:'hidden', background:'#1F1F1F' }}>
      {HERO.map((sl,i)=>(
        <div key={i} style={{ position:'absolute',inset:0,transition:'opacity .8s',opacity:i===slide?1:0,pointerEvents:i===slide?'auto':'none' }}>
          <img src={sl.image} alt={sl.title} style={{ width:'100%',height:'100%',objectFit:'cover',transform:'scale(1.04)' }}/>
          <div style={{ position:'absolute',inset:0,background:'linear-gradient(to right, rgba(0,0,0,.6) 0%, rgba(0,0,0,.15) 65%, transparent 100%)' }}/>
        </div>
      ))}
      <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',padding:'0 80px',maxWidth:1280,left:'50%',transform:'translateX(-50%)',width:'100%',pointerEvents:'none' }}>
        <div style={{ maxWidth:520, pointerEvents:'auto' }}>
          <p style={{ fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.2em',color:'rgba(255,255,255,.6)',marginBottom:14 }}>Koleksiyon 2026</p>
          <h1 style={{ fontFamily:"'Poppins',sans-serif",fontSize:38,fontWeight:600,color:'#fff',lineHeight:1.2,margin:'0 0 16px',textWrap:'balance' }}>{s.title}</h1>
          <p style={{ fontSize:14,color:'rgba(255,255,255,.8)',lineHeight:1.7,marginBottom:28 }}>{s.sub}</p>
          <button onClick={()=>onNavigate('category',{slug:s.ctaSlug})}
            style={{ background:'#B89565',border:'none',padding:'13px 32px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:'#fff',cursor:'pointer' }}>
            {s.cta}
          </button>
        </div>
      </div>
      {/* Arrows */}
      {['prev','next'].map(dir=>(
        <button key={dir} onClick={()=>go(dir)} style={{ position:'absolute',top:'50%',[dir==='prev'?'left':'right']:24,transform:'translateY(-50%)',width:46,height:46,borderRadius:'50%',background:'rgba(255,255,255,.18)',backdropFilter:'blur(8px)',border:'none',cursor:'pointer',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',opacity:hov?1:0,transition:'opacity .3s',zIndex:2 }}>
          <Ico name={dir==='prev'?'chevL':'chevR'} size={20}/>
        </button>
      ))}
      {/* Dots */}
      <div style={{ position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',display:'flex',gap:8,zIndex:2 }}>
        {HERO.map((_,i)=>(
          <button key={i} onClick={()=>setSlide(i)} style={{ height:8,width:i===slide?28:8,borderRadius:9999,background:i===slide?'#B89565':'rgba(255,255,255,.45)',border:'none',cursor:'pointer',transition:'all .35s',padding:0 }}/>
        ))}
      </div>
    </section>
  );
}

function FeaturesBar() {
  return (
    <div style={{ background:'#fff',borderBottom:'1px solid #EAE4DC' }}>
      <div style={{ maxWidth:1280,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)' }}>
        {FEATURES.map((f,i)=>(
          <div key={i} style={{ display:'flex',alignItems:'center',gap:12,padding:'16px 24px',borderRight:i<3?'1px solid #EAE4DC':'none' }}>
            <span style={{ fontSize:22,lineHeight:1 }}>{f.icon}</span>
            <div>
              <p style={{ fontSize:11,fontWeight:700,color:'#1F1F1F',margin:0 }}>{f.label}</p>
              <p style={{ fontSize:11,color:'#6F6A64',margin:'2px 0 0' }}>{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, onSeeAll }) {
  return (
    <div style={{ display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:28 }}>
      <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:22,fontWeight:500,color:'#1F1F1F',margin:0 }}>{title}</h2>
      {onSeeAll && <button onClick={onSeeAll} style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',color:'#B89565',background:'none',border:'none',cursor:'pointer',fontFamily:"'Inter',sans-serif" }}>Tümünü Gör →</button>}
    </div>
  );
}

function ProductCard({ product, onAddToCart, onDetail }) {
  const [fav, setFav] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={()=>onDetail(product)}
      style={{ background:'#fff',borderRadius:12,overflow:'hidden',boxShadow:hov?'0 20px 30px -8px rgba(0,0,0,.1)':'0 1px 3px rgba(0,0,0,.06)',transform:hov?'translateY(-5px)':'none',transition:'all .3s',cursor:'pointer',display:'flex',flexDirection:'column' }}>
      <div style={{ position:'relative',height:260,background:'#FAF8F4',overflow:'hidden',flexShrink:0 }}>
        <img src={product.image} alt={product.name} style={{ width:'100%',height:'100%',objectFit:'cover',transition:'transform .5s',transform:hov?'scale(1.06)':'scale(1)' }}/>
        {product.isDiscounted && <span style={{ position:'absolute',top:10,left:10,background:'#B89565',color:'#fff',fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',padding:'3px 8px',borderRadius:3 }}>%{product.discountPercent} İNDİRİM</span>}
        {product.isNew && !product.isDiscounted && <span style={{ position:'absolute',top:10,left:10,background:'#1F1F1F',color:'#fff',fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',padding:'3px 8px',borderRadius:3 }}>YENİ</span>}
        <button onClick={e=>{e.stopPropagation();setFav(v=>!v);}} style={{ position:'absolute',top:10,right:10,width:32,height:32,borderRadius:'50%',background:'rgba(255,255,255,.9)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 1px 3px rgba(0,0,0,.12)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={fav?'#B89565':'none'} stroke={fav?'#B89565':'#1F1F1F'} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button onClick={e=>{e.stopPropagation();onAddToCart(product);}} style={{ position:'absolute',bottom:10,right:10,width:40,height:40,borderRadius:'50%',background:'#1F1F1F',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',opacity:hov?1:0,transition:'opacity .25s',boxShadow:'0 2px 8px rgba(0,0,0,.2)' }}
          onMouseEnter={e=>e.currentTarget.style.background='#B89565'} onMouseLeave={e=>e.currentTarget.style.background='#1F1F1F'}>
          <Ico name="bag" size={16}/>
        </button>
      </div>
      <div style={{ padding:'14px 16px',flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
        <div>
          <p style={{ fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'.15em',color:'#6F6A64',margin:'0 0 5px' }}>{product.category}</p>
          <h3 style={{ fontSize:12,lineHeight:1.45,color:hov?'#B89565':'#1F1F1F',margin:0,transition:'color .2s',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden' }}>{product.name}</h3>
        </div>
        <div style={{ display:'flex',alignItems:'baseline',gap:8,marginTop:10 }}>
          {product.isDiscounted ? (<>
            <span style={{ fontSize:11,color:'#6F6A64',textDecoration:'line-through' }}>{fmt(product.price)}</span>
            <span style={{ fontSize:15,fontWeight:600,color:'#B89565',fontFamily:"'Poppins',sans-serif" }}>{fmt(product.discountPrice)}</span>
          </>) : (
            <span style={{ fontSize:15,fontWeight:500,color:'#1F1F1F',fontFamily:"'Poppins',sans-serif" }}>{fmt(product.price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductGrid({ products, onAddToCart, onDetail, cols=4 }) {
  return (
    <div style={{ display:'grid',gridTemplateColumns:`repeat(${cols},1fr)`,gap:20 }}>
      {products.map(p=><ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onDetail={onDetail}/>)}
    </div>
  );
}

function CategoriesRow({ onNavigate }) {
  const CAT_IMGS = {
    'mutfak':'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop',
    'sofra':'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400&auto=format&fit=crop',
    'banyo':'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop',
    'dekor':'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&auto=format&fit=crop',
    'ceyiz-paketleri':'https://images.unsplash.com/photo-1606214538804-bd9fcc2f46b4?w=400&auto=format&fit=crop',
  };
  return (
    <div style={{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:14 }}>
      {CATEGORIES.filter(c=>c.slug!=='yeni-gelenler').map(cat=>(
        <button key={cat.slug} onClick={()=>onNavigate('category',{slug:cat.slug})}
          style={{ position:'relative',height:180,overflow:'hidden',borderRadius:8,cursor:'pointer',border:'none',padding:0,background:'#1F1F1F' }}
          onMouseEnter={e=>{e.currentTarget.querySelector('img').style.transform='scale(1.08)';}} onMouseLeave={e=>{e.currentTarget.querySelector('img').style.transform='scale(1)';}}>
          <img src={CAT_IMGS[cat.slug]||''} alt={cat.name} style={{ width:'100%',height:'100%',objectFit:'cover',opacity:.75,transition:'transform .4s' }}/>
          <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 60%)' }}/>
          <span style={{ position:'absolute',bottom:14,left:0,right:0,textAlign:'center',fontFamily:"'Poppins',sans-serif",fontSize:13,fontWeight:600,color:'#fff',letterSpacing:'.05em' }}>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}

function DowryCard({ pkg }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:'#fff',borderRadius:16,padding:20,border:'1px solid rgba(234,228,220,.6)',boxShadow:hov?'0 20px 30px -8px rgba(0,0,0,.1)':'0 1px 3px rgba(0,0,0,.06)',transform:hov?'translateY(-4px)':'none',transition:'all .3s',display:'flex',flexDirection:'column' }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20 }}>
        <h3 style={{ fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:700,color:'#1F1F1F',margin:0 }}>{pkg.title}</h3>
        <span style={{ background:'#189643',color:'#fff',fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'.06em',padding:'4px 10px',borderRadius:9999,whiteSpace:'nowrap' }}>{pkg.badge}</span>
      </div>
      <div style={{ position:'relative',borderRadius:12,background:'rgba(240,235,227,.35)',padding:'16px 12px',marginBottom:16 }}>
        <p style={{ position:'absolute',top:12,left:0,right:0,textAlign:'center',fontFamily:"'Poppins',sans-serif",fontSize:11,fontWeight:700,letterSpacing:'.15em',color:'#1F1F1F',opacity:.12,textTransform:'uppercase' }}>{pkg.title.toUpperCase()}</p>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:36,position:'relative',zIndex:1 }}>
          {pkg.images.map((img,i)=>(
            <div key={i} style={{ aspectRatio:'1/2',borderRadius:6,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.1)' }}>
              <img src={img} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',transition:'transform .4s',transform:hov?'scale(1.05)':'scale(1)' }}/>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop:'auto' }}>
        <p style={{ fontSize:18,fontWeight:600,fontFamily:"'Poppins',sans-serif",color:'#B89565',margin:'0 0 12px' }}>{fmt(pkg.price)}</p>
        <button style={{ width:'100%',background:'#1F1F1F',border:'none',borderRadius:8,padding:'12px 0',fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:'#fff',cursor:'pointer',letterSpacing:'.04em' }}>
          Çeyiz Paketini Oluştur
        </button>
        <p style={{ fontSize:11,color:'#6F6A64',margin:'10px 0 0',textAlign:'center' }}>{pkg.date}</p>
      </div>
    </div>
  );
}

function HomePage({ onAddToCart, onNavigate }) {
  const newArrivals = PRODUCTS.filter(p=>p.isNew).slice(0,4);
  const discounted  = PRODUCTS.filter(p=>p.isDiscounted).slice(0,4);
  const featured    = PRODUCTS.filter(p=>p.isFeatured).slice(0,4);

  function goDetail(p) { onNavigate('detail',{product:p}); }

  return (
    <div style={{ background:'#FAF8F4' }}>
      <HeroBanner onNavigate={onNavigate}/>
      <FeaturesBar/>

      {/* Categories */}
      <section style={{ padding:'56px 20px',background:'#FAF8F4' }}>
        <div style={{ maxWidth:1280,margin:'0 auto' }}>
          <SectionHeader title="Kategoriler" onSeeAll={()=>onNavigate('home')}/>
          <CategoriesRow onNavigate={onNavigate}/>
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ padding:'0 20px 56px',background:'#FAF8F4' }}>
        <div style={{ maxWidth:1280,margin:'0 auto' }}>
          <SectionHeader title="Yeni Gelenler" onSeeAll={()=>onNavigate('category',{slug:'yeni-gelenler'})}/>
          <ProductGrid products={newArrivals} onAddToCart={onAddToCart} onDetail={goDetail}/>
        </div>
      </section>

      {/* Full-bleed promo banner */}
      <div style={{ position:'relative',height:320,overflow:'hidden',background:'#1F1F1F',margin:'0 0 0' }}>
        <img src="https://images.unsplash.com/photo-1615874959474-d609969a9928?q=80&w=1600&auto=format&fit=crop" alt="" style={{ width:'100%',height:'100%',objectFit:'cover',opacity:.45 }}/>
        <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'0 24px' }}>
          <p style={{ fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.25em',color:'#B89565',marginBottom:12 }}>Özel Kampanya</p>
          <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:34,fontWeight:600,color:'#fff',margin:'0 0 20px',lineHeight:1.2 }}>Seçili Ürünlerde %25'e Varan İndirim</h2>
          <button onClick={()=>onNavigate('category',{slug:'mutfak',filter:'discounted'})} style={{ background:'#B89565',border:'none',padding:'12px 32px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:'#fff',cursor:'pointer' }}>İndirimleri Keşfet</button>
        </div>
      </div>

      {/* Discounted */}
      <section style={{ padding:'56px 20px',background:'#fff',borderTop:'1px solid #EAE4DC' }}>
        <div style={{ maxWidth:1280,margin:'0 auto' }}>
          <SectionHeader title="İndirimli Ürünler" onSeeAll={()=>onNavigate('category',{slug:'mutfak'})}/>
          <ProductGrid products={discounted} onAddToCart={onAddToCart} onDetail={goDetail}/>
        </div>
      </section>

      {/* Dowry */}
      <section style={{ padding:'56px 20px',background:'#FAF8F4' }}>
        <div style={{ maxWidth:1280,margin:'0 auto' }}>
          <SectionHeader title="Çeyiz Paketleri" onSeeAll={()=>onNavigate('category',{slug:'ceyiz-paketleri'})}/>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24 }}>
            {DOWRY_PACKAGES.map(p=><DowryCard key={p.id} pkg={p}/>)}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage, ProductCard, ProductGrid });
