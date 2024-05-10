import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      uid,
      name,
      city, // Add city data
      country,
      amount,
      description,
      imageUrl,
      timestamp: new Date()
    })
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setCity('')
      setCountry('')
      setAmount('')
      setDescription('');
      setImageUrl('');
    }
  }, [response.success])

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>City:</span>
          <input
            type="text"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </label>
        <label>
          <span>Country:</span>
          <input
            type="text"
            required
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <label>
          <span>Description:</span>
          <textarea
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{
              width: '100%',
              height: '50px',
              resize: 'vertical'
            }}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  )
}