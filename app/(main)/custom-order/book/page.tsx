"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { bookMeeting } from "@/services/calendar-meet.service";
import { ConflictToast } from "@/components/ui/ConflictToast";

const TIMES = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function BookPage() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter()

  function changeMonth(dir: number) {
    let m = viewMonth + dir, y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setViewMonth(m); setViewYear(y);
  }

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function handleDayClick(d: number) {
    setSelectedDate(new Date(viewYear, viewMonth, d));
    setSelectedTime(null);
  }

  async function handleConfirm() {
    // Check if user is logged in
    const Username = localStorage.getItem('firstName');
    const UserEmail = localStorage.getItem('email');
    if (!Username && !UserEmail) {
      toast.error("Please log in to book a consultation.");
      router.push('/auth/signup?redirect=/book');
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time.");
      return;
    }

    try {
      const result = await bookMeeting(Username!, selectedDate, selectedTime, UserEmail!);
      if (result.status === 'conflict') {
        toast.custom(() => <ConflictToast />);
      } else {
        setConfirmed(true);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (confirmed && selectedDate && selectedTime) {
    return (
      <div className="w-full min-h-screen  bg-white flex items-center justify-center px-4">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-2xl">✓</div>
          <h2 className="text-xl font-semibold text-[#1a1a1a]" style={{ fontFamily: '"Expletus Sans", serif' }}>
            Consultation booked!
          </h2>
          <p className="text-sm text-[#5a5a5a]">
            {DAYS[selectedDate.getDay()]}, {MONTHS[selectedDate.getMonth()]} {selectedDate.getDate()} at {selectedTime}
          </p>
          <p className="text-xs text-[#aaa]">A Google Meet link will be sent to your email.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="w-full min-h-screen flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Google Meet
          </span>
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-1" style={{ fontFamily: '"Expletus Sans", serif' }}>
            Book a custom order call
          </h1>
          <p className="text-sm text-[#5a5a5a]">30-minute session · We'll discuss your order details and measurements</p>
        </div>

        {/* Two-column card */}
        <div style={{
          backdropFilter: 'blur(10px)',
          border: '0.6px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '-1px 3px 10px rgba(0, 0, 0, 0.12)',
        }}
          className="flex flex-col lg:flex-row border border-[#e0e0e0] rounded-2xl overflow-hidden">

          {/* Left — calendar */}
          <div className="flex-1 p-8 lg:border-r border-[#e0e0e0]">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => changeMonth(-1)}
                className="w-8 h-8 rounded-lg border border-[#e0e0e0] bg-white flex items-center justify-center text-[#5a5a5a] hover:bg-gray-50 transition-colors"
              >‹</button>
              <span className="text-[15px] font-medium text-[#1a1a1a]">{MONTHS[viewMonth]} {viewYear}</span>
              <button
                onClick={() => changeMonth(1)}
                className="w-8 h-8 rounded-lg border border-[#e0e0e0] bg-white flex items-center justify-center text-[#5a5a5a] hover:bg-gray-50 transition-colors"
              >›</button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                <div key={d} className="text-center text-[10px] font-semibold tracking-widest uppercase text-[#aaa] py-1">{d}</div>
              ))}
            </div>

            {/* Date grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: firstDow }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
                const date = new Date(viewYear, viewMonth, d);
                const isPast = date < today;
                const isToday = date.getTime() === today.getTime();
                const isSel = selectedDate?.toDateString() === date.toDateString();
                const isWknd = date.getDay() === 0 || date.getDay() === 6;

                return (
                  <div key={d} className="aspect-square flex items-center justify-center">
                    <button
                      onClick={() => !isPast && handleDayClick(d)}
                      disabled={isPast}
                      className={[
                        "w-[80%] h-[80%] rounded-full flex items-center justify-center text-[9px] md:text-[13px] transition-all duration-150",
                        isSel
                          ? "bg-[#1a1a1a] text-white font-medium border border-[#1a1a1a] -translate-y-px"
                          : isToday
                            ? "bg-white text-blue-500 font-medium border border-blue-400 shadow-[0_2px_6px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.11)] hover:-translate-y-px"
                            : isPast
                              ? "bg-white text-[#ccc] border border-[#f0f0f0] shadow-none cursor-not-allowed"
                              : isWknd
                                ? "bg-white text-[#999] border border-[#e0e0e0] shadow-[0_2px_6px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.05)] hover:border-[#bbb] hover:shadow-[0_4px_12px_rgba(0,0,0,0.11)] hover:-translate-y-px"
                                : "bg-white text-[#1a1a1a] border border-[#e0e0e0] shadow-[0_2px_6px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.05)] hover:border-[#bbb] hover:shadow-[0_4px_12px_rgba(0,0,0,0.11)] hover:-translate-y-px",
                      ].join(" ")}
                    >
                      {d}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — time picker */}
          <div className="w-full lg:w-[240px] p-8 flex flex-col flex-shrink-0">
            <p className="text-sm font-medium text-[#1a1a1a] mb-1">Pick a time</p>
            <p className="text-xs text-[#5a5a5a] mb-4 min-h-[18px]">
              {selectedDate
                ? `${DAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}`
                : ""}
            </p>

            <div className="flex flex-col gap-2 flex-1">
              {selectedDate ? (
                TIMES.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm text-left border transition-all ${selectedTime === t
                      ? "bg-[#1a1a1a] text-white  "
                      : "bg-white text-[#1a1a1a] border-[#e0e0e0] hover:border-[#bbb] "
                      }`}
                  >
                    {t}
                  </button>
                ))
              ) : (
                <p className="text-[13px] text-[#bbb]">Select a date to see available times.</p>
              )}
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime}
              className="w-full mt-6 py-3.5 bg-[#1a1a1a] text-white rounded-md text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed border-none"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              Book meeting
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}