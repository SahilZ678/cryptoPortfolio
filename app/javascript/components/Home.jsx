import React, {useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";


function HomePage() {
    useEffect(() => {
        if (localStorage.getItem('currentCryptoValue') == null) {
            getCryptoData();
        }
    }, []);
    const history = useHistory();

    return (
        <div className="primary-color d-flex align-items-center justify-content-center">
            <div className="jumbotron jumbotron-fluid bg-transparent">
                <div className="container secondary-color">
                    <h1 className="display-4">Check Portfolio</h1>
                    <p className="lead">
                        Your curated list of crypto for the best portfolio.
                    </p>
                    <hr className="my-4" />
                    <Link
                        to="/portfolio"
                        className="btn btn-lg custom-button"
                        role="button"
                        onClick={() => history.push("/", {from: "Home"})}
                    >
                        View My Portfolio
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage;

export function getCryptoData() {
    axios({
        method: "get",
        url: "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&so\n" +
            "rt_dir=desc&sort=market_cap&convert=USD&CMC_PRO_API_KEY=059e551f-93e4-48\n" +
            "58-801b-3782e9b82b9f",
        headers: {
            'Content-Type': 'Application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        }
    }).then((res) => {
        localStorage.setItem('currentCryptoValue', JSON.stringify(res));
    });
}