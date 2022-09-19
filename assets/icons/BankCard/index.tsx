import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const BankCardIcon = (props: SvgProps | any) => (
  <Svg width={68} height={54} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M40.75 22c0-.265.118-.52.33-.707a1.2 1.2 0 0 1 .795-.293h4.5a1.2 1.2 0 0 1 .795.293c.212.187.33.442.33.707v2c0 .265-.118.52-.33.707a1.2 1.2 0 0 1-.795.293h-4.5a1.2 1.2 0 0 1-.795-.293.947.947 0 0 1-.33-.707v-2Z"
      fill="#1B4298"
    />
    <Path
      d="M16.375 10.5c-1.558 0-3.053.58-4.154 1.61C11.119 13.143 10.5 14.542 10.5 16v22c0 1.459.619 2.858 1.72 3.89 1.102 1.03 2.597 1.61 4.155 1.61h35.25c1.558 0 3.053-.58 4.154-1.61C56.881 40.857 57.5 39.458 57.5 38V16c0-1.459-.619-2.858-1.72-3.89-1.102-1.03-2.597-1.61-4.155-1.61h-35.25ZM54.563 16v13.75H13.437V16c0-.73.31-1.429.86-1.944a3.042 3.042 0 0 1 2.078-.806h35.25c.78 0 1.526.29 2.077.806.551.515.86 1.215.86 1.944Zm-2.938 24.75h-35.25c-.78 0-1.526-.29-2.077-.806a2.664 2.664 0 0 1-.86-1.944v-2.75h41.124V38c0 .73-.309 1.429-.86 1.944a3.042 3.042 0 0 1-2.077.806Z"
      fill="#1B4298"
    />
  </Svg>
)

export default BankCardIcon