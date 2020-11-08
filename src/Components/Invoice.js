import React, { useState, useEffect } from "react";
import "../main.css";
import { listInvoiceEntries, createInvoice, listInvoiceBill } from "../API";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Invoices(props) {
  const [isTableView, setIsTableView] = useState(false);
  const [isEntryForm, setIsEntryForm] = useState(false);
  const [isInvoiceBill, setIsInvoiceBill] = useState(false);

  const [invoiceEntries, setInvoiceEntries] = useState([]);
  const [invoiceBill, setInvoiceBill] = useState([]);
  const [id, setId] = useState(" ");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(" ");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await createInvoice(data);
      getInvoices();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
    reset();
  };

  const handleInput = (event) => {
    event.preventDefault();
    setId(event.target.value);
    
  };


  const getInvoiceBill = async (id) => {
    const invoiceBill = await listInvoiceBill(id);
    setInvoiceBill(invoiceBill);

  };

  const getInvoices = async () => {
    const invoiceEntries = await listInvoiceEntries();
    setInvoiceEntries(invoiceEntries);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  const renderInvoices = (invoice, index) => {
    return (
      <tr key={index}>
        <td>{invoice.Invoice_ID}</td>
        <td>{invoice.Invoice_Date}</td>
        <td>{invoice.Customer_ID}</td>
        <td>{invoice.Product_ID}</td>
        <td>{invoice.Car_ID}</td>
        <td>{invoice.Qty}</td>
      </tr>
    );
  };

  const renderInvoicesBill = (invoice, index) => {
    return (
      <div key={index} class="card invoice-card text-white bg-primary mb-3 w-75">
        <div class="card-header">{invoice.Customer_Name}</div>
        <div class="card-body">
          <h5 class="card-title">Invoice ID: {invoice.Invoice_ID}</h5>
          <h5 class="card-title">Date: {invoice.Invoice_Date}</h5>
          <div className="invoice-bill-design table-view">
            <Table striped bordered hover variant="dark" className="table-design">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{invoice.Product_Name}</td>
                  <td>{invoice.Qty}</td>
                  <td>{invoice.Rate}</td>
                  <td>{invoice.Total_Amount}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      // <tr key={index}>
      //   <td>{invoice.Customer_Name}</td>

      // </tr>
    );
  };

  return (
    <div className="Invoices">
      <div>
        <h2 className="heading-bar">Invoices</h2>
      </div>
      <div className="card-tabel-view">
        <div className="card-container">
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">View Invoices</div>
            <div className="card-body">
              <p className="card-text">Click the button to view the Invoices</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsTableView(true);
                  setIsEntryForm(false);
                  setIsInvoiceBill(false);
                }}
              >
                View Invoices
              </button>
            </div>
          </div>
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">Add Invoice</div>
            <div className="card-body">
              <p className="card-text">
                Click the button to add Invoices to the table
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsTableView(false);
                  setIsEntryForm(true);
                  setIsInvoiceBill(false);
                }}
              >
                Add Invoice
              </button>
            </div>
          </div>
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">View cutomer Invoices</div>
            <div className="card-body">
              <p className="card-text">
                Add the customer number to view the invoices of the customer
              </p>
              <div>
                <label htmlFor="Customer_ID">Customer ID</label>
                <input
                  onChange={handleInput}
                  className="invoice-bill"
                  name="Customer_ID"
                  required={true}
                  ref={register({ pattern: /^[0-9]+$/i })}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsTableView(false);
                  setIsEntryForm(false);
                  setIsInvoiceBill(true);
                  getInvoiceBill(id);

                }}
              >
                Add Invoice
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
                    <th>Invoices ID</th>
                    <th>Invoice Date</th>
                    <th>Customer ID</th>
                    <th>Product ID</th>
                    <th>Car ID</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>{invoiceEntries.map(renderInvoices)}</tbody>
              </Table>
            </div>
          )}
          {isEntryForm && (
            <div
              className="entry-form-container"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h4>Enter Invoice data</h4>
              <form className="entry-form">
                {error ? <h3 className="error">{error}</h3> : null}
                <div className="entry-form-input">
                  <label htmlFor="Customer_ID">Customer ID</label>
                  <input name="Customer_ID" required={true} ref={register({ pattern: /^[0-9]/ })} />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Product_ID">Product ID</label>
                  <input name="Product_ID" required={true} ref={register({ pattern: /^[0-9]/ })} />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Car_ID">Car ID</label>
                  <input name="Car_ID" required={true} ref={register({ pattern: /^[0-9]/ })} />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Qty">Quantity</label>
                  <input name="Qty" required={true} ref={register({ pattern: /^[0-9]/ })} />
                </div>
                <div className="entry-form-input">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Add Invoice"}
                  </button>
                </div>
              </form>
            </div>
          )}
          {isInvoiceBill && (
            <div className="invoice-view">
              <h1>Invoice</h1>
              {invoiceBill.map(renderInvoicesBill)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Invoices;
