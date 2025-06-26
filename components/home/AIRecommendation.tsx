import Colors from '@/shared/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AIRecommendationProps {
  onGeneratePress?: () => void;
}

const AIRecommendation: React.FC<AIRecommendationProps> = ({ 
  onGeneratePress 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.textSection}>
            <Text style={styles.title}>需要餐食灵感</Text>
            <Text style={styles.subtitle}>
              让我们的AI为您生成个性化食谱！
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={onGeneratePress}
            activeOpacity={0.7}
          >
            <MaterialIcons 
              name="auto-awesome" 
              size={20} 
              color={Colors.WHITE} 
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>AI生成餐食</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.CARD_BACKGROUND,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    gap: 16,
  },
  textSection: {
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.TEXT_PRIMARY,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 20,
    fontWeight: '400',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AIRecommendation; 