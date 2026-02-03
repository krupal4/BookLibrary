import type { FunctionComponent, ReactNode } from "react";
import { ConfigProvider } from "antd";

export interface StylesProviderProps {
    children: ReactNode
}
 
export const StylesProvider: FunctionComponent<StylesProviderProps> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
            }}
        >
            {children}
        </ConfigProvider>
    );
}