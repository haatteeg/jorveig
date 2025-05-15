import { Random } from '../Random/Random';
import './Temp.css';

export const Temp = ({ data }) => {

    return (
        <div className="main-content">
            <div className='container'>
                <Random vocab={data.vocab} />
            </div>
        </div>
    )
}