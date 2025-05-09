"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

interface StepField {
  title: string;
  description?: string;
  options?: string[];
  inputType?: "text" | "date";
  Number?: any;
}

const stepFields: StepField[] = [
  {
    title: "Find the perfect\nprofessional for you",
    description:
      "Get free quotes within minutes\nPopular: House Cleaning, Web Design, Personal Trainers",
    inputType: "text",
    Number:6
  },
  {
    title: "What type of event do you need a DJ for?",
    options: [
      "Birthday Party - Adult",
      "Birthday Party - Child",
      "Office party",
      "Special Birthday Party (e.g 16th, 18th, 21st, 30th)",
      "Wedding",
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
    title: "How long do you need a DJ for?",
    options: [
      "Less than 2 hours",
      "2 - 4 hours",
      "4 - 6 hours",
      "6 hours or more",
      "Other",
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
      "Country",
      "Hip-hop / Rap",
      "House",
      "Latin",
      "Pop",
      "R&B / Soul",
      "Rock",
      "Top 40",
    ],
  },
  {
    title: "What type of venue is this for?",
    options: [
      "Hotel/Conference venue",
      "Local Hall/Community Centre",
      "Nightclub",
      "Private Residence",
      "Pub/Bar",
      "Restaurant",
      "Social Club",
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
  {
    title: "Where do you need the DJ?",
    description: "The postcode or town for the address where you want the DJ.",
    inputType: "text",
    Number:6

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
    [key: number]: string;
  }>({});

  const handleOptionSelect = (value: string) => {
    setSelectedValues((prev) => ({ ...prev, [step]: value }));
  };

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, stepFields.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-30">
        <Dialog.Panel className="bg-white p-6 w-full max-w-xl rounded-md shadow-lg">
          <h2 className="text-xl font-semibold whitespace-pre-line">
            {current.title}
          </h2>

          {current.description && (
            <p className="text-gray-500 mt-2 whitespace-pre-line">
              {current.description}
            </p>
          )}

          {current.options && (
            <div className="mt-4 space-y-2">
              {current.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-3 border p-3 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`step-${step}`}
                    value={opt}
                    checked={selectedValues[step] === opt}
                    onChange={() => handleOptionSelect(opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          )}

          {current.inputType === "text" && (
            <input
              type="text"
              placeholder="Enter your postcode or town"
              className="mt-4 w-full border rounded p-2"
              maxLength={current.Number}
              
            />
          )}

          {current.inputType === "date" && (
            <input type="date" className="mt-4 w-full border rounded p-2" />
          )}

          <div className="mt-6 flex justify-between">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="text-blue-600 hover:underline "
              >
                Back
              </button>
            )}
            {step < stepFields.length - 1 ? (
              <button
                onClick={handleNext}
                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded bg-primary hover:bg-primary/90 text-white font-medium"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={onClose}
                className="ml-auto bg-green-600 text-white px-4 py-2 rounded"
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
