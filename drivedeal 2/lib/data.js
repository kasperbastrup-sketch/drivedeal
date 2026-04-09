export const leadsData = [
  {id:1,  name:"Carlos Mendez",   email:"carlos.m@gmail.com",     phone:"+34 612 001 001", car:"BMW 520d",          days:127, source:"HubSpot",  status:"cold",    score:82},
  {id:2,  name:"María González",  email:"mgonzalez@hotmail.com",  phone:"+34 612 002 002", car:"Mercedes GLC 300", days:94,  source:"Web form", status:"warm",    score:71},
  {id:3,  name:"Antonio Ruiz",    email:"a.ruiz@empresa.es",      phone:"+34 612 003 003", car:"Audi A4 S-line",   days:201, source:"HubSpot",  status:"cold",    score:55},
  {id:4,  name:"Sofia Hernández", email:"sofia.h@gmail.com",      phone:"+34 612 004 004", car:"Volvo XC60",       days:45,  source:"Showroom", status:"sent",    score:68},
  {id:5,  name:"Javier López",    email:"jlopez@work.com",        phone:"+34 612 005 005", car:"Tesla Model 3",    days:312, source:"HubSpot",  status:"cold",    score:44},
  {id:6,  name:"Elena Martín",    email:"elena.m@yahoo.es",       phone:"+34 612 006 006", car:"BMW X5 xDrive",    days:18,  source:"Calendly", status:"booked",  score:94},
  {id:7,  name:"Pablo Sánchez",   email:"pablo.s@gmail.com",      phone:"+34 612 007 007", car:"Mercedes E 220d",  days:88,  source:"Web form", status:"warm",    score:76},
  {id:8,  name:"Laura Fernández", email:"l.fernandez@icloud.com", phone:"+34 612 008 008", car:"Porsche Cayenne",  days:156, source:"HubSpot",  status:"sent",    score:61},
  {id:9,  name:"Diego Torres",    email:"diego.t@gmail.com",      phone:"+34 612 009 009", car:"Mercedes GLE 400", days:67,  source:"Web form", status:"replied", score:88},
  {id:10, name:"Ana Jiménez",     email:"ana.j@empresa.es",       phone:"+34 612 010 010", car:"Audi Q7",          days:230, source:"HubSpot",  status:"cold",    score:39},
  {id:11, name:"Roberto Vargas",  email:"r.vargas@gmail.com",     phone:"+34 612 011 011", car:"BMW 330i",         days:105, source:"HubSpot",  status:"cold",    score:66},
  {id:12, name:"Carmen Delgado",  email:"carmen.d@outlook.com",   phone:"+34 612 012 012", car:"Tesla Model Y",    days:52,  source:"Web form", status:"warm",    score:73},
]

export const activityFeed = [
  {color:"var(--green)", text:"<strong>Carlos Mendez</strong> bookede prøvekørsel — BMW 520d", time:"I dag · 14:32"},
  {color:"var(--gold)",  text:"AI sendte 47 emails — \"Sommer Reactivation\"", time:"I dag · 10:00"},
  {color:"var(--green)", text:"<strong>María González</strong> svarede: \"Hvornår kan jeg komme ind?\"", time:"I går · 16:18"},
  {color:"var(--blue)",  text:"82 leads importeret fra HubSpot CRM", time:"I går · 09:00"},
  {color:"var(--green)", text:"<strong>Antonio Ruiz</strong> besøgte forhandleren — bil solgt ✓", time:"Mandag · 11:45"},
  {color:"var(--gold)",  text:"AI genoplivede 12 leads over 180 dage — 3 svarede", time:"Søndag · 08:00"},
]

export const chartData = [22,38,44,31,55,42,67,58,72,48,83,91,77,124]

export const navItems = [
  { group:"Overblik", items:[
    { id:"dashboard",    label:"Dashboard" },
    { id:"analytics",   label:"Analyser" },
  ]},
  { group:"Leads", items:[
    { id:"leads",       label:"Alle leads",       badge:"847" },
    { id:"import",      label:"Importer leads" },
  ]},
  { group:"Outreach", items:[
    { id:"campaigns",   label:"Kampagner",        badge:"3" },
    { id:"sequences",   label:"Sekvenser" },
    { id:"templates",   label:"Email skabeloner" },
  ]},
  { group:"System", items:[
    { id:"integrations",label:"Integrationer" },
    { id:"settings",    label:"Indstillinger" },
  ]},
]
