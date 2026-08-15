import { useState } from 'react'
import supabase from '../supabaseClient'

function Login({
  onLoginSuccess,
  onShowRegister,
}: {
  onLoginSuccess: (data: { id: string }[], businessId: string) => void
  onShowRegister: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', data.user.id)
      if (businessError) {
        return console.error(businessError)
      }
      console.log(businessData)
      const { data: conversationsData, error: conversationsError } =
        await supabase
          .from('conversations')
          .select('*')
          .eq('business_id', businessData[0].id)
      if (conversationsError) {
        return console.error(conversationsError)
      }
      console.log(conversationsData)
      onLoginSuccess(conversationsData, businessData[0].id)
    }
  }
  return (
    <div className="login-card">
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={handleLogin}>Log in</button>
      <button onClick={onShowRegister}>Register</button>
    </div>
  )
}

export default Login
