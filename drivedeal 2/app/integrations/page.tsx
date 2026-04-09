'use client'
import { useToast } from '@/components/Toast'

export default function Integrations() {
  const { show } = useToast()
  function connectCRM(name: string) {
    show('🔗', `${name} integration`, 'Åbner OAuth forbindelsesflow...')
    setTimeout(() => show('✅', `${name} forbundet!`, '82 leads synkroniseret'), 2500)
  }
  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const b = e.currentTarget
    b.className = `toggle ${b.classList.contains('on')?'off':'on'}`
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
      <div className="panel">
        <div className="font-head" style={{fontSize:13,fontWeight:600,marginBottom:14}}>Email udsendelse</div>
        {[
          {l:'Gmail',d:'ventas@mercedesbcn.com',node:<span className="pill pill-green">● Forbundet</span>},
          {l:'Send-grænse per dag',d:'Anbefalet: 80-150 for god deliverability',node:<input className="field-input" defaultValue="100" type="number" style={{width:80,textAlign:'center'}}/>},
          {l:'Forsinkelse mellem emails',d:'Undgår spam-filtre',node:<select className="field-select"><option>30-90 sekunder</option><option>10-30 sekunder</option><option>2-5 minutter</option></select>},
          {l:'Email tracking',d:'Måler åbningsrate præcist',node:<button className="toggle on" onClick={toggle}></button>},
        ].map(r=>(
          <div key={r.l} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 0',borderBottom:'1px solid var(--border)'}}>
            <div><div style={{fontSize:13,fontWeight:500}}>{r.l}</div><div style={{fontSize:11,color:'var(--text2)',marginTop:2}}>{r.d}</div></div>
            {r.node}
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="font-head" style={{fontSize:13,fontWeight:600,marginBottom:14}}>CRM systemer</div>
        {[['HubSpot','Synk leads begge veje'],['Salesforce','Enterprise integration'],['Pipedrive','Pipeline synkronisering'],['AutoIt / CDK','Bil-specifik DMS integration']].map(([n,d])=>(
          <div key={n} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 0',borderBottom:'1px solid var(--border)'}}>
            <div><div style={{fontSize:13,fontWeight:500}}>{n}</div><div style={{fontSize:11,color:'var(--text2)',marginTop:2}}>{d}</div></div>
            <button className="btn btn-ghost btn-sm" onClick={()=>connectCRM(n as string)}>Forbind</button>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="font-head" style={{fontSize:13,fontWeight:600,marginBottom:14}}>Booking & kalender</div>
        {[
          {l:'Calendly',d:'Prøvekørsel booking link',node:<button className="btn btn-ghost btn-sm" onClick={()=>connectCRM('Calendly')}>Forbind</button>},
          {l:'Google Kalender',d:'Sync prøveture til kalender',node:<span className="pill pill-green">● Forbundet</span>},
          {l:'Booking link i emails',d:'Indsættes automatisk',node:<input className="field-input" placeholder="calendly.com/dinforhandler" style={{width:200}}/>},
        ].map(r=>(
          <div key={r.l} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 0',borderBottom:'1px solid var(--border)'}}>
            <div><div style={{fontSize:13,fontWeight:500}}>{r.l}</div><div style={{fontSize:11,color:'var(--text2)',marginTop:2}}>{r.d}</div></div>
            {r.node}
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="font-head" style={{fontSize:13,fontWeight:600,marginBottom:14}}>Notifikationer</div>
        {[['Email ved lead-svar','Notifikation straks ved svar',true],['Daglig rapport email','Opsummering kl. 08:00',true],['Notifikation ved booking','Straks notifikation ved prøvetur',true],['Ugentlig performance rapport','Fredag kl. 17:00',false]].map(([l,d,on])=>(
          <div key={l as string} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 0',borderBottom:'1px solid var(--border)'}}>
            <div><div style={{fontSize:13,fontWeight:500}}>{l}</div><div style={{fontSize:11,color:'var(--text2)',marginTop:2}}>{d}</div></div>
            <button className={`toggle ${on?'on':'off'}`} onClick={toggle}></button>
          </div>
        ))}
      </div>
    </div>
  )
}
