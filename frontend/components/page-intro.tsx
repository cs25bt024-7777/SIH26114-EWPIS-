export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border px-4 py-10 text-center">
      <p className="font-heading text-sm font-medium">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function LoadingBlock({ label = "Loading intelligence view" }: { label?: string }) {
  return (
    <div className="space-y-3" role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <div className="h-20 animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-3 md:grid-cols-2">
        <div className="h-40 animate-pulse rounded-lg bg-muted" />
        <div className="h-40 animate-pulse rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export function PageIntro({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 max-w-3xl">
      {kicker ? (
        <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {kicker}
        </p>
      ) : null}
      <h1 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
        {title}
      </h1>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
