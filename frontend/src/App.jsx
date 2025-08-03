import { Routes,Route } from "react-router-dom"
import NavBar from "./components/ui/NavBar"
import Createpage from "./pages/Createpage"
import Homepage from "./pages/Homepage"
import {Box,useColorModeValue} from '@chakra-ui/react'

function App() {
 

  return (
    <Box minh={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
   <NavBar/>
   <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/createpage" element={<Createpage/>}/>
   </Routes>
 
    </Box>
  )
}

export default App
