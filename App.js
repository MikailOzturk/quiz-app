import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const quizData = [
    {
      question: "En güzide şehir neresidir?",
      options: ['Adana', 'İstanbul', 'Ankara', 'Ordu'],
      answer: 'Ordu',
    },
    {
      question: "Türkiye'nin Kuzeyinde Hangi Bölge vardır?",
      options: ['İç Anadolu', 'Karadeniz', 'Akdeniz', 'Doğu Anadolu'],
      answer: 'Karadeniz',
    },
  ]

  const handleAnswer = (selectedAnswer) => {
    const answer = quizData[currentQuestion]?.answer;
    if(answer === selectedAnswer){
      setScore((prevScore) => prevScore + 1);
    }//else{
      //alert("Try Again");
    //}
    const nextQuestion = currentQuestion + 1;
    if(nextQuestion < quizData.length){
      setCurrentQuestion(nextQuestion);
    }else{
      setShowScore(true);
    }
  }
  const handRestart = () =>{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  }
  return (
    <View style={styles.container}>
      {showScore ? <View>
        <Text style={styles.scoreText}>{score}</Text>
        <TouchableOpacity onPress={handRestart} style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
      </View> :
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{ quizData[currentQuestion]?.question }</Text>
        { quizData[currentQuestion]?.options.map((item) => {
          return <TouchableOpacity 
            onPress={()=>handleAnswer(item)} 
            style={styles.optionContainer}
          >
            <Text style={styles.optionStyle}>{item}</Text>
          </TouchableOpacity>
        })}
      </View>
      }
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  questionText: {
    fontSize: 25,
  },
  optionContainer: {
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 15,
  },
  optionStyle: {
    color: 'green',
    padding: 5,
    alignSelf: 'center',
    fontSize: 18,
  },
  resetBtn: {   
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    marginTop: 15,
  },
  resetBtnText: {   
    fontSize: 18,
    paddingHorizontal: 10,
  },
  scoreText: {
    color: 'green',
    padding: 5,
    alignSelf: 'center',
    fontSize: 18,
  },
});
