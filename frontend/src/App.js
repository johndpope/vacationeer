import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage.jsx'
import ActivationPage from './pages/ActivationPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminPage from './pages/AdminPage.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import DashboardPage from './pages/DashboardPage.jsx'
import SellerDashboardPage from './pages/SellerDashboardPage.jsx'
import NewHotelsPage from './pages/NewHotelsPage.jsx'
import StripeCallbackPage from './pages/StripeCallbackPage.jsx'
import EditHotelPage from './pages/EditHotelPage.jsx'
import ViewHotelPage from './pages/ViewHotelPage.jsx'
import StripeSuccessPage from './pages/StripeSuccessPage.jsx'
import StripeCancelPage from './pages/StripeCancelPage.jsx'
import SearchResultPage from './pages/SearchResultPage.jsx'
// import ShopPage from './pages/ShopPage.jsx'

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/register' component={RegisterPage} exact />
        <Route path='/login' component={LoginPage} exact />
        <Route
          path='/authentication/activate/:token'
          component={ActivationPage}
          exact
        />
        <PrivateRoute path='/user/dashboard' component={DashboardPage} exact />
        <PrivateRoute
          path='/user/dashboard/seller'
          component={SellerDashboardPage}
          exact
        />
        <PrivateRoute
          path='/user/dashboard/profile'
          component={ProfilePage}
          exact
        />
        <PrivateRoute path='/hotels/new' component={NewHotelsPage} exact />
        <PrivateRoute
          path='/hotel/edit/:hotelId'
          component={EditHotelPage}
          exact
        />
        <PrivateRoute
          path='/stripe/callback'
          component={StripeCallbackPage}
          exact
        />
        <AdminRoute path='/admin' component={AdminPage} exact />
        <Route
          path='/authentication/forgot-password'
          component={ForgotPasswordPage}
          exact
        />
        <Route
          path='/authentication/password/reset/:token'
          component={ResetPasswordPage}
          exact
        />
        <Route path='/hotel/:hotelId' component={ViewHotelPage} exact />
        <PrivateRoute
          path='/stripe/success/:hotelId'
          component={StripeSuccessPage}
          exact
        />
        <PrivateRoute
          path='/stripe/cancel'
          component={StripeCancelPage}
          exact
        />
        <Route path='/search-result' component={SearchResultPage} exact />
        {/* <Route path='/search-result' component={ShopPage} exact /> */}
      </Switch>
    </Router>
  )
}

export default App
