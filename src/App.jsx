//Style 
import "./styles/global/style.css";
//Node Module
import { useEffect, useState } from "react";
//Projects
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import DisplayFlag from "./components/DisplayFlag";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import { useData } from "./state/useData";

export default function App() {
  // Local state
  const [apiData, setAPIData] = useState([]);
  const [status, setStatus] = useState(0);   //0:Loading, 1:success, 2:error
  const {setFlagData} = useData();

  //Properties
  const apiURL = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    const request = await fetch(apiURL).catch(onFail);
    const data = await request.json();
    onSuccess(data);
  }

  function onSuccess(data) {
    setStatus(1);
    setAPIData(data);
    setFlagData(data);
  }

  function onFail() {
    setStatus(2);
  }


  return (<div>
    {(status === 0) && <Loading />}
    {(status === 2) && <h1>Error while Fetch Data...</h1>}
    {(status === 1) &&
      <div className="app">
        <Navbar data={apiData}/>
        <DisplayFlag data={apiData} />
        <Footer/>
        <Modal />
      </div>}
  </div>)
}


