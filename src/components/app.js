import React from 'react';
import Button from './button';
import Card from './card';
import { getQuiz } from '../utils/getQuiz';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: null
    };
  }

  populateQuizCard = (record, index) => {
    const {
      category,
      correct_answer,
      incorrect_answers,
      difficulty,
      question,
      type
    } = record;
    return (
      <Card
        key={index}
        question={question}
        difficulty={difficulty}
        correctAnswer={correct_answer}
        wrongAnswers={incorrect_answers}
      />
    );
  };

  fetchCategory(categoryId) {
    return () => {
      getQuiz(categoryId)
        .then((quiz) => this.setState({ quizData: quiz.results }))
        .then(() => console.log(this.state.quizData));
    };
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        {categories.map((item, i) => {
          const values = item.split('/');
          return (
            <Button
              key={i}
              onClick={this.fetchCategory(values[0])}
              id={values[0]}
            >
              {values[1]}
            </Button>
          );
        })}
        {this.state.quizData
          ? this.state.quizData.map((item, i) => this.populateQuizCard(item, i))
          : ''}
      </div>
    );
  }
}
