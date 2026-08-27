import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';
import { getCourses, Course } from '../../../services/courseService';

export default function CoursesScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('CoursesScreen');
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
        console.log("111")
      console.log('Fetching courses with token:', token);
      const data = await getCourses(token);
      console.log('Courses data received:', JSON.stringify(data, null, 2));
      setCourses(data);
      setError(null);
    } catch (err) {
      console.error('Error loading courses:', err);
      setError(err instanceof Error ? err.message : 'Failed to load courses');
      Alert.alert('Error', 'Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCourse = ({ item }: { item: Course }) => {
    // Get the image URL - handle different image structures
    let imageUrl = 'https://via.placeholder.com/150';
    if (item.Images && item.Images.length > 0) {
      const image = item.Images[0];
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
      <TouchableOpacity 
        style={styles.courseCard}
        onPress={() => router.push({
          pathname: '/(app)/courses/[id]',
          params: { id: item.id.toString() }
        })}
      >
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.courseImage}
          resizeMode="cover"
        />
        <View style={styles.courseInfo}>
          <Text style={styles.courseName}>{item.Name}</Text>
          {item.description ? (
            <Text style={styles.courseDescription} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading courses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
        <TouchableOpacity onPress={loadCourses} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No courses available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  courseImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  courseInfo: {
    padding: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 12,
    color: '#666',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});