import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SinglePurchaseorderPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [enrollments, setenrollments] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("purchaseorder")
            .get(urlParams.singlePurchaseorderId, { query: { $populate: ["enrollID"] }})
            .then((res) => {
                set_entity(res || {});
                const enrollments = Array.isArray(res.enrollID)
            ? res.enrollID.map((elem) => ({ _id: elem._id, studentID: elem.studentID }))
            : res.enrollID
                ? [{ _id: res.enrollID._id, studentID: res.enrollID.studentID }]
                : [];
        setenrollments(enrollments);
                setenrollments(res?.enrollID?.map((elem) => ({ _id: elem._id, studentID: elem.studentID })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Purchaseorder", type: "error", message: error.message || "Failed get purchaseorder" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/purchaseorder", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Purchaseorder</h3>
                </div>
                <p>purchaseorder/{urlParams.singlePurchaseorderId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">enrollID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.enrollID}</p></div>
            <label className="text-sm">enrollID</label>
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

export default connect(mapState, mapDispatch)(SinglePurchaseorderPage);
