import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
class FilmItem extends React.Component {
    render() {
        const film = this.props.film
        return (
            <View style={styles.maincontainer}>
                <Image
                    style={styles.poster_image}
                    source={{ uri: getImageFromApi(film.poster_path) }} />
                <View style={styles.contentcontainer}>
                    <View style={styles.headercontainer}>
                        <Text style={styles.title_texte} numberOfLines={3}>
                            {film.title}
                        </Text >
                        <Text style={styles.note_texte}>
                            {film.vote_average}
                        </Text>
                    </View>
                    <View style={styles.descriptioncontainer}>
                        <Text style={styles.description_texte} numberOfLines={6}> {film.overview}</Text>
                    </View>
                    <View style={styles.datecontainer}>
                        <Text style={styles.date_texte}>Sorti le {film.release_date}</Text>
                    </View>
                </View>
            </View>


        )
    }
}

const styles = StyleSheet.create({

    maincontainer: {
        marginTop: 10,
        height: 190,
        flexDirection: 'row'
    },
    contentcontainer: {
        flex: 5,
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: "space-between"

    },
    descriptioncontainer: {
        flex: 5,
        padding: 2,
        marginBottom: 2
    },
    headercontainer: {
        flex: 3,
        flexDirection: 'row',
        marginBottom: 2
    },
    datecontainer:
    {
        flex: 1,
        paddingRight: 5
    },
    title_texte: {
        flex: 3,
        fontSize: 19,
        fontWeight: "bold",
        flexWrap: "wrap"
    },
    note_texte: {
        flex: 1,
        fontSize: 30,
        fontWeight: "bold",
        paddingRight: 8,
        textAlign: "right"
    },
    poster_image: {
        alignItems: 'center',
        flex: 2

    },
    description_texte: {

    },
    date_texte: {
        textAlign: "right",
        fontStyle: "italic"
    }
}
)


export default FilmItem