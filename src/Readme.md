Wrapping a component:

```js
class SomeComponent extends React.Component {
  render() {
    const { effectiveType, rtt, downlink } = this.props;

    return (
      <ul style={{ color: 'white' }}>
        <li>effectiveType: {effectiveType}</li>
        <li>rtt: {rtt}</li>
        <li>downlink: {downlink}</li>
      </ul>
    );
  }
}

<NetworkInformation>
  <SomeComponent />
</NetworkInformation>;
```


Wrapping a function:

```js
<NetworkInformation>
  { props => (
      <ul style={{ color: 'yellow' }}>
        <li>effectiveType: {props.effectiveType}</li>
        <li>rtt: {props.rtt}</li>
        <li>downlink: {props.downlink}</li>
      </ul>
  ) }
</NetworkInformation>;
```
