import {Outlet} from "react-router-dom";
import Navigation from "./Navigation.tsx";

export default function RootLayout() {
    return (
        <>
            <Outlet></Outlet>
            <Navigation></Navigation>
        </>
    )
}
