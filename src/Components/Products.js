import React, { useState, useEffect } from "react";
import "../main.css";
import { listProductEntries, createProduct } from "../API";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Products(props) {
  const [isTableView, setIsTableView] = useState(false);
  const [isEntryForm, setIsEntryForm] = useState(false);
  const [productEntries, setProductEntries] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(" ");
  const { register, handleSubmit, reset } = useForm();



  const onSubmit = async (data) => {
    try {
      await createProduct(data);
      getProducts();
      
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
    reset();
  };

  const getProducts = async () => {
    const productEntries = await listProductEntries();
    setProductEntries(productEntries);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderProducts = (product, index) => {
    return (
      <tr key={index}>
        <td>{product.Product_Name}</td>
        <td>{product.Rate}</td>
        <td>{product.Car_ID}</td>
      </tr>
    );
  };

  return (
    <div className="Products">
      <div>
        <h2 className="heading-bar">Products</h2>
      </div>
      <div className="card-tabel-view">
        <div className="card-container">
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">View Products</div>
            <div className="card-body">
              <p className="card-text">
                Click the button to view the Products
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsTableView(true);
                  setIsEntryForm(false);
                }}
              >
                View Products
              </button>
            </div>
          </div>
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">Add Product</div>
            <div className="card-body">
              <p className="card-text">
                Click the button to add Products to the table
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsTableView(false);
                  setIsEntryForm(true);
                }}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
        <div>
          {isTableView && (
            <div className="table-view">
              <h1>Table</h1>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Products Name</th>
                    <th>Rate</th>
                    <th>Car ID</th>
                  </tr>
                </thead>
                <tbody>{productEntries.map(renderProducts)}</tbody>
              </Table>
            </div>
          )}
          {isEntryForm && (
            <div className="entry-form-container" onSubmit={handleSubmit(onSubmit)}>
							<h4>Enter Product data</h4>
              <form className="entry-form">
                {error ? <h3 className="error">{error}</h3> : null}
                <div className="entry-form-input">
                  <label htmlFor="Product_Name">Product Name</label>
                  <input name="Product_Name" required={true} ref={register({ pattern: /^[A-Za-z0-9]/ }) }/>
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Rate">Rate</label>
                  <input name="Rate" required={true} ref={register({ pattern: /^[0-9]/ }) } />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Car_ID">Car ID</label>
                  <input
                    name="Car_ID"
                    required={true}
                    ref={register({ pattern: /^[0-9]/ }) }
                  />
                </div>
                <div className="entry-form-input">

                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Add Product"}
                </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
