import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import HomePage from "../pages/home/HomePage";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ManageProfile from "../pages/dashboard/manageProfile/ManageProfile";
import MyBookings from "../pages/dashboard/myBookings/MyBookings";
import AddStories from "../pages/dashboard/AddStories/AddStories";
import ManageStories from "../pages/dashboard/manageStories/ManageStories";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/dashboard/AdminDashboard/manageUsers/ManageUsers";
import AllTrips from "../pages/AllTrips/AllTrips";
import PackageDetails from "../pages/packageDetails/PackageDetails";
import ApplyAsGuide from "../pages/dashboard/applyForTourGuide/ApplyAsGuide";
import ManageCandidates from "../pages/dashboard/AdminDashboard/ManageCandidates/ManageCandidates";
import GuideProfile from "../pages/GuideProfile/GuideProfile";
import AdminRoute from "./AdminRoute";
import AddPackages from "../pages/dashboard/AdminDashboard/AddPackages/AddPackages";
import Community from "../pages/community/Community";
import Payment from "../pages/dashboard/payment/Payment";
import MyAssignedTours from "../pages/dashboard/guideDashboard/myAssignedTour/MyAssignedTour";
import AboutUs from "../pages/aboutUs/AboutUs";

const router = createBrowserRouter([
    {
      path: "/",
      element: <BasicLayout></BasicLayout>,
      children: [
        {
            path: '/',
            element: <HomePage></HomePage>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'register',
            element:<Register></Register>
        },
        {
            path: 'allTrips',
            element: <AllTrips></AllTrips>
        },
        {
            path: 'packageDetails/:id',
            element: <PackageDetails></PackageDetails>
        },
        {
            path:'guideProfile/:id',
            element: <GuideProfile></GuideProfile>
        },
        {
            path: 'allStories',
            element: <Community></Community>
        },
        {
            path: 'about', 
            element: <AboutUs></AboutUs>
        }
      ]
    },
    {
        path:"dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path:'manageProfile',
                element:<ManageProfile></ManageProfile>
            },
            {
                path:'my-bookings',
                element:<MyBookings></MyBookings>
            },
            {
                path:'add-stories',
                element:<AddStories></AddStories>
            },
            {
                path: 'manage-stories',
                element: <ManageStories></ManageStories>
            },
            {
                path: 'tourGuideApplication',
                element: <ApplyAsGuide></ApplyAsGuide>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            },
            // admin route
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'manage-candidates',
                element: <AdminRoute><ManageCandidates></ManageCandidates></AdminRoute>
            },
            {
                path: 'add-package',
                element: <AddPackages></AddPackages>
            },

            // tour-guide route
            {
                path: 'my-assigned-tour',
                element:<MyAssignedTours></MyAssignedTours>
            }
            
        ]
    }
  ]);
export default router;