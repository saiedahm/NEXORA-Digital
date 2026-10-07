"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
type Job={id:string;title:string;country:string;employmentType:string;status:string};
export default function CompanyDashboard(){
 const [jobs,setJobs]=useState<Job[]>([]); const [error,setError]=useState("");
 useEffect(()=>{fetch("/api/company/jobs").then(async r=>{const d=await r.json();if(!r.ok)setError(d.error||"Unable to load jobs");else setJobs(d)}).catch(()=>setError("Unable to load jobs"))},[]);
 return <main className="section"><div className="container"><span className="badge">COMPANY WORKSPACE</span><h1>Recruitment dashboard.</h1><p className="muted">Manage your vacancies and recruitment activity.</p><div style={{margin:"24px 0"}}><Link className="btn primary" href="/company/dashboard/jobs/new">Create vacancy</Link></div>{error&&<p style={{color:"#ff6b6b"}}>{error}</p>}<div className="grid">{jobs.map(j=><article className="card" key={j.id}><span className="badge">{j.status}</span><h3>{j.title}</h3><p className="muted">{j.country} · {j.employmentType}</p><Link className="btn secondary" href={"/company/dashboard/jobs/"+j.id}>Manage vacancy</Link></article>)}{!jobs.length&&!error&&<article className="card"><h3>No vacancies yet</h3><p className="muted">Create your first vacancy to start receiving candidates.</p></article>}</div></div></main>
}