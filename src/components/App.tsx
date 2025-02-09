import {Route, Routes} from "react-router-dom";
import React from "react";
import Message from "../features/message/ui/Message";
import Layout from "./layout/Layout";
import {routesConfig} from "../config/routes";

const App = () => {
    return (
        <Layout>
            <Routes>
                {routesConfig.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
            <Message/>
        </Layout>
    );
};

export default App;
