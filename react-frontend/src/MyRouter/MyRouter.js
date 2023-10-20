import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';

import UsersPage from "../components/UsersPage/UsersPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
import StudentsPage from "../components/StudentsPage/StudentsPage";
import SingleStudentsPage from "../components/StudentsPage/SingleStudentsPage";
import CoursesPage from "../components/CoursesPage/CoursesPage";
import SingleCoursesPage from "../components/CoursesPage/SingleCoursesPage";
import SessionsPage from "../components/SessionsPage/SessionsPage";
import SingleSessionsPage from "../components/SessionsPage/SingleSessionsPage";
import LecturersPage from "../components/LecturersPage/LecturersPage";
import SingleLecturersPage from "../components/LecturersPage/SingleLecturersPage";
import TimetablePage from "../components/TimetablePage/TimetablePage";
import SingleTimetablePage from "../components/TimetablePage/SingleTimetablePage";
import EnrollmentsPage from "../components/EnrollmentsPage/EnrollmentsPage";
import SingleEnrollmentsPage from "../components/EnrollmentsPage/SingleEnrollmentsPage";
import PurchaseorderPage from "../components/PurchaseorderPage/PurchaseorderPage";
import SinglePurchaseorderPage from "../components/PurchaseorderPage/SinglePurchaseorderPage";
import InvoicesPage from "../components/InvoicesPage/InvoicesPage";
import SingleInvoicesPage from "../components/InvoicesPage/SingleInvoicesPage";
import ReceiptPage from "../components/ReceiptPage/ReceiptPage";
import SingleReceiptPage from "../components/ReceiptPage/SingleReceiptPage";
import DiscountPage from "../components/DiscountPage/DiscountPage";
import SingleDiscountPage from "../components/DiscountPage/SingleDiscountPage";
import TransactionsPage from "../components/TransactionsPage/TransactionsPage";
import SingleTransactionsPage from "../components/TransactionsPage/SingleTransactionsPage";
import PaymentPage from "../components/PaymentPage/PaymentPage";
import SinglePaymentPage from "../components/PaymentPage/SinglePaymentPage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />
            {/* protected route https://www.robinwieruch.de/react-router-private-routes/ */}

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
                    <Route path="/users" exact element={<UsersPage />} />
                    <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                    <Route path="/students" exact element={<StudentsPage />} />
                    <Route path="/students/:singleStudentsId" exact element={<SingleStudentsPage />} />
                    <Route path="/courses" exact element={<CoursesPage />} />
                    <Route path="/courses/:singleCoursesId" exact element={<SingleCoursesPage />} />
                    <Route path="/sessions" exact element={<SessionsPage />} />
                    <Route path="/sessions/:singleSessionsId" exact element={<SingleSessionsPage />} />
                    <Route path="/lecturers" exact element={<LecturersPage />} />
                    <Route path="/lecturers/:singleLecturersId" exact element={<SingleLecturersPage />} />
                    <Route path="/timetable" exact element={<TimetablePage />} />
                    <Route path="/timetable/:singleTimetableId" exact element={<SingleTimetablePage />} />
                    <Route path="/enrollments" exact element={<EnrollmentsPage />} />
                    <Route path="/enrollments/:singleEnrollmentsId" exact element={<SingleEnrollmentsPage />} />
                    <Route path="/purchaseorder" exact element={<PurchaseorderPage />} />
                    <Route path="/purchaseorder/:singlePurchaseorderId" exact element={<SinglePurchaseorderPage />} />
                    <Route path="/invoices" exact element={<InvoicesPage />} />
                    <Route path="/invoices/:singleInvoicesId" exact element={<SingleInvoicesPage />} />
                    <Route path="/receipt" exact element={<ReceiptPage />} />
                    <Route path="/receipt/:singleReceiptId" exact element={<SingleReceiptPage />} />
                    <Route path="/discount" exact element={<DiscountPage />} />
                    <Route path="/discount/:singleDiscountId" exact element={<SingleDiscountPage />} />
                    <Route path="/transactions" exact element={<TransactionsPage />} />
                    <Route path="/transactions/:singleTransactionsId" exact element={<SingleTransactionsPage />} />
                    <Route path="/payment" exact element={<PaymentPage />} />
                    <Route path="/payment/:singlePaymentId" exact element={<SinglePaymentPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
