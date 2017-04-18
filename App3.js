import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TextInput, Button } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      songs: ds.cloneWithRows([]),
      artist: "",
      song: ""
    };
  }

  componentDidMount(){
    fetch("https://morning-mesa-23625.herokuapp.com/songs")
    .then(res => res.json())
    .then(songs => {
      //console.log(songs[0]); //check this out
      this.setState({
        songs : this.state.songs.cloneWithRows(songs)
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Songs</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        
        <Text>Artist from state: {this.state.artist.split('').reverse().join('')}</Text>
        <Text>Song from state: {this.state.song}</Text>

        
        <Text style={styles.heading}>Add a New Song</Text>
        <TextInput
          style={{ width: 200, height: 44, padding: 8 }}
          defaultValue="artist"
          onChangeText={(artist) => this.setState({artist})}
        />
        
        <TextInput
          style={{ width: 200, height: 44, padding: 8 }}
          defaultValue="song"
          onChangeText={(text) => this.setState({song: text})}
        />
      
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
  item: {
    marginTop: 10
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold'
  }
});
