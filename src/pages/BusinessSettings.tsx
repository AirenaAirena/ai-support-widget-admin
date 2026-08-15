import { useState, useEffect } from 'react'
import supabase from '../supabaseClient'

function BusinessSettings({ businessId }: { businessId: string }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [address, setAddress] = useState('')
  const [widgetColor, setWidgetColor] = useState('')

  useEffect(() => {
    async function fetchBusinessData() {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
      if (error) {
        return console.error(error)
      }

      setName(data[0].name)
      setPhone(data[0].phone || '')
      setEmail(data[0].email || '')
      setWelcomeMessage(data[0].welcome_message || '')
      setShortDescription(data[0].short_description || '')
      setAddress(data[0].address || '')
      setWidgetColor(data[0].widget_color)
    }
    fetchBusinessData()
  }, [businessId])
  async function handleSaveSettings() {
    const { error } = await supabase
      .from('businesses')
      .update({
        name,
        phone,
        email,
        welcome_message: welcomeMessage,
        short_description: shortDescription,
        address,
        widget_color: widgetColor,
      })
      .eq('id', businessId)
    if (error) {
      return console.error(error)
    }
  }
  return (
    <div className="section-card">
      <h2>Business Settings</h2>
      <label>Business name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label>Phone</label>
      <input
        type="text"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <label>Welcome Message</label>
      <input
        type="text"
        value={welcomeMessage}
        onChange={(event) => setWelcomeMessage(event.target.value)}
      />
      <label>Description short</label>
      <input
        type="text"
        value={shortDescription}
        onChange={(event) => setShortDescription(event.target.value)}
      />
      <label>Address</label>
      <input
        type="text"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <label>Widget color</label>
      <input
        type="color"
        value={widgetColor}
        onChange={(event) => setWidgetColor(event.target.value)}
      />
      <button onClick={handleSaveSettings}>Save</button>
    </div>
  )
}
export default BusinessSettings
