import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleInvoicesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [purchaseorder, setpurchaseorder] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("invoices")
            .get(urlParams.singleInvoicesId, { query: { $populate: ["invoice"] }})
            .then((res) => {
                set_entity(res || {});
                const purchaseorder = Array.isArray(res.invoice)
            ? res.invoice.map((elem) => ({ _id: elem._id, enrollID: elem.enrollID }))
            : res.invoice
                ? [{ _id: res.invoice._id, enrollID: res.invoice.enrollID }]
                : [];
        setpurchaseorder(purchaseorder);
                setpurchaseorder(res?.invoice?.map((elem) => ({ _id: elem._id, enrollID: elem.enrollID })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Invoices", type: "error", message: error.message || "Failed get invoices" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/invoices", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Invoices</h3>
                </div>
                <p>invoices/{urlParams.singleInvoicesId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">invoice</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.invoice}</p></div>
                    <label className="text-sm text-primary">totalAmount</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.total}</p></div>
            <label className="text-sm">invoice</label>
            {purchaseorder.map((elem) => (
                    <Link key={elem._id} to={`/purchaseorder/${elem._id}`}>
                        <div className="card">
                            <p>{elem.enrollID}</p>
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

export default connect(mapState, mapDispatch)(SingleInvoicesPage);
