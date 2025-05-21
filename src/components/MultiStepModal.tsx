"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

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
    title: "Find the perfect professional for you",
    description:
      "Get free quotes within minutes\nPopular: DJ , Live Singer, Band Musician, etc",
    inputType: "text",
    Number: 6,
  },
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
      "Walk in DJ using my/venue's equipment",
      "DJ using their own equipment",
      "Karaoke",
      "Other",
    ],
  },
  {
    title: "Which type(s) of music would you consider?",
    options: [
      "Bollywood",
      "Punjabi",
      "House Music",
      "Techno",
      "Rock/Retro",
      "Commercial",
      "Pop/Hip-Hop",
      "Other",
    ],
     multiple: true,
  },
  {
    title: "Regional",
    options: [
      "Kannada",
      "Tamil",
      "Telugu",
      "Malayalam",
      "Other",
    ],
  },
  // {
  //   title: "Which type(s) of Sub genres of House Music ?",
  //   options: [
  //     "Classic House",
  //     "Afro House",
  //     "Tech House",
  //     "Progressive House",
  //     "Deep House",
  //     "Other",
  //   ],
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
}

const MultiStepModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const current = stepFields[step];

  const [selectedValues, setSelectedValues] = useState<{
    [title: string]: string | string[];
  }>({});

  const handleOptionSelect = (value: string) => {
    if (current.multiple) {
      const existing = selectedValues[current.title] as string[] | undefined;
      const updated = existing?.includes(value)
        ? existing.filter((v) => v !== value)
        : [...(existing || []), value];
      setSelectedValues((prev) => ({
        ...prev,
        [current.title]: updated,
      }));
    } else {
      setSelectedValues((prev) => ({
        ...prev,
        [current.title]: value,
      }));
    }
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, stepFields.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-30">
        <Dialog.Panel className="bg-white p-6 w-full max-w-xl rounded-md shadow-lg">
          <h2 className="text-xl font-semibold whitespace-pre-line">{current.title}</h2>

          {current.description && (
            <p className="text-gray-500 mt-2 whitespace-pre-line">{current.description}</p>
          )}

          {current.options && (
            <div className="mt-4 space-y-2">
              {current.options.map((opt, idx) => {
                const isSelected = current.multiple
                  ? (selectedValues[current.title] as string[] | undefined)?.includes(opt)
                  : selectedValues[current.title] === opt;

                return (
                  <label
                    key={idx}
                    className="flex items-center space-x-3 border p-3 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type={current.multiple ? "checkbox" : "radio"}
                      name={`step-${step}`}
                      value={opt}
                      checked={isSelected}
                      onChange={() => handleOptionSelect(opt)}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          )}

          {current.inputType === "text" && (
            <input
              type="text"
              placeholder="Enter your postcode or town"
              className="mt-4 w-full border rounded p-2"
              maxLength={current.Number}
              value={(selectedValues[current.title] as string) || ""}
              onChange={(e) =>
                setSelectedValues((prev) => ({
                  ...prev,
                  [current.title]: e.target.value,
                }))
              }
            />
          )}

          {current.inputType === "date" && (
            <input
              type="date"
              className="mt-4 w-full border rounded p-2"
              value={(selectedValues[current.title] as string) || ""}
              onChange={(e) =>
                setSelectedValues((prev) => ({
                  ...prev,
                  [current.title]: e.target.value,
                }))
              }
            />
          )}

          <div className="mt-6 flex justify-between">
            {step > 0 && (
              <button onClick={handleBack} className="text-blue-600 hover:underline">
                Back
              </button>
            )}
            {step < stepFields.length - 1 ? (
              <button
                onClick={handleNext}
                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => {
                  localStorage.setItem("djFormResponses", JSON.stringify(selectedValues));
                  onClose();
                }}
                className="ml-auto bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700"
              >
                Finish
              </button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MultiStepModal;
