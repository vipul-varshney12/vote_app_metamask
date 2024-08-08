import { Link } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";
import "./NavigationBar.css"; // Import the CSS file

const NavigationBar = () => {
  const {web3State}=useWeb3Context()
  const {electionCommissionStatus,selectedAccount}=web3State;
  return (
    <header>
      <nav className="navbar">
         <ul className="navbar__list"> 
          <li>
            <Link to="/candidate-registration">
              Candidate Registration
            </Link>
          </li>
          <li>
            <Link to="/candidate-list">
              Candidate List
            </Link>
          </li>
          <li>
            <Link to="/voter-registration">
              Voter Registration
            </Link>
          </li>
          {electionCommissionStatus?(<li>
            <Link to="/voter-list">
              Voter List
            </Link>
          </li>):(<div></div>)}
          {electionCommissionStatus?(<li>
            <Link to="/election-commision">
              Election Commission
            </Link>
          </li>):(<div></div>)}
          <li>
            <Link to="/token-exchange">
              Token Exchange
            </Link>
          </li>
          <li>
            <Link to="/voter-profile">
              Voter Profile
            </Link>
          </li>
        </ul>  
      </nav>
    </header>
  );
};
export default NavigationBar;
