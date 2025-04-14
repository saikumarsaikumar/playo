import axiosInstance from './axiosInstance';

const createEvent = (data) => axiosInstance.post('/event/createEvent', data);
const getMyEvents = () => axiosInstance.get('/event/getMyEvents');

export default { createEvent, getMyEvents };
