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
                                "button": "shopiCONTRATAR AHORA"
                            },
                            "styles": {
                                "product": {
                                    "@media (min-width: 601px)": {
                                        "max-width": "100%",
                                        "margin-left": "0",
                                        "margin-bottom": "0px"
                                    }
                                },
                                "button": {
                                    "font-family": "System-ui, sans-serif",
                                    "font-weight": "600",
                                    "font-size": "15px",
                                    "padding": "20px 40px",
                                    // Gradient Sweep Logic
                                    "background-image": "linear-gradient(to right, #2563EB 50%, #ffffff 50%)",
                                    "background-size": "200% 100%",
                                    "background-position": "100% 0", // Start at White (Right side)
                                    "color": "#000000",            // Start Black Text
                                    ":hover": {
                                        "background-position": "0% 0", // Slide to Blue (Left side)
                                        "color": "#ffffff",            // Flip to White Text
                                        "box-shadow": "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
                                    },
                                    "border-radius": "12px",
                                    "width": "100%",
                                    "transition": "background-position 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.4s ease, box-shadow 0.4s ease",
                                    "letter-spacing": "1px",
                                    "text-transform": "uppercase",
                                    "box-shadow": "0 10px 20px -5px rgba(0, 0, 0, 0.2)"
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

    return <div id='product-component-1765191380487'></div>;
};