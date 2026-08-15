function ConversationsList({
  conversations,
}: {
  conversations: { id: string }[]
}) {
  console.log(conversations)
  return (
    <div className="section-card">
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>{conversation.id}</li>
        ))}
      </ul>
    </div>
  )
}

export default ConversationsList
