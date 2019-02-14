import axios from 'axios';
const BASE_URL = 'http://localhost:8080/questionapp/api/question';

const crudOperations = {
    getQuestionList: () => (axios.get(`${BASE_URL}`)),
    //.then((response)=>(response.data)),

    getQuestion: (id)=> (axios.get(`${BASE_URL}/${id}`)),
    //.then((response)=>(response.data)),

    createQuestion: (newQuestion) => (axios.post(`${BASE_URL}`, newQuestion)),
    //.then((response)=>(response.data)),

    addAnswer: (id, newAnswer) => (axios.put(`${BASE_URL}/${id}`, newAnswer))
    //.then((response)=>(response.data))
};

export default crudOperations;
