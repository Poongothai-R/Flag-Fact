import FlagDetails from "./FlagDetails";
import {useModal} from "../state/useModal";


export default function FlagItem({recs,idx}){

    const { setModal } = useModal();

    return(
    <div className="card" key={'dflag' + idx} id={'dflag' + idx}>
        <img src={recs.flags.png} alt={recs.name.official + 'flag'} />
        <h1>{recs.name.common}</h1>
        <button onClick={() => setModal(<FlagDetails key={'card' + idx} data={recs} />)} />
    </div>
    );
}