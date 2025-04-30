import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";

const DefaultLayout = () => {
    return (
        <>
            <Navbar />
            <Container sx={{minHeight: "100vh"}}>
                <Outlet/>
            </Container>
            <Footer/>
        </>
    );
};

export default DefaultLayout;