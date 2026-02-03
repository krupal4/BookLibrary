import type { FunctionComponent, ReactNode } from "react";
import { ConfigProvider } from "antd";

export interface StylesProviderProps {
    children: ReactNode
}
 
export const StylesProvider: FunctionComponent<StylesProviderProps> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                    borderRadius: 2,
                    colorBgContainer: '#315211',
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}