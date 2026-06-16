import { useEffect, useState } from "react"
import { Plus, Search, StickyNote } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { NoteCard } from "./components/note-card"
import { NoteDialog } from "./components/note-dialog"
import { EmptyState } from "./components/empty-state"
import { ThemeToggle } from "./components/theme-toggle"

const STORAGE_KEY = "notes-app-data"

function loadNotes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

const defaultNotes = [
  {
    id: crypto.randomUUID(),
    title: "Selamat Datang di Notes App",
    content:
      "Aplikasi catatan sederhana dengan desain modern. Kamu bisa menambah, mengedit, dan menghapus catatan. Cobalah fitur kategori dan pencarian!",
    category: "personal",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Meeting Notes - Q2 Planning",
    content:
      "Quarter 2 planning meeting agenda:\n1. Review Q1 metrics\n2. Set OKRs for Q2\n3. Resource allocation\n4. Timeline review\n5. Risk assessment",
    category: "work",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "App Feature Ideas",
    content:
      "List of features to consider:\n- Dark mode (done ✅)\n- Search functionality (done ✅)\n- Categories/tags (done ✅)\n- Export to PDF\n- Rich text editor\n- Cloud sync",
    category: "ideas",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export default function App() {
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = loadNotes()
    if (stored.length === 0) {
      saveNotes(defaultNotes)
      setNotes(defaultNotes)
    } else {
      setNotes(stored)
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) saveNotes(notes)
  }, [notes, loaded])

  const filteredNotes = notes.filter((note) => {
    const q = search.toLowerCase()
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q) ||
      (note.category || "").toLowerCase().includes(q)
    )
  })

  const sortedNotes = [...filteredNotes].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  )

  function handleSave({ title, content, category }) {
    const now = new Date().toISOString()
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id
            ? { ...n, title, content, category, updatedAt: now }
            : n
        )
      )
    } else {
      setNotes((prev) => [
        {
          id: crypto.randomUUID(),
          title,
          content,
          category,
          createdAt: now,
          updatedAt: now,
        },
        ...prev,
      ])
    }
    setEditingNote(null)
  }

  function handleEdit(note) {
    setEditingNote(note)
    setDialogOpen(true)
  }

  function handleDelete(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  function openNewNote() {
    setEditingNote(null)
    setDialogOpen(true)
  }

  if (!loaded) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            <span className="font-semibold text-lg">Notes</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button onClick={openNewNote} size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New Note
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11"
          />
        </div>

        {sortedNotes.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyState search={search} />
        )}
      </main>

      <NoteDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingNote(null)
        }}
        note={editingNote}
        onSave={handleSave}
      />
    </div>
  )
}
