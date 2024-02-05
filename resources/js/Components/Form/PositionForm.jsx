import React, { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { router } from "@inertiajs/react";

const PositionForm = ({ className = "", values, mode = "" }) => {
    const { data, setData, processing, recentlySuccessful, errors } = useForm({
        position_name: "",
    });

    useEffect(() => {
        if (mode === "edit") {
            setData("position_name", values.position_name);
        }
    }, [mode, values]);

    const submit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            router.post("/positions", data);
        } else if (mode === "edit") {
            router.post(`/positions/update/${values.id}`, data);
        }
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="position_name" value="Position Name" />

                    <TextInput
                        id="position_name"
                        className="mt-1 block w-full"
                        value={data.position_name}
                        onChange={(e) => {
                            setData("position_name", e.target.value);
                        }}
                        required
                        isFocused
                        autoComplete="position_name"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.position_name}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
};

export default PositionForm;
