 import Link from "next/link";

type BrandLogoProps = {
  width?: number;
  className?: string;
  linkToHome?: boolean;
};

export function BrandLogo({
  width = 150,
  className = "",
  linkToHome = true
}: BrandLogoProps) {
  const logo = (
    <img
      src="/assets/images/nexora-logo.png"
      alt="NEXORA DIGITAL"
      className={`nexora-logo ${className}`}
      style={{
        width: `${width}px`,
        height: "auto"
      }}
    />
  );

  return linkToHome ? (
    <Link
      href="/"
      aria-label="NEXORA DIGITAL Home"
      className="brand-logo"
    >
      {logo}
    </Link>
  ) : (
    logo
  );
}
