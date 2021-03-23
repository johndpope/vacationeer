import React from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Facebook = ({ informParent = (f) => f }) => {
  const facebookResponse = (response) => {
    console.log(response)
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken },
    })
      .then((response) => {
        console.log('FACEBOOK SIGNIN SUCCESS', response)

        informParent(response)
      })
      .catch((error) => {
        console.log('FACEBOOK SIGNIN ERROR', error.response)
      })
  }
  return (
    <div className='pb-3'>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={facebookResponse}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className='btn btn-primary btn-raised btn-lg btn-block'
          >
            <i className='fab fa-facebook pr-2' /> Login with Facebook
          </button>
        )}
      />
    </div>
  )
}

export default Facebook
