import Colors from "@/shared/Colors";
import moment from "moment";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface DateOption {
  date: Date;
  weekday: string;
  day: number;
  month: number;
}

interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  days: number;
}

const DateSelection = ({ selectedDate, onSelectDate, days }: Props) => {
  // 生成从今天开始的三天日期
  const dateOptions = useMemo((): DateOption[] => {
    const dates: DateOption[] = [];
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      dates.push({
        date,
        weekday: weekdays[date.getDay()],
        day: date.getDate(),
        month: date.getMonth() + 1,
      });
    }

    return dates;
  }, [days]);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>选择日期</Text>
      <View style={styles.optionsRow}>
        {dateOptions.map((option, index) => {
          const formattedDate = moment(option.date).format("DD/MM/YYYY");
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateOption,
                selectedDate === formattedDate && styles.selectedOption,
              ]}
              onPress={() => onSelectDate(formattedDate)}
            >
              <Text
                style={[
                  styles.weekdayText,
                  selectedDate === formattedDate && styles.selectedText,
                ]}
              >
                星期{option.weekday}
              </Text>
              <Text
                style={[
                  styles.dayText,
                  selectedDate === formattedDate && styles.selectedText,
                ]}
              >
                {option.day}号
              </Text>
              <Text
                style={[
                  styles.monthText,
                  selectedDate === formattedDate && styles.selectedText,
                ]}
              >
                {option.month}月
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.TEXT_PRIMARY, 
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  dateOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.BORDER,
  },
  selectedOption: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  weekdayText: {
    fontSize: 12,
    color: Colors.TEXT_SECONDARY,
    marginBottom: 4,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
    marginBottom: 2,
  },
  monthText: {
    fontSize: 12,
    color: Colors.TEXT_SECONDARY,
  },
  selectedText: {
    color: Colors.WHITE,
  },
});

export default DateSelection;
