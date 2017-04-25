import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';
import { Constants } from 'expo';
import helloTest from './test.js';

export default class App extends Component {
    constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{_id: "58ef743d6aad9c0011debb33", artist: "Taylor Swift", songName: "Bad Blood", votes: 29 }, {_id: "58f00343f7c2c400118b806d", artist: "metallica", songName: "seek and destroy", votes: 19 }, {_id: "58f19b5eedcfce0011321a12", artist: "Methodman and Redman", songName: "Whateva Man", votes: 0 }, {_id: "58f19b5eedcfce0011321a12", artist: "Ozzy Osbourne", songName: "Bark at the Moon", votes: 100 }]),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{helloTest()}</Text>

        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone!
          Save to get a shareable url. You get a new url each time you save.
        </Text>

        <Text>Songs</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(song) => <Text style={styles.item}>Artist: {song.artist} | Song: {song.songName} | Votes: {song.votes}</Text>}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  item: {
    marginTop: 10
  }
  
});
