import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, DIMENS, SCREENS } from '../../misc/Constants';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import commonStyles from '../../styles/commonStyles';

export default function Add() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const navigation = useNavigation();

    const takePicture = async () => {
        if (camera) {
            const pic = await camera.takePictureAsync(null)
            setImage(pic.uri)
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const removePreview = () => {
        setImage(null)
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            {!image &&
                <View style={styles.cameraContainer}>
                    <Camera
                        ref={ref => setCamera(ref)}
                        style={styles.camera}
                        ratio={"16:9"}
                        type={type} />

                    <View style={styles.cameraButtonContainer}>
                        <TouchableOpacity
                            style={[commonStyles.button, styles.galleryButton]}
                            onPress={() => {
                                pickImage()
                            }}>
                            <Ionicons name='md-image' options size={DIMENS.iconSize} color={COLORS.active} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[commonStyles.button, styles.cameraButton]}
                            onPress={() => {
                                takePicture();
                            }}>
                            <Ionicons name='md-camera' options size={DIMENS.iconSize} color={COLORS.active} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[commonStyles.button, styles.flipButton]}
                            onPress={() => {
                                setType(type === CameraType.back ? CameraType.front : CameraType.back);
                            }}>
                            <Ionicons name='md-sync' options size={DIMENS.iconSize} color={COLORS.active} />
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {image &&
                <View style={styles.previewContainer}>
                    <Image source={{ uri: image }} resizeMode={'cover'} style={{ flex: 1, scaleX: type === CameraType.back ? 1 : -1 }} />
                    <TouchableOpacity
                        style={[commonStyles.button, styles.closeButton]}
                        onPress={() => {
                            removePreview();
                        }}>
                        <Ionicons name='md-close' options size={DIMENS.iconSize} color={COLORS.active} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={() =>
                            navigation.navigate(SCREENS.save, { image })
                        }>
                        <Ionicons name='md-save' options size={DIMENS.iconSize} color={COLORS.active} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.active
    },
    camera: {
        flex: 1,
    },
    cameraContainer: {
        position: 'absolute',
        height: "100%",
        width: "100%"
    },
    cameraButton: {
        borderRadius: 50,

    },
    closeButton: {
        backgroundColor: COLORS.accentLighter,
        position: 'absolute',
        top: 0,
        right: 0
    },
    cameraButtonContainer: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: COLORS.active,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    previewContainer: {
        flex: 1
    }
});
