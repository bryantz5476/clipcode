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
                            "contents": {
                                "quantityIncrement": true,
                                "quantityDecrement": true,
                                "quantityInput": true
                            },
                            "styles": {
                                "cart": {
                                    "background": "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
                                    "backdrop-filter": "blur(20px)",
                                    "-webkit-backdrop-filter": "blur(20px)",
                                    "color": "#f8fafc",
                                    "border-left": "1px solid rgba(255, 255, 255, 0.08)",
                                    "display": "flex",
                                    "flex-direction": "column",
                                    "height": "100%",
                                    "max-height": "100vh"
                                },
                                "header": {
                                    "background-color": "transparent",
                                    "color": "#f8fafc",
                                    "border-bottom": "1px solid rgba(255, 255, 255, 0.06)",
                                    "padding": "28px 24px",
                                    "flex": "0 0 auto"
                                },
                                "title": {
                                    "color": "#e2e8f0",
                                    "font-weight": "500",
                                    "font-size": "18px",
                                    "letter-spacing": "0.01em"
                                },
                                "lineItems": {
                                    "background-color": "transparent",
                                    "padding": "24px",
                                    "flex": "1 1 auto",
                                    "overflow-y": "auto",
                                    "min-height": "0",
                                    "-webkit-overflow-scrolling": "touch"
                                },
                                "subtotalText": {
                                    "color": "#94a3b8",
                                    "text-transform": "uppercase",
                                    "letter-spacing": "0.08em",
                                    "font-size": "11px",
                                    "font-weight": "500",
                                    "margin-bottom": "8px"
                                },
                                "subtotal": {
                                    "color": "#f1f5f9",
                                    "font-weight": "600",
                                    "font-size": "28px",
                                    "margin-bottom": "16px"
                                },
                                "notice": {
                                    "color": "#94a3b8",
                                    "font-size": "12px",
                                    "margin-top": "8px",
                                    "margin-bottom": "20px",
                                    "line-height": "1.6",
                                    "padding": "14px 16px",
                                    "background-color": "rgba(255, 255, 255, 0.03)",
                                    "border-radius": "8px",
                                    "border": "1px solid rgba(255, 255, 255, 0.05)"
                                },
                                "currency": {
                                    "color": "#f1f5f9",
                                    "font-size": "18px",
                                    "font-weight": "500"
                                },
                                "close": {
                                    "color": "#94a3b8",
                                    "transition": "all 0.2s ease",
                                    ":hover": {
                                        "color": "#f1f5f9"
                                    }
                                },
                                "button": {
                                    "background": "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                    "color": "#ffffff",
                                    "font-weight": "600",
                                    "text-transform": "none",
                                    "letter-spacing": "0.01em",
                                    "border-radius": "10px",
                                    "padding": "18px 28px",
                                    "font-size": "15px",
                                    "cursor": "pointer",
                                    "border": "none",
                                    "margin-top": "8px",
                                    "transition": "all 0.2s ease",
                                    ":hover": {
                                        "background": "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                        "transform": "translateY(-1px)"
                                    }
                                },
                                "footer": {
                                    "background-color": "transparent",
                                    "border-top": "none",
                                    "padding": "0",
                                    "margin-top": "auto",
                                    "flex": "0 0 auto",
                                    "width": "100%"
                                },
                                "lineItem": {
                                    "background-color": "transparent",
                                    "border-bottom": "1px solid rgba(255, 255, 255, 0.04)",
                                    "padding-bottom": "16px",
                                    "padding-top": "16px",
                                    "margin-bottom": "0"
                                },
                                "itemTitle": {
                                    "color": "#f1f5f9",
                                    "font-weight": "500",
                                    "font-size": "14px"
                                },
                                "variantTitle": {
                                    "color": "#64748b",
                                    "font-size": "12px"
                                },
                                "price": {
                                    "color": "#00B4D8",
                                    "font-weight": "600",
                                    "font-size": "15px"
                                }
                            },
                            "text": {
                                "title": "Tu Carrito",
                                "total": "Total",
                                "button": "Proceder al Pago Seguro",
                                "notice": ""
                            },
                            "templates": {
                                "footer": `
                                    <div style="margin-top: 24px; padding: 24px; border-top: 1px solid rgba(255,255,255,0.08);">
                                        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                                            <div style="display: flex; align-items: center; gap: 8px;">
                                                <svg width="16" height="16" fill="none" stroke="#00B4D8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                                <span style="color: #e2e8f0; font-size: 13px;"><strong>Entrega Flash</strong> · 48h</span>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 8px;">
                                                <svg width="16" height="16" fill="none" stroke="#00B4D8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                                <span style="color: #e2e8f0; font-size: 13px;"><strong>Pago Seguro</strong> · SSL</span>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 8px;">
                                                <svg width="16" height="16" fill="none" stroke="#00B4D8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                                                <span style="color: #e2e8f0; font-size: 13px;"><strong>Soporte</strong> · Humanos</span>
                                            </div>
                                        </div>
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                            <span style="color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; font-size: 11px; font-weight: 500;">{{data.text.total}}</span>
                                            <span style="color: #f1f5f9; font-size: 24px; font-weight: 600;">{{data.formattedTotal}}</span>
                                        </div>
                                        <button class="{{data.classes.cart.button}}" type="button">{{data.text.button}}</button>
                                    </div>
                                `
                            }
                        },
                        "lineItem": {
                            "contents": {
                                "quantityIncrement": true,
                                "quantityDecrement": true,
                                "quantityInput": true,
                                "quantity": true,
                                "button": true
                            },
                            "styles": {
                                "variantTitle": {
                                    "color": "#64748b"
                                },
                                "title": {
                                    "color": "#f1f5f9",
                                    "font-weight": "500"
                                },
                                "price": {
                                    "color": "#00B4D8",
                                    "font-weight": "600"
                                },
                                "quantity": {
                                    "display": "flex",
                                    "align-items": "center",
                                    "gap": "6px",
                                    "margin-top": "10px"
                                },
                                "quantityInput": {
                                    "color": "#f1f5f9",
                                    "background-color": "rgba(255, 255, 255, 0.05)",
                                    "border": "1px solid rgba(255, 255, 255, 0.1)",
                                    "border-radius": "6px",
                                    "width": "44px",
                                    "height": "32px",
                                    "text-align": "center",
                                    "font-weight": "500",
                                    "font-size": "13px"
                                },
                                "quantityIncrement": {
                                    "color": "#94a3b8",
                                    "background-color": "rgba(255, 255, 255, 0.05)",
                                    "border": "1px solid rgba(255, 255, 255, 0.1)",
                                    "border-radius": "6px",
                                    "width": "28px",
                                    "height": "28px",
                                    "font-size": "14px",
                                    "cursor": "pointer",
                                    "transition": "all 0.15s ease",
                                    ":hover": {
                                        "background-color": "rgba(255, 255, 255, 0.1)",
                                        "color": "#f1f5f9"
                                    }
                                },
                                "quantityDecrement": {
                                    "color": "#94a3b8",
                                    "background-color": "rgba(255, 255, 255, 0.05)",
                                    "border": "1px solid rgba(255, 255, 255, 0.1)",
                                    "border-radius": "6px",
                                    "width": "28px",
                                    "height": "28px",
                                    "font-size": "14px",
                                    "cursor": "pointer",
                                    "transition": "all 0.15s ease",
                                    ":hover": {
                                        "background-color": "rgba(255, 255, 255, 0.1)",
                                        "color": "#f1f5f9"
                                    }
                                },
                                "button": {
                                    "color": "#64748b",
                                    "background-color": "transparent",
                                    "border": "none",
                                    "font-size": "11px",
                                    "cursor": "pointer",
                                    "padding": "4px 0",
                                    "margin-top": "4px",
                                    "text-transform": "uppercase",
                                    "letter-spacing": "0.05em",
                                    "transition": "all 0.15s ease",
                                    ":hover": {
                                        "color": "#ef4444"
                                    }
                                }
                            },
                            "text": {
                                "button": "Eliminar"
                            }
                        },
                        "toggle": {
                            "styles": {
                                "toggle": {
                                    "background-color": "#18181b",
                                    ":hover": {
                                        "background-color": "#27272a"
                                    }
                                },
                                "count": {
                                    "color": "#ffffff",
                                    "font-size": "13px",
                                    "font-weight": "bold"
                                },
                                "iconPath": {
                                    "fill": "#ffffff"
                                }
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