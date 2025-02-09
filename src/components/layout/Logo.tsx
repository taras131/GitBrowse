import * as React from "react";
import Box from "@mui/material/Box";
import {FC} from "react";
import logo from "../../assets/logo/logo.svg";

const HEIGHT = 60;
const WIDTH = 60;

export interface IProps {
    height?: number;
    width?: number;
}

export const Logo: FC<IProps> = ({
                                     height = HEIGHT,
                                     width = WIDTH,
                                 }) => {
    return <Box alt="logo" component="img" height={height} src={logo} width={width}/>;
};


