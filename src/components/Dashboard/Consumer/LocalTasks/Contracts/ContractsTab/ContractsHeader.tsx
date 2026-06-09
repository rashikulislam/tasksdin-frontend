// components/contracts/ContractsHeader.tsx
export function ContractsHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold">Contracts</h2>
        <p className="text-muted-foreground mt-1">
          Manage your active and completed contracts
        </p>
      </div>
    </div>
  );
}