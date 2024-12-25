import AppRoutes from "./routes/AppRoutes";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <>
            <ToastContainer />

      <AppRoutes />
    </>
  );
}

export default App;
