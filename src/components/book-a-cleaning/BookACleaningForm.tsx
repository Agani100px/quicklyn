"use client";

import { useMemo, useState } from "react";
import type {
  BookACleaningApartmentType,
  BookACleaningHowOften,
  BookACleaningExtra,
} from "@/types/wordpress";

function parseNum(s: string | undefined): number {
  if (s == null || s === "") return 0;
  const n = parseFloat(String(s).trim());
  return Number.isFinite(n) ? n : 0;
}

interface BookACleaningFormProps {
  apartmentTypes: BookACleaningApartmentType[];
  howOftenOptions: BookACleaningHowOften[];
  extras: BookACleaningExtra[];
}

export function BookACleaningForm({
  apartmentTypes,
  howOftenOptions,
  extras,
}: BookACleaningFormProps) {
  const [apartmentIndex, setApartmentIndex] = useState(0);
  const [howOftenIndex, setHowOftenIndex] = useState(0);
  const [selectedExtraIndices, setSelectedExtraIndices] = useState<Set<number>>(new Set());
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const apartment = apartmentTypes[apartmentIndex];
  const howOften = howOftenOptions[howOftenIndex];

  const { totalHours, totalCost } = useMemo(() => {
    const aptHours = parseNum(apartment?.hours);
    const aptRate = parseNum(apartment?.hourly_rate);
    const times = parseNum(howOften?.times) || 1;

    let hours = aptHours * times;
    let cost = aptHours * aptRate * times;

    selectedExtraIndices.forEach((i) => {
      const ex = extras[i];
      if (!ex) return;
      const exHours = parseNum(ex.hours);
      const exRate = parseNum(ex.hourly_rate);
      hours += exHours;
      cost += exHours * exRate;
    });

    return { totalHours: hours, totalCost: cost };
  }, [apartment, howOften, extras, selectedExtraIndices]);

  const toggleExtra = (index: number) => {
    setSelectedExtraIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const steps = [
    { num: "01", label: "Get An Estimate", active: true },
    { num: "02", label: "Enter Your Details", active: false },
    { num: "03", label: "Confirm Booking", active: false },
  ];

  const selectStyle = {
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.75rem center",
    backgroundSize: "1.25rem",
  };

  return (
    <div className="mx-auto max-w-md px-6 pb-24 pt-8">
      {/* Progress */}
      <div className="mb-10 flex items-start justify-between gap-2">
        {steps.map((step) => (
          <div key={step.num} className="flex flex-col items-center text-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                step.active
                  ? "bg-[#FFDA00] text-[#1B5B5D]"
                  : "border border-white text-white"
              }`}
            >
              {step.num}
            </div>
            <span
              className={`mt-2 text-xs ${
                step.active ? "text-[#FFDA00]" : "text-white"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Apartment / House Type */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-white">
          Apartment/ House Type<span className="text-[#FFDA00]">*</span>
        </label>
        <select
          value={apartmentIndex}
          onChange={(e) => setApartmentIndex(Number(e.target.value))}
          style={selectStyle}
          className="w-full rounded-lg border border-white/60 bg-[#1a5d5f]/80 py-3 pl-4 pr-12 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50"
        >
          {apartmentTypes.map((apt, i) => (
            <option key={i} value={i} className="bg-[#1a5d5f] text-white">
              {apt.name ?? `Option ${i + 1}`}
            </option>
          ))}
        </select>
      </div>

      {/* Date & Time */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-white">
          Choose A Date & Time<span className="text-[#FFDA00]">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            className="w-full rounded-lg border border-white/60 bg-[#1a5d5f]/80 py-3 px-4 text-white [color-scheme:dark] focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50"
          />
          <select
            value={timeValue}
            onChange={(e) => setTimeValue(e.target.value)}
            style={selectStyle}
            className="w-full rounded-lg border border-white/60 bg-[#1a5d5f]/80 py-3 pl-4 pr-12 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50"
          >
            <option value="" className="bg-[#1a5d5f] text-white">
              Select time
            </option>
            {["9.00 AM", "10.00 AM", "11.00 AM", "12.00 PM", "2.00 PM", "4.00 PM"].map(
              (t) => (
                <option key={t} value={t} className="bg-[#1a5d5f] text-white">
                  {t}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* How Often */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-white">
          How Often<span className="text-[#FFDA00]">*</span>
        </label>
        <p className="mb-2 text-xs text-white/80">
          Reschedule Or Cancel Anytime.
        </p>
        <select
          value={howOftenIndex}
          onChange={(e) => setHowOftenIndex(Number(e.target.value))}
          style={selectStyle}
          className="w-full rounded-lg border border-white/60 bg-[#1a5d5f]/80 py-3 pl-4 pr-12 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50"
        >
          {howOftenOptions.map((opt, i) => (
            <option key={i} value={i} className="bg-[#1a5d5f] text-white">
              {opt.how_often_name ?? `Option ${i + 1}`}
            </option>
          ))}
        </select>
      </div>

      {/* Select Extras */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-medium text-white">Select Extras</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {extras.map((ex, i) => (
            <label
              key={i}
              className="flex cursor-pointer items-center gap-2 text-sm text-white"
            >
              <input
                type="checkbox"
                checked={selectedExtraIndices.has(i)}
                onChange={() => toggleExtra(i)}
                className="h-6 w-6 flex-shrink-0 rounded-full border-2 border-white bg-transparent text-[#FFDA00] focus:ring-2 focus:ring-white/50"
              />
              <span>{ex.extras_name ?? ""}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Estimated Time & Cost */}
      <div className="mb-6 rounded-t-2xl bg-black/25 px-6 py-5">
        <p className="mb-3 text-sm font-medium text-white">
          Estimated Time & Cost
        </p>
        <div className="mb-4 flex items-center gap-4">
          <span className="text-2xl font-bold text-white">
            {totalHours.toFixed(1)} Hrs
          </span>
          <span className="h-6 w-px bg-white/60" aria-hidden />
          <span className="text-2xl font-bold text-white">
            ${totalCost.toFixed(2)}
          </span>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FFDA00] py-3.5 text-base font-semibold text-[#1B5B5D] transition hover:opacity-95"
        >
          Proceed
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </button>
      </div>

      {/* Special notes will be rendered by parent */}
    </div>
  );
}
