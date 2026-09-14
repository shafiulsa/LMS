export function SectionTitle({ children, className }) {
  return (
    <h2 className={className ?? "text-3xl md:text-4xl font-bold"}>
      {children}
    </h2>
  );
}
