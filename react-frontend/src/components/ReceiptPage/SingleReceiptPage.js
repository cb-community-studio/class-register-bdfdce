import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleReceiptPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [invoices, setinvoices] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("receipt")
            .get(urlParams.singleReceiptId, { query: { $populate: ["invoiceID"] }})
            .then((res) => {
                set_entity(res || {});
                const invoices = Array.isArray(res.invoiceID)
            ? res.invoiceID.map((elem) => ({ _id: elem._id, invoice: elem.invoice }))
            : res.invoiceID
                ? [{ _id: res.invoiceID._id, invoice: res.invoiceID.invoice }]
                : [];
        setinvoices(invoices);
                setinvoices(res?.invoiceID?.map((elem) => ({ _id: elem._id, invoice: elem.invoice })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Receipt", type: "error", message: error.message || "Failed get receipt" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/receipt", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Receipt</h3>
                </div>
                <p>receipt/{urlParams.singleReceiptId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">invoiceID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.invoiceID}</p></div>
                    <label className="text-sm text-primary">amount</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.amount}</p></div>
            <label className="text-sm">invoiceID</label>
            {invoices.map((elem) => (
                    <Link key={elem._id} to={`/invoices/${elem._id}`}>
                        <div className="card">
                            <p>{elem.invoice}</p>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleReceiptPage);
