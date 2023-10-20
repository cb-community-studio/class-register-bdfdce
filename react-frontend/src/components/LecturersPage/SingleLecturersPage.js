import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleLecturersPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [users, setusers] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("lecturers")
            .get(urlParams.singleLecturersId, { query: { $populate: ["userID"] }})
            .then((res) => {
                set_entity(res || {});
                const users = Array.isArray(res.userID)
            ? res.userID.map((elem) => ({ _id: elem._id, email: elem.email }))
            : res.userID
                ? [{ _id: res.userID._id, email: res.userID.email }]
                : [];
        setusers(users);
                setusers(res?.userID?.map((elem) => ({ _id: elem._id, email: elem.email })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Lecturers", type: "error", message: error.message || "Failed get lecturers" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/lecturers", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Lecturers</h3>
                </div>
                <p>lecturers/{urlParams.singleLecturersId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">lecName</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.lecName}</p></div>
                    <label className="text-sm text-primary">lecContact</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.lecContact}</p></div>
                    <label className="text-sm text-primary">userID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.userID}</p></div>
            <label className="text-sm">userID</label>
            {users.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p>{elem.email}</p>
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

export default connect(mapState, mapDispatch)(SingleLecturersPage);
