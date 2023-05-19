import './App.css'
import UserRatingSystem from './components/UserRaitingSystem'

function App(): JSX.Element {

	return (
		<>
		<h3 style={{textAlign: 'center'}}>Интерфейс системы оценки</h3>
			<UserRatingSystem />
		</>
	)
}

export default App;
