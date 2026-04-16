export default function LeadsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-lg" />
          <div className="h-4 w-64 bg-muted rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-muted rounded-lg" />
      </div>

      <div className="h-12 w-full bg-muted rounded-xl" />

      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full bg-muted/50 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
