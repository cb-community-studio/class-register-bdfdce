import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleTransactionsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [enrollments, setenrollments] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("transactions")
            .get(urlParams.singleTransactionsId, { query: { $populate: ["enrollment"] }})
            .then((res) => {
                set_entity(res || {});
                const enrollments = Array.isArray(res.enrollment)
            ? res.enrollment.map((elem) => ({ _id: elem._id, studentID: elem.studentID }))
            : res.enrollment
                ? [{ _id: res.enrollment._id, studentID: res.enrollment.studentID }]
                : [];
        setenrollments(enrollments);
                setenrollments(res?.enrollment?.map((elem) => ({ _id: elem._id, studentID: elem.studentID })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Transactions", type: "error", message: error.message || "Failed get transactions" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/transactions", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Transactions</h3>
                </div>
                <p>transactions/{urlParams.singleTransactionsId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">enrollment</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.enrollment}</p></div>
                    <label className="text-sm text-primary">amount</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.amount}</p></div>
                    <label className="text-sm text-primary">stat</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.stat}</p></div>
            <label className="text-sm">enrollment</label>
            {enrollments.map((elem) => (
                    <Link key={elem._id} to={`/enrollments/${elem._id}`}>
                        <div className="card">
                            <p>{elem.studentID}</p>
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

export default connect(mapState, mapDispatch)(SingleTransactionsPage);
