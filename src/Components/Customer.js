import React, { useState, useEffect } from "react";
import "../main.css";
// import Table from "../Table";
import { listCustomerEntries, createCustomer, listInvoiceBill } from "../API";
import { Table, Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Customer(props) {
  const [isTableView, setIsTableView] = useState(false);
  const [isEntryForm, setIsEntryForm] = useState(false);
  const [customerEntries, setCustomerEntries] = useState([]);
  const [invoiceBill, setInvoiceBill] = useState([]);

  // const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(" ");
  const { register, handleSubmit, reset } = useForm();

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  const onSubmit = async (data) => {
    try {
      await createCustomer(data);
      getCustomers();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
    reset();
  };

  const getInvoiceBill = async (id) => {
    const invoiceBill = await listInvoiceBill(id);
    setInvoiceBill(invoiceBill);
    console.log(invoiceBill);
    toggleTrueFalse();
  };

  const getCustomers = async () => {
    const customerEntries = await listCustomerEntries();
    setCustomerEntries(customerEntries);
  };

  const renderInvoicesBill = (invoice, index) => {
    return (
      <div
        key={index}
        className="card invoice-card text-white bg-primary mb-3 w-80"
      >
        <div className="card-header">{invoice.Customer_Name}</div>
        <div className="card-body">
          <h5 className="card-title">Invoice ID: {invoice.Invoice_ID}</h5>
          <h5 className="card-title">Date: {invoice.Invoice_Date}</h5>
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
    );
  };

  // function reloadPage(){
  //   window.location.reload();
  // }

  useEffect(() => {
    getCustomers();
  }, []);

  const ModalContent = () => {
    return (
      <Modal className="modal-view" size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>

        <Modal.Body>{invoiceBill.map(renderInvoicesBill)}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderCustomers = (customer, index) => {
    return (
      <tr key={index}>
        <td>
          <div
            onClick={() => {
              getInvoiceBill(customer.Customer_ID);
            }}
          >
            {" "}
            {customer.Customer_Name}
          </div>
        </td>
        <td>{customer.Customer_Address}</td>
        <td>{customer.Contact_Number}</td>
      </tr>
    );
  };

  return (
    <div className="Customer">
      <div>
        <h2 className="heading-bar">Customers</h2>
      </div>
      <div className="card-tabel-view">
        <div className="card-container">
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">View Customer</div>
            <div className="card-body">
              <p className="card-text">
                Click the button to view the customers
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsTableView(true);
                  setIsEntryForm(false);
                }}
              >
                View Customes
              </button>
            </div>
          </div>
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">Add Customer</div>
            <div className="card-body">
              <p className="card-text">
                Click the button to add customers to the table
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsTableView(false);
                  setIsEntryForm(true);
                }}
              >
                Add Customer
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
                    <th>Customer Name</th>
                    <th>Customer Address</th>
                    <th>Contact Number</th>
                  </tr>
                </thead>
                <tbody>{customerEntries.map(renderCustomers)}</tbody>
              </Table>
              {show ? <ModalContent /> : null}
            </div>
          )}
          {isEntryForm && (
            <div
              className="entry-form-container"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h4>Enter customer data</h4>
              <form className="entry-form">
                {error ? <h3 className="error">{error}</h3> : null}
                <div className="entry-form-input">
                  <label htmlFor="Customer_Name">Customer Name</label>
                  <input name="Customer_Name" required={true} ref={register({ pattern: /^[a-zA-Z]/ })} />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Contact_Number">Contact Number</label>
                  <input name="Contact_Number" required={true} ref={register({ pattern: /^[0-9]/gm },{ min: 5, max: 10 })} />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Customer_Address">Customer Address</label>
                  <textarea
                    name="Customer_Address"
                    rows={3}
                    required={true}
                    ref={register}
                  />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Email">Email</label>
                  <input name="Email" required={true} ref={register({pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gm})} />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Car_Number">Car Number</label>
                  <input name="Car_Number" required={true} ref={register({ pattern: /^[a-zA-Z0-9]/ },{max: 10 })} />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Car_ID">Car ID</label>
                  <input name="Car_ID" required={true} ref={register({ pattern: /^[0-9]/ })} />
                </div>
                <div className="entry-form-input">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Create Log Entry"}
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

export default Customer;
