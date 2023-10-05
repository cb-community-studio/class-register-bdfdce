import React, { useState } from "react";
import { Link } from 'react-router-dom';
import RegistrationCreateDialogComponent from '../RegistrationPage/RegistrationCreateDialogComponent';

function LandingPage() {
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    const openCreateDialog = () => {
        setShowCreateDialog(true);
    };

    const closeCreateDialog = () => {
        setShowCreateDialog(false);
    };

    const onCreateResult = (newEntity) => {
        // Handle the result of creating a new entity here
        // For example, you can update your component's state with the new entity
    };


    return (
        <div className="landing-page">
            <header>
                <h1>Welcome to Our Website</h1>
            </header>
            <main>
                <p>This is a basic landing page created using React.</p>

                <div>
                    <div className="w-full flex justify-content-center flex-wrap">
                        <div className='col-12 lg:col-6 xl:col-4'>
                            <button onClick={openCreateDialog} className='card mb-0 flex flex-column align-items-center justify-content-center hover zoom' style={{ height: '10rem' }}>
                                <div className='text-900 font-medium text-lg'>Registration</div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {/* Conditionally render the RegistrationCreateDialogComponent */}
            {showCreateDialog && (
                <RegistrationCreateDialogComponent
                    show={showCreateDialog}
                    onHide={closeCreateDialog}
                    onCreateResult={onCreateResult} // Pass any necessary props
                />
            )}
            <footer>
                <p>&copy; 2023 Your Company</p>
            </footer>
        </div>
    );
}

export default LandingPage;
