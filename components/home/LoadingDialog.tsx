import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';

interface LoadingDialogProps {
  visible: boolean;
  message?: string;
}

const LoadingDialog = ({ visible, message = '加载中...' }: LoadingDialogProps) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.modalText}>{message}</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 120,
    width: 250,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333'
  }
})

export default LoadingDialog