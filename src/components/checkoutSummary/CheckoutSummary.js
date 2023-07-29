import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from "../../redux/slice/cartSlice";
import Card from "../card/Card";
import { shipFeeValue } from "../../pages/checkout/CheckoutDetails";
import styles from "./CheckoutSummary.module.scss"
import { toast } from "react-toastify";
import { shippingFeeAmount } from "../../redux/slice/checkoutSlice";

const CheckoutSummary = ({ shippingFee, selectedProvince }) => {
    const cartItems = useSelector(selectCartItems);
    const shipFee = useSelector(shippingFeeAmount)
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    const [totalAmount, setTotalAmount] = useState(0)

    const provinceFee = [
        {
            "province": "-- Select Province --",
            "shipFee": 0
        },
        {
            "province": "Abra",
            "shipFee": 165
        },
        {
            "province": "Agusan del Norte",
            "shipFee": 195
        },
        {
            "province": "Agusan del Sur",
            "shipFee": 195
        },
        {
            "province": "Aklan",
            "shipFee": 180
        },
        {
            "province": "Albay",
            "shipFee": 165
        },
        {
            "province": "Antique",
            "shipFee": 180
        },
        {
            "province": "Apayao",
            "shipFee": 205
        },
        {
            "province": "Aurora",
            "shipFee": 205
        },
        {
            "province": "Basilan",
            "shipFee": 205
        },
        {
            "province": "Bataan",
            "shipFee": 205
        },
        {
            "province": "Batanes",
            "shipFee": 205
        },
        {
            "province": "Batangas",
            "shipFee": 205
        },
        {
            "province": "Zamboanga Sibugay",
            "shipFee": 195
        }
    ]

    useEffect(() => {
        console.log(totalAmount)
        const getShippingFee = () => {
            for (const fee of provinceFee) {
                if (shipFee=== fee.province) {
                    return fee.shipFee;
                }
            }
            return 0;
        };
        const updatedShippingFee = getShippingFee();
        const newTotalAmount = cartTotalAmount + updatedShippingFee
        setTotalAmount(newTotalAmount)
        //const newTotalAmount = cartTotalAmount
        console.log(newTotalAmount)
    }, [cartTotalAmount, selectedProvince, provinceFee])
    
    
    return <div>
        <h3>Checkout Summary</h3>
        <div>
            {cartItems.length === 0 ? (
                <>
                <p>No item in your cart.</p>
                <button className="--btn">
                    <Link to="/#products">Back To Shop</Link>
                </button>
                </>
            ) : (
                <div>
                    <p>
                        <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
                    </p>
                    <div className={styles.text}>
                        <h4>Subtotal: </h4>
                        <h3>{totalAmount.toFixed(2)}</h3>
                        <div></div>
                        {/* <p>Shipping Fee: {updatedShippingFee}</p> */}
                    </div>
                    {cartItems.map((item, index) => {
                        const {id, name, price, cartQuantity} = item
                        return (
                            <Card key={id} cardClass={styles.card}>
                                <h4>Product: {name}</h4>
                                <p>Quantity: {cartQuantity}</p>
                                <p>Unit Price: {price}</p>
                                <p>Set Price: {price * cartQuantity}</p>
                                
                                {/* <p>Selected Province: {selectedProvince}</p> */}
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    </div>;
};

export default CheckoutSummary;