import { useState } from 'react'
import UserList from '../components/admin/UserList'

const Admin = () => {
  const [showAdminData, setShowAdminData] = useState(null)

  const handleShowUserList = () => {
    setShowAdminData(<UserList />)
  }

  return (
    <>
      <button onClick={handleShowUserList}>User List</button>
      {showAdminData}
    </>
  )
}
export default Admin
