import axiosInstance from '@/lib/axiosInstance';
 
export const bookMeeting = async (
    Username: string,
    selectedDate: Date,
    selectedTime: string,
    UserEmail: string
) => {
    const response = await axiosInstance.post('/booking', {
        Username,
        Date: selectedDate.toISOString().split('T')[0],
        Time: selectedTime,
        UserEmail,
    });
 
    return response.data;
};
 