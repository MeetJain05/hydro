"use client"

import { useState } from "react"

export default function ChatSidebar() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "AI Assistant will soon help you analyze sites and policies." },
  ])
  const [input, setInput] = useState("")

  const onSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: "AI Assistant will soon help you analyze sites and policies." },
    ])
    setInput("")
  }

  return (
    <aside className="w-full md:w-80 border-l bg-background flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Hydrogen Assistant (Coming Soon)</h2>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === "user" ? "text-foreground" : "text-muted-foreground"}`}>
            <span className="block font-medium">{m.role === "user" ? "You" : "Assistant"}</span>
            <span className="block">{m.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={onSend} className="p-3 border-t flex items-center gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          className="flex-1 resize-none border rounded-md px-2 py-1.5"
          placeholder="Ask about policies, sites... (placeholder)"
        />
        <button className="rounded-md bg-emerald-600 text-white px-3 py-2 text-sm hover:bg-emerald-700">Send</button>
      </form>
    </aside>
  )
}
