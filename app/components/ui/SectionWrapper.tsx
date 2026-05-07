type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function SectionWrapper({
  children,
  className = "",
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`section-padding relative overflow-hidden ${className}`}
    >
      <div className="container-shell relative z-10">
        {children}
      </div>
    </section>
  );
}