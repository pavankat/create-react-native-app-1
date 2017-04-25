import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ListView,
  TextInput,
  Button
} from "react-native";
import { Constants, Audio } from "expo";

export default class App extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      songs: ds.cloneWithRows([]),
      artist: "",
      song: "",
      edit: false,
      editedSongId: 0,
      editedSong: "",
      editedArtist: ""
    };
  }

  componentDidMount() {
    fetch("https://morning-mesa-23625.herokuapp.com/songs")
      .then(res => res.json())
      .then(songs => {
        //console.log(songs[0]); //check this out
        this.setState({
          songs: this.state.songs.cloneWithRows(songs)
        });
      });
  }

  _handleButtonPress = () => {
    return fetch("https://morning-mesa-23625.herokuapp.com/songs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        artist: this.state.artist,
        songName: this.state.song,
        votes: 0
      })
    })
      .then(res => res.json())
      .then(savedSong => {
        let songsUpdated = [...this.state.songs._dataBlob.s1, savedSong];
        this.setState({
          songs: this.state.songs.cloneWithRows(songsUpdated)
        });
      });
  };

  _handleDelete = _id => {
    console.log(_id);

    return fetch(`https://morning-mesa-23625.herokuapp.com/songs/${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(oldSongId => {
        let songsUpdated = this.state.songs._dataBlob.s1.filter(
          song => song._id !== oldSongId
        );
        console.log("deleted id ", oldSongId);
        this.setState({
          songs: this.state.songs.cloneWithRows(songsUpdated)
        });
      });
  };

  /*
  function _handleVote(_id, direction) {
  
  }
  */
  _handleVote = (_id, direction) => {
    console.log(_id, direction);

    return fetch(
      `https://morning-mesa-23625.herokuapp.com/songs/votes/${_id}/${direction}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(editedSong => {
        let songsUpdated = this.state.songs._dataBlob.s1.map(sng => {
          return editedSong._id == sng._id ? editedSong : sng;
        });

        this.setState({
          songs: this.state.songs.cloneWithRows(songsUpdated)
        });
      });
  };

  _handleEdit = _id => {
    fetch(`https://morning-mesa-23625.herokuapp.com/songs/${_id}`)
      .then(res => res.json())
      .then(song => {
        //console.log(songs[0]); //check this out
        this.setState({
          edit: true,
          editedSongId: song._id,
          editedSong: song.songName,
          editedArtist: song.artist
        });
      });
  };

  _handleUpdateButtonPress = () => {
    let updatedSong = {
      artist: this.state.editedArtist,
      songName: this.state.editedSong
    };

    return fetch(
      `https://morning-mesa-23625.herokuapp.com/songs/${this.state.editedSongId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedSong)
      }
    )
      .then(res => res.json())
      .then(updatedSong => {
        let songsUpdated = this.state.songs._dataBlob.s1.map(sng => {
          return updatedSong._id == sng._id ? updatedSong : sng;
        });

        this.setState({
          songs: this.state.songs.cloneWithRows(songsUpdated),
          edit: false,
          editedSongId: 0,
          editedSong: "",
          editedArtist: ""
        });
      });
  };

  _handlePlaySoundAsync = _id => {
    let sound;
    return fetch(`https://morning-mesa-23625.herokuapp.com/songs/${_id}`)
      .then(res => res.json())
      .then(song => {
        return fetch(
          `https://morning-mesa-23625.herokuapp.com/songs/${song.artist}/${song.songName}`
        );
      })
      .then(res => res.json())
      .then(spotifyInfo => {
        return spotifyInfo;
      })
      .then(spotifyInfo => {
        sound = new Audio.Sound({
          source: spotifyInfo[0].previewSong
        });
        return sound;
      })
      .then(() => {
        return Audio.setIsEnabledAsync(true);
      })
      .then(() => {
        return sound.loadAsync();
      })
      .then(() => {
        return sound.playAsync();
      });
  };

  render() {
    let editForm = null;

    if (this.state.edit) {
      editForm = (
        <View>
          <Text style={styles.heading}>Edit a Song</Text>
          <TextInput
            style={{ width: 200, height: 44, padding: 8 }}
            value={this.state.editedArtist}
            onChangeText={text => this.setState({ editedArtist: text })}
          />

          <TextInput
            style={{ width: 200, height: 44, padding: 8 }}
            value={this.state.editedSong}
            onChangeText={text => this.setState({ editedSong: text })}
          />
          <Button title="Update Song" onPress={this._handleUpdateButtonPress} />
        </View>
      );
    }

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
          onChangeText={text => this.setState({ artist: text })}
        />

        <TextInput
          style={{ width: 200, height: 44, padding: 8 }}
          defaultValue="song"
          onChangeText={text => this.setState({ song: text })}
        />
        <Button title="Add Song" onPress={this._handleButtonPress} />

        {editForm}

        <ListView
          dataSource={this.state.songs}
          renderRow={song => (
            <View style={styles.container}>

              <Text style={styles.item}>
                Artist:
                {" "}
                {song.artist}
                {" "}
                | Song:
                {" "}
                {song.songName}
                {" "}
                | Votes:
                {" "}
                {song.votes}
              </Text>

              <Button
                title="Play a sound!"
                onPress={() => {
                  this._handlePlaySoundAsync(song._id);
                }}
              />

              <Button title="Edit" onPress={() => this._handleEdit(song._id)} />

              <Button
                title="Up Vote"
                onPress={() => this._handleVote(song._id, "up")}
              />

              <Button
                title="Down Vote"
                onPress={() => this._handleVote(song._id, "down")}
              />

              <Button
                title="Delete"
                onPress={() => this._handleDelete(song._id)}
              />

            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  item: {
    marginTop: 10
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold"
  }
});