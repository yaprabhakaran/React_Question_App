import React from 'react';
import { Link } from 'react-router-dom';
import URL from '../../Routes/Urls';
import { questionListContainer } from './QuestionList.scss';

const QuestionList = ({questions}) => {
    return (
        <div className={questionListContainer}>
            { questions.map((q, i)=>(
                <Link key={i} to={`${URL.question.pathname}/${q.id}`}>
                    <li>{q.question}</li>
                </Link>
            )) }
        </div>
    )
};

export default QuestionList;
