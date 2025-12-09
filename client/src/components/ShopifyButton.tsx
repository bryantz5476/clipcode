import React, { useEffect } from 'react';

export const ShopifyButton = () => {
    useEffect(() => {
        const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

        const initShopify = () => {
            // @ts-ignore 
            const client = window.ShopifyBuy.buildClient({
                domain: '0ea3fc-32.myshopify.com',
                storefrontAccessToken: '772a80d84696d8169d00b406c373b881',
            });

            // @ts-ignore
            window.ShopifyBuy.UI.onReady(client).then(function (ui) {
                // Clear before creating to prevent duplicates (handles HMR and Strict Mode)
                const node = document.getElementById('product-component-1765191380487');
                if (node) node.innerHTML = '';

                ui.createComponent('product', {
                    id: '10332875849994',
                    node: document.getElementById('product-component-1765191380487'),
                    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                    options: {
                        "product": {
                            "contents": {
                                "img": false,
                                "title": false,
                                "price": false,
                                "options": false
                            },
                            "text": {
                                "button": "Empezar mi Proyecto Ya"
                            },
                            "styles": {
                                "product": {
                                    "@media (min-width: 601px)": {
                                        "max-width": "100%",
                                        "margin-left": "0",
                                        "margin-bottom": "0px",
                                        "margin-top": "0px"
                                    },
                                    "width": "100%",
                                    "max-width": "100%",
                                    "margin-top": "0px !important",
                                    "margin-bottom": "0px !important"
                                },
                                "button": {
                                    "background-color": "rgba(255, 255, 255, 0.05)",
                                    "color": "#ffffff",
                                    ":hover": {
                                        "background-color": "rgba(255, 255, 255, 0.1)"
                                    },
                                    "border-radius": "12px",
                                    "width": "100%",
                                    "padding": "24px 0",
                                    "border": "1px solid rgba(255, 255, 255, 0.1)",
                                    "transition": "all 0.3s ease",
                                    "font-family": "Outfit, sans-serif",
                                    "font-weight": "600",
                                    "font-size": "16px",
                                    "letter-spacing": "0px",
                                    "text-transform": "none"
                                }
                            }
                        },
                        "cart": {
                            "styles": {
                                "button": {
                                    "background-color": "#000000"
                                }
                            },
                            "text": {
                                "total": "Total",
                                "button": "Finalizar Pedido"
                            }
                        }
                    }
                });
            });
        };

        if ((window as any).ShopifyBuy) {
            if ((window as any).ShopifyBuy.UI) {
                initShopify();
            } else {
                loadScript();
            }
        } else {
            loadScript();
        }

        function loadScript() {
            const script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = initShopify;
        }

        // Proper cleanup for React Strict Mode / HMR
        return () => {
            const node = document.getElementById('product-component-1765191380487');
            if (node) node.innerHTML = '';
        };

    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                #product-component-1765191380487 {
                    width: 100% !important;
                    display: block !important;
                }
                #product-component-1765191380487 iframe {
                    margin: 0 !important;
                    padding: 0 !important;
                    display: block !important;
                    min-height: 0 !important;
                    width: 100% !important;
                    max-width: 100% !important;
                }
                .shopify-buy__product {
                    margin: 0 !important;
                    display: block !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    text-align: center !important; 
                }
                .shopify-buy__product > div {
                    max-width: 100% !important;
                }
                .shopify-buy__btn-wrapper {
                     margin: 0 !important;
                     padding: 0 !important;
                }
                .shopify-buy__btn {
                    width: 100% !important;
                    margin: 0 !important;
                    display: block !important;
                }
                `
            }} />
            <div id='product-component-1765191380487'></div>
        </>
    );
};