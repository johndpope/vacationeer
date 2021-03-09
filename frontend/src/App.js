import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivatePage from './pages/PrivatePage'
import ActivationPage from './pages/ActivationPage'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import PrivateRoute from './components/PrivateRoute'
import AdminPage from './pages/AdminPage'
import AdminRoute from './components/AdminRoute'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path='/' component={HomePage} exact />
				<Route path='/signup' component={SignUpPage} exact />
				<Route path='/signin' component={SignInPage} exact />
				<Route path='/authentication/activate/:token' component={ActivationPage} exact />
				<PrivateRoute path='/private' component={PrivatePage} exact />
				<AdminRoute path='/admin' component={AdminPage} exact />
			</Switch>
		</Router>
	)
}

export default App
