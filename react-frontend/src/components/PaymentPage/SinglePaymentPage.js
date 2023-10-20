import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SinglePaymentPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [enrollments, setenrollments] = useState([]);
    const [transactions, settransactions] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("payment")
            .get(urlParams.singlePaymentId, { query: { $populate: ["enrollID","transactionID"] }})
            .then((res) => {
                set_entity(res || {});
                const enrollments = Array.isArray(res.enrollID)
            ? res.enrollID.map((elem) => ({ _id: elem._id, courseID: elem.courseID }))
            : res.enrollID
                ? [{ _id: res.enrollID._id, courseID: res.enrollID.courseID }]
                : [];
        setenrollments(enrollments);
                setenrollments(res?.enrollID?.map((elem) => ({ _id: elem._id, courseID: elem.courseID })) || []);
                const transactions = Array.isArray(res.transactionID)
            ? res.transactionID.map((elem) => ({ _id: elem._id, amount: elem.amount }))
            : res.transactionID
                ? [{ _id: res.transactionID._id, amount: res.transactionID.amount }]
                : [];
        settransactions(transactions);
                settransactions(res?.transactionID?.map((elem) => ({ _id: elem._id, amount: elem.amount })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Payment", type: "error", message: error.message || "Failed get payment" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/payment", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Payment</h3>
                </div>
                <p>payment/{urlParams.singlePaymentId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">enrollID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.enrollID}</p></div>
                    <label className="text-sm text-primary">transactionID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.transactionID}</p></div>
            <label className="text-sm">enrollID</label>
            {enrollments.map((elem) => (
                    <Link key={elem._id} to={`/enrollments/${elem._id}`}>
                        <div className="card">
                            <p>{elem.courseID}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">transactionID</label>
            {transactions.map((elem) => (
                    <Link key={elem._id} to={`/transactions/${elem._id}`}>
                        <div className="card">
                            <p>{elem.amount}</p>
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

export default connect(mapState, mapDispatch)(SinglePaymentPage);
