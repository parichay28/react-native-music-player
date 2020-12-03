import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, FlatList} from 'react-native';

// components
import TrackItem from './TrackItem';

export class TrackList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data.length !== this.props.data.length) {
      // console.log('tracklist will update');
      return true;
    }
    // console.log('tracklist will not update');

    return false;
  }
  // componentDidMount() {
  //   console.log('tracklist mounted');
  // }

  // componentWillUnmount() {
  //   console.log('tracklist umnounted');
  // }
  keyExtractor = (item, index) =>
    item.track ? item.track.id + index : item.id + index;

  renderItem = ({item}) => {
    const {sectionName, playNewSong, player} = this.props;
    return (
      <TrackItem
        track={item.track ? item.track : item}
        sectionName={sectionName}
        playNewSong={playNewSong}
        player={player}
      />
    );
  };
  render() {
    // console.log('tracklist render');
    const {data} = this.props;
    return (
      <FlatList
        style={styles.sectionContainer}
        data={data}
        horizontal={true}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginBottom: 20,
    // height: 238,
    // borderWidth: 1,
  },
});

export default TrackList;
