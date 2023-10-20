import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleRegistrationPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [classes, setclasses] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("registration")
            .get(urlParams.singleRegistrationId, { query: { $populate: ["classID"] }})
            .then((res) => {
                set_entity(res || {});
                const classes = Array.isArray(res.classID)
            ? res.classID.map((elem) => ({ _id: elem._id, title: elem.title }))
            : res.classID
                ? [{ _id: res.classID._id, title: res.classID.title }]
                : [];
        setclasses(classes);
                setclasses(res?.classID?.map((elem) => ({ _id: elem._id, title: elem.title })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Registration", type: "error", message: error.message || "Failed get registration" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/registration", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Registration</h3>
                </div>
                <p>registration/{urlParams.singleRegistrationId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">name</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.name}</p></div>
                    <label className="text-sm text-primary">email</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.email}</p></div>
                    <label className="text-sm text-primary">contact</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.contact}</p></div>
                    <label className="text-sm text-primary">classID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.classID}</p></div>
            <label className="text-sm">classID</label>
            {classes.map((elem) => (
                    <Link key={elem._id} to={`/classes/${elem._id}`}>
                        <div className="card">
                            <p>{elem.title}</p>
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

export default connect(mapState, mapDispatch)(SingleRegistrationPage);
