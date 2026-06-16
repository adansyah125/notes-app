import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const categoryColors = {
  personal: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
  work: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
  ideas: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
  todo: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
}

export function NoteCard({ note, onEdit, onDelete }) {
  const timeAgo = formatDistanceToNow(new Date(note.updatedAt), {
    addSuffix: true,
    locale: id,
  })

  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-tight truncate">
              {note.title}
            </h3>
            {note.category && (
              <Badge
                variant="secondary"
                className={`mt-2 text-[11px] font-medium px-2 py-0.5 ${categoryColors[note.category] || ""}`}
              >
                {note.category}
              </Badge>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={() => onEdit(note)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(note.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {note.content}
        </p>
      </CardContent>
      <CardFooter className="px-5 pb-4 pt-0">
        <p className="text-[11px] text-muted-foreground/60">{timeAgo}</p>
      </CardFooter>
    </Card>
  )
}
