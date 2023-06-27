import React, {useMemo} from "react";
import _ from "lodash";
import Image from "next/image";
import {FaStar} from "react-icons/fa";
import styles from "./styles.module.scss"

export interface Props {
    loading?: boolean
    dataProduct?: [{
        title?: string
        thumbnail?: string
        rating?: number
        description?: string
        price?: number
    }]
}

export const WrapResultMovie = (props: Props) => {
    const {loading, dataProduct} = props;

    const yieldDataProduct = useMemo(() => {
        if (dataProduct && dataProduct.length) {
            return _.map(dataProduct, (ft: any, indexFt: number) => {
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
    }, [dataProduct, loading]);

    return (
        <>
            <div className={styles["wrapListItem"]}>
                {yieldDataProduct}
            </div>
        </>
    )
}

export default WrapResultMovie
