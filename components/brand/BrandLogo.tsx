import Link from "next/link";

type BrandLogoProps = {
  width?: number;
  className?: string;
  linkToHome?: boolean;
};

const LOGO_SRC =
  "https://raw.githubusercontent.com/saiedahm/NEXORA-Digital/main/assetsimagesnexora-logo.png";

export function BrandLogo({
  width = 150,
  className = "",
  linkToHome = true,
}: BrandLogoProps) {
  const logo = (
    <img
      src={LOGO_SRC}
      alt="NEXORA DIGITAL"
      className={`nexora-logo ${className}`}
      width={width}
      height={Math.round(width * 0.32)}
      style={{ width: `${width}px`, height: "auto" }}
      loading="eager"
    />
  );

  if (!linkToHome) return logo;

  return (
    <Link href="/" aria-label="NEXORA DIGITAL Home" className="brand-logo">
      {logo}
    </Link>
  );
}
