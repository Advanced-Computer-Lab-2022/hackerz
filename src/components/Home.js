import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function Home() {
    let navigate = useNavigate();

    const reportNavigate = () => {
        return navigate('/report');
      }
    
    return(
        <div>
            <Button onClick={reportNavigate} className="w-25 mx-auto mb-3" variant="primary">View My Reports</Button>
        </div>
    )
}