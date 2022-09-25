import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  LogBox
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { IconButton, RadioButton } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import { useRecoilState } from 'recoil'
import axios from 'axios'

import {
  getBestDealHotels,
  getDestinationIdeaHotels,
  getMostPopularHotels,
  getRecentsearchHotels,
  getSearchedHotelAll
} from '../../api/apiCaller'

import CardUpcomingTrips from '../../Components/CardUpcomingTrips'
import CardDestinationIdeas from '../../Components/CardDestinationIdeas'
import CardMostPopular from '../../Components/CardMostPopular'
import CardBestDeals from '../../Components/CardBestDeals'
import LocationIcon from '../../assets/icons/Location'
import IncrementDecrementInputComponent from './components/incrementDecrement'
import LightButton from '../../Components/LightButton'
import CartoonPersonIcon from '../../assets/icons/CartoonPerson'
import DoubleCartoonsIcon from '../../assets/icons/DoubleCartoons'
import FamilyCartoonsIcon from '../../assets/icons/FamilyCartoons'

import { FilterQueryProps } from '../../Constants/data'

import styles from './styles'
import {
  searched,
  isLoadingSearched,
  mostpopular,
  isLoadingMostPopular,
  recentsearches,
  isLoadingRecentSearches,
  destinationideas,
  isLoadingDestinationIdeas,
  bestdeals,
  isLoadingBestDeals
} from '../../assets/atoms/HotelHomeData'

