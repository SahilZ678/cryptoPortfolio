import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from "axios";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";

const initialValues = {
    name: "",
    symbol: "",
    quantity: 0,
    purchasedDate: new Date(),
    costPrice: 0,
}
export default function CreateAsset() {
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedName, setSelectedName] = useState({});
    const [selectData, setSelectData] = useState([]);
    const [formValues, setFormValues] = useState(initialValues);

    useEffect(() => {
        if(localStorage.getItem('currentCryptoValue').length > 0) {
            let data = JSON.parse(localStorage.getItem('currentCryptoValue')).data.data;
            let dataForSelect = [];
            data.map(d => {
                dataForSelect.push({value: d.symbol, label: d.name})
            })
            setSelectData(dataForSelect);
        }
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const url = '/api/v1/assets';

        axios({
            method: "POST",
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
            },
            data: {
                assets: {
                    name: selectedName.label,
                    symbol: selectedName.value,
                    quantity: formValues.quantity,
                    purchased_date: startDate,
                    cost_price: formValues.costPrice
                }
            }
        }).then((res) => {
            console.log(res);
            history.push('/portfolio');
        }).catch((err) => {
           console.log(err);
        });
    }

    const handleChange = (event) => {
        const {id, value} = event.target;
        const newValue = formValues;
        newValue[id] = value;
        setFormValues(newValue);
    }

    const handlePrevious = () => {
        history.push('/portfolio');
    }

    return(
        <div className={"container"}>
            <h4>Create Transaction</h4>
            <form>
                <div className="mb-3">
                    <label className="col-sm-2 col-form-label">Name</label>
                    {/*<input type="text" className="form-control" id="name" onChange={handleChange}/>*/}
                    <Select
                        options={selectData}
                        id="name"
                        onChange={value => setSelectedName(value)}/>
                </div>

                {/*<div className="mb-3">*/}
                {/*    <label className="col-sm-2 col-form-label">Symbol</label>*/}
                {/*    <input type="text" className="form-control" id="symbol" onChange={handleChange}/>*/}
                {/*</div>*/}

                <div className="mb-3">
                    <label className="col-sm-2 col-form-label">Quantity</label>
                    <input type="number" className="form-control" id="quantity" onChange={handleChange}/>
                </div>

                <div className="mb-3">
                    <label className="col-sm-2 col-form-label">Purchased Date</label><br/>
                    <DatePicker className="form-control" style={{width:"100%"}} id="purchasedDate" selected={startDate} onChange={date => setStartDate(date)}/>
                </div>

                <div className="mb-3">
                    <label className="col-sm-2 col-form-label">Cost Price Of 1</label>
                    <input type="number" className="form-control" id="costPrice" onChange={handleChange}/>
                </div>

                <button className="btn btn-primary mr-3" onClick={handlePrevious}>Back</button>
                <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
            </form>
        </div>
    )
}