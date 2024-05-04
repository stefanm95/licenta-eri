import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useHistory } from 'react-router-dom' // Import useHistory

// styles
import styles from './home.module.css'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions',
    ["uid", "==", user.uid],
    ['createdAt', 'desc']
  )
  const history = useHistory() // Create useHistory instance

  const handleCityClick = () => {
    history.push('/cities') // Navigate to /cities route
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
        <button onClick={handleCityClick}>City Information</button>  {/* City button */}
      </div>
    </div>
  )
}
