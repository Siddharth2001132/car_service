import React, { useState, useEffect } from "react";
import "../main.css";
import { listCarEntries, createCar } from "../API";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Cars(props) {
  const [isTableView, setIsTableView] = useState(false);
  const [isEntryForm, setIsEntryForm] = useState(false);
  const [carEntries, setCarEntries] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(" ");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await createCar(data);
      // window.location.reload(false);
      getCars();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
    reset();
  };

  const getCars = async () => {
    const carEntries = await listCarEntries();
    setCarEntries(carEntries);
  };

  useEffect(() => {
    getCars();
  }, []);

  const renderCars = (car, index) => {
    return (
      <tr key={index}>
        <td>{car.Car_ID}</td>
        <td>{car.Car_Make}</td>
        <td>{car.Car_Model}</td>
      </tr>
    );
  };

  return (
    <div className="Cars">
      <div>
        <h2 className="heading-bar">Cars</h2>
      </div>
      <div className="card-tabel-view">
        <div className="card-container">
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">View Cars</div>
            <div className="card-body">
              <p className="card-text">Click the button to view the Cars</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsTableView(true);
                  setIsEntryForm(false);
                }}
              >
                View Cars
              </button>
            </div>
          </div>
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">Add Car</div>
            <div className="card-body">
              <p className="card-text">
                Click the button to add Cars to the table
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsTableView(false);
                  setIsEntryForm(true);
                }}
              >
                Add Car
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
                    <th>Car ID</th>
                    <th>Car Make</th>
                    <th>Car Model</th>
                  </tr>
                </thead>
                <tbody>{carEntries.map(renderCars)}</tbody>
              </Table>
            </div>
          )}
          {isEntryForm && (
            <div
              className="entry-form-container"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h4>Enter Car data</h4>
              <form className="entry-form">
                {error ? <h3 className="error">{error}</h3> : null}
                <div className="entry-form-input">
                  <label htmlFor="Car_Make">Car Make</label>
                  <input name="Car_Make" required={true} ref={register({ pattern: /^[A-Za-z0-9]+$/i },{ min: 5, max: 10 })} />
                </div>
                <div className="entry-form-input">
                  <label htmlFor="Car_Model">Car Model</label>
                  <input name="Car_Model" required={true} ref={register({ pattern: /^[A-Za-z0-9]+$/i },{ min: 5, max: 10 })} />
                </div>
                <div className="entry-form-input">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Add Car"}
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

export default Cars;
