import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import Register from "../Auth/Register";
import EmployeeForm from "@/Components/Form/EmployeeForm";

const ProfileCreatePage = ({ auth, units, positions }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Employee
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Link
                        href={route("profiles.index")}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        Back
                    </Link>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <EmployeeForm className="max-w-xl" units={units} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProfileCreatePage;
