import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
    constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      songs: ds.cloneWithRows([]),
    };
  }
  
  componentDidMount(){
    fetch("https://morning-mesa-23625.herokuapp.com/songs")
    .then(res => res.json())
    .then(sngs => {
      console.log(sngs[0]);
      this.setState({
        songs : this.state.songs.cloneWithRows(sngs)
      })
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone!
          Save to get a shareable url. You get a new url each time you save.
        </Text>

        <Text>Songs</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

      <ListView
        dataSource={this.state.songs}
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
