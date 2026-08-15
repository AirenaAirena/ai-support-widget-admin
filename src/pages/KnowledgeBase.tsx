import { useState, useEffect } from 'react'
import supabase from '../supabaseClient'

function KnowledgeBase({ businessId }: { businessId: string }) {
  const [documents, setDocuments] = useState<
    { id: string; extracted_text: string; title: string }[]
  >([])
  const [newText, setNewText] = useState('')
  const [newTitle, setNewTitle] = useState('')
  useEffect(() => {
    async function fetchDocuments() {
      const { data, error } = await supabase
        .from('knowledge_documents')
        .select('*')
        .eq('business_id', businessId)
      if (error) {
        return console.error(error)
      }
      setDocuments(data)
    }
    fetchDocuments()
  }, [businessId])

  async function handleAddDocument() {
    const { data, error } = await supabase
      .from('knowledge_documents')
      .insert({
        business_id: businessId,
        title: newTitle,
        extracted_text: newText,
      })
      .select()
    if (error) {
      return console.error(error)
    }
    setDocuments([...documents, data[0]])
    setNewText('')
    setNewTitle('')
  }
  async function handleDeleteDocument(id: string) {
    const { error } = await supabase
      .from('knowledge_documents')
      .delete()
      .eq('id', id)
    if (error) {
      return console.error(error)
    }
    const newDocuments = documents.filter((document) => document.id !== id)
    setDocuments(newDocuments)
  }
  return (
    <div className="section-card">
      <h2>Knowledge Base</h2>{' '}
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <span className="document-title"> {document.title}</span> :
            {document.extracted_text}
            <button onClick={() => handleDeleteDocument(document.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newText}
        onChange={(event) => setNewText(event.target.value)}
      />
      <input
        type="text"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <button onClick={handleAddDocument}>Add</button>
    </div>
  )
}

export default KnowledgeBase
