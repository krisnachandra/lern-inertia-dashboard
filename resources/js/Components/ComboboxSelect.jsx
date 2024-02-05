import React, { Fragment } from "react";
import { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

const ComboboxSelect = ({ data }) => {
    const [selectedPerson, setSelectedPerson] = useState(data[0]);
    const [query, setQuery] = useState("");

    const filteredData =
        query === ""
            ? data
            : data.filter((dataCombo) => {
                  return dataCombo.unit_name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    return (
        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(data) => data.unit_name}
            />
            <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
            >
                <Combobox.Options className="pl-3 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {filteredData.map((filterData) => (
                        <Combobox.Option
                            key={filterData.id}
                            value={filterData.id}
                            as={Fragment}
                        >
                            {({ active }) => (
                                <li
                                    className={` flex ${
                                        active
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-black"
                                    }`}
                                >
                                    {filterData.unit_name}
                                </li>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Transition>
        </Combobox>
    );
};

export default ComboboxSelect;
