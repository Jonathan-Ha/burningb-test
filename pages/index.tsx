import React, {useCallback, useEffect, useState} from "react";
import {GetServerSidePropsContext} from "next";
import ProductSuggestUI from "@/components/Interfaces/ProductSuggestUI";
import * as MDLProduct from "@/models/Product";
import styles from './styles.module.scss'

export interface Props {
}

export function Home(props: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataProduct, setDataProduct] = useState<any>(undefined);
    const [totalRdProduct, setTotalRdProduct] = useState(0);

    const hdlListProduct = useCallback((trigger = false) => {
        setLoading(true);
        MDLProduct.listPaging(null).then(ft => {
            console.log(ft);
            const outDtProduct = ft.data.products;
            const total = ft.data.total;
            setDataProduct(outDtProduct);
            setTotalRdProduct(total);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            console.log("HomePage - hdlListProduct");
        });
    }, []);

    useEffect(() => {
        hdlListProduct();
    }, [hdlListProduct]);

    return (
        <>
            <div className={styles["blockHomePage"]}>
                <section className={styles["suggestionArea"]}>
                    <div className={styles["wrapHeader"]}>
                        <h2 className={styles["h2Title"]}>Suggestion</h2>
                    </div>
                    <ProductSuggestUI loading={loading} dataProduct={dataProduct}/>
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