const Home = (props: any) => {
  const [_, setSearched] = useRecoilState(searched)
  const [isSearchLoading, setIsLoadingSearched] = useRecoilState(isLoadingSearched)
  const [__, setMostpopular] = useRecoilState(mostpopular)
  const [isMostPopularLoading, setIsLoadingMostPopular] = useRecoilState(isLoadingMostPopular)
  const [___, setrecentsearches] = useRecoilState(recentsearches)
  const [isRecentSearchesLoading, setIsLoadingRecentSearches] =
    useRecoilState(isLoadingRecentSearches)
  const [____, setDestinationideas] = useRecoilState(destinationideas)
  const [isDestinationIdeasLoading, setIsLoadingDestinationIdeas] =
    useRecoilState(isLoadingDestinationIdeas)
  const [_____, setBestdeals] = useRecoilState(bestdeals)
  const [isBestDealsLoading, setIsLoadingBestDeals] = useRecoilState(isLoadingBestDeals)

  const [modalWhereVisible, setModalWhereVisible] = useState(false)
  const [modalWhenVisible, setModalWhenVisible] = useState(false)
  const [modalHowManyVisible, setModalHowManyVisible] = useState(false)
  const [modalChoiceRooms, setModalChoiceRooms] = useState(false)
  const onToggleSnackBar = () => setModalWhereVisible(!modalWhereVisible)
  const onDismissSnackBar = () => setModalWhereVisible(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)
  const [whereFocus, setWhereFocus] = useState(false)
  const [initialDate, setInitialDate] = useState('')

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    getMostPopularHotels()
      .then((res) => {
        setIsLoadingMostPopular({ isLoading: false })
        const data = res.data
        console.log('most popular hotels', data)
        setMostpopular(data)
      })
      .catch((err) => {
        setIsLoadingMostPopular({ isLoading: false })
        console.log('most popular error', err)
      })

    getRecentsearchHotels()
      .then((res) => {
        setIsLoadingRecentSearches({ isLoading: false })
        const data = res.data
        console.log('recent search hotels', data)
        setrecentsearches(data)
      })
      .catch((err) => {
        setIsLoadingRecentSearches({ isLoading: false })
        console.log('recent search error', err)
      })

    getDestinationIdeaHotels()
      .then((res) => {
        setIsLoadingDestinationIdeas({ isLoading: false })
        const data = res.data
        console.log('destination hotels', data)
        setDestinationideas(data)
      })
      .catch((err) => {
        setIsLoadingDestinationIdeas({ isLoading: false })
        console.log('destination hotel error', err)
      })

    getBestDealHotels()
      .then((res) => {
        setIsLoadingBestDeals({ isLoading: false })
        const data = res.data
        console.log('best deal hotels', data)
        setBestdeals(data)
      })
      .catch((err) => {
        setIsLoadingBestDeals({ isLoading: false })
        console.log('best deal error', err)
      })
  }, [])

  const [where, setWhere] = useState('')
  const [tabsActive, setTabsActive] = useState('calendar')

  const [dateValue, setDateValue] = useState('')
  const [secondDateValue, setSecondDateValue] = useState('')

  const [numberOfDays, setNumberOfDays] = useState(1)
  const [teste, setTeste] = useState({})

  useEffect(() => {
    if (dateValue && !secondDateValue) {
      setTeste({
        [dateValue]: {
          selected: true,
          color: '#1B4298',
          textColor: '#fff'
        }
      })
    }

    if (dateValue && secondDateValue) {
      setTeste({
        [dateValue]: { selected: true, startingDay: true, color: '#1B4298', textColor: '#fff' },
        [secondDateValue]: {
          selected: true,
          endingDay: true,
          color: '#1B4298',
          textColor: '#fff'
        }
      })
    }
  }, [dateValue, secondDateValue])

  const adicionarDiasData = (dias: number) => {
    let hoje = new Date(dateValue)
    let dataVenc = new Date(hoje.getTime() + dias * 24 * 60 * 60 * 1000)
    const y = dataVenc.getFullYear(),
      m = dataVenc.getMonth() + 1,
      d = dataVenc.getDate()

    return `${y}-${m > 9 ? m : `0${m}`}-${d > 9 ? d : `0${d}`}`
  }

  useEffect(() => {
    let day1 = new Date(dateValue)
    let day2 = new Date(secondDateValue)
    let difference = Math.abs(day2.getTime() - day1.getTime())
    let days = difference / (1000 * 3600 * 24)

    let dates = []

    for (let i = 1; i < days + 2; i++) {
      dates.push(adicionarDiasData(i))
    }

    let oi: any = {}

    dates.map((e) => {
      oi[e] = { selected: true, color: '#1B4298', textColor: '#fff' }
    })

    if (dateValue && secondDateValue) {
      setTeste(oi)
    }
  }, [secondDateValue])

  function sendWhen(text: string) {
    setTabsActive('calendar')
    setNumberOfDays(1)
    setModalWhenVisible(false)
  }

  const handleSubmitForm = () => {
    axios
      .get('http://ipinfo.io/json')
      .then((res) => {
        let filterQuery = {} as FilterQueryProps
        const currentDate = new Date()
        const nextDate = new Date(new Date().getTime() + 24 * 3600 * 1000)
        let currentLocation = {} as { latitude: number; longitude: number }

        currentLocation.latitude = Number(res.data.loc.split(',')[0])
        currentLocation.longitude = Number(res.data.loc.split(',')[1])
        filterQuery.currentLocation = currentLocation

        const stay = {
          checkIn: dateValue === '' ? currentDate.toISOString().split('T')[0] : dateValue,
          checkOut: secondDateValue === '' ? nextDate.toISOString().split('T')[0] : secondDateValue
        }
        filterQuery.stay = stay

        let rooms = 1
        if (radioRoomsValues === 'Shared') {
          rooms = 1
        } else if (radioRoomsValues === 'Single') {
          rooms = 1
        } else if (radioRoomsValues === 'Double') {
          rooms = 2
        } else {
          rooms = 3
        }

        const occupancies = [
          {
            rooms: rooms,
            adults: inputAdults === 0 ? 1 : inputAdults,
            children: inputChildren + inputInfants
          }
        ]
        filterQuery.occupancies = occupancies

        filterQuery.destination = { destination: where }

        console.log('filterQuery', filterQuery)
        getSearchedHotelAll(filterQuery)
          .then((res) => {
            setIsLoadingSearched({ isLoading: false })
            const data = res.data
            console.log('searchedHotelData', data)
            setSearched(data)
          })
          .catch((err) => {
            setIsLoadingSearched({ isLoading: false })
            console.log('error', err)
          })
      })
      .catch((err) => {
        console.log('ip info err', err)
      })
  }

  const [inputAdults, setInputAdults] = useState(0)
  const [inputChildren, setInputChildren] = useState(0)
  const [inputInfants, setInputInfants] = useState(0)
  const [radioRoomsValues, setRadioRoomsValues] = useState('Shared') // Shared, Single, Double, Family

  return (
    <>
      <ScrollView>
        <ImageBackground
          style={styles.container}
          source={require('../../assets/img/bg-hotel.jpeg')}
        >
          <View style={styles.loginForm}>
            <View style={styles.inputBottom}>
              <TextInput
                style={styles.input}
                value={
                  inputAdults === 0 && inputChildren === 0 && inputInfants === 0
                    ? ''
                    : `Adults-${inputAdults}, Children-${
                        inputChildren + inputInfants
                      }, Room-${radioRoomsValues}`
                }
                placeholder="How many rooms & people?"
                onChangeText={() => {
                  return
                }}
                onFocus={() => {
                  setModalWhenVisible(false)
                  setModalWhereVisible(false)
                  setModalHowManyVisible(true)
                }}
              />
            </View>
            <View style={styles.inputBottom}>
              <TextInput
                style={styles.input}
                value={
                  dateValue === '' && secondDateValue === ''
                    ? ''
                    : `${dateValue} - ${secondDateValue}`
                }
                placeholder="When do you want to go?"
                onFocus={() => {
                  setModalWhenVisible(true), setTabsActive('flexible')
                }}
                onChangeText={() => {
                  return
                }}
              />
            </View>
            <View style={styles.inputBottom}>
              <TextInput
                style={styles.input}
                value={where === '' ? '' : where}
                onChangeText={() => {
                  return
                }}
                placeholder="Where are you going?"
                onFocus={() => setModalWhereVisible(true)}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => [handleSubmitForm(), props.navigation.navigate('Offers')]}
              >
                <Text style={styles.loginButtonText}>
                  <AntDesign name="search1" size={20} color="#1B4298" style={{ margin: 50 }} />{' '}
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.containerHotels}>
          <CardMostPopular numberofadults={inputAdults} />
          <CardUpcomingTrips numberofadults={inputAdults} />
          <CardDestinationIdeas numberofadults={inputAdults} />
          <CardBestDeals numberofadults={inputAdults} />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalWhereVisible}
          onRequestClose={() => {
            setModalWhereVisible(!modalWhereVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={!whereFocus ? styles.modalView : styles.modalViewTyping}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#8296CA'}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  setModalWhereVisible(false), setDateValue(''), setSecondDateValue('')
                }}
                rippleColor={'white'}
              />
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}>
                  <Text style={styles.modalTitle}>Where are you going?</Text>
                </View>
              </View>
              <View style={styles.inputBottom}>
                <TextInput
                  style={styles.inputModal}
                  value={where}
                  placeholder="Search for destination"
                  onFocus={() => setWhereFocus(true)}
                  onBlur={() => setWhereFocus(false)}
                  onChangeText={(text) => setWhere(text)}
                />
              </View>
              <View style={{ marginLeft: 50, width: '100%' }}>
                {!whereFocus && <Text style={styles.modalText}>Not sure where to go? </Text>}
                {!whereFocus && (
                  <TouchableOpacity
                    style={styles.icons}
                    onPress={() => props.navigation.navigate('Home')}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#1B4298',
                        borderRadius: 10
                      }}
                    >
                      <IconButton color={'white'} icon={LocationIcon} size={24} />
                    </View>
                    <Text style={styles.textIcons}>Everywhere</Text>
                  </TouchableOpacity>
                )}
                {!whereFocus && (
                  <TouchableOpacity
                    style={styles.icons}
                    onPress={() => props.navigation.navigate('Home')}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#1B4298',
                        borderRadius: 10
                      }}
                    >
                      <IconButton color={'white'} icon={LocationIcon} size={24} />
                    </View>
                    <Text style={styles.textIcons}>Most Popular</Text>
                  </TouchableOpacity>
                )}
                {!whereFocus && (
                  <TouchableOpacity
                    style={styles.icons}
                    onPress={() => props.navigation.navigate('Home')}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#1B4298',
                        borderRadius: 10
                      }}
                    >
                      <IconButton color={'white'} icon={LocationIcon} size={24} />
                    </View>
                    <Text style={styles.textIcons}>Best deals</Text>
                  </TouchableOpacity>
                )}
                {!whereFocus && (
                  <TouchableOpacity
                    style={[styles.loginWhereModalButton, styles.btnSearch]}
                    onPress={() => setModalWhereVisible(false)}
                  >
                    <Text style={styles.loginButtonText}>
                      <AntDesign name="search1" size={20} color="#1B4298" /> Search
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalWhenVisible}
          onRequestClose={() => {
            setModalWhenVisible(!modalWhenVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalViewTyping}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#8296CA'}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  setModalWhenVisible(false), setTabsActive('flexible'), setNumberOfDays(1)
                  setDateValue(''), setSecondDateValue(''), setInitialDate('')
                }}
                rippleColor={'white'}
              />
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}>
                  <Text style={styles.modalTitle}>When do you want to go?</Text>
                </View>
              </View>
              {tabsActive !== 'calendar' && (
                <LightButton
                  text="Calendar"
                  textStyle={{ paddingHorizontal: 50 }}
                  style={{ borderRadius: 20 }}
                  onPress={() => {
                    setTabsActive('calendar')
                  }}
                />
              )}
              <View style={{ display: tabsActive === 'calendar' ? 'flex' : 'none' }}>
                <Calendar
                  initialDate={initialDate}
                  minDate={new Date().toISOString().split('T')[0].toString()}
                  markingType={'period'}
                  markedDates={teste}
                  style={{
                    marginTop: 60,
                    width: 400,
                    height: 420,
                    borderWidth: 2,
                    borderColor: '#506F9D',
                    borderRadius: 12,
                    marginBottom: 13
                  }}
                  onDayPress={(day) => {
                    if (dateValue) {
                      setSecondDateValue(day.dateString.toString())
                    } else {
                      if (numberOfDays > 1) {
                        let secondday = new Date(day.dateString)
                        secondday = new Date(
                          secondday.setDate(secondday.getDate() + numberOfDays - 1)
                        )
                        setDateValue(day.dateString.toString())
                        setSecondDateValue(secondday.toISOString().split('T')[0].toString())
                      } else {
                        setDateValue(day.dateString.toString())
                      }
                    }
                    if (dateValue && secondDateValue) {
                      if (numberOfDays > 1) {
                        let secondday = new Date(day.dateString)
                        secondday = new Date(
                          secondday.setDate(secondday.getDate() + numberOfDays - 1)
                        )
                        setDateValue(day.dateString.toString())
                        setSecondDateValue(secondday.toISOString().split('T')[0].toString())
                      } else {
                        setDateValue(day.dateString.toString())
                        setSecondDateValue('')
                      }
                    }
                  }}
                />
              </View>

              <View
                style={{
                  display: tabsActive === 'flexible' ? 'flex' : 'none',
                  paddingTop: 30,
                  width: '100%',
                  marginBottom: 150
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Number of Days</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Pressable
                      onPress={() => setNumberOfDays(numberOfDays - 1)}
                      style={{
                        borderWidth: 2,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 50,
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        borderColor: '#506F9D'
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          lineHeight: 18,
                          color: '#8296CA'
                        }}
                      >
                        -
                      </Text>
                    </Pressable>
                    <TextInput
                      style={{
                        borderWidth: 2,
                        borderRadius: 30,
                        padding: 5,
                        borderColor: '#506F9D',
                        marginLeft: 10,
                        marginRight: 10,
                        width: 90,
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {numberOfDays}
                    </TextInput>
                    <Pressable
                      onPress={() => setNumberOfDays(numberOfDays + 1)}
                      style={{
                        borderWidth: 2,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 50,
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        borderColor: '#506F9D'
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          lineHeight: 17,
                          color: '#8296CA'
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    <Pressable
                      onPress={() => [
                        setTabsActive('calendar'),
                        setNumberOfDays(1),
                        setDateValue(''),
                        setSecondDateValue('')
                      ]}
                      style={{
                        marginLeft: 90
                      }}
                    >
                      <Text
                        style={{
                          borderWidth: 2,
                          borderRadius: 30,
                          padding: 5,
                          borderColor: '#506F9D',
                          marginLeft: 10,
                          marginRight: 10,
                          width: 90,
                          paddingVertical: 10,
                          color: '#000',
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}
                      >
                        Any
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <View style={{ marginTop: 60 }}>
                  <Text>
                    Go in<Text style={{ fontWeight: 'bold' }}>{'  '}Month</Text>
                  </Text>

                  <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        width: 80,
                        height: 80,
                        marginRight: 10
                      }}
                      onPress={() => [setInitialDate('2022-09-01'), setTabsActive('calendar')]}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: 'Corbel',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#1B4298'
                        }}
                      >
                        Sep
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        width: 80,
                        height: 80,
                        marginRight: 10
                      }}
                      onPress={() => [setInitialDate('2022-10-01'), setTabsActive('calendar')]}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: 'Corbel',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#1B4298'
                        }}
                      >
                        Oct
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        width: 80,
                        height: 80,
                        marginRight: 10
                      }}
                      onPress={() => [setInitialDate('2022-11-01'), setTabsActive('calendar')]}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: 'Corbel',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#1B4298'
                        }}
                      >
                        Dec
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        width: 80,
                        height: 80,
                        marginRight: 10
                      }}
                      onPress={() => [setInitialDate('2022-12-01'), setTabsActive('calendar')]}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: 'Corbel',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#1B4298'
                        }}
                      >
                        Dec
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {tabsActive === 'flexible' && (
                <TouchableOpacity
                  style={[styles.calendarBtnSearch]}
                  onPress={() => {
                    setTabsActive('calendar')
                  }}
                >
                  <Text style={styles.loginButtonText}>
                    <AntDesign name="search1" size={20} color="#1B4298" /> Search
                  </Text>
                </TouchableOpacity>
              )}
              {tabsActive === 'calendar' && (
                <TouchableOpacity
                  style={[styles.calendarBtnSearch]}
                  onPress={() => {
                    sendWhen(`${dateValue}${secondDateValue}`)
                    setInitialDate('')
                  }}
                >
                  <Text style={styles.loginButtonText}>
                    <AntDesign name="search1" size={20} color="#1B4298" /> Search
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalHowManyVisible}
          onRequestClose={() => setModalHowManyVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                height: '50%',
                maxHeight: 400,
                borderRadius: 20
              }}
            >
              <IncrementDecrementInputComponent
                title={'Adults'}
                subTitle={'Ages 13 or above'}
                inputValue={inputAdults}
                onChangeText={() => setInputAdults(inputAdults)}
                Increment={() => setInputAdults(inputAdults + 1)}
                Decrement={() => {
                  if (inputAdults === 0) {
                    setInputAdults(0)
                  } else {
                    setInputAdults(inputAdults - 1)
                  }
                }}
              />
              <IncrementDecrementInputComponent
                title={'Children'}
                subTitle={'Ages 2-12'}
                inputValue={inputChildren}
                onChangeText={() => setInputChildren(inputChildren)}
                Increment={() => setInputChildren(inputChildren + 1)}
                Decrement={() => {
                  if (inputChildren === 0) {
                    setInputChildren(0)
                  } else {
                    setInputChildren(inputChildren - 1)
                  }
                }}
              />
              <IncrementDecrementInputComponent
                title={'Infants'}
                subTitle={'Under 2'}
                inputValue={inputInfants}
                onChangeText={() => setInputInfants(inputInfants)}
                Increment={() => setInputInfants(inputInfants + 1)}
                Decrement={() => {
                  if (inputInfants === 0) {
                    setInputInfants(0)
                  } else {
                    setInputInfants(inputInfants - 1)
                  }
                }}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#05233A',
                  width: '90%',
                  alignSelf: 'center'
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                  paddingHorizontal: 20
                }}
              >
                <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Clear</Text>
                <LightButton
                  text="Save"
                  textStyle={{ paddingHorizontal: 50 }}
                  style={{ borderRadius: 20 }}
                  onPress={() => {
                    setModalHowManyVisible(false)
                    setModalChoiceRooms(true)
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalChoiceRooms}
          onRequestClose={() => setModalChoiceRooms(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                height: '50%',
                maxHeight: 350,
                borderRadius: 20
              }}
            >
              <View style={{ flexDirection: 'row', height: '80%', maxHeight: 300 }}>
                <View style={{ width: '65%', justifyContent: 'center', maxWidth: 350 }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}
                  >
                    <RadioButton
                      value={'Shared'}
                      status={radioRoomsValues === 'Shared' ? 'checked' : 'unchecked'}
                      onPress={() => setRadioRoomsValues('Shared')}
                    />
                    <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Shared room</Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}
                  >
                    <RadioButton
                      value="Single"
                      status={radioRoomsValues === 'Single' ? 'checked' : 'unchecked'}
                      onPress={() => setRadioRoomsValues('Single')}
                    />
                    <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>
                      Private room - Single
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}
                  >
                    <RadioButton
                      value="Double"
                      status={radioRoomsValues === 'Double' ? 'checked' : 'unchecked'}
                      onPress={() => setRadioRoomsValues('Double')}
                    />
                    <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>
                      Private room - Double
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}
                  >
                    <RadioButton
                      value="Family"
                      status={radioRoomsValues === 'Family' ? 'checked' : 'unchecked'}
                      onPress={() => setRadioRoomsValues('Family')}
                    />
                    <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>
                      Private room - Family
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: 1,
                    height: '75%',
                    backgroundColor: '#506F9D',
                    alignSelf: 'flex-end'
                  }}
                />
                <View>
                  <Text
                    style={{
                      marginTop: 30,
                      fontSize: 16,
                      fontFamily: 'Corbel-Bold',
                      color: '#05233A',
                      marginLeft: 20
                    }}
                  >
                    Sleeps
                  </Text>
                  <View style={{ justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                      <CartoonPersonIcon />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 12 }}>
                      <CartoonPersonIcon />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 12 }}>
                      <DoubleCartoonsIcon />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 12 }}>
                      <FamilyCartoonsIcon />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: '#05233A',
                  width: '90%',
                  alignSelf: 'center'
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                  paddingHorizontal: 20
                }}
              >
                <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Clear</Text>
                <LightButton
                  text="Save"
                  textStyle={{ paddingHorizontal: 50 }}
                  style={{ borderRadius: 20 }}
                  onPress={() => setModalChoiceRooms(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  )
}

export default Home
