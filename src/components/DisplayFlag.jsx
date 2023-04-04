import { useData } from "../state/useData";
import { FiSearch } from "react-icons/fi";
import FlagItem from "./FlagItem";


export default function DisplayFlag({ data }) {

    const {flagData, setFlagData} = useData();

    const FlagCard = flagData.map((recs, idx) =>
        <FlagItem recs={recs} idx={idx}/>);

   async function searchFlag(event) {
        event.preventDefault();
        const searchkey = event.target.value;
        if (searchkey!=='') {
            const filterData =
                await flagData.filter((recs) => {
                const searchTerm = searchkey.toLowerCase();
                const orgdata = recs.name.common.toLowerCase();
                return (searchTerm && orgdata.startsWith(searchTerm));
            });
            setFlagData(filterData);
        }
        else {
            setFlagData(data);
        }
    }

    return (
        <div id="displayflag">
            <div className="search">
                <input type="text" id="search-box" onChange={(event) => searchFlag(event)} />
                <label htmlFor="search-box"><FiSearch className="reacticons" /></label>
            </div>
            <div className="container">
                {FlagCard}
            </div>
        </div>
    )
}