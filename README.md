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
| className | string | undefined | Attach class to section element. | 
| speed | number | 75 | How fast elements scroll. |
| maxVelocity | number | 1000 | How fast scroll velocity can be (pixel per second). If set to `0`, the marquee won't accelerate on scroll. |
| velocityFactor | number | 1 | How fast acceleration is. |
| accellerationDuration | number | 0.2 | How long acceleration is. |
| reverseOnScrollUp | boolean | true | Reverse animation on scroll up. |
| isReversed | boolean | false | Animate from left to right. |

## License

MIT © [bitworking](https://github.com/bitworking)