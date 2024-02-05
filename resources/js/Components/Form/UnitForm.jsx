import React, { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { router } from "@inertiajs/react";

const UnitForm = ({ className = "", values, mode = "" }) => {
    const { data, setData, processing, recentlySuccessful, errors } = useForm({
        unit_name: "",
    });

    useEffect(() => {
        if (mode === "edit") {
            setData("unit_name", values.unit_name);
        }
    }, [mode, values]);

    const submit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            router.post("/units", data);
        } else if (mode === "edit") {
            router.post(`/units/update/${values.id}`, data);
        }
    };
    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="unit_name" value="Unit Name" />

                    <TextInput
                        id="unit_name"
                        className="mt-1 block w-full"
                        value={data.unit_name}
                        onChange={(e) => {
                            setData("unit_name", e.target.value);
                        }}
                        required
                        isFocused
                        autoComplete="unit_name"
                    />

                    <InputError className="mt-2" message={errors.unit_name} />
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

export default UnitForm;
