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
    marginHorizontal: 28
  },
  menu: {
    width: '70%',
    position: 'absolute',
    top: -30,
    zIndex: 2
  },
  rowNav: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  rowNavCredits: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 4,
    width: '100%'
  },
  bordertop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  borderbottom: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  perfilImg: {
    width: 22,
    height: 22
  },
  imgContainer: {
    position: 'absolute',
    left: 24,
    borderWidth: 10,
    borderColor: COLORS.primary,
    borderRadius: 8
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Corbel',
    fontWeight: 'bold'
  },
  margin8: {
    marginHorizontal: 8
  },
  rowContent: {
    flexDirection: 'row'
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    marginHorizontal: '25%',
    borderRadius: 20,
    marginVertical: 6.5
  },
  logout: {
    backgroundColor: COLORS.error,
    marginHorizontal: '25%',
    borderRadius: 20,
    marginVertical: 6.5
  },
  completedMenu: {
    width: '50%'
  },
  input: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#DEE9FF',
    height: 35,
    elevation: 2
  },
  inputBlue: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#1B66FD',
    opacity: 0.45,
    height: 35,
    elevation: 2
  },
  text12: {
    fontSize: 12,
    fontFamily: 'Corbel',
    color: COLORS.primary
  },
  text11: {
    fontSize: 11,
    fontFamily: 'Corbel',
    color: COLORS.primary,
    marginBottom: -10
  },
  line: {
    width: '100%',
    height: 5
  },
  active: {
    backgroundColor: COLORS.primary
  },
  inactive: {
    backgroundColor: '#CFD5D7'
  },
  inContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center'
  },
  outContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.error,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inOutText: {
    color: '#979FA9',
    fontFamily: 'Corbel',
    fontSize: 14
  },
  transactionText: {
    color: '#05233A',
    fontSize: 16,
    fontFamily: 'Corbel'
  }
})

export default styles
