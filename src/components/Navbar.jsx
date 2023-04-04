import { useData } from "../state/useData";

export default function Navbar({ data }) {

    const { setFlagData } = useData(data);
    const continents = [...new Set((data.map((recs)=>recs.continents)).flat(1))];
    const options = continents.map((recs,idx)=> <option key={'option'+idx} value={recs}>{recs}</option>)

    function getContinentData(event){
        event.preventDefault();
        const selectedOption = event.target.value;

        if(selectedOption!==""){
            const filterData = data.filter((recs)=> recs.continents.includes(selectedOption));
            setFlagData(filterData);
        }
        else{
            setFlagData(data);
        }
    }


    return (
        <div id="navbar">
            <nav>
                <a href={"/"}>FlagFact</a>
                <select id="continent-select" onChange={(event)=>getContinentData(event)}>
                    <option key={"none"} value="">None</option>
                    {options}
                </select>
            </nav>
        </div>
    )
}