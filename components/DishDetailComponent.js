import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (id, dishId, rating, author, comment) => dispatch(postComment(id, dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                            {dish.description}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onFav()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#55cc41'
                        onPress={() => props.onComment()}
                    />
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            author: '',
            comment: '',
            rating:0
        };
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(id, dishId)
    {
        this.props.postComment(id, dishId, this.state.rating, this.state.author, this.state.comment);
    }

    render() {
        const dishId = this.props.route.params.dishId;
        const comm = this.props.comments.comments.filter((comment) => comment.dishId === dishId);
        const nid = this.props.comments.comments.length;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onFav={() => this.markFavorite(dishId)} 
                    onComment={() => this.toggleModal()}
                />
                <RenderComments comments={comm} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Rating
                            showRating
                            style={{ paddingVertical: 10 }}
                            onFinishRating={value => this.setState({ rating: value })}
                        />
                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={value => this.setState({ author: value })}
                        />
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                        <Button 
                            style={{justifyContent: 'space-between'}}
                            onPress = {() =>{this.handleComment(nid, dishId); this.toggleModal();}}
                            color="#512DA8"
                            title="Submit" 
                        />                            
                        <Button 
                            style={{justifyContent: 'space-between'}}
                            onPress = {() =>{this.toggleModal()}}
                            color="#C0C0C0"
                            title="Close" 
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
     },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);