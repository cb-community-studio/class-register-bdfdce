import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const StudentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setusers] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);
     useEffect(() => {
                //on mount
                client
                    .service("users")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setusers(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                    });
            }, []);
    const onSave = async () => {
        let _data = {
            StudentName: _entity.StudentName,
            contact: _entity.contact,
            studentType: _entity.studentType,
            userID: _entity.userID,
        };

        setLoading(true);
        try {
            const result = await client.service("students").patch(_entity._id, _data);
            props.onHide();
            props.alert({ type: "success", title: "Edit info", message: "Info updated successfully" });
            props.onEditResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    // children dropdown options
    const usersOptions = users.map((elem) => ({ label: elem.email, value: elem._id }));

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="students-edit-dialog-component">
                <div>
                <p className="m-0">StudentName:</p>
                <InputText className="w-full mb-3" value={_entity?.StudentName} onChange={(e) => setValByKey("StudentName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">contact:</p>
                <InputText className="w-full mb-3" value={_entity?.contact} onChange={(e) => setValByKey("contact", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">studentType:</p>
                <InputText className="w-full mb-3" value={_entity?.studentType} onChange={(e) => setValByKey("studentType", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">userID:</p>
                <Dropdown value={_entity?.userID} options={usersOptions} onChange={(e) => setValByKey("userID", e.value)} />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return{}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(StudentsCreateDialogComponent);
