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
  
  _handleButtonPress = () => {
    return fetch("https://morning-mesa-23625.herokuapp.com/songs", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artist: this.state.artist,
        songName: this.state.song,
        votes: 0
      })
    }).then(res => res.json())
    .then(savedSong => {
      let songsUpdated = [...this.state.songs._dataBlob.s1, savedSong];
      this.setState({
        songs : this.state.songs.cloneWithRows(songsUpdated)
      })
    })
  };

  _handleDelete = (_id) => {
    console.log(_id)

    return fetch(`https://morning-mesa-23625.herokuapp.com/songs/${_id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(oldSongId => {
      let songsUpdated = this.state.songs._dataBlob.s1.filter((song, i) => song._id !== oldSongId)
      console.log('deleted id ', oldSongId)
      this.setState({
        songs : this.state.songs.cloneWithRows(songsUpdated)
      });
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Songs</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        
        <Text>Artist from state: {this.state.artist}</Text>
        <Text>Song from state: {this.state.song}</Text>

        
        <Text style={styles.heading}>Add a New Song</Text>
        <TextInput
          style={{ width: 200, height: 44, padding: 8 }}
          defaultValue="artist"
          onChangeText={(text) => this.setState({artist: text})}
        />
        
        <TextInput
          style={{ width: 200, height: 44, padding: 8 }}
          defaultValue="song"
          onChangeText={(text) => this.setState({song: text})}
        />
        
        <Button
          title="Add Song"
          onPress={this._handleButtonPress}
        />
      
      <ListView
        dataSource={this.state.songs}
        renderRow={(song) => 
        <View style={styles.container}>
        
        <Text style={styles.item}>Artist: {song.artist} | Song: {song.songName} | Votes: {song.votes}</Text>
        
        
        <Button
          title="Delete"
          onPress={() => this._handleDelete(song._id)}
        />
      
        
        </View>}
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
