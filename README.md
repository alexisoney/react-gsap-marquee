# react-gsap-marquee

## Installation

```bash
npm install gsap react-gsap-marquee
```

## Usage

```jsx
import Marquee from 'react-gsap-marquee'

const Example = () => (
  <Marquee>
    <h1>React GSAP Marquee<h1>
  </Marquee>
)
```

## Props

| name | type | default | description | 
| --- | --- | --- | --- |
| className | string | undefined | attach class to section element | 
| speed | number | 75 | how fast elements scroll |
| maxVelocity | number | 1000 | how fast scroll velocity can be (pixel per second) |
| velocityFactor | number | 1 | how fast acceleration is |
| accellerationDuration | number | 0.2 | how long acceleration is |
| reverseOnScrollUp | boolean | true | reverse animation on scroll up |
| isReversed | boolean | false | animate from left to right |

## License

MIT © [bitworking](https://github.com/bitworking)