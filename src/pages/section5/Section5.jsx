import { useNavigate } from 'react-router-dom'
import './section5.css'
import BackButton from '../../components/Backbutton/Backbutton'

function Section5() {
    const navigate = useNavigate()

    return (
        <div className="weather-container" style={{ position: 'relative' }}>
            <BackButton />
        </div>
    )
}

export default Section5
