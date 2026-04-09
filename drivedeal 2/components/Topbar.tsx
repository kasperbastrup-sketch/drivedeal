'use client'
import { usePathname, useRouter } from 'next/navigation'

const titles: Record<string,string> = {
  '/':'Dashboard','  /analytics':'Analyser','/leads':'Leads','/import':'Importer leads',
  '/campaigns':'Kampagner','/sequences':'Sekvenser','/templates':'Email skabeloner',
  '/integrations':'Integrationer','/settings':'Indstillinger',
}

export default function Topbar({ onCampaign, onImport }: { onCampaign: ()=>void; onImport: ()=>void }) {
  const pathname = usePathname()
  const router = useRouter()
  const title = titles[pathname] || 'Dashboard'

  return (
    <div style={{height:58,background:'var(--surface)',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',padding:'0 24px',gap:16,flexShrink:0}}>
      <div className="font-head" style={{fontSize:15,fontWeight:700,letterSpacing:'-0.2px'}}>{title}</div>
      <div style={{marginLeft:'auto',display:'flex',gap:8,alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:8,background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:7,padding:'6px 11px'}}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="#5e5d5a" strokeWidth="1.5"/><line x1="11" y1="11" x2="15" y2="15" stroke="#5e5d5a" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <input placeholder="Søg leads, kampagner..." style={{background:'none',border:'none',outline:'none',color:'var(--text)',fontFamily:'var(--font-body)',fontSize:12,width:160}} onKeyDown={e => { if(e.key==='Enter') router.push('/leads') }} />
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onImport}>+ Import</button>
        <button className="btn btn-gold" onClick={onCampaign}>▶ Kør AI kampagne</button>
      </div>
    </div>
  )
}
