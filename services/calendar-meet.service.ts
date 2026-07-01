import axiosInstance from '@/lib/axiosInstance';
 
export const bookMeeting = async (
    Username: string,
    selectedDate: Date,
    selectedTime: string,
    UserEmail: string
) => {
    const response = await axiosInstance.post('/booking', {
        Username,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        UserEmail,
    });
 
    return response.data;
};
 