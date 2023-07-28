import React, { useEffect, useState } from 'react'
import styles from "./ReturnProduct.module.scss"
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slice/productSlice'
import { selectUserID, selectUserName } from '../../redux/slice/authSlice'
import { Link, useParams } from 'react-router-dom'
import Card from '../card/Card'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'
import useFetchDocuments from '../../customHooks/useFetchDocuments'
import spinnerImg from "../../assets/spinner.jpg"

const ReturnProduct = () => {
  const [review, setReview] = useState("")
  const [order, setOrder] = useState(null)
  const {id} = useParams()
  const { document } = useFetchDocuments("orders", id)
  const products = useSelector(selectProducts)
  const userID = useSelector(selectUserID)
  const userName = useSelector(selectUserName)

  useEffect(() => {
    setOrder(document)
  }, [document])

  const returnProduct = (e) =>{
    e.preventDefault()
    const today = new Date();
    const date =  today.toDateString();

    const returnConfig = {
      userID,
      userName,
      productID: id,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate()
    }

    try {
      addDoc(collection(db, "reviews"), returnConfig);
      toast.success("Return Form Submitted");
      setReview("")
    } catch(error) {
      toast.error(error.message);
    }
  }

  return (
    <section>
      <div className={styles.continue}>
        <Link to={`/order-details/${id}`}>&larr; Continue Shopping</Link>
      </div>
      <div className={`container ${styles.review}`}>
        <h2>Product Return Form</h2>
        {order === null ? (
          <img src={spinnerImg} alt='Loading...' style={{width: "60px"}}/>
        ):(
          <>
            <p><b>Product Name: </b> {order.name}</p>
          <img src={order.imageURL} alt={order.name} style={{width:"250px"}} />
        </>
        )}
        
        <Card cardClass={styles.card}>
          <form onSubmit={(e)=> returnProduct(e)}>
            <label>Return Details:</label>
            <textarea value= {review} required onChange= {(e)=> setReview(e.target.value)}cols="30" rows="10"></textarea>
            <button type='submit' className='--btn --btn-primary'>Submit Request</button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default ReturnProduct