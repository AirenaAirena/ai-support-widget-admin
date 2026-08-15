import { useState } from 'react'
import supabase from '../supabaseClient'

function Register({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
  const [email, setEmail] = useState<string>('')

  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [welcomeMessage, setWelcomeMessage] = useState<string>('')
  const [shortDescription, setShortDescription] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false)

  async function handleRegister() {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error)
    } else {
      if (!data.user) {
        console.error('No user returned from signUp')
        return
      }
      const { error } = await supabase.from('businesses').insert({
        user_id: data.user.id,
        email,
        name,
        phone,
        welcome_message: welcomeMessage,
        short_description: shortDescription,
        address,
        widget_color: '#4a90d9',
      })
      if (error) {
        console.error(error)
      } else {
        setRegistrationSuccess(true)
      }
    }
  }
  return registrationSuccess ? (
    <div>
      Registration successful!{' '}
      <button onClick={onRegisterSuccess}>Go to Login</button>
    </div>
  ) : (
    <>
      <input
        type="text"
        value={email}
        onChange={function (event) {
          setEmail(event.target.value)
        }}
      />
      <input
        type="password"
        value={password}
        onChange={function (event) {
          setPassword(event.target.value)
        }}
      />
      <input
        type="text"
        value={name}
        onChange={function (event) {
          setName(event.target.value)
        }}
      />
      <input
        type="text"
        value={phone}
        onChange={function (event) {
          setPhone(event.target.value)
        }}
      />
      <input
        type="text"
        value={welcomeMessage}
        onChange={function (event) {
          setWelcomeMessage(event.target.value)
        }}
      />
      <input
        type="text"
        value={shortDescription}
        onChange={function (event) {
          setShortDescription(event.target.value)
        }}
      />
      <input
        type="text"
        value={address}
        onChange={function (event) {
          setAddress(event.target.value)
        }}
      />
      <button onClick={handleRegister}>Register</button>
    </>
  )
}
export default Register
