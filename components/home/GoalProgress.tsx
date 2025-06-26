import Colors from '@/shared/Colors';
import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface GoalProgressProps {
  current: number;
  target: number;
  date?: string;
}

const GoalProgress: React.FC<GoalProgressProps> = memo(({ 
  current = 1500, 
  target = 2000, 
  date = "April 16, 2025" 
}) => {
  const progressData = useMemo(() => {
    const progress = Math.min(current / target, 1);
    const percentage = Math.round(progress * 100);
    return { progress, percentage };
  }, [current, target]);

  return (
    <View style={styles.container}>
      <View 
        style={styles.card}
        accessible={true}
        accessibilityLabel={`今日目标: 已摄入${current}卡路里，目标${target}卡路里，完成度${progressData.percentage}%`}
        accessibilityRole="progressbar"
      >
        <View style={styles.header}>
          <Text style={styles.title}>今日目标</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        
        <View style={styles.progressSection}>
          <Text 
            style={styles.progressText}
            accessible={true}
            accessibilityLabel={`${current} 卡路里，目标 ${target} 卡路里`}
          >
            <Text style={styles.currentText}>{current}</Text>
            <Text style={styles.separatorText}>/</Text>
            <Text style={styles.targetText}>{target}</Text>
            <Text style={styles.unitText}> 千卡</Text>
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View 
            style={styles.progressBarBackground}
            accessible={true}
            accessibilityLabel={`进度条显示完成度 ${progressData.percentage}%`}
            accessibilityRole="progressbar"
          >
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${progressData.percentage}%` }
              ]} 
            />
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>已摄入卡路里</Text>
            <Text style={styles.encouragement}>继续保持！</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

GoalProgress.displayName = 'GoalProgress';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.TEXT_PRIMARY,
  },
  date: {
    fontSize: 14,
    color: Colors.TEXT_SECONDARY,
    fontWeight: '500',
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.TEXT_PRIMARY,
  },
  currentText: {
    color: Colors.SUCCESS,
  },
  separatorText: {
    color: Colors.TEXT_TERTIARY,
  },
  targetText: {
    color: Colors.TEXT_SECONDARY,
  },
  unitText: {
    fontSize: 18,
    color: Colors.TEXT_SECONDARY,
    fontWeight: '500',
  },
  progressBarContainer: {
    gap: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.BORDER_LIGHT,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.SUCCESS,
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: Colors.TEXT_SECONDARY,
    fontWeight: '500',
  },
  encouragement: {
    fontSize: 14,
    color: Colors.SUCCESS,
    fontWeight: '600',
  },
});

export default GoalProgress; 