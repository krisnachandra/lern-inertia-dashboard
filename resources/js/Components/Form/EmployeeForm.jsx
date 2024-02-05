import React, { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Combobox, Transition } from "@headlessui/react";

const EmployeeForm = ({ className = "", units }) => {
    const { data, setData, processing, recentlySuccessful, errors } = useForm({
        name: "",
        email: "",
        password: "",
        unit_id: "",
        join_date: "",
    });

    const [selectedUnit, setSelectedUnit] = useState(units[0]);
    const [query, setQuery] = useState("");

    const filteredData =
        query === ""
            ? units
            : units.filter((dataUnit) => {
                  return dataUnit.unit_name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    const submit = (e) => {
        e.preventDefault();
        // console.log(e.target.value, "element");
        console.log(data);
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => {
                            setData("name", e.target.value);
                        }}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => {
                            setData("email", e.target.value);
                        }}
                        required
                        isFocused
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => {
                            setData("password", e.target.value);
                        }}
                        required
                        isFocused
                        autoComplete="password"
                    />

                    <InputError className="mt-2" message={errors.password} />
                </div>

                <div>
                    <InputLabel htmlFor="unit_id" value="Unit Name" />
                    <Combobox value={selectedUnit} onChange={setSelectedUnit}>
                        <Combobox.Input
                            onChange={(e) => setData("unit_id", e.target.value)}
                            displayValue={(data) => data.unit_name}
                        />
                        <Combobox.Options className="pl-3 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredData.map((value) => (
                                <Combobox.Option key={value.id} value={value}>
                                    {value.unit_name}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Combobox>
                    <InputError className="mt-2" message={errors.unit_id} />
                </div>

                {/* <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => {
                            setData("name", e.target.value);
                        }}
                        required
                        isFocused
                        autoComplete="position_name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div> */}

                <div>
                    <InputLabel htmlFor="join_date" value="Join Date" />

                    <TextInput
                        id="join_date"
                        className="mt-1 block w-full"
                        value={data.join_date}
                        onChange={(e) => {
                            setData("join_date", e.target.value);
                        }}
                        required
                        isFocused
                        autoComplete="join_date"
                    />

                    <InputError className="mt-2" message={errors.join_date} />
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

export default EmployeeForm;
