// site/shop-pages.jsx — CategoryPage, ProductDetailPage, SearchPage

const { useState, useEffect } = React;

/* ── Category Page ── */
function CategoryPage({ slug, onAddToCart, onNavigate }) {
  const [filter, setFilter] = useState('all'); // all | new | discounted
  const [sort, setSort] = useState('default');

  const cat = CATEGORIES.find(c=>c.slug===slug);
  const isAll = !slug || slug==='yeni-gelenler';

  let products = slug==='yeni-gelenler'
    ? PRODUCTS.filter(p=>p.isNew)
    : PRODUCTS.filter(p=>!slug || p.categorySlug===slug);

  if (filter==='new')        products = products.filter(p=>p.isNew);
  if (filter==='discounted') products = products.filter(p=>p.isDiscounted);
  if (sort==='price-asc')    products = [...products].sort((a,b)=>(a.discountPrice??a.price)-(b.discountPrice??b.price));
  if (sort==='price-desc')   products = [...products].sort((a,b)=>(b.discountPrice??b.price)-(a.discountPrice??a.price));

  function goDetail(p){ onNavigate('detail',{product:p}); }

  return (
    <div style={{ background:'#FAF8F4',minHeight:'60vh' }}>
      {/* Category Header */}
      <div style={{ background:'#1F1F1F',padding:'40px 20px 36px' }}>
        <div style={{ maxWidth:1280,margin:'0 auto' }}>
          <nav style={{ fontSize:11,color:'rgba(255,255,255,.5)',marginBottom:10,display:'flex',gap:6,alignItems:'center' }}>
            <button onClick={()=>onNavigate('home')} style={{ background:'none',border:'none',color:'rgba(255,255,255,.5)',cursor:'pointer',fontSize:11,fontFamily:"'Inter',sans-serif" }}>Ana Sayfa</button>
            <span>›</span>
            <span style={{ color:'rgba(255,255,255,.8)' }}>{cat?.name||'Tüm Ürünler'}</span>
          </nav>
          <h1 style={{ fontFamily:"'Poppins',sans-serif",fontSize:32,fontWeight:600,color:'#fff',margin:0 }}>{cat?.name||'Tüm Ürünler'}</h1>
          <p style={{ fontSize:12,color:'rgba(255,255,255,.55)',marginTop:8 }}>{products.length} ürün</p>
        </div>
      </div>

      <div style={{ maxWidth:1280,margin:'0 auto',padding:'28px 20px 56px' }}>
        {/* Filter & Sort Bar */}
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:28,flexWrap:'wrap',gap:12 }}>
          <div style={{ display:'flex',gap:8 }}>
            {[{k:'all',label:'Tümü'},{k:'new',label:'Yeni Gelenler'},{k:'discounted',label:'İndirimli'}].map(f=>(
              <button key={f.k} onClick={()=>setFilter(f.k)}
                style={{ padding:'7px 16px',border:`1px solid ${filter===f.k?'#1F1F1F':'#EAE4DC'}`,background:filter===f.k?'#1F1F1F':'transparent',color:filter===f.k?'#fff':'#1F1F1F',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',cursor:'pointer' }}>
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            <span style={{ fontSize:11,color:'#6F6A64',fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em' }}>Sırala:</span>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{ border:'1px solid #EAE4DC',background:'#fff',padding:'7px 28px 7px 12px',fontFamily:"'Inter',sans-serif",fontSize:11,color:'#1F1F1F',outline:'none',cursor:'pointer',WebkitAppearance:'none',appearance:'none',backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236F6A64' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",backgroundRepeat:'no-repeat',backgroundPosition:'right 8px center' }}>
              <option value="default">Varsayılan</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            </select>
          </div>
        </div>

        {products.length===0 ? (
          <div style={{ textAlign:'center',padding:'80px 0' }}>
            <p style={{ fontSize:14,color:'#6F6A64' }}>Bu kategoride ürün bulunamadı.</p>
          </div>
        ) : (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20 }}>
            {products.map(p=><ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onDetail={goDetail}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Product Detail Page ── */
function ProductDetailPage({ product, onAddToCart, onNavigate }) {
  const [activeImg, setActiveImg] = useState(product.images?.[0]||product.image);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const discounted = product.isDiscounted && product.discountPrice!=null;
  const price = discounted ? product.discountPrice : product.price;

  function handleAdd() {
    for(let i=0;i<qty;i++) onAddToCart(product);
    setAdded(true);
    setTimeout(()=>setAdded(false),2000);
  }

  const related = PRODUCTS.filter(p=>p.categorySlug===product.categorySlug && p.id!==product.id).slice(0,4);

  return (
    <div style={{ background:'#FAF8F4',minHeight:'70vh' }}>
      <div style={{ maxWidth:1280,margin:'0 auto',padding:'28px 20px' }}>
        {/* Breadcrumb */}
        <nav style={{ display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#6F6A64',marginBottom:28 }}>
          <button onClick={()=>onNavigate('home')} style={{ background:'none',border:'none',color:'#6F6A64',cursor:'pointer',fontSize:12,fontFamily:"'Inter',sans-serif" }}>Ana Sayfa</button>
          <span>›</span>
          <button onClick={()=>onNavigate('category',{slug:product.categorySlug})} style={{ background:'none',border:'none',color:'#6F6A64',cursor:'pointer',fontSize:12,fontFamily:"'Inter',sans-serif" }}>{product.category}</button>
          <span>›</span>
          <span style={{ color:'#1F1F1F' }}>{product.name}</span>
        </nav>

        <div style={{ display:'grid',gridTemplateColumns:'3fr 2fr',gap:48 }}>
          {/* Images */}
          <div>
            <div style={{ border:'1px solid #EAE4DC',background:'#fff',aspectRatio:'1/1',overflow:'hidden',marginBottom:10 }}>
              <img src={activeImg} alt={product.name} style={{ width:'100%',height:'100%',objectFit:'contain' }}/>
            </div>
            {product.images?.length>1 && (
              <div style={{ display:'flex',gap:8 }}>
                {product.images.map((img,i)=>(
                  <button key={i} onClick={()=>setActiveImg(img)} style={{ width:64,height:64,border:`1px solid ${activeImg===img?'#1F1F1F':'#EAE4DC'}`,background:'#fff',padding:0,cursor:'pointer',overflow:'hidden',flexShrink:0 }}>
                    <img src={img} alt="" style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p style={{ fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.15em',color:'#6F6A64',marginBottom:10 }}>{product.category}</p>
            <h1 style={{ fontFamily:"'Poppins',sans-serif",fontSize:26,fontWeight:500,lineHeight:1.25,color:'#1F1F1F',margin:'0 0 12px' }}>{product.name}</h1>
            {product.shortDesc && <p style={{ fontSize:13,lineHeight:1.7,color:'#6F6A64',marginBottom:20 }}>{product.shortDesc}</p>}

            {/* Price */}
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:8,flexWrap:'wrap' }}>
              {discounted ? (<>
                <span style={{ fontSize:14,color:'#6F6A64',textDecoration:'line-through' }}>{fmt(product.price)}</span>
                <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:30,fontWeight:600,color:'#B89565' }}>{fmt(product.discountPrice)}</span>
                <span style={{ background:'#B89565',color:'#fff',fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',padding:'3px 8px' }}>%{product.discountPercent} İndirim</span>
              </>) : (
                <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:30,fontWeight:600,color:'#1F1F1F' }}>{fmt(product.price)}</span>
              )}
            </div>
            <p style={{ fontSize:12,color:'#065f46',marginBottom:24,fontWeight:500 }}>
              {product.stock>0 ? `Stokta var ✓ (${product.stock} adet)` : 'Stok tükendi'}
            </p>

            {/* Specs */}
            {(product.brand||product.material||product.color||product.volume) && (
              <table style={{ width:'100%',borderCollapse:'collapse',border:'1px solid #EAE4DC',fontSize:12,marginBottom:24 }}>
                <tbody>
                  {[['Marka',product.brand],['Malzeme',product.material],['Renk',product.color],['Boyut',product.volume]].filter(([,v])=>v).map(([k,v])=>(
                    <tr key={k} style={{ borderBottom:'1px solid #EAE4DC' }}>
                      <th style={{ background:'#FAF8F4',padding:'8px 14px',fontWeight:500,color:'#6F6A64',textAlign:'left',width:100,fontSize:12 }}>{k}</th>
                      <td style={{ padding:'8px 14px',color:'#1F1F1F' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Qty + Add */}
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:12 }}>
              <div style={{ display:'flex',alignItems:'center',border:'1px solid #EAE4DC',background:'#fff' }}>
                <button onClick={()=>setQty(v=>Math.max(1,v-1))} style={{ width:38,height:44,border:'none',background:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#1F1F1F' }}><Ico name="minus" size={12}/></button>
                <span style={{ width:36,textAlign:'center',fontSize:14,fontWeight:500 }}>{qty}</span>
                <button onClick={()=>setQty(v=>v+1)} style={{ width:38,height:44,border:'none',background:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#1F1F1F' }}><Ico name="plus" size={12}/></button>
              </div>
              <button onClick={handleAdd} disabled={product.stock<=0}
                style={{ flex:1,background:added?'#1F1F1F':'#B89565',border:'none',padding:'13px 0',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#fff',cursor:'pointer',transition:'background .3s' }}>
                {added ? '✓ Sepete Eklendi' : 'Sepete Ekle'}
              </button>
            </div>

          </div>
        </div>

        {/* Description */}
        {product.desc && (
          <div style={{ marginTop:48,paddingTop:32,borderTop:'1px solid #EAE4DC' }}>
            <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:20,fontWeight:500,color:'#1F1F1F',marginBottom:16 }}>Ürün Açıklaması</h2>
            {product.desc.split('\n').filter(Boolean).map((para,i)=>(
              <p key={i} style={{ fontSize:13,lineHeight:1.75,color:'#3a3a3a',marginBottom:12 }}>{para}</p>
            ))}
          </div>
        )}

        {/* Related */}
        {related.length>0 && (
          <div style={{ marginTop:56,paddingTop:40,borderTop:'1px solid #EAE4DC' }}>
            <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:20,fontWeight:500,color:'#1F1F1F',marginBottom:24 }}>Benzer Ürünler</h2>
            <ProductGrid products={related} onAddToCart={onAddToCart} onDetail={p=>onNavigate('detail',{product:p})}/>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Search Page ── */
function SearchPage({ q, onAddToCart, onNavigate }) {
  const [sort, setSort] = useState('default');
  let results = q ? PRODUCTS.filter(p=>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase()) ||
    (p.brand||'').toLowerCase().includes(q.toLowerCase())
  ) : [];
  if(sort==='price-asc')  results=[...results].sort((a,b)=>(a.discountPrice??a.price)-(b.discountPrice??b.price));
  if(sort==='price-desc') results=[...results].sort((a,b)=>(b.discountPrice??b.price)-(a.discountPrice??a.price));

  return (
    <div style={{ background:'#FAF8F4',minHeight:'60vh' }}>
      <div style={{ background:'#1F1F1F',padding:'36px 20px' }}>
        <div style={{ maxWidth:1280,margin:'0 auto' }}>
          <p style={{ fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.2em',color:'rgba(255,255,255,.5)',marginBottom:8 }}>Arama Sonuçları</p>
          <h1 style={{ fontFamily:"'Poppins',sans-serif",fontSize:28,fontWeight:600,color:'#fff',margin:'0 0 6px' }}>"{q}"</h1>
          <p style={{ fontSize:12,color:'rgba(255,255,255,.5)' }}>{results.length} sonuç bulundu</p>
        </div>
      </div>
      <div style={{ maxWidth:1280,margin:'0 auto',padding:'28px 20px 56px' }}>
        {results.length===0 ? (
          <div style={{ textAlign:'center',padding:'80px 0' }}>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:20,fontWeight:500,color:'#1F1F1F',marginBottom:12 }}>Sonuç Bulunamadı</p>
            <p style={{ fontSize:13,color:'#6F6A64',marginBottom:28 }}>"{q}" için herhangi bir ürün bulunamadı. Farklı anahtar kelimeler deneyiniz.</p>
            <button onClick={()=>onNavigate('home')} style={{ background:'#1F1F1F',border:'none',padding:'11px 28px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#fff',cursor:'pointer' }}>Ana Sayfaya Dön</button>
          </div>
        ) : (
          <>
            <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:24 }}>
              <select value={sort} onChange={e=>setSort(e.target.value)} style={{ border:'1px solid #EAE4DC',background:'#fff',padding:'7px 28px 7px 12px',fontFamily:"'Inter',sans-serif",fontSize:11,color:'#1F1F1F',outline:'none',cursor:'pointer' }}>
                <option value="default">Varsayılan Sıralama</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              </select>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20 }}>
              {results.map(p=><ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onDetail={prod=>onNavigate('detail',{product:prod})}/>)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { CategoryPage, ProductDetailPage, SearchPage });
