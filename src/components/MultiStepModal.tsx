"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Select, Input } from "antd";
const { Option } = Select;

interface StepField {
  title: string;
  description?: string;
  options?: string[];
  inputType?: "text" | "date";
  Number?: number;
  multiple?: boolean;
}

const stepFields: StepField[] = [
  {
    title: "What type of event do you need a DJ for?",
    options: [
      "Get together",
      "Birthday Party - Adult",
      "Birthday Party - Child",
      "Wedding",
      "Anniversary",
      "Other",
    ],
  },
  {
    title: "What are the age(s) of the guests?",
    options: [
      "Younger than 18",
      "18 - 29 years old",
      "30 - 39 years old",
      "40 - 49 years old",
      "50 - 59 years old",
      "60 or older",
      "Mixed ages",
      "Other",
    ],
    multiple: true,
  },
  {
    title: "Approximately how many guests is this for?",
    options: [
      "Less than 10 guests",
      "10 - 19 guests",
      "20 - 49 guests",
      "50 - 99 guests",
      "100 - 199 guests",
      "200 - 299 guests",
      "300 - 399 guests",
      "400 or more guests",
    ],
  },
  {
    title: "Which types of DJ service would you consider?",
    options: [
      "DJ using the sound system at the venue",
      "DJ using their own equipment",
      // "Karaoke",
      "Other",
    ],
  },
  {
    title: "Which type(s) of music would you consider?",
    options: [
      "Bollywood",
      "Bollywood/Punjabi",
      "House Music",
      "Techno",
      "Rock/Retro",
      "Commercial",
      "Pop/Hip-Hop",
      "Kannada", "Tamil", "Telugu", "Malayalam", "Other",
      "Other",
    ],
    multiple: true,
  },
  // {
  //   title: "Regional",
  //   options: ["Kannada", "Tamil", "Telugu", "Malayalam", "Other"],
  // },
  {
    title: "What type of venue is this for?",
    options: [
      "Private residence",
      "Community hall",
      "Club house",
      "Resort",
      "Farm house",
      "Restaurant",
      "Clubs",
      "Other",
    ],
  },
  {
    title: "What standard of service are you looking for?",
    options: [
      "I want a premium service",
      "Quality and budget are equally important",
      "Budget is my primary concern",
      "Other",
    ],
  },
  {
    title: "Have you set a date when you need the DJ?",
    options: ["Yes", "No", "Other"],
  },
  {
    title: "What is the date when the DJ is needed?",
    inputType: "date",
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bookingview: String;
}

const MultiStepModal: React.FC<Props> = ({ isOpen, onClose ,bookingview}) => {
  const [selectedValues, setSelectedValues] = useState<{
    [title: string]: string | string[];
  }>({});
  const [otherInputs, setOtherInputs] = useState<{ [title: string]: string }>({});

  const handleSelectChange = (title: string, value: string | string[]) => {
    setSelectedValues((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleOtherInput = (title: string, value: string) => {
    setOtherInputs((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

const handleFinish = () => {
  const finalData = { ...selectedValues };

  Object.entries(otherInputs).forEach(([key, val]) => {
    if (Array.isArray(finalData[key])) {
      finalData[key] = [
        ...(finalData[key] as string[]).filter((v) => v !== "Other"),
        val.toString(),
      ];
    } else if (finalData[key] === "Other") {
      finalData[key] = val.toString();
    }
  });

  finalData["Booking Type"] = bookingview;

  // const existingData = JSON.parse(localStorage.getItem("djFormResponses") || "[]");
  // existingData.push(finalData);
  localStorage.setItem("djFormResponses", JSON.stringify(finalData));

  onClose();
};



  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40 px-2 py-8">
        <Dialog.Panel className="bg-white p-6 w-full max-w-2xl rounded-md shadow-lg max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Tell us what you need</h2>

          <form className="space-y-6">
            {stepFields.map((field, index) => (
              <div key={index}>
                <p className="font-medium mb-2">{field.title}</p>
                {field.description && (
                  <p className="text-gray-500 text-sm mb-2 whitespace-pre-line">
                    {field.description}
                  </p>
                )}

                {field.options && (
                  <div className="space-y-2">
                    <Select
                      mode={field.multiple ? "multiple" : undefined}
                      placeholder={`Select ${field.title}`}
                      style={{ width: "100%" }}
                      value={selectedValues[field.title]}
                      onChange={(value) => handleSelectChange(field.title, value)}
                      allowClear
                    >
                      {field.options.map((opt) => (
                        <Option key={opt} value={opt}>
                          {opt}
                        </Option>
                      ))}
                    </Select>

                    {(selectedValues[field.title] === "Other" ||
                      (Array.isArray(selectedValues[field.title]) &&
                        (selectedValues[field.title] as string[]).includes("Other"))) && (
                      <Input
                        placeholder="Please specify"
                        value={otherInputs[field.title] || ""}
                        onChange={(e) => handleOtherInput(field.title, e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>
                )}

                {field.inputType === "text" && (
                  <Input
                    placeholder="Enter text"
                    maxLength={field.Number}
                    value={(selectedValues[field.title] as string) || ""}
                    onChange={(e) =>
                      setSelectedValues((prev) => ({
                        ...prev,
                        [field.title]: e.target.value,
                      }))
                    }
                  />
                )}

                {field.inputType === "date" && (
                  <Input
                    type="date"
                    value={(selectedValues[field.title] as string) || ""}
                    onChange={(e) =>
                      setSelectedValues((prev) => ({
                        ...prev,
                        [field.title]: e.target.value,
                      }))
                    }
                  />
                )}
              </div>
            ))}
          </form>

          <div className="mt-6 text-right">
            <button
              onClick={handleFinish}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MultiStepModal;
