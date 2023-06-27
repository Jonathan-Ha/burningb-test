import React, {useCallback, useEffect, useState} from "react";
import {GetServerSidePropsContext} from "next";
import ProductSuggestUI from "@/components/Interfaces/ProductSuggestUI";
import * as MDLProduct from "@/models/Product";
import styles from './styles.module.scss';

export interface Props {
}

export function Home(props: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataProduct, setDataProduct] = useState<any>([]);
    const [totalRdProduct, setTotalRdProduct] = useState<any>(0);
    const [skipProduct, setSkipProduct] = useState<any>(0);
    const [limitProduct, setLimitProduct] = useState<any>(0);

    const hdlListProduct = useCallback((skip?: number, trigger = false) => {
        const reqFt = {
            skip: skip
        }
        setLoading(true);
        MDLProduct.listPaging(reqFt).then(ft => {
            const outDtProduct = ft.data.products;
            const total = ft.data.total;
            const skip = ft.data.skip;
            const limit = ft.data.limit;
            setDataProduct(outDtProduct);
            setTotalRdProduct(total);
            setSkipProduct(skip);
            setLimitProduct(limit);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            console.log("HomePage - hdlListProduct");
        });
    }, []);

    useEffect(() => {
        hdlListProduct();
    }, [hdlListProduct]);

    const getMoreDataProduct = () => {
        let next = skipProduct + limitProduct;
        if (next < totalRdProduct) {
            hdlListProduct(next);
        }
    }

    return (
        <>
            <div className={styles["blockHomePage"]}>
                <section className={styles["suggestionArea"]}>
                    <div className={styles["wrapHeader"]}>
                        <h2 className={styles["h2Title"]}>Suggestion</h2>
                    </div>
                    <ProductSuggestUI getMoreDataProduct={getMoreDataProduct}
                                      loading={loading}
                                      totalRdProduct={totalRdProduct}
                                      dataProduct={dataProduct}/>
                </section>
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let props = {
        meta: {
            key: 'home',
            title: 'Home page - Online Shop',
            noindex: false,
            nofollow: false,
            description: 'Home page - Online Shop',
            robotsProps: {}
        }
    }
    return {props}
}

export default Home;
