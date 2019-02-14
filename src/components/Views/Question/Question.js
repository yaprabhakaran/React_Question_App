import React, { Component } from 'react';
import { questionTitle, answerTitle, btn, answerBtn, answerSubmitBtn, answerField } from './Question.scss'
import Operations from '../../../operations';

const resetUI = () => ({
    displayAnswer: false,
    newAnswer: ''
});

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: {
                id: null,
                title: null,
                question: null,
                answers: null
            },
            ui: resetUI()
        };

        this.toggleAnswerSection = this.toggleAnswerSection.bind(this);
        this.updateNewAswer = this.updateNewAswer.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
    }

    componentDidMount(){
        return Operations.getQuestion(this.props.match.params.id)
            .then(({data})=>{
               this.setState({question: data.data});
            });
    }

    toggleAnswerSection(){
        const ui = Object.assign({}, this.state.ui, { displayAnswer: !this.state.ui.displayAnswer } );
        this.setState({ui})
    }

    updateNewAswer({target}){
        const { value } = target;
        const ui = Object.assign({}, this.state.ui, { newAnswer: value } );
        this.setState( { ui } );
    }

    sendAnswer(){
        const { id } = this.state.question;
        const { newAnswer } = this.state.ui;
        return Operations.addAnswer(id, {answer: newAnswer})
            .then(({data}) => {
              if(data.success){
                  const question = Object.assign({}, this.state.question, { answers: data.data } );
                  this.setState({question, ui: resetUI()});
                }else{
                  alert("error on updating answer");
                }
            });
    }

    render() {
        const { title, question, answers } = this.state.question;
        const { displayAnswer, newAnswer } = this.state.ui;
        return (
            <div id="Question">
                <button onClick={this.toggleAnswerSection} className={`${btn} ${answerBtn}`}>
                    {displayAnswer ? 'Don\'t answer it': 'Answer this'}!
                </button>
                <h1 className={questionTitle}>Question</h1>
                <p>{title}</p>
                <p>{question}</p>
                <h2 className={answerTitle}>Answer</h2>
                { displayAnswer && <button onClick={this.sendAnswer} className={`${btn} ${answerSubmitBtn}`}>Submit answer!</button> }
                { displayAnswer && <textarea className={answerField} value={newAnswer} onChange={this.updateNewAswer} /> }
                <ul>
                    {answers && answers.map((a, i)=>(<li key={i}>{a}</li>))}
                </ul>
            </div>
        );
    }
};

export default Question;
