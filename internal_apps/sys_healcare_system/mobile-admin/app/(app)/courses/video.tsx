import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';
import { createCourseProgress } from '../../../services/courseService';
import { WebView } from 'react-native-webview';

export default function VideoScreen() {
  const router = useRouter();
  const { courseId, contentId, content } = useLocalSearchParams();
  const { token, user } = useAuth();
  const [playing, setPlaying] = useState(false);

  const parsedContent = content ? JSON.parse(content as string) : null;

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleComplete = async () => {
    try {
      // Save progress
      if (user) {
        await createCourseProgress({
          uid: user.id.toString(),
          courseId: Number(courseId),
          courseContentId: Number(contentId),
          type: 'completed'
        }, token);
      }
      
      // Navigate back to course detail
      router.push({
        pathname: '/(app)/courses/[id]',
        params: { id: courseId }
      });
      
      Alert.alert('Success', 'Video completed!');
    } catch (error) {
      console.error('Error saving progress:', error);
      Alert.alert('Error', 'Failed to save progress');
    }
  };

  if (!parsedContent || !parsedContent.videoURL) {
    return (
      <View style={styles.container}>
        <Text>Video content not found</Text>
      </View>
    );
  }

  // Create YouTube embed URL
  const youtubeUrl = `https://www.youtube.com/embed/${parsedContent.videoURL}`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{parsedContent.name}</Text>
        
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: youtubeUrl }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={true}
          />
        </View>
        
        {parsedContent.description ? (
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description:</Text>
            <Text style={styles.description}>{parsedContent.description}</Text>
          </View>
        ) : null}
        
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Complete Video</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  videoContainer: {
    height: 200,
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  completeButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});