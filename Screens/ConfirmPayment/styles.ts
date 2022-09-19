import { StyleSheet } from 'react-native'
import theme from '../../Constants/styles'
import COLORS from '../../Constants/styles'

const styles = StyleSheet.create({
  borderNav: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: COLORS.primary,
    height: 40,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 2
  },
  notMargin: {
    margin: 0
  },
  container: {
    marginHorizontal: 32
  },
  rowContainer: {
    flexDirection: 'row'
  },
  line: {
    height: 2,
    backgroundColor: COLORS.primary90
  },
  experiences: {
    marginTop: 24
  },
  pinCashback: {
    backgroundColor: COLORS.orange,
    width: 115,
    marginTop: 5,
    borderRadius: 10,
    height: 20
  },
  pinText: {
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 25,
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 70
  },
  title: {
    fontSize: 24,
    fontFamily: 'Corbel-Bold',
    marginTop: 15
  },
  boldText: {
    fontFamily: 'Corbel-Bold'
  },
  policy: {
    fontSize: 16,
    fontFamily: 'Corbel-Bold',
    marginTop: 24,
    marginBottom: 15
  },
  vertical12: {
    marginVertical: 6
  },
  requiredCard: {
    marginLeft: 20,
    fontFamily: 'Corbel-Bold',
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center'
  }
})

export default styles
