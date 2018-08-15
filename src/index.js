import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * High Order Component to Provide 
 * that provides info about the connection type/speed
 * to the wrapped components.
 * You can use it to hide/show a section of a page based
 * on users internet type/speed.
 * 
 *  The following properties are passed to the wrapped components
 *  - <strong>downlink</strong> : The effective bandwidth estimate in megabits per secondrounded to the nearest multiple of 25 kilobits per seconds.
 *  - <strong>effectiveType</strong> : The effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'. This value is determined using a combination of recently observed, round-trip time and downlink values.
 *  - <strong>rtt</strong> : The estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds.
 *
 * @class NetworkInformation
 * @extends {Component}
 */
export default class NetworkInformation extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  };

  state = {
    downlink: Infinity,
    effectiveType: undefined,
    rtt: Infinity
  };

  /**
   * Update the connection info
   */
  updateConnectionStatus() {
    this.setState({
      /** 
       * Returns the effective bandwidth estimate in megabits per second, 
       * rounded to the nearest multiple of 25 kilobits per seconds.
      */
      downlink: this.connection.downlink,
      /** 
       * Returns the effective type of the connection 
       * meaning one of 'slow-2g', '2g', '3g', or '4g'. 
       * This value is determined using a combination of 
       * recently observed, round-trip time and downlink values.
      */
      effectiveType: this.connection.effectiveType,
      /** 
       * Returns the estimated effective round-trip 
       * time of the current connection, rounded to 
       * the nearest multiple of 25 milliseconds.
      */
      rtt: this.connection.rtt
    });
  }

  /**
   * Attach listener for the connection
   */
  componentDidMount() {
    this.connection = window.navigator.connection
      || window.navigator.mozConnection
      || window.navigator.webkitConnection;

    if (this.connection) {
      this.updateConnectionStatus();
      this.connection.addEventListener('typechange', this.updateConnectionStatus);
    }
  }

  /**
   * Remove listener
   */
  componentWillUnmount() {
    if(this.connection){
      this.connection.removeEventListener('typechange', this.updateConnectionStatus);
    }
  }

  /**
   * Render component
   *
   * @returns {JSX.Element}
   */
  render() {
    const { children } = this.props;

    if(typeof children === "function"){
      return children(this.state);
    }

    return React.Children.map(children, child => React.cloneElement(child, this.state));
  }
}
