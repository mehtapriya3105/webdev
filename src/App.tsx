import Labs from "./labs";
import Kambaz from "./Kambaz";

import { HashRouter,Routes,Route,Navigate} from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div>
        <h1>Welcome to Web Dev</h1>
        <Routes>
        <Route path="/" element={<Navigate to="Kambaz"/>}/>
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz/*" element={<Kambaz />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
