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
  const history = useHistory() // Create useHistory instance

  const handleCityClick = () => {
    history.push('/cities') // Navigate to /cities route
  }

  return (
    <div  style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      height: "auto",
      width: "auto",
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      padding: "20px",
      margin: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
    }}>
      <div>
       <TransactionList />
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
        <button onClick={handleCityClick}>City Information</button>  {/* City button */}
      </div>
    </div>
  )
}
