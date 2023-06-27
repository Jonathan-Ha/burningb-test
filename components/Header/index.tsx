import React from 'react'
import Image from "next/image";
import {Input, Layout} from 'antd';
import {BiSearchAlt} from "react-icons/bi";
import {FaRegUser} from "react-icons/fa";
import Link from 'next/link';
import styles from "./styles.module.scss"

export interface Props {
}

export const Header = (props: Props) => {
    const {Header} = Layout;
    const {Search} = Input;

    const onSearch = (value: any) => console.log(value);

    return (
        <>
            <Header>
                <div className={styles['blockHeader']}>
                    <Link href="/">
                        <div className={styles['logo']}>
                            <Image src="/logo.png" alt={"logo"} width={80} height={60}/>
                            <div className={styles['slogan']}>Online Shop</div>
                        </div>
                    </Link>
                    <div className={styles['search']}>
                        <Search
                            placeholder="Find the product, category or brand you need ..."
                            allowClear
                            enterButton={<><BiSearchAlt/> <span>Search</span></>}
                            size="large"
                            onSearch={onSearch}
                        />
                    </div>
                    <div className={styles['account']}>
                        <div className={styles['icon']}><FaRegUser/></div>
                        <div className={styles['info']}>
                            <span className={styles['info-ft']}>Welcome guest</span>
                        </div>
                    </div>
                </div>
            </Header>
        </>
    )
}

export default Header
