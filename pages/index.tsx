import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {GetServerSidePropsContext} from "next";
import ProductSuggestUI from "@/components/Interfaces/ProductSuggestUI";
import * as MDLProduct from "@/models/Product";
import styles from './styles.module.scss';

//*** Declare constant ***//
const LIMIT = 20;

export interface Props {
}

export function Home(props: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [dataProduct, setDataProduct] = useState<any>([]);
    const [totalRdProduct, setTotalRdProduct] = useState<any>(0);
    const [skipProduct, setSkipProduct] = useState<any>(0);
    const [limitProduct, setLimitProduct] = useState<any>(0);

    const {search} = router.query;

    const hdlListProduct = useCallback((skip?: number, limit?: number, trigger = false) => {
        const reqFt = {
            skip: skip,
            limit: limit
        }
        setLoading(true);
        MDLProduct.listPaging(reqFt).then((ft: any) => {
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

    const hdlSearch = useCallback((q?: any, skip?: number, limit?: number, trigger = false) => {
        const reqFt = {
            q: q,
            skip: skip,
            limit: limit
        }
        setLoading(true);
        MDLProduct.search(reqFt).then((ft: any) => {
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
            console.log("HomePage - hdlSearch");
        });
    }, []);

    useEffect(() => {
        if (search) {
            hdlSearch(search, 0, LIMIT);
        } else {
            hdlListProduct(0, LIMIT);
        }

        return () => {
            setDataProduct([]);
            setTotalRdProduct(0);
            setSkipProduct(0);
            setLimitProduct(0);
        }
    }, [hdlListProduct, hdlSearch, search]);

    const getMoreDataProduct = () => {
        let next = skipProduct + limitProduct;
        if (next < totalRdProduct) {
            if (search) {
                hdlSearch(search, next, LIMIT);
            } else {
                hdlListProduct(next, LIMIT);
            }
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
                                      skipProduct={skipProduct}
                                      limitProduct={limitProduct}
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
