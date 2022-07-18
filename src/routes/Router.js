import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListTrips from "../pages/ListTripsPage/ListTripsPage"
import ApplicationForm from "../pages/ApplicationFormPage/ApplicationFormPage"
import Home from "../pages/HomePage/HomePage"
import AdminHome from "../pages/AdminHomePage/AdminHomePage"
import Login from "../pages/LoginPage/LoginPage"
import CreateTrip from "../pages/CreateTripPage/CreateTripPage"
import TripDetails from "../pages/TripDetailsPage/TripDetailsPage"

const Router  = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="ListTrips" element={<ListTrips />} />
            <Route path="ApplicationForm" element={<ApplicationForm />} />
            <Route path="AdminHome" element={<AdminHome />}/>
            <Route path="Login" element={<Login />}/>
            <Route path="CreateTrip" element={<CreateTrip/>} />
            <Route path="TripDetails" element={<TripDetails/>} />
        </Routes>
    </BrowserRouter>
    )
}

export default Router;