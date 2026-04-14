type SectionHeaderProps = {
  label?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  centered?: boolean;
};

export default function SectionHeader({
  label,
  title,
  titleAccent,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {label && (
        <p className="text-xs font-semibold tracking-[3px] uppercase text-brown-500 mb-3">
          {label}
        </p>
      )}
      <h2 className="font-display text-h2-mobile lg:text-h2-desktop text-brown-900">
        {title}{" "}
        {titleAccent && <span className="text-copper">{titleAccent}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-brown-400 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
