export default function LeadDetailLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex justify-between items-center gap-4">
        <div className="h-10 w-48 bg-muted rounded-xl" />
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-muted rounded-xl" />
          <div className="h-10 w-24 bg-muted rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-[400px] bg-muted/50 rounded-2xl" />
          <div className="space-y-4">
             <div className="h-6 w-32 bg-muted rounded-lg" />
             <div className="h-32 bg-muted/30 rounded-2xl" />
          </div>
        </div>
        <div className="h-64 bg-muted/50 rounded-2xl" />
      </div>
    </div>
  );
}
