"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Edit2, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

interface Page {
  id: string
  page_name: string
  title: string
  content: string
  is_enabled: boolean
  meta_description: string
  created_at: string
}

function PageManagementContent() {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    page_name: "",
    title: "",
    content: "",
    is_enabled: true,
    meta_description: "",
  })

  useEffect(() => {
    const checkAuth = async () => {
      const isAdmin = localStorage.getItem("admin_authenticated")
      if (!isAdmin) {
        router.push("/admin-auth")
        return
      }
      await fetchPages()
    }
    checkAuth()
  }, [router])

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/pages")
      if (response.ok) {
        const data = await response.json()
        setPages(data)
      }
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching pages:", error)
      setLoading(false)
    }
  }

  const handleToggleEnabled = async (page: Page) => {
    try {
      const response = await fetch(`/api/pages/${page.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...page, is_enabled: !page.is_enabled }),
      })

      if (response.ok) {
        setPages(pages.map((p) => (p.id === page.id ? { ...p, is_enabled: !p.is_enabled } : p)))
      }
    } catch (error) {
      console.error("[v0] Error toggling page:", error)
    }
  }

  const handleUpdatePage = async () => {
    if (!editingPage) return

    try {
      const response = await fetch(`/api/pages/${editingPage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updated = await response.json()
        setPages(pages.map((p) => (p.id === editingPage.id ? updated : p)))
        setEditingPage(null)
        setFormData({ page_name: "", title: "", content: "", is_enabled: true, meta_description: "" })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error("[v0] Error updating page:", error)
    }
  }

  const startEdit = (page: Page) => {
    setEditingPage(page)
    setFormData({
      page_name: page.page_name,
      title: page.title,
      content: page.content,
      is_enabled: page.is_enabled,
      meta_description: page.meta_description,
    })
    setShowAddForm(true)
  }

  const toggleExpanded = (pageId: string) => {
    const newExpanded = new Set(expandedPages)
    if (newExpanded.has(pageId)) {
      newExpanded.delete(pageId)
    } else {
      newExpanded.add(pageId)
    }
    setExpandedPages(newExpanded)
  }

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.page_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin-dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Page Management</h1>
          </div>
        </div>

        {showAddForm && editingPage && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Edit Page: {editingPage.page_name}</h2>
            <div className="space-y-4 mb-4">
              <input
                type="text"
                placeholder="Page Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <textarea
                placeholder="Page Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Meta Description"
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_enabled}
                  onChange={(e) => setFormData({ ...formData, is_enabled: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span className="text-gray-700">Page Enabled</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleUpdatePage}
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
              >
                Update Page
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingPage(null)
                }}
                className="flex-1 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredPages.map((page) => (
              <div key={page.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex items-center gap-4 flex-1">
                    <button onClick={() => toggleExpanded(page.id)} className="text-gray-600 hover:text-gray-900">
                      {expandedPages.has(page.id) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <h3 className="font-bold text-gray-900">{page.title}</h3>
                      <p className="text-sm text-gray-600">{page.page_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={page.is_enabled}
                        onChange={() => handleToggleEnabled(page)}
                        className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-700">{page.is_enabled ? "Enabled" : "Disabled"}</span>
                    </label>
                    <button onClick={() => startEdit(page)} className="text-blue-600 hover:text-blue-700">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {expandedPages.has(page.id) && (
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <p className="text-gray-700 whitespace-pre-wrap">{page.content}</p>
                    <p className="text-sm text-gray-500 mt-4">Meta: {page.meta_description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No pages found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PageManagementPage() {
  return (
    <Suspense fallback={null}>
      <PageManagementContent />
    </Suspense>
  )
}
