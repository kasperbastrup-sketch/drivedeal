import { navItems } from '../lib/data'

const navIcons = {
  dashboard:    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor"/></svg>,
  analytics:    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><polyline points="1,13 5,8 8,10 12,4 15,7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  leads:        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="3" fill="currentColor"/><path d="M1 13c0-2.8 2.2-5 5-5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M11 10l1.5 1.5L15 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  import:       <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 1v9M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 11v3h12v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  campaigns:    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  sequences:    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3" r="2" fill="currentColor"/><circle cx="8" cy="9" r="2" fill="currentColor" opacity=".6"/><circle cx="8" cy="14.5" r="1.5" fill="currentColor" opacity=".3"/><line x1="8" y1="5" x2="8" y2="7" stroke="currentColor" strokeWidth="1.2"/><line x1="8" y1="11" x2="8" y2="12.8" stroke="currentColor" strokeWidth="1.2"/></svg>,
  templates:    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="5" y1="9" x2="9" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  integrations: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="7" width="4" height="4" rx="1" fill="currentColor"/><rect x="11" y="7" width="4" height="4" rx="1" fill="currentColor"/><rect x="6" y="1" width="4" height="4" rx="1" fill="currentColor"/><line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2"/><line x1="8" y1="5" x2="8" y2="7" stroke="currentColor" strokeWidth="1.2"/></svg>,
  settings:     <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.1 3.1l1.1 1.1M11.8 11.8l1.1 1.1M3.1 12.9l1.1-1.1M11.8 4.2l1.1-1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
}

export default function Sidebar({ view, setView, dealerName }) {
  const initials = dealerName ? dealerName.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) : 'MB'
  const shortName = dealerName ? dealerName.slice(0,18) + (dealerName.length>18?'…':'') : 'Mercedes BCN'

  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo-mark">🚗</div>
        <div>
          <div className="logo-name">DriveDeal</div>
          <div className="logo-tag">AI Lead Engine</div>
        </div>
      </div>

      <nav className="nav">
        {navItems.map(group => (
          <div key={group.group}>
            <div className="nav-group-label">{group.group}</div>
            {group.items.map(item => (
              <button
                key={item.id}
                className={`nav-item${view===item.id?' active':''}`}
                onClick={() => setView(item.id)}
              >
                {navIcons[item.id]}
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="dealer-card" onClick={() => setView('settings')}>
          <div className="dealer-avatar">{initials}</div>
          <div>
            <div className="dealer-name">{shortName}</div>
            <div className="dealer-plan"><span className="plan-dot"></span> Pro Plan · Aktiv</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
