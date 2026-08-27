import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Plus, Trash2, File } from 'lucide-react-native';
import axios from 'axios';
import { API_URL } from '../../../services/api';

const MediaScreen = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const token = useSelector((state: RootState) => state.auth.token);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/media`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setMediaItems(response.data.data);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to load media');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const pickImage = async () => {
        // Request permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true, // Enables native cropping UI
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handleUpload(result.assets[0]);
        }
    };

    const handleUpload = async (asset: ImagePicker.ImagePickerAsset) => {
        setUploading(true);
        const formData = new FormData();

        const localUri = asset.uri;
        const filename = localUri.split('/').pop() || 'upload.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        // @ts-ignore - React Native form data requires specific structure
        formData.append('file', { uri: localUri, name: filename, type });

        try {
            await axios.post(`${API_URL}/media/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', 'Media uploaded successfully');
            fetchMedia();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        Alert.alert(
            "Delete Media",
            "Are you sure you want to delete this file?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await axios.delete(`${API_URL}/media/${id}`, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            setMediaItems(items => items.filter((item: any) => item.id !== id));
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete media');
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            {item.type === 'image' ? (
                <Image
                    source={{ uri: `${API_URL}${item.url}` }}
                    style={styles.thumbnail}
                />
            ) : (
                <View style={[styles.thumbnail, styles.filePlaceholder]}>
                    <File color="#666" size={32} />
                </View>
            )}
            <View style={styles.infoContainer}>
                <Text numberOfLines={1} style={styles.filename}>{item.filename}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Trash2 color="red" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={mediaItems}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                refreshing={loading}
                onRefresh={fetchMedia}
                ListEmptyComponent={<Text style={styles.emptyText}>No media found</Text>}
            />

            <TouchableOpacity style={styles.fab} onPress={pickImage} disabled={uploading}>
                {uploading ? <ActivityIndicator color="#fff" /> : <Plus color="#fff" size={24} />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContent: {
        padding: 8,
    },
    itemContainer: {
        flex: 1,
        margin: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    thumbnail: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    filePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    filename: {
        flex: 1,
        marginRight: 8,
        fontSize: 12,
        color: '#333',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
    },
});

export default MediaScreen;
