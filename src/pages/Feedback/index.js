import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

let count = 1;
const defaultMessage = {
        _id: count++,
        text: "I can't understand what you say",
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    }

class Feedback extends React.Component {
    state = {
        messages: [],
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: count++,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }),()=>setTimeout(()=>{this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, defaultMessage),
        }))},1000));
    }

    render() {
        console.log('message',this.state.messages)
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                    avatar:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4',
                    name:'Moriarty'
                }}
                showUserAvatar={true}
                renderAvatarOnTop={true}
                messageIdGenerator={()=>count++}
            />
        )
    }
}

export default Feedback;
