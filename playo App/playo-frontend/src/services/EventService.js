import axiosInstance from './axiosInstance';

const createEvent = (data) => axiosInstance.post('/event/createEvent', data);
const getMyEvents = () => axiosInstance.get('/event/getMyEvents');
const getAllEvents = () => axiosInstance.get('/event/getAllEvents');
const getEventDetails = (eventId) => axiosInstance.get(`/event/details/${eventId}`);

export default { createEvent, getMyEvents,getAllEvents,getEventDetails };
