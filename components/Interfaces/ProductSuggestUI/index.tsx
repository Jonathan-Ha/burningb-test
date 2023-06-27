import React, {useEffect, useMemo, useState} from "react";
import _ from "lodash";
import Image from "next/image";
import {FaStar} from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonTypeA from "@/components/SkeletonTypeA";
import styles from "./styles.module.scss";

export interface Props {
    loading?: boolean
    totalRdProduct?: number
    getMoreDataProduct: (values: any) => void
    dataProduct?: [{
        title?: string
        thumbnail?: string
        rating?: number
        description?: string
        price?: number
    }]
}

export const WrapResultMovie = (props: Props) => {
    const {loading, totalRdProduct, dataProduct, getMoreDataProduct} = props;
    const [dataProductInit, setDataProductInit] = useState<any>([]);

    useEffect(() => {
        let temp = [...dataProductInit, ...dataProduct]
        setDataProductInit(temp);
    }, [dataProduct]);

    const yieldDataProduct = useMemo(() => {
        if (dataProductInit && dataProductInit.length) {
            return _.map(dataProductInit, (ft: any, indexFt: number) => {
                return (<div key={indexFt} className={styles["wrapItem"]}>
                    <Image src={ft.thumbnail} alt="" width={100} height={100}/>
                    <div className={styles["desc"]}>
                        <div className={styles["wrapStar"]}><FaStar/> <span>{ft.rating}</span></div>
                        <p className={styles["name"]}>
                            <span className={styles["title"]}>{ft.title}</span> | <span>{ft.description}</span>
                        </p>
                        <p className={styles["price"]}>${ft.price}</p>
                    </div>
                </div>)
            });
        }
    }, [dataProductInit, loading]);

    return (
        <>
            <InfiniteScroll
                className={styles["wrapListItem"]}
                dataLength={dataProductInit ? dataProductInit.length : 0}
                next={getMoreDataProduct}
                hasMore={true}
                loader={setDataProductInit && setDataProductInit.length < totalRdProduct ?
                    "" : <SkeletonTypeA classDesc={styles["desc"]} classWrapItem={styles["wrapItem"]}
                                        quantity={30}/>}
            >
                {yieldDataProduct}
            </InfiniteScroll>
        </>
    )
}

export default WrapResultMovie
