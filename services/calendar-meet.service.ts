
export const bookMeeting = async (
    Username: string ,
    selectedDate: Date,
    selectedTime: string,
    UserEmail: string
) => {
    const res = await fetch(process.env.MAKE_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-make-apikey': process.env.MAKE_API_KEY!,
        },
        body: JSON.stringify({
            Username,
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            UserEmail
        }),
    });

    const result = await res.json();
    return result;
};