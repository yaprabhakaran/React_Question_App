import React, { Component } from 'react';
import Routes from "../Routes/Routes";
import Operations from '../../operations';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

const getEmptyQuestion = () => ({title: '', question: ''});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newQuestion: getEmptyQuestion(),
            questions: []
        };

        this.questionOperations = {
            updateNewQuestion: this.updateNewQuestion.bind(this),
            createNewQuestion: this.createNewQuestion.bind(this)
        };
    }

    componentDidMount(){
        return this.updateQuestionList();
    }

    updateQuestionList(){
        return Operations.getQuestionList()
            .then(({data})=>{
              if(data.success){
                this.setState({questions: data.data});
              }else{
                alert("Something went wrong while fetching data");
              }
            });
    }

    updateNewQuestion({target}){
        const {id, value} = target;
        const data = { [id]: value};
        const newQuestion = Object.assign({}, this.state.newQuestion, data );
        this.setState( { newQuestion } );
    }

    createNewQuestion(){
        return Operations.createQuestion(this.state.newQuestion)
            .then(({data})=>{
                if(data.success){
                  alert(`Question: "${this.state.newQuestion.question}" was created!`);
                  this.setState({newQuestion: getEmptyQuestion()});
                  this.updateQuestionList();
                  history.push('/question-list');
                }else{
                    alert(`Error creating Question: "${this.state.newQuestion.question}"`);
                }
            });
    }

    render() {
    return (
      <div id="App">
          <Routes history={history} {...this.state} questionOperations={this.questionOperations} />
      </div>
    );
  }
}

export default App;
