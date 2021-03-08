import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ActivationPage from './pages/ActivationPage'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path='/' component={HomePage} exact />
				<Route path='/signup' component={SignUpPage} exact />
				<Route path='/signin' component={SignInPage} exact />
				<Route path='/authentication/activate/:token' component={ActivationPage} exact />
			</Switch>
		</Router>
	)
}

export default App
