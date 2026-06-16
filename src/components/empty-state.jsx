import { FileText } from "lucide-react"

export function EmptyState({ search }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-1">
        {search ? "No notes found" : "No notes yet"}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        {search
          ? `No notes match "${search}". Try a different search term.`
          : "Create your first note to get started."}
      </p>
    </div>
  )
}
