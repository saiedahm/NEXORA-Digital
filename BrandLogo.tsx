import Link from "next/link";
export function BrandLogo({width=150,className="",linkToHome=true}:{width?:number;className?:string;linkToHome?:boolean}){
 const logo=<img src="/assets/images/nexora-logo.png" alt="NEXORA DIGITAL" className={`nexora-logo ${className}`} style={{width:`${width}px`,height:"auto"}}/>;
 return linkToHome?<Link href="/" aria-label="NEXORA DIGITAL Home" className="brand-logo">{logo}</Link>:logo;
}
