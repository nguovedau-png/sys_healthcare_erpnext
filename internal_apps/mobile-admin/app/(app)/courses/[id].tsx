import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';
import { getCourse, Course, CourseContent, createCourseProgress, getCourseProgress } from '../../../services/courseService';

export default function CourseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { token, user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadCourse();
    }
  }, [id]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      console.log('Fetching course with ID:', id, 'and token:', token);
      const data = await getCourse(Number(id), token);
      console.log('Course data received:', JSON.stringify(data, null, 2));
      setCourse(data);
      setError(null);
      
      // Load user progress
      if (user) {
        const progress = await getCourseProgress(user.id.toString(), Number(id), token);
        console.log('Progress data received:', progress);
        setUserProgress(progress);
      }
    } catch (err: any) {
      console.error('Error loading course:', err);
      setError(err.message || 'Failed to load course');
      Alert.alert('Error', err.message || 'Failed to load course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartCourse = () => {
    if (course && course.Topics && course.Topics.length > 0) {
      const firstTopic = course.Topics[0];
      // Check if Content exists, if not, we'll need to fetch it separately or handle differently
      if (firstTopic.Content && firstTopic.Content.length > 0) {
        const firstContent = firstTopic.Content[0];
        
        // Navigate based on content type
        if (firstContent.videoURL) {
          router.push({
            pathname: '/(app)/courses/video',
            params: { 
              courseId: id,
              contentId: firstContent.id.toString(),
              content: JSON.stringify(firstContent)
            }
          });
        } else {
          router.push({
            pathname: '/(app)/courses/chapter',
            params: { 
              courseId: id,
              contentId: firstContent.id.toString(),
              content: JSON.stringify(firstContent)
            }
          });
        }
      } else {
        // Handle case where Content is not populated
        Alert.alert('Info', 'Course content is not available yet.');
      }
    }
  };

  const handleContentPress = (content: CourseContent) => {
    if (content.videoURL) {
      router.push({
        pathname: '/(app)/courses/video',
        params: { 
          courseId: id,
          contentId: content.id.toString(),
          content: JSON.stringify(content)
        }
      });
    } else {
      router.push({
        pathname: '/(app)/courses/chapter',
        params: { 
          courseId: id,
          contentId: content.id.toString(),
          content: JSON.stringify(content)
        }
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading course details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={loadCourse} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.container}>
        <Text>Course not found</Text>
      </View>
    );
  }

  // Get the image URL - handle different image structures
  let imageUrl = 'https://via.placeholder.com/300';
  if (course.Images && course.Images.length > 0) {
    const image = course.Images[0];
    if (image.url) {
      // Check if it's a relative URL or absolute
      if (image.url.startsWith('http')) {
        imageUrl = image.url;
      } else {
        // For relative URLs, prepend the API base URL
        imageUrl = `http://192.168.1.8:1337${image.url}`;
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.courseImage}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.courseName}>{course.Name}</Text>
        
        {course.description ? (
          <Text style={styles.courseDescription}>{course.description}</Text>
        ) : null}
        
        <TouchableOpacity style={styles.startButton} onPress={handleStartCourse}>
          <Text style={styles.startButtonText}>Start Course</Text>
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Course Content</Text>
        
        {course.Topics && course.Topics.length > 0 ? (
          course.Topics.map((topic, topicIndex) => (
            <View key={topic.id} style={styles.topicContainer}>
              <Text style={styles.topicName}>{topicIndex + 1}. {topic.name}</Text>
              
              {topic.Content && topic.Content.length > 0 ? (
                topic.Content.map((content, contentIndex) => {
                  const isCompleted = userProgress.some(progress => 
                    progress.courseContentId === content.id
                  );
                  
                  return (
                    <TouchableOpacity 
                      key={content.id} 
                      style={[styles.contentItem, isCompleted && styles.completedContent]}
                      onPress={() => handleContentPress(content)}
                    >
                      <Text style={styles.contentName}>
                        {topicIndex + 1}.{contentIndex + 1} {content.name}
                      </Text>
                      {isCompleted && (
                        <Text style={styles.completedText}>Completed</Text>
                      )}
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={styles.noContentText}>No content available for this topic yet.</Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noContentText}>No topics available for this course yet.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  courseImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  topicContainer: {
    marginBottom: 24,
  },
  topicName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contentItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedContent: {
    backgroundColor: '#e8f5e9',
  },
  contentName: {
    fontSize: 16,
  },
  completedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noContentText: {
    fontStyle: 'italic',
    color: '#666',
    padding: 8,
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});