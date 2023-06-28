import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Input, Layout} from 'antd';
import {BiSearchAlt} from "react-icons/bi";
import {FaRegUser} from "react-icons/fa";
import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from "./styles.module.scss";

export interface Props {
}

export const Header = (props: Props) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<any>(null);
    const {Header} = Layout;
    const {Search} = Input;

    const querySearch = router.query.search as string

    useEffect(() => {
        setSearchValue(querySearch);
    }, [querySearch]);


    const onSearch = (value: any) => {
        return router.replace({
            pathname: "/",
            query: {search: value}
        });
    }

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
                            value={searchValue}
                            enterButton={<><BiSearchAlt/> <span>Search</span></>}
                            size="large"
                            onChange={(e: any) => setSearchValue(e.target.value)}
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
