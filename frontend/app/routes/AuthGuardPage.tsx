import type { FunctionComponent } from "react";
import { Navigate } from "react-router";
import { AxiosHelper } from "~/common/AxiosHelper";

interface AuthGuardPageProps {   
}
 
const AuthGuardPage: FunctionComponent<AuthGuardPageProps> = () => {
    if (AxiosHelper.getJwtToken() === null ) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to="/dashboard" replace />;
}
 
export default AuthGuardPage;