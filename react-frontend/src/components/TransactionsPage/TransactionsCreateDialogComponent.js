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

const TransactionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [enrollments, setenrollments] = useState([])

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            enrollment: _entity.enrollment,
            amount: _entity.amount,
            stat: _entity.stat,
        };

        setLoading(true);
        try {
            const result = await client.service("transactions").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };
     useEffect(() => {
                //on mount
                client
                    .service("enrollments")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setenrollments(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Enrollments", type: "error", message: error.message || "Failed get enrollments" });
                    });
            }, []);

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
    const enrollmentsOptions = enrollments.map((elem) => ({ label: elem.studentID, value: elem._id }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="transactions-create-dialog-component">
            <div>
                <p className="m-0">enrollment:</p>
                <Dropdown value={_entity?.enrollment} options={enrollmentsOptions} onChange={(e) => setValByKey("enrollment", e.value)} />
            </div>
            <div>
                <p className="m-0">amount:</p>
                <InputText className="w-full mb-3" value={_entity?.amount} onChange={(e) => setValByKey("amount", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">stat:</p>
                <InputText className="w-full mb-3" value={_entity?.stat} onChange={(e) => setValByKey("stat", e.target.value)}  />
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
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(TransactionsCreateDialogComponent);
