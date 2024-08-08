import {createBrowserRouter} from "react-router-dom";
import Wallet from "../pages/Wallet/Wallet";
import CandidateRegistration from "../pages/Candidate/CandidateRegistration";
import VoterRegistration from "../pages/Voter/VoterRegistration";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import ElectionCommision from "../pages/ElectionCommision/ElectionCommision";
import CandidatesList from "../pages/Candidate/CandidateList";
import VoterList from "../pages/Voter/VoterList";
import TokenExchange from "../pages/TokenExchange.jsx/TokenExchange";
import VoterProfile from "../pages/Voter/VoterProfile";

export const routes = createBrowserRouter([
    {path:"/",element:<Wallet/>},
    {path:"/candidate-registration",element:(
        <div>
             <NavigationBar/>
            <CandidateRegistration/>
        </div>
    
    )},
    {path:"/voter-registration",element:(
            <div>
                <NavigationBar/>
                <VoterRegistration/>
            </div>
   
    )},
    // {path:"/election-commision",element:<ElectionCommision/>},
    {path:"/candidate-list",element:(
            <div>
                <NavigationBar/>
                <CandidatesList/>
            </div>
    
    )},
    {path:"/voter-list",element:(
            <div>
                <NavigationBar/>
                <VoterList/>
            </div>
    )},
    {path:"/election-commision",element:(
        <div>
            <NavigationBar/>
            <ElectionCommision/>
        </div>
)},
    {path:"/token-exchange",element:(
        <div>
            <NavigationBar/>
            <TokenExchange/>
        </div>
    )},
    {path:"/voter-profile",element:(
        <div>
            <NavigationBar/>
            <VoterProfile/>
        </div>
    )}
])