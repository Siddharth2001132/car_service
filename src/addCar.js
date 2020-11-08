import React from 'react';
import './main.css';
import { useForm } from "react-hook-form";

function AddCar(props) {
const { register } = useForm();
    return (
        <div className="container">
            <form className="entry-form">
                <label htmlFor="car_brand">Car Brand</label>
                <input name="car_brand" required={true} ref={ register }/>
                <label htmlFor="car_model">Car Model</label>
                <input name="car_model" required={true} ref={ register }/>

            </form>
        </div>
    );
}

export default AddCar;