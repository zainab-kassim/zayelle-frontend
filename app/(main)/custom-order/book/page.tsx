"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { bookMeeting } from "@/services/calendar-meet.service";
import { ConflictToast } from "@/components/ui/ConflictToast";

const ALL_TIMES = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_INITIALS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

function formatDate(date: Date) {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export default function BookPage() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

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

  const getAvailableTimes = () => {
    const now = new Date();
    const isToday = selectedDate?.toDateString() === now.toDateString();

    if (!isToday) return ALL_TIMES; // future dates show all times

    return ALL_TIMES.filter(t => {
      const [time, period] = t.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let hour24 = hours;
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;

      const slotTime = new Date();
      slotTime.setHours(hour24, minutes, 0, 0);

      return slotTime > now; // only show future times
    });
  };

  async function handleConfirm() {
    // both must be present or a null name/email reaches the API
    const Username = localStorage.getItem('fullName');
    const UserEmail = localStorage.getItem('email');
    if (!Username || !UserEmail) {
      toast.error("Please log in to book a consultation.");
      router.push('/auth/signup?redirect=/custom-order/book');
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time.");
      return;
    }

    try {
      const result = await bookMeeting(Username, selectedDate, selectedTime, UserEmail);
      if (result.status === 'conflict') {
        toast.custom(() => <ConflictToast />);
      } else {
        setConfirmed(true);
      }
    } catch (error) {
      Sentry.captureException(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (confirmed && selectedDate && selectedTime) {
    return (
      <div className="w-full min-h-[70vh] bg-paper flex items-center justify-center px-6">
        <div className="text-center flex flex-col items-center gap-4">
          <Image
            src="https://img.icons8.com/?size=100&id=kCNfpZEhheCl&format=png&color=000000"
            alt="Booked"
            width={56}
            height={56}
          />
          <h1 className="font-serif text-ink/85 font-normal text-[22px] sm:text-[26px]">
            Consultation booked
          </h1>
          <div className="flex flex-col items-center gap-1.5">
            <p className="font-sans text-muted text-[13px]">
              {formatDate(selectedDate)} at {selectedTime}
            </p>
            <p className="font-sans text-muted/70 text-[12px]">A Google Meet link will be sent to your email.</p>
          </div>
        </div>
      </div>
    );
  }

  const availableTimes = getAvailableTimes();

  return (
    <div className="w-full bg-paper px-4 md:px-12 lg:px-34 xl:px-16 py-8 sm:py-10 pb-16 sm:pb-24">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 sm:gap-10">

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2.5">
          <h1 className="font-serif text-ink/85 font-normal leading-[1.15] text-balance text-[22px] sm:text-[28px]">
            Book your consultation call
          </h1>
          <p className="font-sans text-muted text-[13px] sm:text-[14px] max-w-md">
            30 minutes to go over your order details and measurements.
          </p>
          <div className="flex items-center gap-2 mt-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted" aria-hidden="true">
              <path d="M15 10l5-3v10l-5-3" />
              <rect x="3" y="6" width="12" height="12" rx="2" />
            </svg>
            <span className="font-sans text-muted text-[12px]">Hosted on Google Meet</span>
          </div>
        </div>

        {/* Calendar + time picker */}
        <div className="flex flex-col lg:flex-row bg-paper border border-line rounded-2xl overflow-hidden">

          {/* Left — calendar */}
          <div className="flex-1 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-line">
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-paper border border-line text-ink transition-all duration-200 hover:bg-ink hover:text-paper hover:border-ink"
              >
                <ArrowIcon direction="left" />
              </button>
              <span className="font-sans text-ink font-medium text-[13px] sm:text-[14px]">{MONTHS[viewMonth]} {viewYear}</span>
              <button
                onClick={() => changeMonth(1)}
                aria-label="Next month"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-paper border border-line text-ink transition-all duration-200 hover:bg-ink hover:text-paper hover:border-ink"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_INITIALS.map(d => (
                <div key={d} className="text-center font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-muted py-1">{d}</div>
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

                return (
                  <div key={d} className="aspect-square flex items-center justify-center">
                    <button
                      onClick={() => !isPast && handleDayClick(d)}
                      disabled={isPast}
                      className={[
                        "w-[80%] h-[80%] rounded-full flex items-center justify-center font-sans text-[11px] sm:text-[13px] border transition-all duration-200",
                        isSel
                          ? "bg-ink text-paper border-ink font-medium"
                          : isPast
                            ? "text-muted/40 border-transparent cursor-not-allowed"
                            : isToday
                              ? "text-ink border-ink/50 hover:border-ink"
                              : "text-ink border-line hover:border-ink/50",
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
          <div className="w-full lg:w-[240px] p-6 sm:p-8 flex flex-col flex-shrink-0">
            <p className="font-sans text-muted font-medium uppercase tracking-[0.14em] text-[10px] sm:text-[11px] mb-1">
              Pick a time
            </p>
            <p className="font-sans text-ink text-[13px] mb-4 min-h-[18px]">
              {selectedDate ? formatDate(selectedDate) : ""}
            </p>

            <div className="flex flex-col gap-2 flex-1">
              {selectedDate ? (
                availableTimes.length > 0 ? (
                  availableTimes.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`w-full px-4 py-2.5 text-left font-sans text-[13px] border transition-all duration-200 ${selectedTime === t
                        ? "bg-ink text-paper border-ink"
                        : "bg-paper text-ink border-line hover:border-ink/50"
                        }`}
                    >
                      {t}
                    </button>
                  ))
                ) : (
                  <p className="font-sans text-muted text-[13px]">No available times for today. Please select another date.</p>
                )
              ) : (
                <p className="font-sans text-muted text-[13px]">Select a date to see available times.</p>
              )}
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime}
              className="w-full h-12 mt-6 bg-ink text-paper font-sans font-normal uppercase tracking-[0.08em] text-[11px] flex items-center justify-center transition-opacity duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Book Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
