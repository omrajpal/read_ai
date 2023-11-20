import React, { Component } from 'react'
import {StyleSheet } from 'react-native'

import Swiper from 'react-native-swiper'
import Slide from './Slide'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default class SwiperComponent extends Component {

  render() {
    if (this.props.legacyUser == true) {
      return (
        <Swiper style={styles.wrapper} showsButtons={false}>
          <Slide style={styles.slide1}
            heading={"Welcome back!"}
            lottieFile={ require("./../../assets/lottie/party.json")}
            description={"Thank you for using our app! We are truly grateful for taking time out of your busy day to use our services!"}
          />
           <Slide style={styles.slide2}
            heading={"What's new."}
            lottieFile={ require("./../../assets/lottie/whatsnew.json")}
            description={"We have added a couple new features, such as finding similar books and keeping track of all books you have read and are currently reading."}
          />
          <Slide style={styles.slide3}
            heading={"We love your feedback!"}
            lottieFile={ require("./../../assets/lottie/thank.json")}
            description={"We appreciate every single one of you that helps us improve ReadAI. Couldn't do it without you :)"}
          />
        </Swiper>
      )
    } else {
      return (
        <Swiper style={styles.wrapper} showsButtons={false}>
          <Slide style={styles.slide1}
            heading={"We know that self-improvement is hard."}
            lottieFile={ require("./../../assets/lottie/meditation.json")}
            description={"Let our AI tools do the dirty work -- while you read the most optimal books."}
          />
           <Slide style={styles.slide2}
            heading={"Find the answers you have been looking for."}
            lottieFile={ require("./../../assets/lottie/read.json")}
            description={"With hundreds of books to choose from, ReadAI can find the ones necessary for your journey."}
          />
          <Slide style={styles.slide3}
            heading={"No shortcuts."}
            lottieFile={ require("./../../assets/lottie/weight.json")}
            description={"We know that nothing worth it comes easy: our goal is to reduce that friction. Just 27 questions to find your next life-changing book."}
          />
        </Swiper>
      )
    }
    
  }
}