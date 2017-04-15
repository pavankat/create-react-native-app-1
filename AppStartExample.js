import React, { Component } from 'react';
import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';

import { Constants } from 'expo';
 
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGES = [
  {
    title: 'Lorem Ipsum Dolor',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
    backgroundColor: '#0264BC',
    image: 'http://unsplash.it/400/400?image=674'
  },
  {
    title: 'Consectetur adipisicing',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ",
    backgroundColor: '#1abc9c',
    image: 'https://unsplash.it/400/400?image=940'
  },
  {
    title: 'Adipisicing elitt',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
    backgroundColor: '#d35400',
    image: 'https://unsplash.it/400/400?image=900'
  },
  {
    title: 'sit amet',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
    backgroundColor: '#34495e',
    image: 'https://unsplash.it/400/400?image=999'
  },
  {
    title: 'Sed do eiusmod',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
    backgroundColor: '#127186',
    image: 'https://unsplash.it/400/400?image=1011'
  },
]

export default class App extends Component {
  state = {
    scroll: new Animated.Value(0)
  };

  render() {
    const position = Animated.divide(this.state.scroll, PAGE_WIDTH);
    
    const backgroundColor = position.interpolate({
      inputRange: PAGES.map((_, i) => i),
      outputRange: PAGES.map(p => p.backgroundColor),
    });

    return (
      <View style={styles.container}>
        <Animated.View style={[ StyleSheet.absoluteFill, { backgroundColor, opacity: 0.8 } ]} />

        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.state.scroll } }}],
          )}>
          {PAGES.map((page, i) => (
            <View key={i} style={styles.page}>
              <View style={[ styles.card ]}>
                <Text style={styles.title}>{page.title}</Text>
                <Text style={styles.desc}>{page.description}</Text>
              </View>

              <Animated.View style={[ styles.frame, styles.shadow, { transform: [{ translateX: Animated.multiply(Animated.add(position, -i), -200) }] } ]}>
                <Animated.Image
                  source={{uri: page.image}}
                  style={styles.photo}
                />
              </Animated.View>
            </View>
          ))}
        </Animated.ScrollView>
        
        <View pointerEvents='none' style={styles.dotsView}>
          {PAGES.map((page, i) => (
            <Animated.View key={i} style={[styles.dot, {opacity: Animated.add(position, -i + 1)} ]} >
            </Animated.View> 
            )
          )}
        </View>
        
        <View style={styles.button}>
          <Text style={styles.buttonText}>{"GET STARTED"}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    elevation: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: {
      height: 12
    },
  },
  title: {
    fontSize: PAGE_WIDTH / 12,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },

  desc: {
    fontSize: PAGE_WIDTH / 24,
    color: '#fff',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 25,
    textAlign: 'center'
  },
  page: {
    width: PAGE_WIDTH,
    paddingTop: Constants.statusBarHeight + 48,
  },
  card: {
    position: 'absolute',
    margin: 12,
    marginTop: 40,
    left: 12,
    top: 0,
    right: 0,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 140,
  },
  frame: {
    position: 'absolute',
    left: 0,
    bottom: 160,
    borderRadius: (PAGE_WIDTH -100)/2,
    height: PAGE_WIDTH -100,
    width: PAGE_WIDTH - 100,
    margin: 50,
  },
  button: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    position: 'absolute',
    margin: 12,
    marginTop: 40,
    left: (PAGE_WIDTH / 2) - 100,
    borderRadius: 50,
    alignItems: 'center',
    bottom: 40,
  },
  buttonText: {
    margin: 15,
    marginLeft: 50,
    marginRight: 40,
    color: '#fff',
    fontSize: 14,
  },
  photo: {
    flex: 1,
    borderRadius: (PAGE_WIDTH -100)/2,
  },
  dotsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    bottom: 4, 
    left: 0,
    height: 2,
    width: PAGE_WIDTH
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, .6)',
    height: 2,
    marginLeft: 1,
    width: Math.round(PAGE_WIDTH / PAGES.length) - 4,
  },
});
