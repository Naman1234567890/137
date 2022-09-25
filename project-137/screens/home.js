import 'react-native-gesture-handler'; 
import * as React from 'react';
import { Text, View, StyleSheet, Flatlist, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';

export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataToShow : [],
      url : "http://127.0.0.1:5000/"
    }
  }

getPlanetsData = () => {
  const {url} = this.state;
  axios.get(url).then(response => {
    return this.setState({
      dataToShow : response.data.data()
    })
  })
  .catch(error => {
    alert(error.message)
  })
}

renderItem = ({item, index}) => (
  <ListItem
  key = {index}
  title = {`Planet : ${item.name}`}
  subtitle = {`Distance from Earth : ${item.distance_from_Earth}`}
  titleStyle = {styles.title}
  containerStyle = {styles.listContainer}
  bottomDivider chevron onPress = {() => this.props.navigations.navigate("Details", {planet_name : item.name})}
  />
)

keyExtractor = (item, index) => index.toString()

componentDidMount(){
  this.getPlanetsData()
}

  render(){
    const {dataToShow} = this.state
    if (dataToShow.length === 0){
      return(
        <View style = {styles.emptyContainer}>
        <Text>Loading....</Text>
        </View>
      )
    }
    return(
      <View style = {styles.container}>
      <View style = {styles.upperContainer}>
      <Text style = {styles.headerText}>WELCOME TO THE EXOPLANET DISCOVERY PAGE</Text>
      </View>

      <View style = {styles.lowerContainer}>
      <Flatlist keyExtractor = {this.keyExtractor}
      data = {this.dataToShow}
      renderItem = {this.renderItem}
      />
      </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988"
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743"
  },
  lowerContainer: {
    flex: 0.9
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainerText: {
    fontSize: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e"
  },
  listContainer: {
    backgroundColor: "#eeecda"
  }
})