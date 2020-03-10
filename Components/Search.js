import React from 'react'
import { Text, FlatList, StyleSheet, View, Button, TextInput, ActivityIndicator } from 'react-native'
import films from "../Helpers/filmsData"
import FilmItem from "./FilmItem"
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0
        this.total_pages = 0
        this.state = {
            films: [],
            isLoading: false
        }

    }

    _searchFilms() {
        this.page = 0
        this.total_pages = 0
        this.setState({
            films: []
        },
            () => {
                this._loadFilms()
            }
        )

    }
    _loadFilms() {
        this.setState({ isLoading: true })
        if (this.searchedText.length > 0) {

            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
                data => {
                    this.setState({
                        films: [...this.state.films, ...data.results],
                        isLoading: false
                    })
                    this.total_pages = data.total_pages
                    this.page = data.page

                }


            );
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loadingcontainer}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.maincontainer}>
                <TextInput placeholder="Titre du film"
                    style={styles.textinput}
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button title="Rechercher" onPress={() => this._searchFilms()} />

                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FilmItem film={item} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.total_pages) {
                            this._loadFilms()
                        }
                    }}
                />

                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        marginTop: 30
    },

    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        textAlign: "center"
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search

