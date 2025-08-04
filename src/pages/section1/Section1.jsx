import { useNavigate } from 'react-router-dom'
import './section1.css'
import BackButton from '../../components/Backbutton/Backbutton'

function Section1() {
    const navigate = useNavigate()

    return (
        <div className="weather-container" style={{ position: 'relative' }}>
            <BackButton />
        </div>
    )
}

export default Section1
