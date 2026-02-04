import type { FunctionComponent, ReactNode } from "react";
import { Navigate } from "react-router";
import { AxiosHelper } from "~/common/AxiosHelper";

interface AuthGuardPageProps {   
    children: ReactNode
}
 
const AuthGuardPage: FunctionComponent<AuthGuardPageProps> = ({children}) => {
    if (AxiosHelper.getJwtToken() === null) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to="/dashboard" replace />;
}
 
export default AuthGuardPage;