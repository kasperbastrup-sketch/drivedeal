import { useState } from 'react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import ComposeModal from '../components/ComposeModal'
import CampaignModal from '../components/CampaignModal'
import { useToast, ToastStack, showToast } from '../components/Toast'
import {
  DashboardView, AnalyticsView, LeadsView, CampaignsView,
  SequencesView, TemplatesView, ImportView, IntegrationsView, SettingsView
} from '../components/Views'
import { leadsData } from '../lib/data'

const pageTitles = {
  dashboard:'Dashboard', analytics:'Analyser', leads:'Leads',
  import:'Importer leads', campaigns:'Kampagner', sequences:'Sekvenser',
  templates:'Email skabeloner', integrations:'Integrationer', settings:'Indstillinger',
}

export default function Home() {
  const [view, setView]               = useState('dashboard')
  const [leads, setLeads]             = useState(leadsData)
  const [composeLead, setComposeLead] = useState(null)
  const [showCampaign, setShowCampaign] = useState(false)
  const [dealerName, setDealerName]   = useState('Mercedes-Benz Madrid')
  const [search, setSearch]           = useState('')
  const { toasts, addToast }          = useToast()

  function handleSent(lead) {
    setLeads(ls => ls.map(l => l.id===lead.id && l.status!=='booked' ? {...l, status:'sent'} : l))
  }

  function handleLaunch(name) {
    showToast('🚀', `Kampagne "${name}" startet!`, 'AI sender emails med 30-90 sek. forsinkelse')
  }

  function handleImport(count, filename) {
    showToast('📁', `${count} leads importeret`, `Fra: ${filename}`)
  }

  function handleSearch(q) {
    setSearch(q)
    if (q) setView('leads')
  }

  return (
    <>
      <Head>
        <title>DriveDeal AI — Lead Reactivation</title>
        <meta name="description" content="AI-powered lead reactivation for car dealerships"/>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚗</text></svg>"/>
      </Head>

      <div className="shell">
        <Sidebar view={view} setView={setView} dealerName={dealerName}/>

        <main className="main">
          {/* TOPBAR */}
          <div className="topbar">
            <div className="topbar-title">{pageTitles[view]}</div>
            <div className="topbar-right">
              <div className="topbar-search">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="#5e5d5a" strokeWidth="1.5"/>
                  <line x1="11" y1="11" x2="15" y2="15" stroke="#5e5d5a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  placeholder="Søg leads, kampagner..."
                  value={search}
                  onChange={e=>handleSearch(e.target.value)}
                />
              </div>
              <button className="btn btn-ghost btn-sm" onClick={()=>setView('import')}>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v9M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 11v3h12v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Import
              </button>
              <button className="btn btn-gold" onClick={()=>setShowCampaign(true)}>
                ▶ Kør AI kampagne
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="content">
            {view==='dashboard'    && <DashboardView leads={leads} onCampaign={()=>setShowCampaign(true)}/>}
            {view==='analytics'    && <AnalyticsView/>}
            {view==='leads'        && <LeadsView leads={leads} onCompose={setComposeLead} initialSearch={search}/>}
            {view==='import'       && <ImportView onImport={handleImport}/>}
            {view==='campaigns'    && <CampaignsView onCampaign={()=>setShowCampaign(true)}/>}
            {view==='sequences'    && <SequencesView/>}
            {view==='templates'    && <TemplatesView/>}
            {view==='integrations' && <IntegrationsView/>}
            {view==='settings'     && <SettingsView dealerName={dealerName} setDealerName={setDealerName}/>}
          </div>
        </main>
      </div>

      {composeLead && (
        <ComposeModal
          lead={composeLead}
          onClose={()=>setComposeLead(null)}
          onSent={handleSent}
        />
      )}

      {showCampaign && (
        <CampaignModal
          onClose={()=>setShowCampaign(false)}
          onLaunch={handleLaunch}
        />
      )}

      <ToastStack toasts={toasts}/>
    </>
  )
}
