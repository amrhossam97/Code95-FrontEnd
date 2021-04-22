import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className='mx-20 my-9 text-gray-700'>
      <Router>

        <Routes />
      </Router>
      </div>
      
    </>
  );
}
