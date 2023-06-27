import React from 'react'
import {Layout} from "antd";
import styles from "./styles.module.scss"

export interface Props {}

export const Footer = (props: Props) => {
    const {Footer} = Layout;
    return (
        <>
            <Footer className={styles["blockFooter"]}>Ha Huynh Quang Truong ©2023</Footer>
        </>
    )
}

export default Footer
