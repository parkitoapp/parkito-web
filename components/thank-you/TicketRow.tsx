export function TicketRow({
  icon,
  label,
  value,
  capitalize,
}: {
  icon: string;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 flex flex-row items-center">
        {icon} {label}
      </p>
      <p className={`text-sm font-medium text-card-foreground ${capitalize ? "capitalize" : ""}`}>
        {value}
      </p>
    </div>
  );
}
