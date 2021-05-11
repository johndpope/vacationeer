import { useState } from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify'
import { isAuthenticated, getCookie } from './HelperFunctions'
import { StarOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'

const RatingModal = ({ children }) => {
  const [modalVisibility, setModalVisibility] = useState(false)

  const history = useHistory()
  const { hotelId } = useParams()

  const handleModal = () => {
    if (isAuthenticated() && getCookie().token) {
      setModalVisibility(!modalVisibility)
    } else {
      history.push({
        pathname: '/login',
        state: { from: `/hotel/${hotelId}` },
      })
    }
  }
  return (
    <>
      <div className='pointer' onClick={handleModal}>
        <StarOutlined className='star-color mb-2 d-flex justify-content-center' />
        {isAuthenticated() ? 'Leave rating' : 'Login to leave rating'}
      </div>

      <Modal
        title='Leave rating'
        centered
        visible={modalVisibility}
        onOk={() => {
          setModalVisibility(false)
          toast.success('Rating successfully added!')
        }}
        onCancel={() => setModalVisibility(false)}
      >
        {children}
      </Modal>
    </>
  )
}

export default RatingModal
