import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Portfolio() {
    const history = useHistory();
    const [userAssetsData, setUserAssetsData] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        let currentCryptoData = [];
        if(localStorage.getItem('currentCryptoValue').length > 0) {
            currentCryptoData = JSON.parse(localStorage.getItem('currentCryptoValue')).data.data;
        }

        axios.get('/api/v1/assets')
            .then(res => {
                let data = res.data;
                let sum =  0;
                let newData = [];
                for(const el of data) {
                    let currentData = currentCryptoData.filter(x => x.name == el.name)[0];
                    newData.push({...el, currentPrice: currentData.quote.USD.price});
                    sum += (el.quantity) * (currentData.quote.USD.price);
                }
                setUserAssetsData(newData);
                setTotalBalance(sum);
            });
    }, []);

    const handleDelete = (e) => {
        let assetId = e.target.id;
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const url = "/api/v1/assets/"+assetId;
        axios({
            method: "DELETE",
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
            }
        }).then(res => {
            let newUserData = userAssetsData.filter(data => data.id != assetId);
            let newTotal = 0;
            for(let el of newUserData) {
                newTotal += el.quantity * el.currentPrice;
            }
            setTotalBalance(newTotal);
            setUserAssetsData(newUserData);
        });
    }

    if (userAssetsData.length > 0) {
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-9"}>
                        <h1>Your Portfolio</h1>
                        <p>Accurately tracking the investment performance of your crypto assets.</p>
                    </div>
                    <div className={"col-3"}>
                        <Link
                            to="/createAsset"
                            className="btn btn-lg btn-primary"
                            role="button"
                            onClick={() => history.push("/portfolio", {from: "Portfolio"})}
                        >
                            Add Transaction
                        </Link>
                    </div>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-4 border-dark"}>
                        <p>Current balance</p>
                        <h3>$ {totalBalance.toFixed(4)}</h3>
                    </div>
                    <div className={"col-8"}>
                        <p>Your Assets</p>
                        <table className={"table"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Price</th>
                                <th scope={"col"}>Quantity</th>
                                <th scope={"col"}>Holdings</th>
                                <th scope={"col"}>Profit/Loss</th>
                                <th scope={"col"}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            { userAssetsData.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{value.name}-{value.symbol}</th>
                                        <th>{value.currentPrice.toFixed(2)}</th>
                                        <th>{value.quantity}</th>
                                        <th>{(value.quantity * value.currentPrice).toFixed(2)}</th>
                                        <th>{((value.quantity* value.currentPrice) - (value.quantity* value.cost_price)).toFixed(2)}</th>
                                        <th><button className="btn btn-danger" onClick={handleDelete} id={value.id}>Delete</button></th>
                                    </tr>
                                )
                            }) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="primary-color d-flex align-items-center justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-transparent">
                    <div className="container secondary-color">
                        <h1 className="display-4">No Holdings</h1>
                        <p className="lead">
                            Please add some transaction to keep a portfolio.
                        </p>
                        <hr className="my-4" />
                        <Link
                            to="/createAsset"
                            className="btn btn-lg btn-primary"
                            role="button"
                            onClick={() => history.push("/portfolio", {from: "Portfolio"})}
                        >
                            Add Transaction
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}


