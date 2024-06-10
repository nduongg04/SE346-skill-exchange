import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TouchableHighligh, TextInput, Modal } from 'react-native';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
import { Audio } from 'expo-av';
import { loadFonts, styles } from "./mainRoom.style";
import { MessageContext } from './messageContext';

export const Message = (props) => {
    const {sound, setSound} = useContext(MessageContext);
    const [isPlay, setIsPlay] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [urlModal, setUrlModal] = useState()
    const [idCount, setIdCount] = useState(null);
    const [seconds, setSeconds] = useState(0);

    let contentType;
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const modalImage = () => {
        return (
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={closeModal}

            >
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(217, 217, 217, 0.95)' }}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Image source={icons.close} style={{ width: 35, height: 35, marginLeft: 'auto' }} />
                    </TouchableOpacity>
                    <View style={{ width: '85%', height: '85%', marginLeft: '7.5%', marginTop: '7.5%' }}>

                        <Image source={{ uri: props.Content }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>
                </View>

            </Modal>
        )
    }
    useEffect(() => {
        if(sound)
        {
            setIsPlay(false);
        }
}, [sound]);
   
     useEffect(() => {
        
                if (seconds == 0) {
                    setSound(null);
                    setIsPlay(false);
                    clearInterval(idCount);
                    setIdCount(null);
                    if(sound)
                        {
                            setSound(null);
                            setIsPlay(false);
                        }
                  
                }
      }, [seconds]);
   


    const handlePressPlay = async () => {
        if (isPlay) {
            // If there is an existing sound object, unload it first
            clearInterval(idCount);
            setIdCount(null);
            await sound.stopAsync();
            setSound(null);
            setIsPlay(false);
        } else {
            setSound(null);
            // Create a new sound object and play it
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: props.Content });
            setSound(newSound);
            await newSound.playAsync();
            const status = await newSound.getStatusAsync();
                const time = Math.ceil(status.durationMillis / 1000);
                setSeconds(time);
                setIsPlay(true);
                setIdCount(setInterval(() => {
                    setSeconds(seconds => seconds - 1);
                }, 1000))
           
        }
    };

    const getFileName = (url) => {
        const parsedUrl = new URL(url);
        // Lấy phần query params từ URL
        const queryParams = parsedUrl.searchParams;
        // Lấy giá trị của tham số 'alt' từ query params
        const altParam = queryParams.get('alt');
        // Nếu giá trị của tham số 'alt' là 'media', tức là đường dẫn trỏ đến nội dung truyền thông
        if (altParam === 'media') {
            // Lấy phần path từ URL (bao gồm tên tệp)
            const filePath = parsedUrl.pathname;
            // Tách tên tệp từ phần path
            const fileName = filePath.split('/').pop();
            return decodeURIComponent(decodeURIComponent(fileName.replace('files%2F', '')));
        } else {
            console.log('Đường dẫn không trỏ đến nội dung truyền thông.');
        }
    }
    const getFile = () => {
        props.Function(props.Content);
    }
    //Self-messages
    if (props.User == "My message") {
        switch (props.Type) {
            case 'text':
                contentType = <Text style={styles.Message}> {props.Content}</Text>;
                break;
            case 'image':
                contentType =
                    <View style={{ marginTop: 3, marginRight: 5 }}>
                        <TouchableOpacity style={{ width: 150, height: 200, overflow: 'hidden', borderRadius: 15, borderColor: '#FFBE98', borderWidth: 1 }} onPress={openModal}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: "cover" }} source={{ uri: props.Content }} />
                        </TouchableOpacity>
                    </View>;
                break;
            case 'record':
                contentType = <View style={{ justifyContent: 'center', alignItems: 'center', width: 70, height: 45, borderRadius: 20, backgroundColor: "#FF9557", marginTop: 5, marginRight: 5 }}>
                    <TouchableOpacity onPress={handlePressPlay}>
                        <Image source={isPlay ? icons.pause : icons.play} style={isPlay ? { width: 23, height: 23, resizeMode: "cover" } : { width: 30, height: 30, resizeMode: "cover" }} />
                    </TouchableOpacity>
                </View>;
                break;
            case 'file':
                const fileName = getFileName(props.Content);
                contentType =
                    <TouchableOpacity onPress={getFile} >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: "#FF9557", paddingVertical: 7, marginTop: 5, marginRight: 5, paddingHorizontal: 10 }}>
                            <Image source={icons.file} style={{ width: 35, height: 35, resizeMode: "cover" }} />
                            <Text style={styles.TextFile} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
                        </View>
                    </TouchableOpacity>;
                break;
        }
        return (
            <View style={styles.Layout} >
                {modalImage()}
                <View style={styles.MessContainer}>
                    {contentType}

                </View>
                {
                    (props.Time != '') ?
                        (<Text style={styles.Time}>
                            {props.Time}
                        </Text>) : (<View />)
                }
            </View>
        )
    }
    //not Self-messages
    else {
        switch (props.Type) {

            case 'text':
                contentType = <Text style={styles.Message2}> {props.Content}</Text>;
                break;
            case 'image':
                contentType =
                    <View style={{ marginTop: 3, marginLeft: 5 }}>
                        <TouchableOpacity style={{ width: 150, height: 200, overflow: 'hidden', borderRadius: 15, borderColor: '#FF823A', borderWidth: 1 }} onPress={openModal}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: "cover" }} source={{ uri: props.Content }} />
                        </TouchableOpacity>
                    </View>;
                break;
            case 'record':
                contentType = <View style={{ justifyContent: 'center', alignItems: 'center', width: 70, height: 45, borderRadius: 20, backgroundColor: "#FF9557", marginTop: 5, marginLeft: 5 }}>
                    <TouchableOpacity onPress={handlePressPlay}>
                        <Image source={isPlay ? icons.pause : icons.play} style={isPlay ? { width: 23, height: 23, resizeMode: "cover" } : { width: 30, height: 30, resizeMode: "cover" }} />
                    </TouchableOpacity>
                </View>;
                break;
            case 'file':
                const fileName = getFileName(props.Content);
                contentType =
                    <TouchableOpacity onPress={getFile} >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: "#FF9557", paddingVertical: 7, marginTop: 5, marginLeft: 5, paddingHorizontal: 10 }}>
                            <Image source={icons.file} style={{ width: 35, height: 35, resizeMode: "cover" }} />
                            <Text style={styles.TextFile} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
                        </View>
                    </TouchableOpacity>;
                break;
        }
        return (
            <View style={styles.Layout2} >
                {modalImage()}
                <View style={styles.MessContainer}>
                    <View style={styles.AvatarContainer}>
                        <Image source={(props.Avatar == '') ? (icons.while_icon) : ({ uri: props.Avatar })}
                            style={styles.Avatar} />
                    </View>
                    {contentType}

                </View>
                {
                    (props.Time != '') ?
                        (<Text style={styles.Time2}>
                            {props.Time}
                        </Text>) : (<View />)
                }
            </View>
        )
    }
}