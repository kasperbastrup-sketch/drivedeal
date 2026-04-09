'use client'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { group: 'Overblik', items: [
    { label: 'Dashboard', path: '/', icon: 'grid' },
    { label: 'Analyser', path: '/analytics', icon: 'chart' },
  ]},
  { group: 'Leads', items: [
    { label: 'Alle leads', path: '/leads', icon: 'users', badge: '847' },
    { label: 'Importer leads', path: '/import', icon: 'download' },
  ]},
  { group: 'Outreach', items: [
    { label: 'Kampagner', path: '/campaigns', icon: 'mail', badge: '3' },
    { label: 'Sekvenser', path: '/sequences', icon: 'layers' },
    { label: 'Email skabeloner', path: '/templates', icon: 'file' },
  ]},
  { group: 'System', items: [
    { label: 'Integrationer', path: '/integrations', icon: 'plug' },
    { label: 'Indstillinger', path: '/settings', icon: 'settings' },
  ]},
]

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    grid: <><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor"/></>,
    chart: <polyline points="1,13 5,8 8,10 12,4 15,7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    users: <><circle cx="6" cy="5" r="3" fill="currentColor"/><path d="M1 13c0-2.8 2.2-5 5-5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/><path d="M11 10l1.5 1.5L15 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/></>,
    download: <><path d="M8 1v9M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M2 11v3h12v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/></>,
    mail: <><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" fill="none"/></>,
    layers: <><circle cx="8" cy="3" r="2" fill="currentColor"/><circle cx="8" cy="9" r="2" fill="currentColor" opacity=".6"/><circle cx="8" cy="14.5" r="1.5" fill="currentColor" opacity=".3"/><line x1="8" y1="5" x2="8" y2="7" stroke="currentColor" strokeWidth="1.2"/><line x1="8" y1="11" x2="8" y2="12.8" stroke="currentColor" strokeWidth="1.2"/></>,
    file: <><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/><line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="5" y1="9" x2="9" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></>,
    plug: <><rect x="1" y="7" width="4" height="4" rx="1" fill="currentColor"/><rect x="11" y="7" width="4" height="4" rx="1" fill="currentColor"/><rect x="6" y="1" width="4" height="4" rx="1" fill="currentColor"/><line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2"/><line x1="8" y1="5" x2="8" y2="7" stroke="currentColor" strokeWidth="1.2"/></>,
    settings: <><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.1 3.1l1.1 1.1M11.8 11.8l1.1 1.1M3.1 12.9l1.1-1.1M11.8 4.2l1.1-1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/></>,
  }
  return <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{flexShrink:0,opacity:.8}}>{icons[name]}</svg>
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="sidebar">
      <div style={{padding:'18px 16px 14px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,var(--gold3),var(--gold))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,boxShadow:'0 0 20px rgba(201,169,110,.3)'}}>🚗</div>
        <div>
          <div className="font-head" style={{fontSize:16,fontWeight:700,letterSpacing:'-0.3px',color:'var(--text)'}}>DriveDeal</div>
          <div style={{fontSize:9,color:'var(--gold)',letterSpacing:2,textTransform:'uppercase',fontWeight:500}}>AI Lead Engine</div>
        </div>
      </div>

      <nav style={{flex:1,padding:'10px 8px',overflowY:'auto'}}>
        {navItems.map(group => (
          <div key={group.group}>
            <div style={{fontSize:9,color:'var(--text3)',letterSpacing:'1.8px',textTransform:'uppercase',padding:'12px 10px 5px',fontWeight:600}}>{group.group}</div>
            {group.items.map(item => (
              <button
                key={item.path}
                className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                onClick={() => router.push(item.path)}
              >
                <Icon name={item.icon} />
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div style={{padding:'10px 8px',borderTop:'1px solid var(--border)'}}>
        <div style={{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:9,padding:'10px 12px',display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}>
          <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,var(--gold3),var(--gold))',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-head)',fontSize:11,fontWeight:700,color:'#1a1100',flexShrink:0}}>MB</div>
          <div>
            <div style={{fontSize:12,fontWeight:600}}>Mercedes BCN</div>
            <div style={{fontSize:10,color:'var(--gold)',display:'flex',alignItems:'center',gap:4}}><span className="plan-dot"></span>Pro Plan · Aktiv</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
