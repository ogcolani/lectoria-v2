import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export default function TestSupabase() {
  const [logs, setLogs] = useState<string[]>([])

  const log = (msg: string, data?: any) => {
    setLogs((prev) => [...prev, msg + (data ? " → " + JSON.stringify(data) : "")])
  }

  useEffect(() => {
    const runTests = async () => {
      try {
        // 1) Vérifier la session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        log("Session:", session ?? sessionError)

        if (!session) {
          log("⚠️ Pas de session : connecte-toi sur /auth puis reviens ici")
          return
        }

        const user = session.user

        // 2) Vérifier insert dans orders
        const { data: inserted, error: insertError } = await supabase.from("orders").insert({
          user_id: user.id,
          child_name: "Test",
          child_age: 7,
          interests: ["espace", "fusée"],
        }).select()
        log("Insert order:", inserted ?? insertError)

        // 3) Vérifier select dans orders
        const { data: orders, error: selectError } = await supabase.from("orders").select("*")
        log("Select orders (should only show mine):", orders ?? selectError)

        // 4) Vérifier profile auto
        const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id)
        log("Profile:", profile ?? profileError)

        // 5) Vérifier upload storage
        const file = new File(["hello world"], "test.txt", { type: "text/plain" })
        const { data: upload, error: uploadError } = await supabase.storage
          .from("books")
          .upload(`${user.id}/orders/test/test.txt`, file, { upsert: true })
        log("Upload file:", upload ?? uploadError)

        // 6) Vérifier accès au fichier
        const { data: urlData } = supabase.storage.from("books").getPublicUrl(`${user.id}/orders/test/test.txt`)
        log("Public URL:", urlData)
      } catch (e) {
        log("Erreur inattendue:", e)
      }
    }

    runTests()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🚀 Test Supabase Connectivity</h1>
      <ul className="space-y-2">
        {logs.map((l, i) => (
          <li key={i} className="text-sm font-mono whitespace-pre-wrap">
            {l}
          </li>
        ))}
      </ul>
    </div>
  )
}