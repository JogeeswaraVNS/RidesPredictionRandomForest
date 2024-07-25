import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Rootlayout from "./rootlayout/Rootlayout";
import Maps from "./maps/Maps";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homelayout from "./homelayout/Homelayout";
import Howweprice from "./howweprice/Howweprice";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homelayout />,
      children: [
        {
          path: "/",
          element: <Rootlayout />,
        },
        {
          path: "/howweprice",
          element: <Howweprice />,
        },
      ],
    },
  ]);

  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
