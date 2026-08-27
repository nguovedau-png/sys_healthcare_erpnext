import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';
import { createCourseProgress } from '../../../services/courseService';

export default function ChapterScreen() {
  const router = useRouter();
  const { courseId, contentId, content } = useLocalSearchParams();
  const { token, user } = useAuth();
  const [runOutput, setRunOutput] = useState(false);

  const parsedContent = content ? JSON.parse(content as string) : null;

  const handleRunCode = () => {
    setRunOutput(true);
  };

  const handleNext = async () => {
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
      
      Alert.alert('Success', 'Chapter completed!');
    } catch (error) {
      console.error('Error saving progress:', error);
      Alert.alert('Error', 'Failed to save progress');
    }
  };

  if (!parsedContent) {
    return (
      <View style={styles.container}>
        <Text>Content not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{parsedContent.name}</Text>
        <Text style={styles.description}>{parsedContent.description}</Text>
        
        {parsedContent.input ? (
          <View style={styles.codeSection}>
            <Text style={styles.sectionTitle}>Code:</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{parsedContent.input}</Text>
            </View>
            <TouchableOpacity style={styles.runButton} onPress={handleRunCode}>
              <Text style={styles.runButtonText}>Run Code</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        
        {runOutput && parsedContent.output ? (
          <View style={styles.outputSection}>
            <Text style={styles.sectionTitle}>Output:</Text>
            <View style={styles.outputBlock}>
              <Text style={styles.outputText}>{parsedContent.output}</Text>
            </View>
          </View>
        ) : null}
        
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Complete Chapter</Text>
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
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
  },
  codeSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  codeText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  runButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  runButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outputSection: {
    marginBottom: 24,
  },
  outputBlock: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
  },
  outputText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});