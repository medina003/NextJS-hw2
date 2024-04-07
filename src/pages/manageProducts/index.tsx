import { Product } from "@/types"
import { useEffect, useState } from "react"
import styles from './ManageProduct.module.css'

const ManageProducts = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const [productType, setProductType] = useState('')
  const [product, setProduct ] = useState({});
  const [products, setProducts] = useState([])

  const fetchProducts = async() => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts()
  }, [products])

  const postProduct = async() => {
    const productToPost = { 
      id: 30,
      productType: productType,
      productName: name,
      productDesc: desc,
      productImg: img
    }; 
  
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productToPost)
    });
  
    const data = await response.json(); 
    console.log(data);
    await fetchProducts()
  }

  const deleteProduct = async(id: number) => {
    const response = await fetch(`api/products/${id}`, {
      method: 'DELETE'
    })

    const data = await response.json();
    console.log(data)
    await fetchProducts()
  }

  const editProduct = async(id: number) => {
    const productToEdit = { 
      id: id, 
      productType: productType,
      productName: name,
      productDesc: desc,
      productImg: img
    };
  
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productToEdit)
    });
  
    const data = await response.json();
    await fetchProducts();
  }
  
//   const showDetails = () => {
//    
//   } 

  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <h1 className={styles.heading}>Manage product</h1>
            <div className={styles.form}>
                <input className={styles.input} onChange={(e) => setName(e.target.value)} value={name} placeholder='name' type='text' name='name' />
                <input className={styles.input} onChange={(e) => setDesc(e.target.value)} value={desc} placeholder='desc' type='text' name='desc' />
                <input className={styles.input} onChange={(e) => setImg(e.target.value)} value={img} placeholder='img' type='text' name='img' />
                <input className={styles.input} onChange={(e) => setProductType(e.target.value)} value={productType} placeholder='productType' type='text' name='productType' />
            </div>
            <button onClick={postProduct}>Post products</button>
        </div>
        <hr className={styles.hr}></hr>
        <div className={styles.products}>
            {products.length > 0 ? products.map((p : Product) => 
            <>
                <div key={p.id}>
                  <h2>{p.name}</h2>
                  <button onClick={() => deleteProduct(p.id)}>x</button>
                  <button onClick={() => editProduct(p.id)}>edit</button>
                  <button onClick={() => editProduct(p.id)}>v</button>
                </div>
                <div className={styles.show}>
                    <p>{p.img}</p>
                    <p>{p.productType}</p>
                    <p>{p.desc}</p>
                </div>
            </>) : <></>}
        </div>
    </div>
  )
}

export default ManageProducts